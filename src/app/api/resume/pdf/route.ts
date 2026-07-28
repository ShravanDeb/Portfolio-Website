import { NextRequest } from "next/server";
import { generateResumePDF } from "@/lib/pdf/generate-resume-pdf";

export async function GET(request: NextRequest) {
  try {
    const origin = request.nextUrl.origin;
    const pdf = await generateResumePDF(origin);

    return new Response(pdf as unknown as BodyInit, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Resume.pdf"',
        "Content-Length": pdf.length.toString(),
      },
    });
  } catch (error) {
    console.error("PDF generation failed:", error);
    return Response.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}
