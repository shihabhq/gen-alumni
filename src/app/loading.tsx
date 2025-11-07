export default function Loading() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section Skeleton */}
      <div
        className="py-20 px-4"
        style={{
          background: "linear-gradient(135deg, #006747 0%, #007f8c 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="h-12 bg-white/20 rounded-lg w-3/4 mx-auto animate-pulse"></div>
          <div className="h-6 bg-white/20 rounded-lg w-2/3 mx-auto animate-pulse"></div>

          {/* Search Bar Skeleton */}
          <div className="mt-8 space-y-3">
            <div className="h-12 bg-white/20 rounded-lg animate-pulse"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-10 bg-white/20 rounded-lg animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results Grid Skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="h-8 bg-gray-300 rounded-lg w-40 mb-8 animate-pulse"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse"
            >
              {/* Image Skeleton */}
              <div className="h-48 bg-gray-300"></div>

              {/* Content Skeleton */}
              <div className="p-4 space-y-3">
                <div className="h-6 bg-gray-300 rounded-lg w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded-lg w-1/2"></div>
                <div className="h-4 bg-gray-300 rounded-lg w-full"></div>
                <div className="h-4 bg-gray-300 rounded-lg w-2/3"></div>
                <div className="flex gap-2 mt-4">
                  <div className="h-8 bg-gray-300 rounded-lg flex-1"></div>
                  <div className="h-8 bg-gray-300 rounded-lg flex-1"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
