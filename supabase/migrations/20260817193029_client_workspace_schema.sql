-- Client Workspace: foundational schema
-- Internal operations data model for the ElevenChase Admin: clients, contacts,
-- services, account team, projects, tasks, email threads, files, activity feed.
-- This migration only creates structure + RLS. No application UI depends on it yet.

create extension if not exists pgcrypto;

-- ============================================================================
-- profiles (ElevenChase internal staff — extends auth.users)
-- ============================================================================

create type public.user_role as enum ('owner', 'admin', 'member');

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  avatar_url text,
  role public.user_role not null default 'member',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index profiles_email_key on public.profiles (lower(email));

comment on table public.profiles is 'ElevenChase staff accounts. Global role drives permissions; client_team_members.responsibilities is descriptive only.';

-- ============================================================================
-- clients
-- ============================================================================

create table public.clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text,
  status text not null default 'lead'
    check (status in ('lead', 'onboarding', 'active', 'maintenance', 'paused', 'completed', 'inactive')),
  website text,
  primary_email text,
  phone text,
  country text,
  timezone text,
  notes text,
  joined_date date,
  archived_at timestamptz,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index clients_status_idx on public.clients (status);
create index clients_archived_at_idx on public.clients (archived_at);

-- ============================================================================
-- contacts
-- ============================================================================

