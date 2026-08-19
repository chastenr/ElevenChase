/**
 * Hand-written to match supabase/migrations/20260817193029_client_workspace_schema.sql.
 * Once a real Supabase project is linked, replace this file with the output of:
 *   supabase gen types typescript --linked > src/lib/supabase/types.ts
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type UserRole = "owner" | "admin" | "member";
export type ClientStatus =
  | "lead"
  | "onboarding"
  | "active"
  | "maintenance"
  | "paused"
  | "completed"
  | "inactive";
export type ProjectStatus =
  | "planning"
  | "in_progress"
  | "waiting_on_client"
  | "review"
  | "completed"
  | "archived";
export type TaskStatus = "open" | "in_progress" | "waiting" | "review" | "done";
export type TaskPriority = "low" | "medium" | "high" | "urgent";
export type FileCategory =
  | "contracts"
  | "proposals"
  | "design"
  | "development"
  | "client_uploads"
  | "deliverables"
  | "other";
export type EmailDirection = "inbound" | "outbound";

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          role: UserRole;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: UserRole;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };
      clients: {
        Row: {
          id: string;
          name: string;
          logo_url: string | null;
          status: ClientStatus;
          website: string | null;
          primary_email: string | null;
          phone: string | null;
          country: string | null;
          timezone: string | null;
          notes: string | null;
          joined_date: string | null;
          archived_at: string | null;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          logo_url?: string | null;
          status?: ClientStatus;
          website?: string | null;
          primary_email?: string | null;
          phone?: string | null;
          country?: string | null;
          timezone?: string | null;
          notes?: string | null;
          joined_date?: string | null;
          archived_at?: string | null;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["clients"]["Insert"]>;
      };
      contacts: {
        Row: {
          id: string;
          client_id: string;
          full_name: string;
          email: string | null;
          phone: string | null;
          title: string | null;
          is_primary: boolean;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          client_id: string;
          full_name: string;
          email?: string | null;
          phone?: string | null;
          title?: string | null;
          is_primary?: boolean;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["contacts"]["Insert"]>;
      };
      client_email_aliases: {
        Row: {
          id: string;
          client_id: string;
          email: string;
          created_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          client_id: string;
          email: string;
          created_by?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["client_email_aliases"]["Insert"]>;
      };
      client_services: {
        Row: {
          id: string;
          client_id: string;
          type: string;
          label: string | null;
          is_active: boolean;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          client_id: string;
          type: string;
          label?: string | null;
          is_active?: boolean;
          notes?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["client_services"]["Insert"]>;
      };
      client_team_members: {
        Row: {
          id: string;
          client_id: string;
          user_id: string;
          responsibilities: string[];
          created_at: string;
        };
        Insert: {
          id?: string;
          client_id: string;
          user_id: string;
          responsibilities?: string[];
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["client_team_members"]["Insert"]>;
      };
      projects: {
        Row: {
          id: string;
          client_id: string;
          service_id: string | null;
          name: string;
          description: string | null;
          status: ProjectStatus;
          blocked_reason: string | null;
          owner_id: string | null;
          start_date: string | null;
          target_date: string | null;
          completed_at: string | null;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          client_id: string;
          service_id?: string | null;
          name: string;
          description?: string | null;
          status?: ProjectStatus;
          blocked_reason?: string | null;
          owner_id?: string | null;
          start_date?: string | null;
          target_date?: string | null;
          completed_at?: string | null;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["projects"]["Insert"]>;
      };
      project_members: {
        Row: {
          id: string;
          project_id: string;
          user_id: string;
          role: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          user_id: string;
          role?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["project_members"]["Insert"]>;
      };
      client_resource_links: {
        Row: {
          id: string;
          client_id: string;
          project_id: string | null;
          type: string;
          label: string;
          url: string;
          created_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          client_id: string;
          project_id?: string | null;
          type: string;
          label: string;
          url: string;
          created_by?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["client_resource_links"]["Insert"]>;
      };
      files: {
        Row: {
          id: string;
          client_id: string;
          project_id: string | null;
          category: FileCategory;
          file_name: string;
          storage_path: string;
          mime_type: string | null;
          size_bytes: number | null;
          uploaded_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          client_id: string;
          project_id?: string | null;
          category?: FileCategory;
          file_name: string;
          storage_path: string;
          mime_type?: string | null;
          size_bytes?: number | null;
          uploaded_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["files"]["Insert"]>;
      };
      email_threads: {
        Row: {
          id: string;
          client_id: string | null;
          project_id: string | null;
          provider_thread_id: string | null;
          subject: string | null;
          snippet: string | null;
          last_message_at: string | null;
          is_unread: boolean;
          action_needed: boolean;
          is_archived: boolean;
          assigned_to: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          client_id?: string | null;
          project_id?: string | null;
          provider_thread_id?: string | null;
          subject?: string | null;
          snippet?: string | null;
          last_message_at?: string | null;
          is_unread?: boolean;
          action_needed?: boolean;
          is_archived?: boolean;
          assigned_to?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["email_threads"]["Insert"]>;
      };
      email_messages: {
        Row: {
          id: string;
          thread_id: string;
          provider_message_id: string | null;
          direction: EmailDirection;
          from_email: string;
          from_name: string | null;
          to_emails: string[];
          cc_emails: string[];
          subject: string | null;
          body_text: string | null;
          body_html: string | null;
          sent_at: string;
          created_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          thread_id: string;
          provider_message_id?: string | null;
          direction: EmailDirection;
          from_email: string;
          from_name?: string | null;
          to_emails?: string[];
          cc_emails?: string[];
          subject?: string | null;
          body_text?: string | null;
          body_html?: string | null;
          sent_at: string;
          created_by?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["email_messages"]["Insert"]>;
      };
      thread_participants: {
        Row: {
          id: string;
          thread_id: string;
          email: string;
          name: string | null;
          contact_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          thread_id: string;
          email: string;
          name?: string | null;
          contact_id?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["thread_participants"]["Insert"]>;
      };
      tasks: {
        Row: {
          id: string;
          client_id: string;
          project_id: string | null;
          title: string;
          description: string | null;
          status: TaskStatus;
          priority: TaskPriority;
          assignee_id: string | null;
          due_date: string | null;
          completed_at: string | null;
          source_email_thread_id: string | null;
          source_email_message_id: string | null;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          client_id: string;
          project_id?: string | null;
          title: string;
          description?: string | null;
          status?: TaskStatus;
          priority?: TaskPriority;
          assignee_id?: string | null;
          due_date?: string | null;
          completed_at?: string | null;
          source_email_thread_id?: string | null;
          source_email_message_id?: string | null;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["tasks"]["Insert"]>;
      };
      task_comments: {
        Row: {
          id: string;
          task_id: string;
          author_id: string | null;
          body: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          task_id: string;
          author_id?: string | null;
          body: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["task_comments"]["Insert"]>;
      };
      task_attachments: {
        Row: {
          id: string;
          task_id: string;
          file_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          task_id: string;
          file_id: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["task_attachments"]["Insert"]>;
      };
      activities: {
        Row: {
          id: string;
          client_id: string;
          actor_id: string | null;
          event_type: string;
          entity_type: string | null;
          entity_id: string | null;
          metadata: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          client_id: string;
          actor_id?: string | null;
          event_type: string;
          entity_type?: string | null;
          entity_id?: string | null;
          metadata?: Json;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["activities"]["Insert"]>;
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          client_id: string | null;
          type: string;
          title: string;
          body: string | null;
          entity_type: string | null;
          entity_id: string | null;
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          client_id?: string | null;
          type: string;
          title: string;
          body?: string | null;
          entity_type?: string | null;
          entity_id?: string | null;
          is_read?: boolean;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["notifications"]["Insert"]>;
      };
    };
  };
};

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type TablesInsert<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];
export type TablesUpdate<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];
