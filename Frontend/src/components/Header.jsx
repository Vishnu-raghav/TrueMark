import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-blue-600">TrueMark</div>
      <nav className="space-x-4">
        <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
        <Link to="/about" className="text-gray-700 hover:text-blue-600">About</Link>
        <Link to="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
        <Link to="/login" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Sign In</Link>
      </nav>
    </header>
  );
}
