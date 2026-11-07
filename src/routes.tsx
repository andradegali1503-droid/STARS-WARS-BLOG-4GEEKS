import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/Home/HomePage';
import { FilmsPage } from '@/pages/Films/FilmsPage';
import { FilmDetailPage } from '@/pages/Films/FilmDetailPage';
import { PeoplePage } from '@/pages/People/PeoplePage';
import { PersonDetailPage } from '@/pages/People/PersonDetailPage';
import { PlanetsPage } from '@/pages/Planets/PlanetsPage';
import { PlanetDetailPage } from '@/pages/Planets/PlanetDetailPage';
import { StarshipsPage } from '@/pages/Starships/StarshipsPage';
import { StarshipDetailPage } from '@/pages/Starships/StarshipDetailPage';
import { VehiclesPage } from '@/pages/Vehicles/VehiclesPage';
import { VehicleDetailPage } from '@/pages/Vehicles/VehicleDetailPage';
import { SpeciesPage } from '@/pages/Species/SpeciesPage';
import { SpeciesDetailPage } from '@/pages/Species/SpeciesDetailPage';
import { NotFoundPage } from '@/pages/NotFound/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'films',
        element: <FilmsPage />,
      },
      {
        path: 'films/:id',
        element: <FilmDetailPage />,
      },
      {
        path: 'people',
        element: <PeoplePage />,
      },
      {
        path: 'people/:id',
        element: <PersonDetailPage />,
      },
      {
        path: 'planets',
        element: <PlanetsPage />,
      },
      {
        path: 'planets/:id',
        element: <PlanetDetailPage />,
      },
      {
        path: 'starships',
        element: <StarshipsPage />,
      },
      {
        path: 'starships/:id',
        element: <StarshipDetailPage />,
      },
      {
        path: 'vehicles',
        element: <VehiclesPage />,
      },
      {
        path: 'vehicles/:id',
        element: <VehicleDetailPage />,
      },
      {
        path: 'species',
        element: <SpeciesPage />,
      },
      {
        path: 'species/:id',
        element: <SpeciesDetailPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
