export interface HumanizeOptions {
  titleCase?: boolean;
}

export function humanizeIdentifier(
  input: string,
  opts: HumanizeOptions = {},
): string {
  const { titleCase = true } = opts;

  if (!input) return "";

  // Normalize common separators into spaces first
  let s = input.replace(/[_-]+/g, " ");

  // Insert spaces:
  // - "fooBar" -> "foo Bar"
  s = s.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
  // - "HTTPServer" -> "HTTP Server"
  s = s.replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2");

  // Collapse extra whitespace
  s = s.replace(/\s+/g, " ").trim();

  if (!titleCase) return s;

  return s
    .split(" ")
    .map((word) => {
      // Keep acronyms / all-caps words as-is (e.g., HTTP, ID)
      if (/^[A-Z0-9]+$/.test(word)) return word;
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}
