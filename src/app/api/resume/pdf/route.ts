export async function GET() {
  return Response.json(
    { error: "PDF generation is handled client-side. Use the Download PDF button on the resume page." },
    { status: 400 }
  );
}
