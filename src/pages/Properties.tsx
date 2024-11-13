import React, { useState } from 'react';
import { Search, SlidersHorizontal, Home, MapPin, Euro, Bath, BedDouble, Maximize } from 'lucide-react';

function Properties() {
  const [filters, setFilters] = useState({
    type: 'all',
    priceMin: '',
    priceMax: '',
    rooms: 'all',
  });

  const properties = [
    {
      id: 1,
      title: 'Villa Contemporaine',
      location: 'Bordeaux',
      price: 750000,
      type: 'Maison',
      rooms: 5,
      bathrooms: 3,
      surface: 180,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 2,
      title: 'Appartement Haussmannien',
      location: 'Paris 8ème',
      price: 1250000,
      type: 'Appartement',
      rooms: 4,
      bathrooms: 2,
      surface: 120,
      image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 3,
      title: 'Terrain Constructible',
      location: 'Lyon',
      price: 320000,
      type: 'Terrain',
      surface: 800,
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search and Filters */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="flex items-center border rounded-md p-3">
                <Search className="h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher par ville, code postal..."
                  className="ml-2 w-full focus:outline-none"
                />
              </div>
            </div>
            <button
              className="flex items-center justify-center px-4 py-2 border rounded-md hover:bg-gray-50"
              onClick={() => {/* Toggle filters */}}
            >
              <SlidersHorizontal className="h-5 w-5 mr-2" />
              Filtres
            </button>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            <select
              className="border rounded-md p-2"
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            >
              <option value="all">Type de bien</option>
              <option value="house">Maison</option>
              <option value="apartment">Appartement</option>
              <option value="land">Terrain</option>
            </select>
            <input
              type="number"
              placeholder="Prix minimum"
              className="border rounded-md p-2"
              value={filters.priceMin}
              onChange={(e) => setFilters({ ...filters, priceMin: e.target.value })}
            />
            <input
              type="number"
              placeholder="Prix maximum"
              className="border rounded-md p-2"
              value={filters.priceMax}
              onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })}
            />
            <select
              className="border rounded-md p-2"
              value={filters.rooms}
              onChange={(e) => setFilters({ ...filters, rooms: e.target.value })}
            >
              <option value="all">Nombre de pièces</option>
              <option value="1">1 pièce</option>
              <option value="2">2 pièces</option>
              <option value="3">3 pièces</option>
              <option value="4">4 pièces et +</option>
            </select>
          </div>
        </div>
      </div>

      {/* Property Listings */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative">
                <img
                  src={property.image}
                  alt={property.title}
                  className="h-48 w-full object-cover"
                />
                <span className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                  {property.type}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  {property.location}
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {property.rooms && (
                    <div className="flex items-center text-gray-600">
                      <BedDouble className="h-4 w-4 mr-1" />
                      {property.rooms} pièces
                    </div>
                  )}
                  {property.bathrooms && (
                    <div className="flex items-center text-gray-600">
                      <Bath className="h-4 w-4 mr-1" />
                      {property.bathrooms} SDB
                    </div>
                  )}
                  <div className="flex items-center text-gray-600">
                    <Maximize className="h-4 w-4 mr-1" />
                    {property.surface} m²
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">
                    {property.price.toLocaleString()} €
                  </span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    Voir détails
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Properties;