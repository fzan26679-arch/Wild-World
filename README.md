# WILD WORLD — Fondasi Game 2D

Versi fondasi menggunakan **2D side-view** dengan gaya visual smooth.

## Menjalankan game
Karena JavaScript memakai `type="module"`, jalankan melalui server lokal atau hosting statis (jangan hanya membuka `index.html` sebagai file lokal).

Cara mudah:
1. Ekstrak folder `WILD-WORLD`.
2. Buka folder di VS Code.
3. Jalankan ekstensi Live Server pada `index.html`, atau unggah seluruh isi folder ke hosting statis.
4. Buka URL yang diberikan server/hosting.

## Struktur
- `index.html`: layar dan komponen UI.
- `style.css`: seluruh tampilan.
- `js/main.js`: titik masuk aplikasi.
- `js/config.js`: pengaturan dasar game.
- `js/state.js`: data pemain, dunia, inventaris.
- `js/ui.js`: menu, layar dunia, jeda, pengaturan.
- `js/world.js`: loop permainan dan objek dunia.
- `js/player.js`: gerakan dan lompatan.
- `js/renderer.js`: gambar dunia side-view.
- `js/time.js`: siklus siang dan malam.
- `js/hud.js`: status dan jam.
- `js/inventory.js`: inventaris awal.
- `js/controls.js`: keyboard dan kontrol sentuh.
- `assets/`: tempat sprite, gambar, dan audio berikutnya.
- `maps/`: tempat data peta berikutnya.

## Kontrol
- A / D atau panah kiri/kanan: bergerak.
- Spasi / W / panah atas: melompat.
- Tombol layar: kontrol sentuh.
- Ambil: kumpulkan kayu, daun, atau batu saat dekat objek.
- Tas: buka inventaris.

## Catatan
Ini adalah fondasi awal yang bisa dimainkan, bukan game lengkap. Sistem crafting penuh, 20 spesies hewan, Tamer, pertarungan, penyimpanan progres per dunia, dan banyak fitur lain masih akan dibangun bertahap. Tidak ada aset gambar eksternal yang diwajibkan untuk menjalankan versi ini.
