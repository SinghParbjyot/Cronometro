# /assets — Guía de imágenes
## Carrera Policías Zaragoza 2026

Coloca en esta carpeta los archivos de imagen que se mostrarán en la pantalla.
Si un archivo no existe, el diseño muestra un placeholder azul punteado
y **no se rompe**.

---

## Logos de la cabecera (izquierda / derecha)

| Archivo                  | Descripción                             | Posición         | Tamaño recomendado |
|--------------------------|-----------------------------------------|------------------|--------------------|
| `logo-policia-local.png` | Escudo Policía Local Zaragoza           | Cabecera izquierda | ≥ 200 × 200 px   |
| `logo-ayuntamiento.png`  | Logo Ayuntamiento de Zaragoza           | Cabecera izquierda | ≥ 300 × 120 px   |
| `logo-carrera.png`       | Logo oficial de la carrera / evento     | Cabecera derecha   | ≥ 200 × 200 px   |
| `logo-colaborador.png`   | Colaborador / patrocinador principal    | Cabecera derecha   | ≥ 200 × 120 px   |

## Patrocinadores del pie de página (izquierda / derecha)

| Archivo             | Descripción        | Posición       | Tamaño recomendado |
|---------------------|--------------------|----------------|--------------------|
| `sponsor-1.png`     | Patrocinador 1     | Pie izquierda  | ≥ 150 × 80 px     |
| `sponsor-2.png`     | Patrocinador 2     | Pie izquierda  | ≥ 150 × 80 px     |
| `colaborador-1.png` | Colaborador 1      | Pie derecha    | ≥ 150 × 80 px     |
| `colaborador-2.png` | Colaborador 2      | Pie derecha    | ≥ 150 × 80 px     |

## Fondo (opcional)

| Archivo     | Descripción                                     |
|-------------|-------------------------------------------------|
| `fondo.jpg` | Imagen de fondo para toda la pantalla (opcional) |

Para activar la imagen de fondo:
1. Coloca el archivo `fondo.jpg` en esta carpeta.
2. Abre `styles.css`.
3. Busca la línea `/* url('assets/fondo.jpg') */` y elimina los comentarios `/* */`.

---

## Recomendaciones para las imágenes

- **Formato preferido**: PNG con fondo transparente (alfa) o SVG.
- Los logos se adaptan automáticamente: mantienen proporción y no se deforman.
- Altura máxima en cabecera: **78 px** (el navegador escala hacia abajo si el archivo es mayor).
- Altura máxima en pie de página: **48 px**.
- Para pantallas LED de alta resolución, usa imágenes de al menos **el doble** del tamaño mínimo indicado.
- Logos con fondo blanco quedarán visibles pero con esquinas blancas sobre el fondo oscuro; se recomienda siempre usar PNG transparente.

---

## Añadir más logos

Para añadir logos extra a la cabecera o al pie, edita `index.html`:

- **Cabecera izquierda**: busca `<!-- LOGOS IZQUIERDA -->` y añade un bloque `<div class="logo-box">`.
- **Cabecera derecha**: busca `<!-- LOGOS DERECHA -->` e igual.
- **Pie de página**: busca `<div class="sponsors sponsors-left">` o `sponsors-right` y añade un bloque `<div class="sponsor-box">`.

Ejemplo de bloque para un logo nuevo:

```html
<div class="logo-box" title="Nombre del logo">
  <img
    src="assets/mi-logo.png"
    alt="Nombre del logo"
    class="logo-img"
    onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
  <div class="logo-fallback" style="display:none">
    <span>Nombre</span>
  </div>
</div>
```
