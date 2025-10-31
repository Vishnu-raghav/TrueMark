import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function PublicLayout() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Header - Pass user for auth state */}
      <Header user={user} />

      {/* Main Content */}
      <main className="flex-1 w-full px-6">
        <div className="max-w-7xl mx-auto w-full">
          <Outlet context={{ user }} /> 
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}