create table public.contacts (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  full_name text not null,
  email text,
  phone text,
  title text,
  is_primary boolean not null default false,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index contacts_client_id_idx on public.contacts (client_id);
create unique index contacts_email_key on public.contacts (lower(email)) where email is not null;
create unique index contacts_one_primary_per_client on public.contacts (client_id) where is_primary;

-- ============================================================================
-- client_email_aliases (deterministic inbound-email → client matching)
-- ============================================================================

create table public.client_email_aliases (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  email text not null,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

create index client_email_aliases_client_id_idx on public.client_email_aliases (client_id);
create unique index client_email_aliases_email_key on public.client_email_aliases (lower(email));

-- ============================================================================
-- client_services (extensible: type is validated in the app layer, not a DB enum)
-- ============================================================================

create table public.client_services (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  type text not null,
  label text,
  is_active boolean not null default true,
  notes text,
  created_at timestamptz not null default now()
);

create index client_services_client_id_idx on public.client_services (client_id);

-- ============================================================================
-- client_team_members (account team; permissions come from profiles.role, not this)
-- ============================================================================

create table public.client_team_members (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  responsibilities text[] not null default '{}',
  created_at timestamptz not null default now(),
  unique (client_id, user_id)
);

create index client_team_members_client_id_idx on public.client_team_members (client_id);
create index client_team_members_user_id_idx on public.client_team_members (user_id);
create index client_team_members_responsibilities_idx on public.client_team_members using gin (responsibilities);

-- ============================================================================
-- projects
-- ============================================================================

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  service_id uuid references public.client_services (id) on delete set null,
  name text not null,
  description text,
  status text not null default 'planning'
    check (status in ('planning', 'in_progress', 'waiting_on_client', 'review', 'completed', 'archived')),
  blocked_reason text,
  owner_id uuid references public.profiles (id) on delete set null,
  start_date date,
  target_date date,
  completed_at timestamptz,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index projects_client_id_idx on public.projects (client_id);
create index projects_status_idx on public.projects (status);
create index projects_target_date_idx on public.projects (target_date);
create index projects_owner_id_idx on public.projects (owner_id);

-- ============================================================================
-- project_members
-- ============================================================================

create table public.project_members (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  role text,
  created_at timestamptz not null default now(),
  unique (project_id, user_id)
);

create index project_members_project_id_idx on public.project_members (project_id);
create index project_members_user_id_idx on public.project_members (user_id);

-- ============================================================================
-- client_resource_links (generic model — no per-provider columns)
-- ============================================================================

create table public.client_resource_links (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  project_id uuid references public.projects (id) on delete cascade,
  type text not null,
  label text not null,
  url text not null,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

create index client_resource_links_client_id_idx on public.client_resource_links (client_id);
create index client_resource_links_project_id_idx on public.client_resource_links (project_id);

-- ============================================================================
-- files (metadata only — binary content lives in Supabase Storage)
-- ============================================================================

create table public.files (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  project_id uuid references public.projects (id) on delete set null,
  category text not null default 'other'
    check (category in ('contracts', 'proposals', 'design', 'development', 'client_uploads', 'deliverables', 'other')),
  file_name text not null,
  storage_path text not null,
  mime_type text,
  size_bytes bigint,
  uploaded_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index files_client_id_idx on public.files (client_id);
create index files_project_id_idx on public.files (project_id);
create index files_category_idx on public.files (category);
create unique index files_storage_path_key on public.files (storage_path);

-- ============================================================================
-- email_threads / email_messages / thread_participants
-- ============================================================================

create table public.email_threads (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.clients (id) on delete set null,
  project_id uuid references public.projects (id) on delete set null,
  provider_thread_id text,
  subject text,
  snippet text,
  last_message_at timestamptz,
  is_unread boolean not null default true,
  action_needed boolean not null default false,
  is_archived boolean not null default false,
  assigned_to uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index email_threads_client_id_idx on public.email_threads (client_id);
create index email_threads_project_id_idx on public.email_threads (project_id);
create index email_threads_last_message_at_idx on public.email_threads (last_message_at desc);
create index email_threads_unassigned_idx on public.email_threads (last_message_at desc) where client_id is null;
create unique index email_threads_provider_thread_id_key on public.email_threads (provider_thread_id) where provider_thread_id is not null;

create table public.email_messages (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references public.email_threads (id) on delete cascade,
  provider_message_id text,
  direction text not null check (direction in ('inbound', 'outbound')),
  from_email text not null,
  from_name text,
  to_emails text[] not null default '{}',
  cc_emails text[] not null default '{}',
  subject text,
  body_text text,
  body_html text,
  sent_at timestamptz not null,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

create index email_messages_thread_id_idx on public.email_messages (thread_id);
create index email_messages_sent_at_idx on public.email_messages (sent_at);
create unique index email_messages_provider_message_id_key on public.email_messages (provider_message_id) where provider_message_id is not null;

create table public.thread_participants (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references public.email_threads (id) on delete cascade,
  email text not null,
  name text,
  contact_id uuid references public.contacts (id) on delete set null,
  created_at timestamptz not null default now(),
  unique (thread_id, email)
);

create index thread_participants_thread_id_idx on public.thread_participants (thread_id);
create index thread_participants_contact_id_idx on public.thread_participants (contact_id);

-- ============================================================================
-- tasks / task_comments / task_attachments
-- ============================================================================

create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  project_id uuid references public.projects (id) on delete set null,
  title text not null,
  description text,
  status text not null default 'open'
    check (status in ('open', 'in_progress', 'waiting', 'review', 'done')),
  priority text not null default 'medium'
    check (priority in ('low', 'medium', 'high', 'urgent')),
  assignee_id uuid references public.profiles (id) on delete set null,
  due_date date,
  completed_at timestamptz,
  source_email_thread_id uuid references public.email_threads (id) on delete set null,
  source_email_message_id uuid references public.email_messages (id) on delete set null,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index tasks_client_id_idx on public.tasks (client_id);
create index tasks_project_id_idx on public.tasks (project_id);
create index tasks_assignee_id_idx on public.tasks (assignee_id);
create index tasks_status_idx on public.tasks (status);
create index tasks_priority_idx on public.tasks (priority);
create index tasks_due_date_idx on public.tasks (due_date);
create index tasks_source_email_thread_id_idx on public.tasks (source_email_thread_id);

create table public.task_comments (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references public.tasks (id) on delete cascade,
  author_id uuid references public.profiles (id) on delete set null,
  body text not null,
  created_at timestamptz not null default now()
);

create index task_comments_task_id_idx on public.task_comments (task_id);

create table public.task_attachments (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references public.tasks (id) on delete cascade,
  file_id uuid not null references public.files (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (task_id, file_id)
);

create index task_attachments_task_id_idx on public.task_attachments (task_id);
create index task_attachments_file_id_idx on public.task_attachments (file_id);

-- ============================================================================
-- activities (immutable-style feed)
-- ============================================================================

create table public.activities (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  actor_id uuid references public.profiles (id) on delete set null,
  event_type text not null,
  entity_type text,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index activities_client_id_idx on public.activities (client_id);
create index activities_created_at_idx on public.activities (created_at desc);
create index activities_entity_idx on public.activities (entity_type, entity_id);

-- ============================================================================
-- notifications
-- ============================================================================

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  client_id uuid references public.clients (id) on delete cascade,
  type text not null,
  title text not null,
  body text,
  entity_type text,
  entity_id uuid,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create index notifications_user_id_idx on public.notifications (user_id);
create index notifications_user_unread_idx on public.notifications (user_id) where not is_read;

-- ============================================================================
-- updated_at maintenance
-- ============================================================================

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_updated_at before update on public.profiles for each row execute function public.set_updated_at();
create trigger set_updated_at before update on public.clients for each row execute function public.set_updated_at();
create trigger set_updated_at before update on public.contacts for each row execute function public.set_updated_at();
create trigger set_updated_at before update on public.projects for each row execute function public.set_updated_at();
create trigger set_updated_at before update on public.tasks for each row execute function public.set_updated_at();
create trigger set_updated_at before update on public.files for each row execute function public.set_updated_at();
create trigger set_updated_at before update on public.email_threads for each row execute function public.set_updated_at();

-- ============================================================================
-- auth.users -> profiles provisioning
-- ============================================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'),
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- New accounts default to the least-privileged role. Promote the first
-- account to 'owner' manually, e.g.:
--   update public.profiles set role = 'owner' where email = 'you@elevenchase.com';

create or replace function public.prevent_role_self_escalation()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.role is distinct from old.role and not public.is_admin() then
    raise exception 'Only owner/admin users can change roles.';
  end if;
  return new;
end;
$$;

-- ============================================================================
-- permission helpers
-- ============================================================================

create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.profiles where id = auth.uid());
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles where id = auth.uid() and role in ('owner', 'admin')
  );
$$;

-- profiles_guard_role depends on is_admin(), so it's created after the helper.
create trigger profiles_guard_role
before update on public.profiles
for each row execute function public.prevent_role_self_escalation();

-- ============================================================================
-- Row Level Security
--
-- This is an internal-only tool: every authenticated row in `profiles` is an
-- ElevenChase staff member, and staff can read all client data (there is no
-- client-facing portal in this schema). Administrative configuration
-- (client core fields, services, account team, email aliases, resource
-- links) is restricted to owner/admin per the spec's CLIENT SETTINGS rules.
-- Everything else validates server-side too — RLS is not the only gate.
-- ============================================================================

alter table public.profiles enable row level security;
alter table public.clients enable row level security;
alter table public.contacts enable row level security;
alter table public.client_email_aliases enable row level security;
alter table public.client_services enable row level security;
alter table public.client_team_members enable row level security;
alter table public.projects enable row level security;
alter table public.project_members enable row level security;
alter table public.client_resource_links enable row level security;
alter table public.files enable row level security;
alter table public.email_threads enable row level security;
alter table public.email_messages enable row level security;
alter table public.thread_participants enable row level security;
alter table public.tasks enable row level security;
alter table public.task_comments enable row level security;
alter table public.task_attachments enable row level security;
alter table public.activities enable row level security;
alter table public.notifications enable row level security;

-- profiles: staff can read the whole directory; a user edits their own row
-- (role changes on that row are blocked by the trigger above unless admin).
create policy profiles_select on public.profiles for select using (public.is_staff());
create policy profiles_update_self_or_admin on public.profiles for update
  using (id = auth.uid() or public.is_admin())
  with check (id = auth.uid() or public.is_admin());

-- clients: staff read everything; core-field writes are admin-gated
-- (CLIENT SETTINGS: update client information / archive client).
create policy clients_select on public.clients for select using (public.is_staff());
create policy clients_write on public.clients for insert with check (public.is_admin());
create policy clients_update on public.clients for update using (public.is_admin()) with check (public.is_admin());
create policy clients_delete on public.clients for delete using (public.is_admin());

-- contacts: staff read; add/remove is admin-gated (CLIENT SETTINGS: Contacts).
create policy contacts_select on public.contacts for select using (public.is_staff());
create policy contacts_insert on public.contacts for insert with check (public.is_admin());
create policy contacts_update on public.contacts for update using (public.is_admin()) with check (public.is_admin());
create policy contacts_delete on public.contacts for delete using (public.is_admin());

-- client_email_aliases: admin-gated (CLIENT SETTINGS: Email Linking).
create policy client_email_aliases_select on public.client_email_aliases for select using (public.is_staff());
create policy client_email_aliases_insert on public.client_email_aliases for insert with check (public.is_admin());
create policy client_email_aliases_delete on public.client_email_aliases for delete using (public.is_admin());

-- client_services: admin-gated (CLIENT SETTINGS: Services).
create policy client_services_select on public.client_services for select using (public.is_staff());
create policy client_services_insert on public.client_services for insert with check (public.is_admin());
create policy client_services_update on public.client_services for update using (public.is_admin()) with check (public.is_admin());
create policy client_services_delete on public.client_services for delete using (public.is_admin());

-- client_team_members: admin-gated (CLIENT SETTINGS: Team).
create policy client_team_members_select on public.client_team_members for select using (public.is_staff());
create policy client_team_members_insert on public.client_team_members for insert with check (public.is_admin());
create policy client_team_members_update on public.client_team_members for update using (public.is_admin()) with check (public.is_admin());
create policy client_team_members_delete on public.client_team_members for delete using (public.is_admin());

-- client_resource_links: admin-gated (CLIENT SETTINGS: Resource Links).
create policy client_resource_links_select on public.client_resource_links for select using (public.is_staff());
create policy client_resource_links_insert on public.client_resource_links for insert with check (public.is_admin());
create policy client_resource_links_update on public.client_resource_links for update using (public.is_admin()) with check (public.is_admin());
create policy client_resource_links_delete on public.client_resource_links for delete using (public.is_admin());

-- projects: day-to-day operational writes are open to any staff member;
-- deleting a project is destructive enough to reserve for admins.
create policy projects_select on public.projects for select using (public.is_staff());
create policy projects_insert on public.projects for insert with check (public.is_staff());
create policy projects_update on public.projects for update using (public.is_staff()) with check (public.is_staff());
create policy projects_delete on public.projects for delete using (public.is_admin());

create policy project_members_select on public.project_members for select using (public.is_staff());
create policy project_members_insert on public.project_members for insert with check (public.is_staff());
create policy project_members_delete on public.project_members for delete using (public.is_staff());

-- files: any staff member can upload/recategorize; delete is admin or the
-- original uploader (spec: "delete based on permissions").
create policy files_select on public.files for select using (public.is_staff());
create policy files_insert on public.files for insert with check (public.is_staff());
create policy files_update on public.files for update using (public.is_staff()) with check (public.is_staff());
create policy files_delete on public.files for delete using (public.is_admin() or uploaded_by = auth.uid());

-- email_threads / email_messages: no delete policy — synced communication
-- is treated as an immutable record; "archive" is a status flag, not deletion.
create policy email_threads_select on public.email_threads for select using (public.is_staff());
create policy email_threads_insert on public.email_threads for insert with check (public.is_staff());
create policy email_threads_update on public.email_threads for update using (public.is_staff()) with check (public.is_staff());

create policy email_messages_select on public.email_messages for select using (public.is_staff());
create policy email_messages_insert on public.email_messages for insert with check (public.is_staff());

create policy thread_participants_select on public.thread_participants for select using (public.is_staff());
create policy thread_participants_insert on public.thread_participants for insert with check (public.is_staff());
create policy thread_participants_update on public.thread_participants for update using (public.is_staff()) with check (public.is_staff());
create policy thread_participants_delete on public.thread_participants for delete using (public.is_staff());

-- tasks: open operational writes; delete limited to admin or the creator.
create policy tasks_select on public.tasks for select using (public.is_staff());
create policy tasks_insert on public.tasks for insert with check (public.is_staff());
create policy tasks_update on public.tasks for update using (public.is_staff()) with check (public.is_staff());
create policy tasks_delete on public.tasks for delete using (public.is_admin() or created_by = auth.uid());

create policy task_comments_select on public.task_comments for select using (public.is_staff());
create policy task_comments_insert on public.task_comments for insert with check (public.is_staff());
create policy task_comments_update on public.task_comments for update
  using (public.is_admin() or author_id = auth.uid())
  with check (public.is_admin() or author_id = auth.uid());
create policy task_comments_delete on public.task_comments for delete using (public.is_admin() or author_id = auth.uid());

create policy task_attachments_select on public.task_attachments for select using (public.is_staff());
create policy task_attachments_insert on public.task_attachments for insert with check (public.is_staff());
create policy task_attachments_delete on public.task_attachments for delete using (public.is_staff());

-- activities: append-only feed. No update/delete policy is defined on
-- purpose — only a service-role key (which bypasses RLS) can correct it.
create policy activities_select on public.activities for select using (public.is_staff());
create policy activities_insert on public.activities for insert with check (public.is_staff());

-- notifications: each user only sees and manages their own.
create policy notifications_select on public.notifications for select using (user_id = auth.uid());
create policy notifications_insert on public.notifications for insert with check (public.is_staff());
create policy notifications_update on public.notifications for update
  using (user_id = auth.uid())
  with check (user_id = auth.uid());
