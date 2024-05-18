export function generateFileForDownload(
  content: Object,
  { filename, type }: { filename: string; type: "json" | "txt" }
) {
  let blob;

  switch (type) {
    case "json": {
      filename.concat(".json");
      blob = new Blob([JSON.stringify(content)], {
        type: "application/json",
      });
      break;
    }
    default: {
      filename.concat(".txt");
      blob = new Blob([content.toString()], {
        type: "text/plain",
      });
      break;
    }
  }

  const link = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = link;

  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(link);
}
