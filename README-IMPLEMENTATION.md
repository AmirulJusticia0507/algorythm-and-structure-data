# Data Structures Implementation - Node.js + React + PostgreSQL

Full-stack aplikasi visualisasi struktur data fundamental: **Linked List**, **Queue (FIFO)**, dan **Stack (LIFO)**.

## 🏗️ Arsitektur

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   React     │────▶│  Node.js    │────▶│ PostgreSQL  │
│  Frontend   │ API │  Backend    │     │  Database   │
│  (Port 5173)│     │  (Port 3001)│     │  (Port 5432)│
└─────────────┘     └─────────────┘     └─────────────┘
```

## 🚀 Quick Start dengan Docker (Recommended)

```bash
# Clone dan masuk ke directory
cd algorythm-and-structure-data

# Jalankan semua services
docker-compose up -d

# Cek logs
docker-compose logs -f

# Akses aplikasi
# Frontend: http://localhost:5173
# Backend API: http://localhost:3001
# API Docs: http://localhost:3001/api
```

## 🔧 Manual Setup (Tanpa Docker)

### Prerequisites
- Node.js 18+
- PostgreSQL 14+

### 1. Setup Database
```bash
# Buat database
createdb datastructures

# Jalankan schema
psql -d datastructures -f database/schema.sql
```

### 2. Backend
```bash
cd backend
cp .env.example .env  # Edit jika perlu
npm install
npm run db:init       # Inisialisasi tabel (optional, sudah di schema.sql)
npm run dev
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📚 API Endpoints

### Linked List
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| POST | `/api/linked-list` | Buat linked list baru |
| GET | `/api/linked-list/:listId` | Ambil semua node |
| GET | `/api/linked-list/:listId/head` | Ambil head node |
| POST | `/api/linked-list/:listId/head` | Insert di head |
| POST | `/api/linked-list/:listId/tail` | Insert di tail |
| POST | `/api/linked-list/:listId/position` | Insert di posisi tertentu |
| DELETE | `/api/linked-list/:listId/position/:position` | Hapus di posisi |
| DELETE | `/api/linked-list/:listId/head` | Hapus head |
| DELETE | `/api/linked-list/:listId/tail` | Hapus tail |
| GET | `/api/linked-list/:listId/search?value=x` | Cari nilai |
| GET | `/api/linked-list/:listId/size` | Ukuran list |
| DELETE | `/api/linked-list/:listId/clear` | Kosongkan list |
| DELETE | `/api/linked-list/:listId` | Hapus list |
| GET | `/api/linked-list/:listId/array` | Export ke array |

### Queue (FIFO)
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| POST | `/api/queue` | Buat queue baru |
| GET | `/api/queue/:queueId` | Ambil semua item |
| POST | `/api/queue/:queueId/enqueue` | Tambah ke rear |
| POST | `/api/queue/:queueId/dequeue` | Hapus dari front |
| GET | `/api/queue/:queueId/peek` | Lihat front |
| GET | `/api/queue/:queueId/size` | Ukuran queue |
| GET | `/api/queue/:queueId/empty` | Cek kosong |
| DELETE | `/api/queue/:queueId/clear` | Kosongkan |
| DELETE | `/api/queue/:queueId` | Hapus queue |
| GET | `/api/queue/:queueId/search?value=x` | Cari nilai |
| GET | `/api/queue/:queueId/array` | Export ke array |

### Stack (LIFO)
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| POST | `/api/stack` | Buat stack baru |
| GET | `/api/stack/:stackId` | Ambil semua item (top first) |
| POST | `/api/stack/:stackId/push` | Push ke top |
| POST | `/api/stack/:stackId/pop` | Pop dari top |
| GET | `/api/stack/:stackId/peek` | Lihat top |
| GET | `/api/stack/:stackId/size` | Ukuran stack |
| GET | `/api/stack/:stackId/empty` | Cek kosong |
| DELETE | `/api/stack/:stackId/clear` | Kosongkan |
| DELETE | `/api/stack/:stackId` | Hapus stack |
| GET | `/api/stack/:stackId/search?value=x` | Cari nilai |
| GET | `/api/stack/:stackId/array` | Export ke array |

