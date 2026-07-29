import path from "path";
import React from "react";
import { renderToBuffer, Font } from "@react-pdf/renderer";
import ResumePDF from "@/lib/pdf/ResumePDF";

const fontDir = path.join(process.cwd(), "public", "fonts");

Font.register({
  family: "Latin Modern Roman",
  fonts: [
    {
      src: path.join(fontDir, "lmroman10-regular.otf"),
      fontWeight: 400,
      fontStyle: "normal",
    },
    {
      src: path.join(fontDir, "lmroman10-bold.otf"),
      fontWeight: 700,
      fontStyle: "normal",
    },
    {
      src: path.join(fontDir, "lmroman10-italic.otf"),
      fontWeight: 400,
      fontStyle: "italic",
    },
    {
      src: path.join(fontDir, "lmroman10-bolditalic.otf"),
      fontWeight: 700,
      fontStyle: "italic",
    },
  ],
});

export async function GET() {
  try {
    const buffer = await renderToBuffer(React.createElement(ResumePDF));
    return new Response(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Resume.pdf"',
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return Response.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
