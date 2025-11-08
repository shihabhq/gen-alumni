export default function Achievements() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <div
        className="py-16 px-4 text-center"
        style={{
          background: "linear-gradient(135deg, #006747 0%, #007f8c 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Achievements
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div
          className="p-12 rounded-lg"
          style={{
            backgroundColor: "#f8fafc",
            borderLeft: "4px solid #a3e635",
          }}
        >
          <p className="text-3xl font-bold mb-4" style={{ color: "#006747" }}>
            Coming Soon
          </p>
          <p className="text-lg text-charcoal/70">
            We are working to showcase the amazing achievements and milestones
            of our BBA General Department. Check back soon for updates!
          </p>
        </div>
      </div>
    </div>
  );
}
