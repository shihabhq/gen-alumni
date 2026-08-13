import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { serializeStudent, studentInclude } from "@/lib/students";

// GET /api/v1/search?q=
// Free-text search across name, university id, email, company and batch title.
export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim();

  if (!q) {
    return NextResponse.json({ results: [] });
  }

  const students = await prisma.student_studentprofile.findMany({
    where: {
      OR: [
        { first_name: { contains: q, mode: "insensitive" } },
        { last_name: { contains: q, mode: "insensitive" } },
        { uni_id: { contains: q, mode: "insensitive" } },
        { email: { contains: q, mode: "insensitive" } },
        { current_company: { contains: q, mode: "insensitive" } },
        { student_batch: { title: { contains: q, mode: "insensitive" } } },
      ],
    },
    include: studentInclude,
    orderBy: [{ first_name: "asc" }, { last_name: "asc" }],
  });

  return NextResponse.json({ results: students.map(serializeStudent) });
}
