import Header from "../components/Header";

export default function PublicLayout({ children }) {
  return (
    <>
      <Header />
      <main className="pt-[140px] max-w-6xl mx-auto px-6 space-y-12">
        {children}
      </main>
    </>
  );
}
