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

A continuación te explico qué hace cada tecnología y por qué la elegimos:

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

## 🎨 Dirección Artística y Paleta de Colores

La interfaz sigue una línea editorial oscura y cinematográfica:

- **Negro Espacial Profundo:** `#050505` (Fondo de vacío)
- **Negro Panel:** `#0C0C0E` / `rgba(16, 16, 20, 0.75)` (Paneles holográficos translúcidos)
- **Dorado Imperial / Jedi:** `#D8B45A` (Acentos principales, botones y cabeceras)
- **Dorado Brillante:** `#F5D98A` (Resplandores y títulos activos)
- **Cian Holográfico:** `#48CAE4` (Identificadores de datos y texto de apertura)
- **Blanco Puro Estelar:** `#F5F5F5` (Texto principal de lectura)
- **Gris Blindaje:** `#888888` (Metadatos y etiquetas secundarias)

---

## 📁 Estructura del Código

El proyecto sigue una arquitectura limpia y modular para mantener la separación de responsabilidades:

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

Sigue estos sencillos pasos para probar la base de datos en tu máquina:

### 1. Clonar el repositorio
```bash
git clone https://github.com/andradegali1503-droid/STARS-WARS-BLOG-4GEEKS.git
cd STARS-WARS-BLOG-4GEEKS
```

### 2. Instalar dependencias
Asegúrate de contar con Node.js 18 o superior:
```bash
npm install
```

### 3. Iniciar el servidor de desarrollo
```bash
npm run dev
```
Abre tu navegador en [http://localhost:3000](http://localhost:3000).

### 4. Compilar para producción
Para verificar que el tipado de TypeScript y la optimización de Vite estén impecables:
```bash
npm run build
```

---

## 🧑‍💻 Aprendizajes Clave y Conceptos 

Si estás aprendiendo desarrollo web como yo  con React y TypeScript, aquí tienes un resumen sencillo de cómo resolvimos los desafíos más importantes:

### 1. ¿Cómo funciona `useDebounce` y por qué es vital?
Cuando un usuario escribe en un campo de búsqueda, cada pulsación de tecla (`onChange`) actualiza el estado. Si enviáramos una petición a la API por cada letra, escribir *"Skywalker"* provocaría 9 peticiones en menos de 1 segundo. Esto saturaría el servidor de SWAPI y volvería lenta la aplicación.

Con el hook `useDebounce`, esperamos **400 milisegundos** después de que el usuario deje de escribir antes de disparar la consulta. Si sigue escribiendo, el temporizador anterior se cancela y se reinicia:
```typescript
export function useDebounce<T>(value: T, delayMs: number = 400): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delayMs);
    return () => clearTimeout(timer); // Se limpia si value cambia antes del delay
  }, [value, delayMs]);

  return debouncedValue;
}
```

### 2. ¿Cómo evitamos fugas de memoria con `AbortController`?
Si un usuario cambia rápidamente de página o realiza una búsqueda y luego navega a otra sección antes de que termine la petición, la respuesta de la petición anterior podría intentar actualizar un componente que ya no existe (o sobrescribir datos nuevos).

Utilizamos `AbortController`. Al iniciar una nueva búsqueda o desmontar el componente, invocamos `controller.abort()` para cancelar la petición en curso en el navegador:
```typescript
if (abortControllerRef.current) {
  abortControllerRef.current.abort(); // Cancelar petición previa
}
const controller = new AbortController();
abortControllerRef.current = controller;

fetch(url, { signal: controller.signal });
```

### 3. ¿Cómo logramos el efecto 3D del Opening Crawl de Star Wars?
En lugar de depender de librerías 3D pesadas como Three.js para un solo efecto de texto, aprovechamos el motor de perspectiva 3D nativo de CSS:
```css
.crawl-container {
  perspective: 450px;
  overflow: hidden;
}

.crawl-content {
  transform-origin: 50% 100%;
  transform: rotateX(25deg);
  animation: crawl 45s linear infinite;
}
```
Esto permite que el texto se incline hacia el fondo mientras sube suavemente a 60 FPS, manteniendo un rendimiento ligero y fluido.

### 4. Resolución de entidades cruzadas
En SWAPI, los objetos no devuelven los nombres completos de sus relaciones, sino URLs (ej: `"homeworld": "https://swapi.dev/api/planets/1/"`).
Creamos el método `SwapiService.resolveReferences()` que toma esas URLs y extrae en paralelo el título o nombre, permitiendo renderizar botones con el nombre real (`Tatooine`) y enlaces directos hacia `/planets/1`.

---

## 🛡️ Accesibilidad y Rendimiento

- **`prefers-reduced-motion`:** La intro cinematográfica y las animaciones detectan si el usuario tiene activada la preferencia de reducción de movimiento en su sistema operativo para omitirlas automáticamente.
- **Caché en Memoria (5 minutos):** Si visitas un personaje o una página y luego vuelves, los datos se leen al instante desde la memoria RAM sin realizar otra llamada a la red.
- **Transiciones fluidas:** Aceleración por hardware mediante CSS `transform` y `opacity`.

---

## 📜 Licencia y Atribución

- Los datos del universo Star Wars son cortesía de la fantástica [SWAPI (The Star Wars API)](https://swapi.dev/).
- Este proyecto ha sido desarrollado con fines educativos y de portafolio frontend.
- Star Wars es una marca registrada de Lucasfilm Ltd. / Disney.

---

<div align="center">
  <b>May the Force be with you. Siempre.</b> 🌟
</div>