## 💾 Database Schema

```sql
-- Linked List: Node dengan pointer ke next
linked_list_nodes (id, list_id, value, next_node_id, position)

-- Queue: Array-like dengan position
queue_items (id, queue_id, value, position)

-- Stack: Array-like dengan position (top = max position)
stack_items (id, stack_id, value, position)

-- Metadata
data_structures (id, type, name, created_at, updated_at)
```

## 🎨 Fitur Frontend

- **Visualisasi Interaktif**: Lihat struktur data secara real-time
- **Operasi Lengkap**: Insert, Delete, Search, Peek, dll
- **Complexity Reference**: Tabel Big-O di sidebar
- **Persistent Storage**: Data tersimpan di PostgreSQL
- **Multiple Instances**: Buat multiple list/queue/stack dengan ID berbeda
- **Responsive Design**: Works di mobile & desktop

## 🧪 Testing API Manual

```bash
# Buat linked list
curl -X POST http://localhost:3001/api/linked-list \
  -H "Content-Type: application/json" \
  -d '{"listId": "mylist", "name": "Test List"}'

# Insert head
curl -X POST http://localhost:3001/api/linked-list/mylist/head \
  -H "Content-Type: application/json" \
  -d '{"value": "First Node"}'

# Insert tail
curl -X POST http://localhost:3001/api/linked-list/mylist/tail \
  -H "Content-Type: application/json" \
  -d '{"value": "Last Node"}'

# Lihat semua
curl http://localhost:3001/api/linked-list/mylist
```

## 📁 Struktur Project

```
algorythm-and-structure-data/
├── backend/
│   ├── src/
│   │   ├── config/db.js          # PostgreSQL connection pool
│   │   ├── config/initDb.js      # Database initialization
│   │   ├── services/             # Business logic
│   │   │   ├── linkedList.js
│   │   │   ├── queue.js
│   │   │   └── stack.js
│   │   ├── controllers/          # Request handlers
│   │   ├── routes/               # API routes
│   │   └── index.js              # Express app entry
│   ├── package.json
│   ├── .env
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/           # React components
│   │   ├── hooks/                # Custom hooks (useLinkedList, useQueue, useStack)
│   │   ├── services/api.js       # API client
│   │   ├── App.jsx               # Main app
│   │   ├── main.jsx              # Entry point
│   │   └── styles.css            # Global styles
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── Dockerfile
├── database/
│   └── schema.sql
├── docker-compose.yml
└── README-IMPLEMENTATION.md
```

## 🔑 Konsep yang Diimplementasikan

### Linked List
- Node dengan `value` + `next_node_id` (pointer)
- Operasi: Insert head/tail/position, Delete head/tail/position
- Traversal via `next_node_id` foreign key

### Queue (FIFO)
- `enqueue`: Insert di `MAX(position) + 1` (rear)
- `dequeue`: Delete `MIN(position)` (front), lalu shift positions
- `peek`: Lihat front tanpa hapus

### Stack (LIFO)
- `push`: Insert di `MAX(position) + 1` (top)
- `pop`: Delete `MAX(position)` (top)
- `peek`: Lihat top tanpa hapus

## 🐛 Troubleshooting

**Database connection error:**
```bash
# Cek PostgreSQL running
docker-compose logs postgres

# Reset database
docker-compose down -v
docker-compose up -d
```

**Port already in use:**
```bash
# Ganti port di docker-compose.yml atau .env
# Backend: PORT=3001
# Frontend: 5173
```

**Module not found:**
```bash
# Reinstall dependencies
cd backend && rm -rf node_modules package-lock.json && npm install
cd frontend && rm -rf node_modules package-lock.json && npm install
```

## 📖 Referensi Teori

Lihat `readme.md` untuk penjelasan teori:
- Linked List: Pointer-based, dynamic allocation
- Queue: FIFO, message broker pattern
- Stack: LIFO, call stack management
- Big-O Complexity Analysis
- Use Cases in System Design