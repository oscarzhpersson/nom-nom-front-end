import React from "react";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between p-4 bg-gray-200">
      <div className="flex items-center space-x-2">
        <div className="font-bold text-xl">MyApp</div>
      </div>
      <ul className="flex items-center space-x-4">
        <li>
          <a href="#home" className="hover:underline">
            Home
          </a>
        </li>
        <li>
          <a href="#about" className="hover:underline">
            About
          </a>
        </li>
        <li>
          <a href="#contact" className="hover:underline">
            Contact
          </a>
        </li>
      </ul>
      <div>
        <button 
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Sign In
        </button>
      </div>
    </nav>
  );
}
