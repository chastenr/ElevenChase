import { LocalizedLink as Link } from "@/components/ui/LocalizedLink";
import type { ArticleBlock } from "@/data/insights";

type ArticleBodyProps = {
  blocks: ArticleBlock[];
};

export function ArticleBody({ blocks }: ArticleBodyProps) {
  return (
    <div className="max-w-2xl">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={i} className="mt-6 text-lg leading-relaxed text-ink-soft first:mt-0">
                {block.text}
              </p>
            );
          case "heading":
            return (
              <h2
                key={i}
                className="mt-12 text-2xl font-medium tracking-tight text-ink first:mt-0"
              >
                {block.text}
              </h2>
            );
          case "list":
            return (
              <ul key={i} className="mt-6 list-disc space-y-2 pl-5 text-lg text-ink-soft">
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );
          case "code":
            return (
              <pre
                key={i}
                className="mt-6 overflow-x-auto rounded-xl border border-line bg-ink px-5 py-4 text-sm text-ivory"
              >
                <code>{block.code}</code>
              </pre>
            );
          case "links":
            return (
              <div key={i} className="mt-8 border-t border-line pt-6">
                <p className="font-mono text-xs tracking-[0.1em] text-muted uppercase">
                  {block.label}
                </p>
                <ul className="mt-3 flex flex-col gap-2">
                  {block.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-lg text-ink underline underline-offset-4 transition-colors duration-200 hover:text-accent"
                      >
                        {item.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
