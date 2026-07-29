import fs from "fs";
import path from "path";

export async function GET() {
  const pdfPath = path.join(process.cwd(), "public", "Resume.pdf");
  const pdfBuffer = fs.readFileSync(pdfPath);

  return new Response(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Resume.pdf"',
      "Content-Length": pdfBuffer.length.toString(),
    },
  });
}
