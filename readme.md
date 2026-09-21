
# 📚 Fundamental Data Structures & Algorithms

Dokumen ini berisi panduan, analisis, dan implementasi dari struktur data dasar yang wajib dikuasai sebelum mendalami rekayasa perangkat lunak lanjutan, pemrograman berorientasi objek, maupun perancangan sistem (*system design*).

---

## 📌 Daftar Isi

- [1. Ringkasan Singkat (TL;DR)](#1-ringkasan-singkat-tldr)
- [2. Linked List](#2-linked-list)
- [3. Queue (Antrean)](#3-queue-antrean)
- [4. Stack (Tumpukan)](#4-stack-tumpukan)
- [5. Analisis Kompleksitas Kinerja (Big-O)](#5-analisis-kompleksitas-kinerja-big-o)
- [6. Mengapa Penting Sebelum Coding Sistem Kompleks?](#6-mengapa-penting-sebelum-coding-sistem-kompleks)

---

## 1. Ringkasan Singkat (TL;DR)

Struktur data adalah cara kita mengatur, menyimpan, dan mengelola data di dalam memori komputer agar dapat diakses dan dimanipulasi secara efisien.

| Struktur Data         | Prinsip Utama                            | Alokasi Memori                   | Kasus Penggunaan Utama                            |
| :-------------------- | :--------------------------------------- | :------------------------------- | :------------------------------------------------ |
| **Linked List** | Pointer ke Node berikutnya               | Dinamis (Non-sekuensial)         | Manajemen memori, Undo/Redo, dasar Stack/Queue    |
| **Queue**       | **FIFO** (*First-In, First-Out*) | Kontigu (Array) / Dinamis (List) | Message Broker, Task Scheduling, Job Queue        |
| **Stack**       | **LIFO** (*Last-In, First-Out*)  | Kontigu (Array) / Dinamis (List) | Call Stack (Recursion), Syntax Parsing, Undo/Redo |

---

## 2. Linked List

`Linked List` adalah struktur data linear di mana elemen-elemennya (*Node*) tidak disimpan pada alamat memori yang berurutan. Setiap *Node* terdiri dari dua bagian utama:

1. **Data**: Nilai/informasi yang disimpan.
2. **Next Pointer**: Alamat memori yang menunjuk ke *Node* selanjutnya.


[ Push / Enqueue ]                        [ Pop / Dequeue ]
           │                                         ▲
           ▼                                         │
    ┌─────────────┬─────────────┬─────────────┬─────────────┐
    │   Item 4    │   Item 3    │   Item 2    │   Item 1    │
    └─────────────┴─────────────┴─────────────┴─────────────┘
    [ REAR ]                                  [ FRONT ]

### Operasi Utama

* **Enqueue**: Menambahkan elemen ke bagian belakang (*Rear*).
* **Dequeue**: Menghapus dan mengembalikan elemen dari bagian depan (*Front*).
* **Peek/Front**: Melihat elemen paling depan tanpa menghapusnya.

### Variasi Queue

1. **Circular Queue**: Memanfaatkan kembali ruang kosong di awal array saat elemen didequeue.
2. **Priority Queue**: Elemen didequeue berdasarkan tingkat prioritas, bukan urutan kedatangan (biasanya diimplementasikan menggunakan *Heap*).

---

## 4. Stack (Tumpukan)

`Stack` adalah struktur data berbasis prinsip **LIFO (Last-In, First-Out)**—elemen yang terakhir dimasukkan adalah yang pertama kali dikeluarkan, seperti tumpukan piring.

       ┌───────────┐
       │  Item 3   │  ◄── [ TOP ] (Masuk terakhir, Keluar pertama)
       ├───────────┤
       │  Item 2   │
       ├───────────┤
       │  Item 1   │
       └───────────┘

### Operasi Utama

* **Push**: Menambahkan elemen ke posisi paling atas (*Top*).
* **Pop**: Menghapus dan mengambil elemen dari posisi paling atas (*Top*).
* **Peek/Top**: Melihat elemen teratas tanpa menghapusnya.

---

## 5. Analisis Kompleksitas Kinerja (Big-O)

Berikut adalah perbandingan kompleksitas waktu untuk operasi-operasi dasar:

| Struktur Data                | Access (Akses) | Search (Pencarian) | Insertion (Sisip) | Deletion (Hapus) |
| :--------------------------- | :------------: | :----------------: | :---------------: | :--------------: |
| **Array**              |    $O(1)$    |      $O(N)$      |     $O(N)$     |     $O(N)$     |
| **Singly Linked List** |    $O(N)$    |      $O(N)$      |    $O(1)^*$    |    $O(1)^*$    |
| **Queue**              |    $O(N)$    |      $O(N)$      |     $O(1)$     |     $O(1)$     |
| **Stack**              |    $O(N)$    |      $O(N)$      |     $O(1)$     |     $O(1)$     |

> `*` *Catatan untuk Linked List:* Insertion/Deletion bernilai $O(1)$ jika kita sudah memegang pointer/referensi ke node target (misal di Head/Tail).

---

## 6. Mengapa Penting Sebelum Coding Sistem Kompleks?

Memahami struktur data dasar memberikan pola pikir logis dalam penyelesaian masalah (*problem-solving*):

1. **Efisiensi Penggunaan Memori**: Membantu menentukan kapan harus menggunakan *contiguous memory* (Array) dan kapan menggunakan *heap allocation* yang fleksibel (Linked List).
2. **Pola Pemrosesan Asinkron**: Konsep *Queue* menjadi dasar teknis dalam arsitektur sistem modern seperti *Message Queue* (RabbitMQ, Apache Kafka, Redis Queue).
3. **Eksekusi & State Management**: Konsep *Stack* membantu memahami bagaimana *runtime engine* (seperti V8 Node.js, JVM, atau PHP Zend Engine) mengelola *call stack*, fungsi rekursif, dan pemanggilan variabel lokal.
