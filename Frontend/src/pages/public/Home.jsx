import VerifyCertificate from "../../components/VerifyCertificate";

export default function Home() {
  return (
    <section className="min-h-[80vh] flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
      {/* Left - Verify Certificate */}
      <div className="flex-1 w-full">
        <VerifyCertificate />
      </div>

      {/* Right - Hero Content */}
      <div className="flex-1 text-center lg:text-right">
        <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text leading-tight">
          Verify Certificates Instantly.
        </h1>
        <p className="mt-4 text-gray-600 text-lg max-w-md lg:ml-auto">
          A modern SaaS-based certificate verification system built for 
          organizations to ensure every certificate is 100% genuine and secure.
        </p>
        <div className="mt-6">
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-lg transition-all duration-200">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
