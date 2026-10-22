import { useState, useMemo } from 'react';
import type { Vehicle } from '../data/vehicles';
import VehicleCard from './VehicleCard';
import '../styles/vehicle-gallery.css';

interface Props {
  vehicles: Vehicle[];
  onSelectVehicle: (vehicle: Vehicle) => void;
}

type FilterCategory =
  | 'all'
  | 'vintage'
  | 'midcentury'
  | 'performance'
  | 'electric'
  | 'formula1'
  | 'beyond';

interface FilterOption {
  id: FilterCategory;
  label: string;
}

const FILTERS: FilterOption[] = [
  { id: 'all', label: 'Complete Collection' },
  { id: 'vintage', label: 'Vintage & Pioneers (1885–1955)' },
  { id: 'midcentury', label: 'Mid-Century GTs & Muscle (1955–1975)' },
  { id: 'performance', label: 'Performance & Supercars (1975–2011)' },
  { id: 'electric', label: 'Electric Revolution' },
  { id: 'formula1', label: 'Formula 1 Racing' },
  { id: 'beyond', label: 'Beyond the Mainstream' },
];

export default function VehicleGallery({ vehicles, onSelectVehicle }: Props) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  const filteredVehicles = useMemo(() => {
    if (activeFilter === 'all') return vehicles;
    if (activeFilter === 'vintage') {
      return vehicles.filter((v) => v.era === 'birth' || v.era === 'golden');
    }
    if (activeFilter === 'midcentury') {
      return vehicles.filter((v) => v.era === 'midcentury');
    }
    if (activeFilter === 'performance') {
      return vehicles.filter(
        (v) => v.era === 'performance' || v.era === 'modern' || v.era === 'supercar'
      );
    }
    if (activeFilter === 'electric') {
      return vehicles.filter((v) => v.era === 'electric');
    }
    if (activeFilter === 'formula1') {
      return vehicles.filter((v) => v.era === 'formula1');
    }
    if (activeFilter === 'beyond') {
      return vehicles.filter((v) => v.era === 'beyond');
    }
    return vehicles;
  }, [vehicles, activeFilter]);

  return (
    <section id="gallery" className="vehicle-gallery" aria-label="Curated Vehicle Collection">
      <div className="container">
        {/* Header */}
        <div className="vehicle-gallery__header">
          <div className="vehicle-gallery__badge">
            <span className="vehicle-gallery__badge-dot" />
            <span>EXHIBITION ARCHIVE // VERTICAL REPOSITORY</span>
          </div>
          <h2 className="vehicle-gallery__title">The Complete Automotive Collection</h2>
          <p className="vehicle-gallery__desc">
            Explore every landmark vehicle from 1885 to the present day in an accessible vertical gallery.
            Select any car to view authentic historical photography, powertrain schematics, and documented specifications.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="vehicle-gallery__filters" role="tablist" aria-label="Filter vehicles by era">
          {FILTERS.map((f) => {
            const count =
              f.id === 'all'
                ? vehicles.length
                : f.id === 'vintage'
                ? vehicles.filter((v) => v.era === 'birth' || v.era === 'golden').length
                : f.id === 'midcentury'
                ? vehicles.filter((v) => v.era === 'midcentury').length
                : f.id === 'performance'
                ? vehicles.filter(
                    (v) => v.era === 'performance' || v.era === 'modern' || v.era === 'supercar'
                  ).length
                : f.id === 'electric'
                ? vehicles.filter((v) => v.era === 'electric').length
                : f.id === 'formula1'
                ? vehicles.filter((v) => v.era === 'formula1').length
                : vehicles.filter((v) => v.era === 'beyond').length;

            return (
              <button
                key={f.id}
                role="tab"
                aria-selected={activeFilter === f.id}
                className={`vehicle-gallery__filter-btn ${activeFilter === f.id ? 'is-active' : ''}`}
                onClick={() => setActiveFilter(f.id)}
              >
                <span>{f.label}</span>
                <span className="vehicle-gallery__filter-count">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Vertical Gallery Grid */}
        <div
          className="vehicle-gallery__grid"
          role="list"
          aria-label={`Displaying ${filteredVehicles.length} vehicles`}
        >
          {filteredVehicles.map((vehicle, index) => (
            <div key={vehicle.id} className="vehicle-gallery__item" role="listitem">
              <VehicleCard
                vehicle={vehicle}
                index={index}
                onSelect={onSelectVehicle}
                layout="portrait"
              />
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="vehicle-gallery__footer" aria-hidden="true">
          <span>SHOWING {filteredVehicles.length} OF {vehicles.length} VEHICLES</span>
          <span>CLICK ANY VEHICLE TO INSPECT DETAILS</span>
        </div>
      </div>
    </section>
  );
}
