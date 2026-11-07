import React from 'react';
import { Link } from 'react-router-dom';
import { Vehicle } from '@/types/swapi';
import { SwapiService } from '@/services/swapiService';
import { formatCredits, capitalize } from '@/utils/formatters';
import { Car, Gauge, Users, Coins, ArrowUpRight } from 'lucide-react';

interface VehicleCardProps {
  vehicle: Vehicle;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  const id = SwapiService.extractIdFromUrl(vehicle.url);

  return (
    <div className="group relative flex flex-col justify-between p-6 bg-space-800/70 border border-amber-500/30 backdrop-blur-md corner-brackets hover:border-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all duration-300">
      <div>
        {/* Terminal Header */}
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-[10px] tracking-widest text-amber-400 uppercase">
            SURFACE VEHICLE // SEC-05
          </span>
          <span className="font-mono text-[10px] tracking-wider text-sw-gray">
            ID: [VH-{id}]
          </span>
        </div>

        {/* Vehicle Name */}
        <h3 className="font-cinematic text-lg sm:text-xl font-bold tracking-widest text-sw-white group-hover:text-amber-300 transition-colors mb-1 line-clamp-1">
          {vehicle.name}
        </h3>
        <p className="font-tech text-xs tracking-wider text-sw-gold/80 uppercase truncate mb-4">
          {vehicle.model}
        </p>

        {/* Telemetry data grid */}
        <div className="grid grid-cols-2 gap-2 mb-4 font-mono text-xs">
          <div className="p-2 bg-space-950/60 border border-white/5 rounded-none col-span-2">
            <span className="block text-[10px] text-sw-gray uppercase tracking-wider">CLASS</span>
            <span className="font-bold text-sw-goldLight truncate block">
              {capitalize(vehicle.vehicle_class)}
            </span>
          </div>

          <div className="p-2 bg-space-950/60 border border-white/5 rounded-none">
            <span className="block text-[10px] text-sw-gray uppercase tracking-wider">CREW</span>
            <span className="font-medium text-sw-white">{vehicle.crew}</span>
          </div>

          <div className="p-2 bg-space-950/60 border border-white/5 rounded-none">
            <span className="block text-[10px] text-sw-gray uppercase tracking-wider">PASSENGERS</span>
            <span className="font-medium text-sw-white">{vehicle.passengers}</span>
          </div>
        </div>

        {/* Speed & Cost */}
        <div className="space-y-1.5 mb-5 font-mono text-xs text-sw-gray border-t border-white/10 pt-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center text-[10px] uppercase">
              <Gauge className="w-3 h-3 mr-1 text-amber-400" /> MAX SPEED
            </span>
            <span className="text-sw-white font-medium">{vehicle.max_atmosphering_speed}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center text-[10px] uppercase">
              <Coins className="w-3 h-3 mr-1 text-sw-gold" /> COST
            </span>
            <span className="text-sw-gold font-bold">{formatCredits(vehicle.cost_in_credits)}</span>
          </div>
        </div>
      </div>

      {/* Footer link */}
      <div className="pt-3 border-t border-white/10 flex items-center justify-between">
        <span className="font-mono text-[10px] text-sw-gray truncate max-w-[150px]">
          {vehicle.manufacturer}
        </span>

        <Link
          to={`/vehicles/${id}`}
          className="flex items-center space-x-1 font-tech text-xs tracking-wider text-amber-400 uppercase font-bold hover:underline"
        >
          <span>DOSSIER</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
