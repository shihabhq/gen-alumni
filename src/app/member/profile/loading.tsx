export default function ProfileLoading() {
  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header Skeleton */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6 animate-pulse">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
              <div className="space-y-3 flex-1">
                <div className="h-6 bg-gray-300 rounded-lg w-2/3"></div>
                <div className="h-4 bg-gray-300 rounded-lg w-1/2"></div>
              </div>
            </div>
            <div className="h-10 bg-gray-300 rounded-lg w-24"></div>
          </div>
        </div>

        {/* Info Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-md p-6 animate-pulse space-y-3"
            >
              <div className="h-4 bg-gray-300 rounded-lg w-1/3"></div>
              <div className="h-6 bg-gray-300 rounded-lg w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
