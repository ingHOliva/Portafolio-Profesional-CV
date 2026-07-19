# Portafolio Profesional — Hector Alfonso Oliva Rojas

Sitio estático de una sola página (`index.html`) con navegación por pestañas,
pensado para publicarse en **GitHub Pages**.

## Estructura de archivos

```
portafolio/
├── index.html              ← Página principal (todo el contenido vive aquí)
├── README.md                ← Este archivo
├── cv/
│   └── Hector_Oliva_CV.pdf  ← ⚠️ AGREGAR: sube aquí tu CV en PDF con este nombre exacto
└── assets/
    ├── css/
    │   └── style.css        ← Estilos (colores, tipografía, layout)
    ├── js/
    │   └── main.js           ← Lógica de las pestañas (no necesitas tocarlo)
    └── img/
        └── favicon.svg       ← Ícono de la pestaña del navegador
```

## Pasos para publicar en GitHub Pages

1. Sube **todo el contenido de esta carpeta** (`index.html`, `README.md`, `cv/`, `assets/`)
   a la raíz de tu repositorio (no dentro de una subcarpeta, salvo que tu repo ya
   esté configurado para servir Pages desde `/docs`).
2. Coloca tu CV en PDF dentro de `cv/` con el nombre `Hector_Oliva_CV.pdf`
   (o cambia el nombre en `index.html` si prefieres otro).
3. En GitHub: **Settings → Pages → Source**, selecciona la rama (`main`) y la
   carpeta (`/root` o `/docs` según corresponda) y guarda.
4. En un par de minutos tu sitio estará disponible en:
   `https://tuusuario.github.io/nombre-del-repositorio/`

## Contenido pendiente de completar

Hay tres secciones marcadas con comentarios `<!-- TODO (Hector): ... -->`
dentro de `index.html`, porque no tenía la información necesaria para
completarlas con datos reales (no invento contenido técnico tuyo):

| Pestaña | Qué falta |
|---|---|
| **SENNOVA·21** | Título del proyecto, objetivo, tu rol, tecnologías, resultados y enlace a evidencias. |
| **Pregrado** | Resumen técnico real de tu tesis "Plataforma teleoperada para prácticas de física" (el texto actual es genérico, basado solo en el título). |
| **Maestría** | Título y resumen de tu trabajo de grado de maestría (Universidad de los Andes). |

Para completarlas, busca esos bloques en `index.html` (usa Ctrl+F y busca `TODO`)
y sigue la misma estructura que ya usan las pestañas SENNOVA·24 y SENNOVA·23
como referencia: título, fila de metadatos, párrafo de objetivo, dos columnas
("Mi rol" + "Tecnologías/Resultados") y un botón final a las evidencias.

## Cómo editar contenido

Todo el texto vive directamente en `index.html`, organizado en bloques
`<section class="panel" id="panel-NOMBRE">` — uno por cada pestaña. Busca el
comentario `<!-- ============ NOMBRE ============ -->` correspondiente y
edita el texto ahí mismo; no necesitas tocar el CSS ni el JS para cambiar
contenido.

### Agregar un enlace de evidencias distinto por proyecto

Actualmente todos los botones "Ver evidencias en Drive" apuntan a la misma
carpeta general de Soportes-CV. Si organizas subcarpetas por proyecto en
Drive, simplemente reemplaza el `href` de cada botón `Ver evidencias en
Drive →` por el enlace de la subcarpeta correspondiente.

### Cambiar colores o tipografía

Todos los valores de color y fuente están centralizados al inicio de
`assets/css/style.css`, dentro de `:root { ... }`. Cambiar un valor ahí
lo actualiza en todo el sitio.
