import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

// The old Django backend's serializer put the batch's title directly under
// `batch` (e.g. "BBA 5") and always reported a single program. Every table in
// this restored DB belongs to the BBA General department, so `program` has
// no backing column — it's a constant kept only so the existing frontend
// (which reads `profile.program`) doesn't need to change.
const PROGRAM = "BBA";

type StudentWithBatch = Prisma.student_studentprofileGetPayload<{
  include: { student_batch: true };
}>;

// Shape returned to the frontend for both list and detail views. `company`/
// `position` are aliases of `current_company`/`current_job_position` — the
// old frontend code reads both names in different places, so both are sent.
export function serializeStudent(student: StudentWithBatch) {
  return {
    id: Number(student.id),
    first_name: student.first_name,
    last_name: student.last_name,
    uni_id: student.uni_id,
    batch: student.student_batch.title,
    program: PROGRAM,
    bio: student.bio,
    profile_pic: student.profile_pic,
    current_company: student.current_company,
    current_job_position: student.current_job_position,
    company: student.current_company,
    position: student.current_job_position,
    email: student.email,
    phone: student.phone,
    country: student.country,
    linkedin: student.linkedin,
    facebook: student.facebook,
    instagram: student.instagram,
    is_cr: student.is_cr,
    is_verified: student.is_verified,
  };
}

export const studentInclude = { student_batch: true } satisfies Prisma.student_studentprofileInclude;

export async function findBatchIdByTitle(title: string) {
  const batch = await prisma.student_batch.findFirst({ where: { title } });
  return batch?.id;
}
