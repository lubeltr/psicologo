# Lic. María Victoria Romero · Propuesta web

Sitio estático editorial para la Lic. María Victoria Romero, psicóloga, MP 15864. Enfoque integrativo; jóvenes y adultos; atención presencial en zona centro de Córdoba Capital y virtual en Argentina.

## Vista previa

Abrir `index.html` en un navegador. El archivo incluye los estilos, el JavaScript, las fotografías y las tipografías; no requiere instalación ni conexión a servicios externos.

Para revisar mediante servidor local:

```sh
cd /workspace/psicologo
python3 -m http.server 3001 --bind 0.0.0.0
```

## Edición

- `index.source.html`: estructura y textos editables.
- `styles.css`: sistema visual Instrument Serif / DM Sans.
- `script.js`: menú móvil accesible, navegación, apariciones y respuesta táctil.
- `assets/`: fotografías, fuentes y licencias.
- `python3 build.py`: regenera el `index.html` autónomo después de editar las fuentes.

Sin paquetes npm, framework, analítica, formularios ni servidor de aplicación. No hay paso de compilación externo; el ensamblado solo usa la biblioteca estándar de Python.

## Antes de publicar

Esta es una propuesta comercial de demostración. El retrato y los interiores son fotografías ilustrativas de stock, no imágenes de la profesional ni de su consultorio. Sus aclaraciones están visibles en la página. Sustituirlas por material real autorizado cuando esté disponible.

Validar con Victoria los textos en primera persona, la descripción general del enfoque y los tres pasos propuestos de contacto y coordinación. Confirmar el número de WhatsApp, la matrícula, el público y las modalidades facilitados para la propuesta. No se agregaron universidades, trayectoria, técnicas específicas, honorarios, duración de sesiones, obras sociales, políticas ni testimonios.

Al conocer la dirección de publicación definitiva, añadir el canonical y `og:url`, y convertir `og:image` a la URL absoluta de una imagen aprobada para compartir. Los metadatos de título, descripción, idioma y Open Graph ya están incluidos. No publicar fotografías de stock como retratos auténticos ni como evidencia del espacio de atención.

## Recursos

Ver `assets/CREDITS.md` y las licencias junto a las fuentes y fotografías. Los recursos son locales y no hacen solicitudes a bancos de imágenes o Google Fonts durante la navegación.
