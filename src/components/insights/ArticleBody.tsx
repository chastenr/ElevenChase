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
          default:
            return null;
        }
      })}
    </div>
  );
}
