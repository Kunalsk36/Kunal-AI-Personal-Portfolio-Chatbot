export function buildContextBlock(sections) {
  return sections
    .filter((section) => section.data !== undefined && section.data !== null)
    .map((section) => {
      const content =
        typeof section.data === "string" ? section.data : JSON.stringify(section.data, null, 2);

      return `## ${section.title}\n${content}`;
    })
    .join("\n\n");
}

