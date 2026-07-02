import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarkdownContentProps {
  content: string;
  className?: string;
}

function isTableSeparator(line: string) {
  return /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line);
}

function parseTableRow(line: string) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function renderInline(text: string, keyPrefix: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g).filter(Boolean);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={`${keyPrefix}-strong-${index}`}>{part.slice(2, -2)}</strong>;
    }
    return <span key={`${keyPrefix}-text-${index}`}>{part}</span>;
  });
}

export function MarkdownContent({ content, className }: MarkdownContentProps) {
  const lines = content.split("\n");
  const blocks: ReactNode[] = [];

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      i += 1;
      continue;
    }

    if (trimmed.startsWith("## ")) {
      blocks.push(
        <h3 key={`h3-${i}`} className="mb-2 mt-4 text-base font-semibold first:mt-0">
          {renderInline(trimmed.replace("## ", ""), `h3-${i}`)}
        </h3>
      );
      i += 1;
      continue;
    }

    if (trimmed.startsWith("### ")) {
      blocks.push(
        <h4 key={`h4-${i}`} className="mb-1 mt-3 text-sm font-semibold first:mt-0">
          {renderInline(trimmed.replace("### ", ""), `h4-${i}`)}
        </h4>
      );
      i += 1;
      continue;
    }

    if (line.includes("|") && i + 1 < lines.length && isTableSeparator(lines[i + 1])) {
      const headers = parseTableRow(lines[i]);
      let rowIndex = i + 2;
      const rows: string[][] = [];

      while (rowIndex < lines.length) {
        const rowLine = lines[rowIndex];
        if (!rowLine.trim() || !rowLine.includes("|")) {
          break;
        }
        rows.push(parseTableRow(rowLine));
        rowIndex += 1;
      }

      blocks.push(
        <div key={`table-${i}`} className="my-3 overflow-x-auto rounded-card border border-border">
          <table className="min-w-full border-collapse text-sm">
            <thead className="bg-canvas/60">
              <tr>
                {headers.map((header, cellIndex) => (
                  <th
                    key={`th-${i}-${cellIndex}`}
                    className="border-b border-border px-3 py-2 text-left font-semibold"
                  >
                    {renderInline(header, `th-${i}-${cellIndex}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rIndex) => (
                <tr key={`tr-${i}-${rIndex}`} className="align-top">
                  {headers.map((_, cIndex) => (
                    <td key={`td-${i}-${rIndex}-${cIndex}`} className="border-b border-border px-3 py-2">
                      {renderInline(row[cIndex] ?? "", `td-${i}-${rIndex}-${cIndex}`)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

      i = rowIndex;
      continue;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      const items: string[] = [];
      let listIndex = i;
      while (listIndex < lines.length && /^\d+\.\s+/.test(lines[listIndex].trim())) {
        items.push(lines[listIndex].trim().replace(/^\d+\.\s+/, ""));
        listIndex += 1;
      }

      blocks.push(
        <ol key={`ol-${i}`} className="my-2 list-decimal space-y-1 pl-5 text-sm">
          {items.map((item, itemIndex) => (
            <li key={`ol-item-${i}-${itemIndex}`}>{renderInline(item, `ol-${i}-${itemIndex}`)}</li>
          ))}
        </ol>
      );

      i = listIndex;
      continue;
    }

    if (/^-\s+/.test(trimmed)) {
      const items: string[] = [];
      let listIndex = i;
      while (listIndex < lines.length && /^-\s+/.test(lines[listIndex].trim())) {
        items.push(lines[listIndex].trim().replace(/^-\s+/, ""));
        listIndex += 1;
      }

      blocks.push(
        <ul key={`ul-${i}`} className="my-2 list-disc space-y-1 pl-5 text-sm">
          {items.map((item, itemIndex) => (
            <li key={`ul-item-${i}-${itemIndex}`}>{renderInline(item, `ul-${i}-${itemIndex}`)}</li>
          ))}
        </ul>
      );

      i = listIndex;
      continue;
    }

    blocks.push(
      <p key={`p-${i}`} className="mb-1 text-sm leading-relaxed">
        {renderInline(line, `p-${i}`)}
      </p>
    );
    i += 1;
  }

  return <div className={cn("text-text-primary", className)}>{blocks}</div>;
}
