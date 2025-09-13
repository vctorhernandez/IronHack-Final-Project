# 📦 MyItems

Aplicación CRUD fullstack (**Angular + Node/Express + SQLite**).

Permite:
- Crear, listar, buscar, ver, editar y borrar **Items**.
- Filtrado por `title` y `tags` vía `?search=...`.
- Paginación en servidor (`page`, `pageSize`).
- Frontend Angular con listado, detalle, formularios y manejo de errores.
- Botón **“Probar conexión”** que consulta `GET /api/health`.

---

## 🚀 Requisitos

- [Node.js **20 LTS**](https://nodejs.org/) (recomendado para evitar problemas con `better-sqlite3`)  
- [npm](https://www.npmjs.com/) (incluido con Node)  
- [Angular CLI](https://angular.io/cli) para el frontend:

```bash
npm install -g @angular/cli
```

---

## ⚙️ Variables de entorno

Copia el archivo `.env.example` en `backend/` y renómbralo a `.env`:

```env
NODE_ENV=development   # valores: development | test | production
PORT=3000
DATABASE_URL=./data.sqlite3
```

---

## 📂 Estructura del proyecto

```
myitems/
├─ backend/       # API Node + Express + SQLite
│  ├─ src/...
│  ├─ sql/init.sql
│  ├─ .env
│  └─ package.json
└─ frontend/      # Angular app
   ├─ src/...
   ├─ .env (opcional)
   └─ package.json
```

---

## ▶️ Arranque local

### 1. Backend
```bash
cd backend
npm install
cp .env.example .env   # en Windows: copy .env.example .env
npm run dev
```

La API estará disponible en: [http://localhost:3000](http://localhost:3000)

### 2. Frontend
```bash
cd frontend
npm install
npm start
```

El frontend estará disponible en: [http://localhost:4200](http://localhost:4200)

---

## 🌐 Rutas Backend

### Health
- `GET /api/health` → Estado de conexión con DB  
  Respuesta:
  ```json
  { "status": "ok", "db": "connected" }
  ```

### Items CRUD

- **Listar con búsqueda + paginación**
  ```
  GET /api/items?search=phone&page=1&pageSize=5
  ```
  Parámetros:
  - `search` (opcional): filtra por título o tags
  - `page` (default 1)
  - `pageSize` (default 10)

- **Detalle**
  ```
  GET /api/items/:id
  ```

- **Crear**
  ```
  POST /api/items
  ```
  Body JSON:
  ```json
  {
    "title": "Mi item",
    "description": "texto opcional",
    "tags": ["tag1", "tag2"]
  }
  ```

- **Actualizar**
  ```
  PUT /api/items/:id
  ```
  Body JSON parcial:
  ```json
  {
    "title": "Nuevo título"
  }
  ```

- **Borrar**
  ```
  DELETE /api/items/:id
  ```

---

## 🧪 Pruebas

En el backend:
```bash
cd backend
npm test
```

---

## 📌 Notas

- **DB SQLite**: el archivo se genera automáticamente en la ruta indicada en `.env` (`SQLITE_PATH`).  
- **Errores API**: el frontend debe capturarlos y mostrar mensajes claros en caso de `400`, `404` o `500`.  
- **Commits**: pequeños y con mensajes claros. El repo debe ser público.  
