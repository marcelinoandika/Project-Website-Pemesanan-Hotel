# Serenity Hotel & Spa - Website Pemesanan Hotel

Website pemesanan hotel modern yang dibangun dengan **React** dan **Vite**.

## 🚀 Fitur

- ✨ UI/UX modern dengan desain elegan
- 📱 Responsive design (mobile-friendly)
- 🎯 Formulir pemesanan dengan perhitungan harga real-time
- 🏨 Tampilan berbagai tipe kamar
- 🖼️ Galeri foto dengan carousel
- 🎵 Background music toggle
- ♿ Accessible (ARIA labels, keyboard navigation)

## 🛠️ Teknologi

- **React 18** - Framework JavaScript untuk UI
- **Vite** - Build tool yang cepat
- **Vanilla CSS** - Styling tanpa framework CSS

## 📦 Instalasi

1. Install dependencies:
```bash
npm install
```

2. Jalankan development server:
```bash
npm run dev
```

3. Build untuk production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## 💰 Fitur Perhitungan Harga

Formulir pemesanan secara otomatis menghitung harga berdasarkan:
- **Tipe Kamar**: Standard (Rp 850.000), Deluxe (Rp 1.350.000), Suite (Rp 2.600.000)
- **Durasi Menginap**: Berdasarkan selisih tanggal check-in dan check-out
- **Jumlah Tamu**: Tambahan biaya untuk tamu ekstra (lebih dari 2 orang)
- **Pajak**: 10% dari total harga

Harga akan ter-update secara real-time saat pengguna mengubah:
- Tanggal check-in/check-out
- Tipe kamar
- Jumlah tamu

## 📁 Struktur Project

```
Project-Website-Pemesanan-Hotel/
├── src/
│   ├── components/      # Komponen React
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── BookingForm.jsx  # Form dengan perhitungan harga
│   │   └── ...
│   ├── App.jsx         # Komponen utama
│   ├── main.jsx        # Entry point
│   └── styles.css      # Global styles
├── Assets/             # Gambar, video, audio
├── index.html
├── package.json
└── vite.config.js
```

## 🎨 Komponen Utama

- **BookingForm**: Formulir pemesanan dengan perhitungan harga real-time
- **Rooms**: Daftar kamar dengan filter
- **Gallery**: Carousel galeri foto
- **Hero**: Hero section dengan video slider
- **AvailabilityForm**: Form cek ketersediaan kamar

## 📝 Catatan

- Pastikan file Assets (gambar, video, audio) berada di folder `public/Assets/` atau `Assets/` di root project
- Website ini menggunakan React Hooks untuk state management
- Semua interaksi menggunakan React state dan effects

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)


