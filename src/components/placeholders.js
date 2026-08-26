// Imágenes de relleno generadas como SVG en línea (data URI).
// Así no dependemos de servicios externos como via.placeholder.com
// (que dejó de funcionar) para mostrar pósters/fondos faltantes.

const posterSvg =
  "<svg xmlns='http://www.w3.org/2000/svg' width='342' height='513' viewBox='0 0 342 513'>" +
  "<defs><linearGradient id='g' x1='0' y1='0' x2='0' y2='1'>" +
  "<stop offset='0' stop-color='#262626'/><stop offset='1' stop-color='#161616'/>" +
  "</linearGradient></defs>" +
  "<rect width='342' height='513' fill='url(#g)'/>" +
  "<g fill='none' stroke='#4a4a4a' stroke-width='2'>" +
  "<rect x='129' y='185' width='84' height='64' rx='4'/>" +
  "<circle cx='148' cy='206' r='8'/>" +
  "<path d='M200 245 L142 245 L165 212 L185 232 L198 216 L200 220 Z' fill='#4a4a4a' stroke='none'/>" +
  "</g>" +
  "<text x='171' y='300' font-family='Arial,Helvetica,sans-serif' font-size='22' fill='#7a7a7a' text-anchor='middle'>Sin póster</text>" +
  "</svg>"

const backdropSvg =
  "<svg xmlns='http://www.w3.org/2000/svg' width='1280' height='720' viewBox='0 0 1280 720'>" +
  "<defs><linearGradient id='g' x1='0' y1='0' x2='0' y2='1'>" +
  "<stop offset='0' stop-color='#1c1c1c'/><stop offset='1' stop-color='#0c0c0c'/>" +
  "</linearGradient></defs>" +
  "<rect width='1280' height='720' fill='url(#g)'/>" +
  "<text x='640' y='370' font-family='Arial,Helvetica,sans-serif' font-size='34' fill='#4a4a4a' text-anchor='middle'>Sin imagen de fondo</text>" +
  "</svg>"

export const PLACEHOLDER_POSTER = `data:image/svg+xml,${encodeURIComponent(posterSvg)}`
export const PLACEHOLDER_BACKDROP = `data:image/svg+xml,${encodeURIComponent(backdropSvg)}`
