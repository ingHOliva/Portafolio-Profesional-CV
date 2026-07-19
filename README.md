# Portafolio Profesional — Hector Alfonso Oliva Rojas

Sitio estático modular pensado para publicarse en **GitHub Pages**.
`index.html` funciona como cascarón de carga inicial (header, navegación
y la pestaña "Inicio"); las demás pestañas viven en archivos `.html`
independientes dentro de `pages/` y se cargan dinámicamente con
JavaScript (`fetch`) al hacer clic en cada una.

## Estructura de archivos

```
/
├── index.html                 ← Cascarón + pestaña "Inicio" (carga inicial)
├── README.md
│
├── pages/                      ← Una página por pestaña, se cargan bajo demanda
│   ├── sennova2024.html
│   ├── sennova2023.html
│   ├── sennova2021.html        ← pendiente de contenido real (ver abajo)
│   ├── pregrado.html           ← pendiente de contenido real (ver abajo)
│   ├── maestria.html           ← pendiente de contenido real (ver abajo)
│   └── trayectoria.html
│
└── assets/
    ├── css/
    │   └── style.css           ← Estilos (colores, tipografía, layout)
    ├── js/
    │   └── main.js               ← Navegación por pestañas + carga dinámica
    ├── img/
    │   └── favicon.svg
    └── docs/
        └── LEEME.txt            ← Carpeta opcional para PDFs que quieras enlazar puntualmente
```

## ⚠️ Importante: cómo probarlo en tu computador

Como las pestañas se cargan con `fetch()`, **no funcionará si abres
`index.html` con doble clic** (los navegadores bloquean `fetch` sobre
archivos locales por seguridad). Para probarlo antes de subirlo a
GitHub, levanta un servidor local desde esta carpeta:

```bash
python3 -m http.server 8000
```

y abre `http://localhost:8000` en tu navegador. Una vez publicado en
GitHub Pages, esto **no es un problema**: Pages sirve los archivos por
HTTPS y `fetch` funciona con normalidad.

## Pasos para publicar en GitHub Pages

1. Sube todo el contenido de esta carpeta (`index.html`, `pages/`,
   `assets/`, `README.md`) a la raíz de tu repositorio.
2. En GitHub: **Settings → Pages → Source**, selecciona la rama
   (`main`) y la carpeta (`/root`) y guarda.
3. En un par de minutos tu sitio estará disponible en:
   `https://tuusuario.github.io/nombre-del-repositorio/`

## Contenido pendiente de completar

Tres páginas están marcadas con comentarios `<!-- TODO (Hector): ... -->`
porque no tenía la información real para completarlas (no invento
contenido técnico tuyo):

| Página | Qué falta |
|---|---|
| `pages/sennova2021.html` | Título del proyecto, objetivo, tu rol, tecnologías y resultados. |
| `pages/pregrado.html` | Resumen técnico real de tu tesis "Plataforma teleoperada para prácticas de física" (el texto actual es genérico, basado solo en el título). |
| `pages/maestria.html` | Título y resumen de tu trabajo de grado de maestría. |

Para completarlas, abre el archivo correspondiente y sigue la misma
estructura que ya usan `pages/sennova2024.html` y `pages/sennova2023.html`
como referencia: título, fila de metadatos, párrafo de objetivo, y dos
columnas ("Mi rol" + "Tecnologías/Resultados").

## Cómo editar contenido

- **Pestaña "Inicio"**: edítala directamente dentro de `index.html`,
  en el bloque `<section class="panel" id="panel-inicio">`.
- **Cualquier otra pestaña**: edita directamente el archivo correspondiente
  dentro de `pages/`. No necesitas tocar `index.html`, `style.css` ni
  `main.js` para cambiar texto.
- **Agregar una pestaña nueva**: crea `pages/nombre.html` con el mismo
  formato que las existentes, y agrega un botón
  `<button class="tab-btn" data-tab="nombre" id="tabbtn-nombre">Etiqueta</button>`
  dentro de `<nav class="tabs">` en `index.html`. El sistema de carga
  dinámica (`main.js`) lo detecta automáticamente, sin más configuración.

### Cambiar colores o tipografía

Todos los valores de color y fuente están centralizados al inicio de
`assets/css/style.css`, dentro de `:root { ... }`. Cambiar un valor ahí
lo actualiza en todo el sitio.

## Qué se quitó respecto a la versión anterior

Por decisión tuya, esta versión ya no incluye botones de "Descargar CV
(PDF)" ni de "Ver evidencias en Drive": el contenido de cada pestaña en
`pages/` es ahora la evidencia en sí misma. Si más adelante quieres
enlazar un documento puntual (por ejemplo, un certificado específico),
puedes colocarlo en `assets/docs/` y enlazarlo directamente desde el
texto de la página correspondiente.
