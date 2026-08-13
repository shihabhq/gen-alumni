import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { serializeStudent, studentInclude } from "@/lib/students";

function parseId(raw: string) {
  if (!/^\d+$/.test(raw)) return null;
  try {
    return BigInt(raw);
  } catch {
    return null;
  }
}

// GET /api/v1/profile/:id/
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: rawId } = await params;
  const id = parseId(rawId);
  if (id === null) {
    return NextResponse.json({ message: "Profile not found" }, { status: 404 });
  }

  const student = await prisma.student_studentprofile.findUnique({
    where: { id },
    include: studentInclude,
  });

  if (!student) {
    return NextResponse.json({ message: "Profile not found" }, { status: 404 });
  }

  return NextResponse.json(serializeStudent(student));
}

// Fields the old frontend's edit-profile form is allowed to change.
const EDITABLE_FIELDS = [
  "first_name",
  "last_name",
  "bio",
  "profile_pic",
  "current_job_position",
  "current_company",
  "phone",
  "country",
  "linkedin",
  "facebook",
  "instagram",
] as const;

// PATCH /api/v1/profile/:id/
//
// TODO(auth): this endpoint currently has no auth check — anyone who knows a
// profile's id can edit it. The old Django backend gated this behind a JWT
// tied to the logged-in student, but this restored database has no
// credentials for this app's own student accounts (see the login/register
// gap noted separately). Wire in an auth check before this goes live.
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: rawId } = await params;
  const id = parseId(rawId);
  if (id === null) {
    return NextResponse.json({ message: "Profile not found" }, { status: 404 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
  }

  const data: Prisma.student_studentprofileUpdateInput = {};
  for (const field of EDITABLE_FIELDS) {
    if (field in body) {
      (data as Record<string, unknown>)[field] = body[field];
    }
  }

  try {
    const student = await prisma.student_studentprofile.update({
      where: { id },
      data,
      include: studentInclude,
    });
    return NextResponse.json(serializeStudent(student));
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
      return NextResponse.json({ message: "Profile not found" }, { status: 404 });
    }
    throw err;
  }
}
