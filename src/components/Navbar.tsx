import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Home, Building2, User } from 'lucide-react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <Building2 className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">ImmoFrance</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link to="/" className="text-gray-600 hover:text-blue-600 flex items-center">
              <Home className="h-5 w-5 mr-1" />
              Accueil
            </Link>
            <Link to="/properties" className="text-gray-600 hover:text-blue-600">
              Annonces
            </Link>
            <Link to="/login" className="text-gray-600 hover:text-blue-600 flex items-center">
              <User className="h-5 w-5 mr-1" />
              Connexion
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              S'inscrire
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-50"
            >
              Accueil
            </Link>
            <Link
              to="/properties"
              className="block px-3 py-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-50"
            >
              Annonces
            </Link>
            <Link
              to="/login"
              className="block px-3 py-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-50"
            >
              Connexion
            </Link>
            <Link
              to="/register"
              className="block px-3 py-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-50"
            >
              S'inscrire
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;