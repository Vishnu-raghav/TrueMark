import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 w-full px-6">
        <div className="max-w-7xl mx-auto w-full">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
