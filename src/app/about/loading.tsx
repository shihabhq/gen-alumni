export default function AboutLoading() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section Skeleton */}
      <div
        className="py-12 px-4 text-center"
        style={{
          background: "linear-gradient(135deg, #006747 0%, #007f8c 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="h-10 bg-white/20 rounded-lg w-1/2 mx-auto animate-pulse"></div>
          <div className="h-6 bg-white/20 rounded-lg w-2/3 mx-auto animate-pulse"></div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-4">
            <div className="h-8 bg-gray-300 rounded-lg w-1/3 animate-pulse"></div>
            <div className="space-y-2">
              {[...Array(4)].map((_, j) => (
                <div
                  key={j}
                  className="h-4 bg-gray-300 rounded-lg animate-pulse"
                  style={{
                    width: j === 3 ? "70%" : "100%",
                  }}
                ></div>
              ))}
            </div>
          </div>
        ))}

        {/* Features Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg p-6 shadow-md animate-pulse"
            >
              <div className="h-8 bg-gray-300 rounded-lg w-1/2 mb-3"></div>
              <div className="space-y-2">
                {[...Array(3)].map((_, j) => (
                  <div
                    key={j}
                    className="h-4 bg-gray-300 rounded-lg"
                    style={{
                      width: j === 2 ? "70%" : "100%",
                    }}
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
