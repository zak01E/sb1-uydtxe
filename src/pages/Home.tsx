import React from 'react';
import { Search, MapPin, Euro, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative h-[600px] bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Trouvez votre bien immobilier idéal
          </h1>
          <p className="text-xl text-white mb-8">
            Des milliers d'annonces de maisons et terrains partout en France
          </p>

          {/* Search Bar */}
          <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="flex items-center border rounded-md p-2">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Où cherchez-vous ?"
                    className="ml-2 w-full focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center border rounded-md p-2">
                  <Euro className="h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Budget max"
                    className="ml-2 w-full focus:outline-none"
                  />
                </div>
              </div>
              <button className="bg-blue-600 text-white px-8 py-2 rounded-md hover:bg-blue-700 flex items-center justify-center">
                <Search className="h-5 w-5 mr-2" />
                Rechercher
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Biens à la une</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80"
                  alt="Property"
                  className="h-48 w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Villa Moderne</h3>
                  <p className="text-gray-600 mb-4">Paris 16ème</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">850 000 €</span>
                    <Link
                      to="/properties/1"
                      className="text-blue-600 hover:text-blue-800 flex items-center"
                    >
                      Voir plus
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Pourquoi nous choisir ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Recherche simplifiée</h3>
              <p className="text-gray-600">
                Trouvez rapidement le bien qui vous correspond grâce à nos filtres avancés.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Euro className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Prix compétitifs</h3>
              <p className="text-gray-600">
                Des biens immobiliers pour tous les budgets, sans frais cachés.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MapPin className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Couverture nationale</h3>
              <p className="text-gray-600">
                Des annonces dans toute la France pour trouver votre bonheur où que vous soyez.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;