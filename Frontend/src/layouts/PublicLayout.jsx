import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function PublicLayout() {
  return (
    <>
      <Header />
      <div className="pt-[140px] max-w-7xl mx-auto px-6">
        <Outlet /> 
      </div>
    </>
  );
}
