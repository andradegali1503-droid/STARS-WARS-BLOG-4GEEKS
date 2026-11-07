# 🌌 STAR WARS — GALACTIC DATABASE

<div align="center">

![Star Wars Banner](https://img.shields.io/badge/STAR_WARS-GALACTIC_DATABASE-D8B45A?style=for-the-badge&logo=starwars&logoColor=black)

[![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite_4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![React Router](https://img.shields.io/badge/React_Router_6-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/)
[![SWAPI](https://img.shields.io/badge/SWAPI-API_REST-FFE81F?style=for-the-badge&logo=starwars&logoColor=black)](https://swapi.dev/)

**Base de datos galáctica interactiva y visor de archivos canónicos con una experiencia cinematográfica inmersiva de alto nivel.**

[Demostración](#-características-principales) • [Tecnologías](#-tecnologías-y-herramientas) • [Estructura del Proyecto](#-estructura-del-código) • [Instalación](#-instalación-y-uso-local) • [Explicación para Juniors](#-aprendizajes-clave-y-conceptos-explicados-como-junior)

</div>

---

## 📖 ¿De qué trata este proyecto?

Este proyecto nació como un ejercicio avanzado de desarrollo frontend para consumir la **Star Wars API (SWAPI)**. En lugar de crear un simple CRUD o una lista estática, diseñamos una **terminal interactiva de nave espacial** inspirada en los sistemas de información de la República y el Imperio Galáctico.

Cuenta con:
- 🎬 **Intro Cinematográfica:** Pantalla de apertura de 5-7 segundos con el mítico *"A long time ago in a galaxy far, far away..."*, revelación en perspectiva del logotipo de Star Wars y opción de saltar (*Skip Intro*) o recordar la preferencia con `localStorage`.
- 🌌 **Starfield 3D & Salto al Hiperespacio:** Fondo animado mediante HTML5 Canvas con estrellas multicapa y aceleración a velocidad luz (*Warp Drive*) al navegar entre sectores galácticos.
- 📜 **Opening Crawl en Perspectiva 3D:** Reproducción real del texto introductorio de cada película con inclinación angular en 3D, controles de pausa (con barra espaciadora), reanudación y reinicio.
- 🛸 **6 Sectores Galácticos Canónicos:** Exploración detallada de **Películas**, **Personajes**, **Planetas**, **Naves**, **Vehículos** y **Especies**.
- 🔍 **Búsqueda con Debounce y Paginación:** Búsqueda en tiempo real conectada a los parámetros de SWAPI sin saturar el servidor de peticiones.
- 📑 **Dossiers Técnicos:** Fichas de terminal militar con métricas físicas, de propulsión o biológicas, acompañadas de enlaces relacionales cruzados (por ejemplo: ver el planeta natal de un personaje te lleva directamente al expediente de ese mundo).

---

## 🛠️ Tecnologías y Herramientas

| Tecnología | Logo | ¿Para qué sirve en este proyecto? |
| :--- | :---: | :--- |
| **React 18** | ![React](https://img.shields.io/badge/-React-61DAFB?style=flat&logo=react&logoColor=black) | Biblioteca base para construir la interfaz mediante componentes reutilizables, hooks y gestión de estados. |
| **TypeScript** | ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat&logo=typescript&logoColor=white) | Aporta tipado estricto (`Film`, `Person`, `Planet`, etc.). Evita errores en tiempo de ejecución y facilita el autocompletado en el editor. |
| **Vite** | ![Vite](https://img.shields.io/badge/-Vite-646CFF?style=flat&logo=vite&logoColor=white) | Servidor de desarrollo ultrarrápido y empaquetador para producción mediante Rollup. |
| **Tailwind CSS** | ![Tailwind](https://img.shields.io/badge/-Tailwind-06B6D4?style=flat&logo=tailwindcss&logoColor=white) | Sistema de diseño de clases utilitarias para crear la paleta espacial (`#050505`), dorada (`#D8B45A`), cian holográfica (`#48CAE4`) y efectos de cristal (*glassmorphism*). |
| **Framer Motion** | ![Framer](https://img.shields.io/badge/-Framer_Motion-0055FF?style=flat&logo=framer&logoColor=white) | Biblioteca para animaciones complejas, transiciones de página suaves y la secuencia de intro cinematográfica. |
| **React Router 6** | ![Router](https://img.shields.io/badge/-React_Router-CA4245?style=flat&logo=react-router&logoColor=white) | Gestión de rutas dinámicas tipo SPA (`/films/:id`, `/people/:id`, `/starships`, etc.) con soporte para página 404 personalizada. |
| **Lucide React** | ![Lucide](https://img.shields.io/badge/-Lucide_Icons-F56565?style=flat&logo=feather&logoColor=white) | Set de iconos vectoriales modernos y estilizados para cada sección del dashboard. |
| **SWAPI REST API** | ![SWAPI](https://img.shields.io/badge/-SWAPI-FFE81F?style=flat&logo=starwars&logoColor=black) | Fuente de datos oficial del universo Star Wars (`https://swapi.dev/api/`). |

---

## 📁 Estructura del Código

```
src/
├── components/
│   ├── cards/                  # Tarjetas visuales para cada tipo de entidad
│   │   ├── CategoryDashboardCard.tsx
│   │   ├── FilmCard.tsx
│   │   ├── PersonCard.tsx
│   │   ├── PlanetCard.tsx
│   │   ├── StarshipCard.tsx
│   │   ├── VehicleCard.tsx
│   │   └── SpeciesCard.tsx
│   ├── cinematic/              # Efectos visuales de cine
│   │   ├── Starfield.tsx       # Canvas de estrellas y salto hiperespacial
│   │   ├── CinematicIntro.tsx  # Intro inicial
│   │   ├── OpeningCrawlModal.tsx # Visor 3D del crawl
│   │   └── GalacticLoader.tsx  # Radar escáner temático
│   ├── layout/                 # Layout maestro, barra superior y pie de página
│   │   ├── Layout.tsx
│   │   └── Footer.tsx
│   ├── navigation/
│   │   └── Navbar.tsx          # Menú principal y disparador de hiperespacio
│   └── ui/                     # Componentes atómicos reutilizables
│       ├── SearchBar.tsx
│       ├── Pagination.tsx
│       ├── TerminalHeader.tsx
│       └── EmptyState.tsx
├── hooks/                      # Lógica reutilizable encapsulada
│   ├── useDebounce.ts          # Control de retardo en inputs de búsqueda
│   ├── useSwapiList.ts         # Hook para listar, paginar y buscar
│   └── useSwapiItem.ts         # Hook para cargar detalles y resolver relaciones
├── pages/                      # Vistas de la aplicación
│   ├── Home/HomePage.tsx
│   ├── Films/
│   ├── People/
│   ├── Planets/
│   ├── Starships/
│   ├── Vehicles/
│   ├── Species/
│   └── NotFound/NotFoundPage.tsx
├── services/
│   └── swapiService.ts         # Llamadas a la API REST de SWAPI con caché y AbortSignal
├── types/
│   └── swapi.ts                # Modelos de datos TypeScript
├── utils/
│   ├── constants.ts            # Información y descriptores de sectores
│   └── formatters.ts           # Funciones para formatear números, créditos y romanos
├── index.css                   # Estilos base, efectos holográficos y animación 3D
├── routes.tsx                  # Enrutador principal de React Router
└── main.tsx                    # Inicialización de la aplicación
```

---

## 🚀 Instalación y Uso Local

```bash
# 1. Clonar el repositorio
git clone https://github.com/andradegali1503-droid/STARS-WARS-BLOG-4GEEKS.git
cd STARS-WARS-BLOG-4GEEKS

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Probar build de producción
npm run build
```

---

<div align="center">
  <b>May the Force be with you. Siempre.</b> 🌟
</div>
