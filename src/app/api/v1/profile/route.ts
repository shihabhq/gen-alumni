import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { serializeStudent, studentInclude } from "@/lib/students";

// GET /api/v1/profile/?batch=&country=&company=&position=
// Mirrors the old Django endpoint's shape: { results: [...] }
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const batch = params.get("batch");
  const country = params.get("country");
  const company = params.get("company");
  const position = params.get("position");

  const where: Prisma.student_studentprofileWhereInput = {};

  if (batch) where.student_batch = { title: batch };
  if (country) where.country = { equals: country, mode: "insensitive" };
  if (company) where.current_company = { contains: company, mode: "insensitive" };
  if (position) where.current_job_position = { contains: position, mode: "insensitive" };

  const students = await prisma.student_studentprofile.findMany({
    where,
    include: studentInclude,
    orderBy: [{ first_name: "asc" }, { last_name: "asc" }],
  });

  return NextResponse.json({ results: students.map(serializeStudent) });
}
