import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Mail, Phone, MapPin } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold">ImmoFrance</span>
            </div>
            <p className="mt-4 text-gray-400">
              Votre partenaire de confiance pour tous vos projets immobiliers en France.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/properties" className="text-gray-400 hover:text-white">
                  Annonces
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-white">
                  Connexion
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-400 hover:text-white">
                  S'inscrire
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Catégories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/properties?type=house" className="text-gray-400 hover:text-white">
                  Maisons
                </Link>
              </li>
              <li>
                <Link to="/properties?type=apartment" className="text-gray-400 hover:text-white">
                  Appartements
                </Link>
              </li>
              <li>
                <Link to="/properties?type=land" className="text-gray-400 hover:text-white">
                  Terrains
                </Link>
              </li>
              <li>
                <Link to="/properties?type=commercial" className="text-gray-400 hover:text-white">
                  Locaux commerciaux
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400">
                <MapPin className="h-5 w-5 mr-2" />
                75008 Paris, France
              </li>
              <li className="flex items-center text-gray-400">
                <Phone className="h-5 w-5 mr-2" />
                +33 1 23 45 67 89
              </li>
              <li className="flex items-center text-gray-400">
                <Mail className="h-5 w-5 mr-2" />
                contact@immofrance.fr
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} ImmoFrance. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;