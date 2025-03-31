
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, Film, List, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-cineletter-700 text-white py-3 px-4 md:px-6 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Film className="w-6 h-6 text-cineaccent" />
          <span className="text-xl font-display font-bold">CineLetter</span>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <div className="flex items-center space-x-6">
            <Link to="/" className="hover:text-cineaccent transition-colors">Home</Link>
            <Link to="/films" className="hover:text-cineaccent transition-colors">Films</Link>
            <Link to="/lists" className="hover:text-cineaccent transition-colors">Lists</Link>
            <Link to="/search" className="hover:text-cineaccent transition-colors">
              <Search className="w-5 h-5" />
            </Link>
            <Link to="/profile">
              <Button variant="outline" size="sm" className="border-cineaccent text-cineaccent hover:bg-cineaccent hover:text-white">
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
            </Link>
          </div>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-white">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobile && isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-cineletter-700 py-4 px-6 space-y-4 shadow-lg animate-fade-in">
          <Link 
            to="/" 
            className="block py-2 hover:text-cineaccent transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/films" 
            className="block py-2 hover:text-cineaccent transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Films
          </Link>
          <Link 
            to="/lists" 
            className="block py-2 hover:text-cineaccent transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Lists
          </Link>
          <Link 
            to="/search" 
            className="block py-2 hover:text-cineaccent transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Search
          </Link>
          <Link 
            to="/profile" 
            className="block py-2 hover:text-cineaccent transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Profile
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
