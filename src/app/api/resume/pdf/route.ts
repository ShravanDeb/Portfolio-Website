import { NextRequest } from "next/server";

const RELEASE_URL =
  "https://github.com/ShravanDeb/Portfolio-Website/releases/download/resume-pdf/Resume.pdf";

export async function GET(_request: NextRequest) {
  try {
    const response = await fetch(RELEASE_URL);

    if (!response.ok) {
      console.error("Failed to fetch PDF from release:", response.status);
      return Response.json(
        { error: "Failed to fetch PDF" },
        { status: 502 }
      );
    }

    const pdf = await response.arrayBuffer();

    return new Response(pdf, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Resume.pdf"',
        "Content-Length": pdf.byteLength.toString(),
      },
    });
  } catch (error) {
    console.error("PDF proxy failed:", error);
    return Response.json({ error: "Failed to fetch PDF" }, { status: 502 });
  }
}
