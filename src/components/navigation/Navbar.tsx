import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  Film,
  Users,
  Globe,
  Rocket,
  Car,
  Dna,
  Menu,
  X,
  Compass,
  PlayCircle,
  Zap,
} from 'lucide-react';
import { CATEGORIES } from '@/utils/constants';

interface NavbarProps {
  onTriggerHyperspace?: () => void;
  onReplayIntro?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onTriggerHyperspace,
  onReplayIntro,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const getIcon = (id: string) => {
    switch (id) {
      case 'films':
        return <Film className="w-4 h-4 mr-1.5" />;
      case 'people':
        return <Users className="w-4 h-4 mr-1.5" />;
      case 'planets':
        return <Globe className="w-4 h-4 mr-1.5" />;
      case 'starships':
        return <Rocket className="w-4 h-4 mr-1.5" />;
      case 'vehicles':
        return <Car className="w-4 h-4 mr-1.5" />;
      case 'species':
        return <Dna className="w-4 h-4 mr-1.5" />;
      default:
        return <Compass className="w-4 h-4 mr-1.5" />;
    }
  };

  const handleHyperspaceClick = () => {
    if (onTriggerHyperspace) {
      onTriggerHyperspace();
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-space-950/80 backdrop-blur-md border-b border-sw-gold/20 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          className="group flex flex-col justify-center transition-transform hover:scale-[1.02]"
        >
          <div className="flex items-center space-x-2">
            <span className="font-cinematic font-black text-xl tracking-[0.25em] text-sw-gold group-hover:text-sw-goldLight transition-colors">
              STAR WARS
            </span>
            <span className="text-[10px] bg-sw-gold/15 text-sw-gold border border-sw-gold/40 px-1.5 py-0.5 rounded font-mono">
              DB//SWAPI
            </span>
          </div>
          <span className="font-tech text-xs tracking-[0.3em] text-sw-gray group-hover:text-sw-white uppercase transition-colors">
            Galactic Database
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center space-x-1 lg:space-x-2">
          {CATEGORIES.map((cat) => (
            <NavLink
              key={cat.id}
              to={cat.path}
              className={({ isActive }) =>
                `flex items-center px-3 py-1.5 rounded-sm font-tech text-xs font-semibold tracking-widest uppercase transition-all duration-200 border ${
                  isActive
                    ? 'border-sw-gold/80 bg-sw-gold/10 text-sw-goldLight shadow-gold-sm'
                    : 'border-transparent text-sw-gray hover:text-sw-white hover:border-white/10 hover:bg-white/5'
                }`
              }
            >
              {getIcon(cat.id)}
              {cat.title}
            </NavLink>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center space-x-3">
          {onTriggerHyperspace && (
            <button
              onClick={handleHyperspaceClick}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded text-xs font-tech tracking-widest text-sw-cyan border border-sw-cyan/40 hover:bg-sw-cyan/15 hover:border-sw-cyan transition-all"
              title="Engage Hyperspace Warp Drive"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>WARP</span>
            </button>
          )}

          {onReplayIntro && (
            <button
              onClick={onReplayIntro}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded text-xs font-tech tracking-widest text-sw-gold border border-sw-gold/40 hover:bg-sw-gold/15 transition-all"
              title="Replay Cinematic Intro"
            >
              <PlayCircle className="w-3.5 h-3.5" />
              <span className="hidden md:inline">INTRO</span>
            </button>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex xl:hidden items-center space-x-2">
          {onTriggerHyperspace && (
            <button
              onClick={handleHyperspaceClick}
              className="p-2 text-sw-cyan border border-sw-cyan/30 rounded"
              title="Hyperspace Jump"
            >
              <Zap className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded text-sw-gold hover:text-white border border-sw-gold/30 hover:border-sw-gold transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-space-950/95 border-b border-sw-gold/20 px-4 py-4 space-y-2 backdrop-blur-xl">
          <div className="grid grid-cols-2 gap-2 pb-2">
            {CATEGORIES.map((cat) => (
              <NavLink
                key={cat.id}
                to={cat.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center p-2.5 rounded font-tech text-xs tracking-wider uppercase border ${
                    isActive
                      ? 'border-sw-gold bg-sw-gold/15 text-sw-goldLight'
                      : 'border-white/10 text-sw-gray hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {getIcon(cat.id)}
                <span>{cat.title}</span>
              </NavLink>
            ))}
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onReplayIntro) onReplayIntro();
              }}
              className="flex items-center space-x-2 text-xs font-tech tracking-wider text-sw-goldLight py-2"
            >
              <PlayCircle className="w-4 h-4 text-sw-gold" />
              <span>REPLAY CINEMATIC INTRO</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
