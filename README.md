# Yol1 Business — demo visual

Demo conceptual frontend para mostrar una plataforma financiera B2B-first centrada en una cuenta madre y cuentas virtuales por usuario final.

## Ejecutar localmente

```bash
npm install
npm run dev
```

Para validar el build:

```bash
npm run build
npm run preview
```

## Publicar en GitHub

```bash
git init
git add .
git commit -m "Initial Yol1 Business demo"
git branch -M main
git remote add origin https://github.com/bahumadap/yol1-demo.git
git push -u origin main
```

Luego importa el repositorio desde Vercel. Vercel detectará Vite y utilizará:

- Build command: `npm run build`
- Output directory: `dist`

## Stack

- React + Vite
- Lucide React
- Recharts
- CSS responsive propio

Toda la información y las acciones son mockeadas. La demo no utiliza backend, APIs reales, autenticación ni procesa transacciones.
