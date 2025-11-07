"use client";

interface Student {
  id: number;
  first_name: string;
  last_name: string;
  profile_pic?: string;
  current_company?: string;
  current_job_position?: string;
  batch: string;
}

interface StudentCardProps {
  student: Student;
}

export default function StudentCard({ student }: StudentCardProps) {
  return (
    <div className="group relative flex flex-col items-center text-center rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1 p-6">
      {/* Profile Image */}
      <div className="relative w-28 h-28 rounded-full overflow-hidden shadow-md ring-4 ring-white group-hover:ring-green-500 transition-all duration-300 -mt-12 bg-gray-100">
        {student.profile_pic ? (
          <img
            src={student.profile_pic}
            alt={`${student.first_name} ${student.last_name}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-3xl font-semibold text-white"
            style={{ backgroundColor: "#009879" }}
          >
            {student.first_name[0]}
            {student.last_name[0]}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="mt-6 space-y-2">
        <h3 className="text-lg font-semibold text-gray-800">
          {student.first_name} {student.last_name}
        </h3>
        <p className="text-sm font-medium text-green-600">
          Batch {student.batch}
        </p>
      </div>

      {/* Job Info */}
      {student.current_company && (
        <div className="mt-4 text-sm border-t pt-3 w-full border-gray-100">
          <p className="font-semibold text-gray-700">
            {student.current_job_position}
          </p>
          <p className="text-gray-500">{student.current_company}</p>
        </div>
      )}

      {/* Action */}
      <button className="mt-5 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full text-white bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 transition-all duration-200">
        View Profile
        <span className="text-lg translate-x-0 group-hover:translate-x-1 transition-transform duration-200">
          →
        </span>
      </button>

      {/* Background Accent (modern touch) */}
      {/* <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-50 to-teal-50 opacity-0 group-hover:opacity-100 -z-10 transition-opacity duration-300"></div> */}
    </div>
  );
}
