export default function About() {
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
            About BBA General
          </h1>
          <p className="text-lg text-white/90">
            Excellence in Business Education
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Overview Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6" style={{ color: "#006747" }}>
            Department Overview
          </h2>
          <div className="space-y-4 text-charcoal leading-relaxed">
            <p>
              The Department of Business Administration - General is one of the
              oldest departments of Bangladesh University of Professionals,
              inaugurated in 2010. It aims to be a leading producer of new ideas
              and knowledge in all areas of business, inspiring new thinking for
              the new economy.
            </p>
            <p>
              The vision advocates to develop skilled human resource with
              specialized education and training particularly in business
              techniques and strategies. The mission states to develop the
              intellectual and behavioral competencies of the graduates so that
              they can adjust in ever-changing corporate world in addition to
              personal development with a view to advancing in their career.
            </p>
            <p>
              With regards to the vision and mission, the department has been
              converging the education system with real-time industry
              perspectives, ensuring our students are prepared for modern
              business challenges.
            </p>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8" style={{ color: "#006747" }}>
            Key Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Industry-Focused Curriculum",
                description:
                  "Our curriculum is designed to align with current market demands and industry best practices.",
              },
              {
                title: "Expert Faculty",
                description:
                  "Learn from experienced professionals with real-world business experience.",
              },
              {
                title: "Global Perspective",
                description:
                  "International exposure through collaborations and exchange programs.",
              },
              {
                title: "16 Successful Batches",
                description:
                  "Producing quality graduates since 2010 with diverse career paths.",
              },
              {
                title: "Supportive Community",
                description:
                  "Strong alumni network providing mentorship and career opportunities.",
              },
              {
                title: "Career Development",
                description:
                  "Dedicated support for internships, placements, and professional growth.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-lg border-2 bg-white"
                style={{ borderColor: "#a3e635" }}
              >
                <h3
                  className="font-bold text-lg mb-3"
                  style={{ color: "#006747" }}
                >
                  {feature.title}
                </h3>
                <p className="text-sm text-charcoal">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div
            className="p-8 rounded-lg"
            style={{ backgroundColor: "#006747" }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">Vision</h3>
            <p className="text-white/90 leading-relaxed">
              To be a leading producer of new ideas and knowledge in all areas
              of business, inspiring new thinking for the new economy and
              preparing our graduates to be innovative leaders.
            </p>
          </div>
          <div
            className="p-8 rounded-lg"
            style={{ backgroundColor: "#007f8c" }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">Mission</h3>
            <p className="text-white/90 leading-relaxed">
              To develop the intellectual and behavioral competencies of our
              graduates so they can adjust to an ever-changing corporate world
              while advancing their personal and professional growth.
            </p>
          </div>
        </div>

        {/* Placeholder for additional content */}
        <div
          className="p-8 rounded-lg text-center"
          style={{
            backgroundColor: "#f8fafc",
            borderLeft: "4px solid #a3e635",
          }}
        >
          <p className="text-charcoal font-medium">
            📸 More content including department images and facilities will be
            added soon
          </p>
        </div>
      </div>
    </div>
  );
}
