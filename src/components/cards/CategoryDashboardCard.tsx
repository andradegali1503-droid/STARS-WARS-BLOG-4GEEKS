import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Film,
  Users,
  Globe,
  Rocket,
  Car,
  Dna,
  ArrowRight,
  Shield,
} from 'lucide-react';
import { CategoryInfo } from '@/types/swapi';

interface CategoryDashboardCardProps {
  category: CategoryInfo;
  index: number;
}

export const CategoryDashboardCard: React.FC<CategoryDashboardCardProps> = ({
  category,
  index,
}) => {
  const getIcon = () => {
    const iconClass = 'w-8 h-8 transition-transform duration-500 group-hover:scale-110';
    switch (category.id) {
      case 'films':
        return <Film className={`${iconClass} text-sw-gold`} />;
      case 'people':
        return <Users className={`${iconClass} text-sw-cyan`} />;
      case 'planets':
        return <Globe className={`${iconClass} text-emerald-400`} />;
      case 'starships':
        return <Rocket className={`${iconClass} text-sw-red`} />;
      case 'vehicles':
        return <Car className={`${iconClass} text-amber-500`} />;
      case 'species':
        return <Dna className={`${iconClass} text-purple-400`} />;
      default:
        return <Shield className={`${iconClass} text-sw-gold`} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-none border border-sw-gold/20 bg-space-800/60 hover:bg-space-800/90 backdrop-blur-md corner-brackets transition-all duration-300 hover:border-sw-gold/70 hover:shadow-gold-md overflow-hidden"
    >
      {/* Decorative scanline glow line at top on hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sw-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Holographic grid watermark */}
      <div 
        aria-hidden="true" 
        className="absolute -right-6 -bottom-6 w-32 h-32 opacity-5 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none"
      >
        {getIcon()}
      </div>

      <div>
        {/* Top Header: Number and Sector Tag */}
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-xs font-bold tracking-widest text-sw-gold border border-sw-gold/30 px-2.5 py-0.5 rounded-sm">
            {category.number}
          </span>
          <span className="font-mono text-[10px] tracking-widest text-sw-gray uppercase">
            SEC // SW-{category.id.toUpperCase()}
          </span>
        </div>

        {/* Icon and Title */}
        <div className="flex items-center space-x-3 mb-3">
          <div className="p-3 bg-space-950/80 border border-white/10 rounded-sm group-hover:border-sw-gold/40 transition-colors">
            {getIcon()}
          </div>
          <div>
            <h3 className="font-cinematic text-xl sm:text-2xl font-bold tracking-widest text-sw-white group-hover:text-sw-goldLight transition-colors">
              {category.title}
            </h3>
            <p className="font-tech text-xs tracking-widest text-sw-gold/75 uppercase font-semibold">
              {category.subtitle}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="font-sans text-xs sm:text-sm text-sw-gray leading-relaxed mb-6 group-hover:text-sw-white/80 transition-colors">
          {category.description}
        </p>
      </div>

      {/* Footer Link Action */}
      <Link
        to={category.path}
        className="mt-auto flex items-center justify-between pt-4 border-t border-white/10 group-hover:border-sw-gold/30 transition-colors"
      >
        <span className="font-tech text-xs tracking-widest text-sw-gold uppercase font-bold group-hover:underline">
          EXPLORE ARCHIVES
        </span>
        <ArrowRight className="w-4 h-4 text-sw-gold transition-transform group-hover:translate-x-1.5" />
      </Link>
    </motion.div>
  );
};
