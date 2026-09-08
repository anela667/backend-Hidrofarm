const seedPlanting = async (db) => {
  const plantIds = await new Promise((resolve, reject) => {
    db.query("SELECT id, name FROM plant", (error, results) => {
      if (error) return reject(error);
      const map = {};
      results.forEach((row) => {
        map[row.name] = row.id;
      });
      resolve(map);
    });
  });

  const sawiId = plantIds["Sawi"];
  const seladaId = plantIds["Selada"];
  const tomatCeriId = plantIds["Tomat Ceri"];

  if (!sawiId || !seladaId || !tomatCeriId) {
    console.error(
      "Tidak semua tanaman ditemukan di tabel plant (jalankan seed plant.js dulu). Ditemukan:",
      plantIds
    );
    return;
  }

  // Jadwal dasar ini ditulis untuk metode Wick System. Jadwal untuk metode
  // NFT dibuat otomatis di bawah (buildNftVariant) dengan menyesuaikan
  // istilah & langkah spesifik wick menjadi langkah spesifik NFT (pompa,
  // aliran nutrisi, kebersihan talang/pipa), supaya kegiatan yang tampil
  // di kalender benar-benar mengikuti metode yang dipilih user.
  const wickData = [
    [sawiId, 0, 'Pagi', 'Siapkan media tanam (rockwool/cocopeat) yang lembab. Tempatkan benih sawi di atasnya.'],
    [sawiId, 1, 'Pagi', 'Siapkan media tanam (rockwool/cocopeat) yang lembab. Tempatkan benih sawi di atasnya.'],
    [sawiId, 2, 'Pagi', 'Setiap hari cek kelembaban media tanam, semprot sedikit air jika mengering.'],
    [sawiId, 3, 'Pagi', 'Setiap hari cek kelembaban media tanam, semprot sedikit air jika mengering.'],
    [sawiId, 4, 'Pagi', 'Setiap hari cek kelembaban media tanam, semprot sedikit air jika mengering.'],
    [sawiId, 5, 'Pagi', 'Setiap hari cek kelembaban media tanam, semprot sedikit air jika mengering.'],
    [sawiId, 6, 'Pagi', 'Pindahkan benih berkecambah ke wadah hidroponik wick system. Siapkan larutan nutrisi pertama.'],
    [sawiId, 7, 'Pagi', 'Periksa jumlah larutan nutrisi dan pH (idealnya 5.5-6.5). Tambahkan nutrisi jika berkurang.'],
    [sawiId, 8, 'Pagi', 'Cek volume nutrisi dan pH harian, periksa kondisi daun dan batang dari hama.'],
    [sawiId, 9, 'Pagi', 'Cek volume nutrisi dan pH harian, periksa kondisi daun dan batang dari hama.'],
    [sawiId, 10, 'Pagi', 'Cek volume nutrisi dan pH harian, periksa kondisi daun dan batang dari hama.'],
    [sawiId, 11, 'Pagi', 'Cek volume nutrisi dan pH harian, periksa kondisi daun dan batang dari hama.'],
    [sawiId, 12, 'Pagi', 'Cek volume nutrisi dan pH harian, periksa kondisi daun dan batang dari hama.'],
    [sawiId, 13, 'Pagi', 'Cek volume nutrisi dan pH harian, periksa kondisi daun dan batang dari hama.'],
    [sawiId, 14, 'Pagi', 'Buang larutan lama dan ganti dengan campuran baru (5 ml larutan A + 5 ml larutan B per 1 liter air).'],
    [sawiId, 15, 'Pagi dan Siang', 'Cek harian nutrisi, pH, posisi wick, dan perhatikan tanda-tanda hama atau penyakit.'],
    [sawiId, 16, 'Pagi dan Siang', 'Cek harian nutrisi, pH, posisi wick, dan perhatikan tanda-tanda hama atau penyakit.'],
    [sawiId, 17, 'Pagi dan Siang', 'Cek harian nutrisi, pH, posisi wick, dan perhatikan tanda-tanda hama atau penyakit.'],
    [sawiId, 18, 'Pagi dan Siang', 'Cek harian nutrisi, pH, posisi wick, dan perhatikan tanda-tanda hama atau penyakit.'],
    [sawiId, 19, 'Pagi dan Siang', 'Cek harian nutrisi, pH, posisi wick, dan perhatikan tanda-tanda hama atau penyakit.'],
    [sawiId, 20, 'Pagi dan Siang', 'Cek harian nutrisi, pH, posisi wick, dan perhatikan tanda-tanda hama atau penyakit.'],
    [sawiId, 21, 'Pagi', 'Ganti dengan larutan nutrisi baru untuk mencegah penumpukan zat yang tidak dibutuhkan.'],
    [sawiId, 22, 'Pagi dan Siang', 'Cek harian nutrisi, pH, dan lakukan pemantauan hama serta kebersihan wick.'],
    [sawiId, 23, 'Pagi dan Siang', 'Cek harian nutrisi, pH, dan lakukan pemantauan hama serta kebersihan wick.'],
    [sawiId, 24, 'Pagi dan Siang', 'Cek harian nutrisi, pH, dan lakukan pemantauan hama serta kebersihan wick.'],
    [sawiId, 25, 'Pagi dan Siang', 'Cek harian nutrisi, pH, dan lakukan pemantauan hama serta kebersihan wick.'],
    [sawiId, 26, 'Pagi dan Siang', 'Cek harian nutrisi, pH, dan lakukan pemantauan hama serta kebersihan wick.'],
    [sawiId, 27, 'Pagi dan Siang', 'Cek harian nutrisi, pH, dan lakukan pemantauan hama serta kebersihan wick.'],
    [sawiId, 28, 'Pagi', 'Buang larutan lama dan ganti dengan larutan baru.'],
    [sawiId, 29, 'Pagi dan Siang', 'Cek nutrisi, pH, dan pastikan tanaman tumbuh seimbang dengan rotasi posisi jika diperlukan.'],
    [sawiId, 30, 'Pagi dan Siang', 'Cek nutrisi, pH, dan pastikan tanaman tumbuh seimbang dengan rotasi posisi jika diperlukan.'],
    [sawiId, 31, 'Pagi dan Siang', 'Cek nutrisi, pH, dan pastikan tanaman tumbuh seimbang dengan rotasi posisi jika diperlukan.'],
    [sawiId, 32, 'Pagi dan Siang', 'Cek nutrisi, pH, dan pastikan tanaman tumbuh seimbang dengan rotasi posisi jika diperlukan.'],
    [sawiId, 33, 'Pagi dan Siang', 'Cek nutrisi, pH, dan pastikan tanaman tumbuh seimbang dengan rotasi posisi jika diperlukan.'],
    [sawiId, 34, 'Pagi dan Siang', 'Cek nutrisi, pH, dan pastikan tanaman tumbuh seimbang dengan rotasi posisi jika diperlukan.'],
    [sawiId, 35, 'Pagi', 'Ganti dengan larutan nutrisi baru. Pastikan konsentrasi dan pH sesuai.'],
    [sawiId, 36, 'Pagi dan Siang', 'Pantau harian nutrisi, pH, cek wick, dan amati tanda-tanda tanaman siap panen (daun besar dan batang kokoh).'],
    [sawiId, 37, 'Pagi dan Siang', 'Pantau harian nutrisi, pH, cek wick, dan amati tanda-tanda tanaman siap panen (daun besar dan batang kokoh).'],
    [sawiId, 38, 'Pagi dan Siang', 'Pantau harian nutrisi, pH, cek wick, dan amati tanda-tanda tanaman siap panen (daun besar dan batang kokoh).'],
    [sawiId, 39, 'Pagi dan Siang', 'Pantau harian nutrisi, pH, cek wick, dan amati tanda-tanda tanaman siap panen (daun besar dan batang kokoh).'],
    [sawiId, 40, 'Pagi dan Siang', 'Pantau harian nutrisi, pH, cek wick, dan amati tanda-tanda tanaman siap panen (daun besar dan batang kokoh).'],
    [sawiId, 41, 'Pagi dan Siang', 'Pantau harian nutrisi, pH, cek wick, dan amati tanda-tanda tanaman siap panen (daun besar dan batang kokoh).'],
    [sawiId, 42, 'Pagi dan Siang', 'Pantau harian nutrisi, pH, cek wick, dan amati tanda-tanda tanaman siap panen (daun besar dan batang kokoh).'],
    [sawiId, 43, 'Pagi dan Siang', 'Pantau harian nutrisi, pH, cek wick, dan amati tanda-tanda tanaman siap panen (daun besar dan batang kokoh).'],
    [sawiId, 44, 'Pagi', 'Panen tanaman sawi dengan cara memotong bagian pangkal atau mencabut seluruh tanaman.'],

    [seladaId, 0, "Pagi", "Penyemaian benih: Siapkan benih selada, tanam di rockwool basah, tempatkan di tempat lembab."],
    [seladaId, 1, "Pagi", "Penyemaian benih: Siapkan benih selada, tanam di rockwool basah, tempatkan di tempat lembab."],
    [seladaId, 2, "Pagi", "Pemeliharaan benih: Semprot rockwool dengan air bersih untuk menjaga kelembapannya."],
    [seladaId, 3, "Pagi", "Pemeliharaan benih: Semprot rockwool dengan air bersih untuk menjaga kelembapannya."],
    [seladaId, 4, "Pagi", "Pemeliharaan benih: Semprot rockwool dengan air bersih untuk menjaga kelembapannya."],
    [seladaId, 5, "Pagi", "Pemeliharaan benih: Semprot rockwool dengan air bersih untuk menjaga kelembapannya."],
    [seladaId, 6, "Pagi", "Pemeliharaan benih: Semprot rockwool dengan air bersih untuk menjaga kelembapannya."],
    [seladaId, 7, "Pagi", "Pemeliharaan benih: Semprot rockwool dengan air bersih untuk menjaga kelembapannya."],
    [seladaId, 8, "Pagi", "Pemeriksaan kecambah: Pastikan benih telah berkecambah dan memiliki 2 daun sejati."],
    [seladaId, 9, "Pagi", "Menyiapkan sistem Wick: Pasang sumbu (kain flanel/kapas) dari net pot ke larutan nutrisi."],
    [seladaId, 10, "Siang", "Pindahkan bibit ke net pot: Letakkan bibit dalam net pot yang berisi rockwool, lalu letakkan di sistem Wick."],
    [seladaId, 11, "Pagi", "Menyiapkan larutan nutrisi: Isi wadah nutrisi dengan larutan."],
    [seladaId, 12, "Pagi", "Pengecekan sistem dan pH: Cek kondisi tanaman dan pH larutan nutrisi (idealnya 5,5-6,5)."],
    [seladaId, 13, "Pagi", "Pengecekan sistem dan pH: Cek kondisi tanaman dan pH larutan nutrisi (idealnya 5,5-6,5)."],
    [seladaId, 14, "Pagi", "Pengecekan sistem dan pH: Cek kondisi tanaman dan pH larutan nutrisi (idealnya 5,5-6,5)."],
    [seladaId, 15, "Pagi", "Pengecekan sistem dan pH: Cek kondisi tanaman dan pH larutan nutrisi (idealnya 5,5-6,5)."],
    [seladaId, 16, "Pagi", "Pengecekan sistem dan pH: Cek kondisi tanaman dan pH larutan nutrisi (idealnya 5,5-6,5)."],
    [seladaId, 17, "Pagi", "Pengecekan sistem dan pH: Cek kondisi tanaman dan pH larutan nutrisi (idealnya 5,5-6,5)."],
    [seladaId, 18, "Pagi", "Pengecekan sistem dan pH: Cek kondisi tanaman dan pH larutan nutrisi (idealnya 5,5-6,5)."],
    [seladaId, 19, "Pagi", "Pengecekan sistem dan pH: Cek kondisi tanaman dan pH larutan nutrisi (idealnya 5,5-6,5)."],
    [seladaId, 20, "Pagi", "Pengecekan sistem dan pH: Cek kondisi tanaman dan pH larutan nutrisi (idealnya 5,5-6,5)."],
    [seladaId, 21, "Pagi", "Penambahan larutan nutrisi: Tambah larutan jika volume berkurang dan sesuaikan dosisnya."],
    [seladaId, 22, "Pagi", "Pemantauan pertumbuhan tanaman: Cek pertumbuhan daun dan batang, pastikan tanaman sehat."],
    [seladaId, 23, "Pagi", "Pemantauan pertumbuhan tanaman: Cek pertumbuhan daun dan batang, pastikan tanaman sehat."],
    [seladaId, 24, "Pagi", "Pemantauan pertumbuhan tanaman: Cek pertumbuhan daun dan batang, pastikan tanaman sehat."],
    [seladaId, 25, "Pagi", "Pemantauan pertumbuhan tanaman: Cek pertumbuhan daun dan batang, pastikan tanaman sehat."],
    [seladaId, 26, "Pagi", "Pemantauan pertumbuhan tanaman: Cek pertumbuhan daun dan batang, pastikan tanaman sehat."],
    [seladaId, 27, "Pagi", "Pemantauan pertumbuhan tanaman: Cek pertumbuhan daun dan batang, pastikan tanaman sehat."],
    [seladaId, 28, "Pagi", "Pemantauan pertumbuhan tanaman: Cek pertumbuhan daun dan batang, pastikan tanaman sehat."],
    [seladaId, 29, "Pagi", "Pemantauan pertumbuhan tanaman: Cek pertumbuhan daun dan batang, pastikan tanaman sehat."],
    [seladaId, 30, "Pagi", "Pemantauan pertumbuhan tanaman: Cek pertumbuhan daun dan batang, pastikan tanaman sehat."],
    [seladaId, 31, "Siang", "Pemupukan lanjutan: Tambahkan larutan nutrisi jika volume berkurang (cek pH dan EC)."],
    [seladaId, 32, "Pagi", "Pemeliharaan rutin: Lakukan pemeriksaan pH dan tambahkan air jika larutan mulai berkurang."],
    [seladaId, 33, "Pagi", "Pemeliharaan rutin: Lakukan pemeriksaan pH dan tambahkan air jika larutan mulai berkurang."],
    [seladaId, 34, "Pagi", "Pemeliharaan rutin: Lakukan pemeriksaan pH dan tambahkan air jika larutan mulai berkurang."],
    [seladaId, 35, "Pagi", "Pemeliharaan rutin: Lakukan pemeriksaan pH dan tambahkan air jika larutan mulai berkurang."],
    [seladaId, 36, "Pagi", "Pemeliharaan rutin: Lakukan pemeriksaan pH dan tambahkan air jika larutan mulai berkurang."],
    [seladaId, 37, "Pagi", "Pemeliharaan rutin: Lakukan pemeriksaan pH dan tambahkan air jika larutan mulai berkurang."],
    [seladaId, 38, "Pagi", "Pemeliharaan rutin: Lakukan pemeriksaan pH dan tambahkan air jika larutan mulai berkurang."],
    [seladaId, 39, "Pagi", "Pemeliharaan rutin: Lakukan pemeriksaan pH dan tambahkan air jika larutan mulai berkurang."],
    [seladaId, 40, "Pagi", "Pemeliharaan rutin: Lakukan pemeriksaan pH dan tambahkan air jika larutan mulai berkurang."],
    [seladaId, 41, "Pagi", "Panen: Periksa apakah selada sudah cukup besar untuk dipanen."],
    [seladaId, 42, "Siang", "Pembersihan sistem: Bersihkan wadah, sumbu, dan seluruh komponen hidroponik."],

    [tomatCeriId, 0, "Pagi", "Penyemaian benih: rendam benih tomat ceri dalam air hangat 3-4 jam, lalu tanam di rockwool/media semai yang lembab, letakkan di tempat hangat dan teduh."],
    [tomatCeriId, 1, "Pagi", "Jaga kelembaban media semai dengan semprot air tipis setiap hari, hindari sinar matahari langsung sampai berkecambah."],
    [tomatCeriId, 2, "Pagi", "Jaga kelembaban media semai dengan semprot air tipis setiap hari, hindari sinar matahari langsung sampai berkecambah."],
    [tomatCeriId, 3, "Pagi", "Jaga kelembaban media semai dengan semprot air tipis setiap hari, hindari sinar matahari langsung sampai berkecambah."],
    [tomatCeriId, 4, "Pagi", "Jaga kelembaban media semai dengan semprot air tipis setiap hari, hindari sinar matahari langsung sampai berkecambah."],
    [tomatCeriId, 5, "Pagi", "Jaga kelembaban media semai dengan semprot air tipis setiap hari, hindari sinar matahari langsung sampai berkecambah."],
    [tomatCeriId, 6, "Pagi", "Jaga kelembaban media semai dengan semprot air tipis setiap hari, hindari sinar matahari langsung sampai berkecambah."],
    [tomatCeriId, 7, "Pagi", "Bibit mulai berkecambah dan tumbuh daun sejati pertama, mulai kenalkan ke sinar matahari pagi/lampu grow light 4-6 jam sehari."],
    [tomatCeriId, 8, "Pagi", "Bibit mulai berkecambah dan tumbuh daun sejati pertama, mulai kenalkan ke sinar matahari pagi/lampu grow light 4-6 jam sehari."],
    [tomatCeriId, 9, "Pagi", "Bibit mulai berkecambah dan tumbuh daun sejati pertama, mulai kenalkan ke sinar matahari pagi/lampu grow light 4-6 jam sehari."],
    [tomatCeriId, 10, "Pagi", "Bibit mulai berkecambah dan tumbuh daun sejati pertama, mulai kenalkan ke sinar matahari pagi/lampu grow light 4-6 jam sehari."],
    [tomatCeriId, 11, "Pagi", "Bibit mulai berkecambah dan tumbuh daun sejati pertama, mulai kenalkan ke sinar matahari pagi/lampu grow light 4-6 jam sehari."],
    [tomatCeriId, 12, "Pagi", "Bibit mulai berkecambah dan tumbuh daun sejati pertama, mulai kenalkan ke sinar matahari pagi/lampu grow light 4-6 jam sehari."],
    [tomatCeriId, 13, "Pagi", "Bibit mulai berkecambah dan tumbuh daun sejati pertama, mulai kenalkan ke sinar matahari pagi/lampu grow light 4-6 jam sehari."],
    [tomatCeriId, 14, "Pagi", "Pindahkan bibit yang sudah punya 2-3 daun sejati ke net pot berisi rockwool, pasang di sistem hidroponik (NFT atau Wick System)."],
    [tomatCeriId, 15, "Pagi", "Berikan larutan nutrisi hidroponik dengan konsentrasi rendah (EC sekitar 1.0-1.5), cek pH larutan idealnya 5.5-6.5 setiap hari."],
    [tomatCeriId, 16, "Pagi", "Berikan larutan nutrisi hidroponik dengan konsentrasi rendah (EC sekitar 1.0-1.5), cek pH larutan idealnya 5.5-6.5 setiap hari."],
    [tomatCeriId, 17, "Pagi", "Berikan larutan nutrisi hidroponik dengan konsentrasi rendah (EC sekitar 1.0-1.5), cek pH larutan idealnya 5.5-6.5 setiap hari."],
    [tomatCeriId, 18, "Pagi", "Berikan larutan nutrisi hidroponik dengan konsentrasi rendah (EC sekitar 1.0-1.5), cek pH larutan idealnya 5.5-6.5 setiap hari."],
    [tomatCeriId, 19, "Pagi", "Berikan larutan nutrisi hidroponik dengan konsentrasi rendah (EC sekitar 1.0-1.5), cek pH larutan idealnya 5.5-6.5 setiap hari."],
    [tomatCeriId, 20, "Pagi", "Berikan larutan nutrisi hidroponik dengan konsentrasi rendah (EC sekitar 1.0-1.5), cek pH larutan idealnya 5.5-6.5 setiap hari."],
    [tomatCeriId, 21, "Pagi dan Siang", "Naikkan konsentrasi nutrisi bertahap (EC 1.5-2.0), pasang ajir/tali penyangga karena batang mulai memanjang."],
    [tomatCeriId, 22, "Pagi dan Siang", "Naikkan konsentrasi nutrisi bertahap (EC 1.5-2.0), pasang ajir/tali penyangga karena batang mulai memanjang."],
    [tomatCeriId, 23, "Pagi dan Siang", "Naikkan konsentrasi nutrisi bertahap (EC 1.5-2.0), pasang ajir/tali penyangga karena batang mulai memanjang."],
    [tomatCeriId, 24, "Pagi dan Siang", "Naikkan konsentrasi nutrisi bertahap (EC 1.5-2.0), pasang ajir/tali penyangga karena batang mulai memanjang."],
    [tomatCeriId, 25, "Pagi dan Siang", "Naikkan konsentrasi nutrisi bertahap (EC 1.5-2.0), pasang ajir/tali penyangga karena batang mulai memanjang."],
    [tomatCeriId, 26, "Pagi dan Siang", "Naikkan konsentrasi nutrisi bertahap (EC 1.5-2.0), pasang ajir/tali penyangga karena batang mulai memanjang."],
    [tomatCeriId, 27, "Pagi dan Siang", "Naikkan konsentrasi nutrisi bertahap (EC 1.5-2.0), pasang ajir/tali penyangga karena batang mulai memanjang."],
    [tomatCeriId, 28, "Pagi dan Siang", "Lakukan pewiwilan (buang tunas air di ketiak daun) secara rutin agar tanaman fokus tumbuh ke atas, cek hama seperti kutu daun."],
    [tomatCeriId, 29, "Pagi dan Siang", "Lakukan pewiwilan (buang tunas air di ketiak daun) secara rutin agar tanaman fokus tumbuh ke atas, cek hama seperti kutu daun."],
    [tomatCeriId, 30, "Pagi dan Siang", "Lakukan pewiwilan (buang tunas air di ketiak daun) secara rutin agar tanaman fokus tumbuh ke atas, cek hama seperti kutu daun."],
    [tomatCeriId, 31, "Pagi dan Siang", "Lakukan pewiwilan (buang tunas air di ketiak daun) secara rutin agar tanaman fokus tumbuh ke atas, cek hama seperti kutu daun."],
    [tomatCeriId, 32, "Pagi dan Siang", "Lakukan pewiwilan (buang tunas air di ketiak daun) secara rutin agar tanaman fokus tumbuh ke atas, cek hama seperti kutu daun."],
    [tomatCeriId, 33, "Pagi dan Siang", "Lakukan pewiwilan (buang tunas air di ketiak daun) secara rutin agar tanaman fokus tumbuh ke atas, cek hama seperti kutu daun."],
    [tomatCeriId, 34, "Pagi dan Siang", "Lakukan pewiwilan (buang tunas air di ketiak daun) secara rutin agar tanaman fokus tumbuh ke atas, cek hama seperti kutu daun."],
    [tomatCeriId, 35, "Pagi dan Siang", "Tanaman mulai berbunga, bantu penyerbukan dengan menggoyangkan tangkai bunga atau sikat lembut tiap pagi karena tidak ada serangga penyerbuk di dalam ruangan."],
    [tomatCeriId, 36, "Pagi dan Siang", "Tanaman mulai berbunga, bantu penyerbukan dengan menggoyangkan tangkai bunga atau sikat lembut tiap pagi karena tidak ada serangga penyerbuk di dalam ruangan."],
    [tomatCeriId, 37, "Pagi dan Siang", "Tanaman mulai berbunga, bantu penyerbukan dengan menggoyangkan tangkai bunga atau sikat lembut tiap pagi karena tidak ada serangga penyerbuk di dalam ruangan."],
    [tomatCeriId, 38, "Pagi dan Siang", "Tanaman mulai berbunga, bantu penyerbukan dengan menggoyangkan tangkai bunga atau sikat lembut tiap pagi karena tidak ada serangga penyerbuk di dalam ruangan."],
    [tomatCeriId, 39, "Pagi dan Siang", "Tanaman mulai berbunga, bantu penyerbukan dengan menggoyangkan tangkai bunga atau sikat lembut tiap pagi karena tidak ada serangga penyerbuk di dalam ruangan."],
    [tomatCeriId, 40, "Pagi dan Siang", "Tanaman mulai berbunga, bantu penyerbukan dengan menggoyangkan tangkai bunga atau sikat lembut tiap pagi karena tidak ada serangga penyerbuk di dalam ruangan."],
    [tomatCeriId, 41, "Pagi dan Siang", "Tanaman mulai berbunga, bantu penyerbukan dengan menggoyangkan tangkai bunga atau sikat lembut tiap pagi karena tidak ada serangga penyerbuk di dalam ruangan."],
    [tomatCeriId, 42, "Pagi dan Siang", "Naikkan EC larutan nutrisi ke 2.0-2.5 untuk mendukung pembentukan buah, ikat batang ke ajir seiring pertumbuhan."],
    [tomatCeriId, 43, "Pagi dan Siang", "Naikkan EC larutan nutrisi ke 2.0-2.5 untuk mendukung pembentukan buah, ikat batang ke ajir seiring pertumbuhan."],
    [tomatCeriId, 44, "Pagi dan Siang", "Naikkan EC larutan nutrisi ke 2.0-2.5 untuk mendukung pembentukan buah, ikat batang ke ajir seiring pertumbuhan."],
    [tomatCeriId, 45, "Pagi dan Siang", "Naikkan EC larutan nutrisi ke 2.0-2.5 untuk mendukung pembentukan buah, ikat batang ke ajir seiring pertumbuhan."],
    [tomatCeriId, 46, "Pagi dan Siang", "Naikkan EC larutan nutrisi ke 2.0-2.5 untuk mendukung pembentukan buah, ikat batang ke ajir seiring pertumbuhan."],
    [tomatCeriId, 47, "Pagi dan Siang", "Naikkan EC larutan nutrisi ke 2.0-2.5 untuk mendukung pembentukan buah, ikat batang ke ajir seiring pertumbuhan."],
    [tomatCeriId, 48, "Pagi dan Siang", "Naikkan EC larutan nutrisi ke 2.0-2.5 untuk mendukung pembentukan buah, ikat batang ke ajir seiring pertumbuhan."],
    [tomatCeriId, 49, "Pagi dan Siang", "Buah mulai terbentuk, pastikan larutan nutrisi dan pH stabil, tambah kalium untuk mendukung kualitas buah."],
    [tomatCeriId, 50, "Pagi dan Siang", "Buah mulai terbentuk, pastikan larutan nutrisi dan pH stabil, tambah kalium untuk mendukung kualitas buah."],
    [tomatCeriId, 51, "Pagi dan Siang", "Buah mulai terbentuk, pastikan larutan nutrisi dan pH stabil, tambah kalium untuk mendukung kualitas buah."],
    [tomatCeriId, 52, "Pagi dan Siang", "Buah mulai terbentuk, pastikan larutan nutrisi dan pH stabil, tambah kalium untuk mendukung kualitas buah."],
    [tomatCeriId, 53, "Pagi dan Siang", "Buah mulai terbentuk, pastikan larutan nutrisi dan pH stabil, tambah kalium untuk mendukung kualitas buah."],
    [tomatCeriId, 54, "Pagi dan Siang", "Buah mulai terbentuk, pastikan larutan nutrisi dan pH stabil, tambah kalium untuk mendukung kualitas buah."],
    [tomatCeriId, 55, "Pagi dan Siang", "Buah mulai terbentuk, pastikan larutan nutrisi dan pH stabil, tambah kalium untuk mendukung kualitas buah."],
    [tomatCeriId, 56, "Pagi dan Siang", "Buah mulai terbentuk, pastikan larutan nutrisi dan pH stabil, tambah kalium untuk mendukung kualitas buah."],
    [tomatCeriId, 57, "Pagi dan Siang", "Pantau pertumbuhan buah, buang daun tua/menguning di bagian bawah agar sirkulasi udara baik dan cegah penyakit."],
    [tomatCeriId, 58, "Pagi dan Siang", "Pantau pertumbuhan buah, buang daun tua/menguning di bagian bawah agar sirkulasi udara baik dan cegah penyakit."],
    [tomatCeriId, 59, "Pagi dan Siang", "Pantau pertumbuhan buah, buang daun tua/menguning di bagian bawah agar sirkulasi udara baik dan cegah penyakit."],
    [tomatCeriId, 60, "Pagi dan Siang", "Pantau pertumbuhan buah, buang daun tua/menguning di bagian bawah agar sirkulasi udara baik dan cegah penyakit."],
    [tomatCeriId, 61, "Pagi dan Siang", "Pantau pertumbuhan buah, buang daun tua/menguning di bagian bawah agar sirkulasi udara baik dan cegah penyakit."],
    [tomatCeriId, 62, "Pagi dan Siang", "Pantau pertumbuhan buah, buang daun tua/menguning di bagian bawah agar sirkulasi udara baik dan cegah penyakit."],
    [tomatCeriId, 63, "Pagi dan Siang", "Pantau pertumbuhan buah, buang daun tua/menguning di bagian bawah agar sirkulasi udara baik dan cegah penyakit."],
    [tomatCeriId, 64, "Pagi dan Siang", "Pantau pertumbuhan buah, buang daun tua/menguning di bagian bawah agar sirkulasi udara baik dan cegah penyakit."],
    [tomatCeriId, 65, "Pagi dan Siang", "Buah mulai berubah warna dari hijau ke oranye/merah, kurangi nitrogen dan pastikan cahaya cukup untuk pematangan warna."],
    [tomatCeriId, 66, "Pagi dan Siang", "Buah mulai berubah warna dari hijau ke oranye/merah, kurangi nitrogen dan pastikan cahaya cukup untuk pematangan warna."],
    [tomatCeriId, 67, "Pagi dan Siang", "Buah mulai berubah warna dari hijau ke oranye/merah, kurangi nitrogen dan pastikan cahaya cukup untuk pematangan warna."],
    [tomatCeriId, 68, "Pagi dan Siang", "Buah mulai berubah warna dari hijau ke oranye/merah, kurangi nitrogen dan pastikan cahaya cukup untuk pematangan warna."],
    [tomatCeriId, 69, "Pagi dan Siang", "Buah mulai berubah warna dari hijau ke oranye/merah, kurangi nitrogen dan pastikan cahaya cukup untuk pematangan warna."],
    [tomatCeriId, 70, "Pagi dan Siang", "Buah mulai berubah warna dari hijau ke oranye/merah, kurangi nitrogen dan pastikan cahaya cukup untuk pematangan warna."],
    [tomatCeriId, 71, "Pagi dan Siang", "Buah mulai berubah warna dari hijau ke oranye/merah, kurangi nitrogen dan pastikan cahaya cukup untuk pematangan warna."],
    [tomatCeriId, 72, "Pagi dan Siang", "Buah mulai berubah warna dari hijau ke oranye/merah, kurangi nitrogen dan pastikan cahaya cukup untuk pematangan warna."],
    [tomatCeriId, 73, "Pagi", "Panen buah yang sudah merah merata dengan cara memetik beserta tangkainya, panen bisa dilakukan bertahap setiap 2-3 hari karena tomat ceri berbuah terus-menerus."],
    [tomatCeriId, 74, "Pagi", "Panen buah yang sudah merah merata dengan cara memetik beserta tangkainya, panen bisa dilakukan bertahap setiap 2-3 hari karena tomat ceri berbuah terus-menerus."],
    [tomatCeriId, 75, "Pagi", "Panen buah yang sudah merah merata dengan cara memetik beserta tangkainya, panen bisa dilakukan bertahap setiap 2-3 hari karena tomat ceri berbuah terus-menerus."],
    [tomatCeriId, 76, "Pagi", "Panen buah yang sudah merah merata dengan cara memetik beserta tangkainya, panen bisa dilakukan bertahap setiap 2-3 hari karena tomat ceri berbuah terus-menerus."],
    [tomatCeriId, 77, "Pagi", "Panen buah yang sudah merah merata dengan cara memetik beserta tangkainya, panen bisa dilakukan bertahap setiap 2-3 hari karena tomat ceri berbuah terus-menerus."],
    [tomatCeriId, 78, "Pagi", "Panen buah yang sudah merah merata dengan cara memetik beserta tangkainya, panen bisa dilakukan bertahap setiap 2-3 hari karena tomat ceri berbuah terus-menerus."],
    [tomatCeriId, 79, "Pagi", "Panen buah yang sudah merah merata dengan cara memetik beserta tangkainya, panen bisa dilakukan bertahap setiap 2-3 hari karena tomat ceri berbuah terus-menerus."],
    [tomatCeriId, 80, "Pagi", "Panen besar (panen raya): petik seluruh buah yang sudah matang, tanaman masih bisa berbuah lagi jika perawatan rutin dilanjutkan."],
  ];

  // Mengubah kalimat kegiatan bergaya Wick System (sumbu, wadah wick, dst)
  // menjadi kalimat bergaya NFT (pompa, aliran nutrisi, talang/pipa),
  // supaya langkah kegiatan NFT terasa sesuai dengan metode itu, tanpa
  // harus menulis ulang ratusan baris secara manual.
  const NFT_REPLACEMENTS = [
    [/sistem hidroponik wick system/gi, "sistem hidroponik NFT (Nutrient Film Technique)"],
    [/sistem Wick/gi, "sistem NFT"],
    [/hidroponik wick/gi, "hidroponik NFT"],
    [/posisi wick/gi, "aliran nutrisi dan kondisi pompa NFT"],
    [/kebersihan wick/gi, "kebersihan talang/pipa NFT"],
    [
      /Menyiapkan sistem Wick: Pasang sumbu \(kain flanel\/kapas\) dari net pot ke larutan nutrisi\./gi,
      "Menyiapkan sistem NFT: pasang talang/pipa NFT dengan kemiringan yang sesuai, sambungkan pompa dan pastikan aliran nutrisi tipis merata mengaliri akar.",
    ],
    [
      /Pindahkan benih berkecambah ke wadah hidroponik wick system\. Siapkan larutan nutrisi pertama\./gi,
      "Pindahkan benih berkecambah ke net pot pada lubang talang NFT. Nyalakan pompa dan siapkan larutan nutrisi pertama pada bak penampung.",
    ],
    [
      /Pindahkan bibit ke net pot: Letakkan bibit dalam net pot yang berisi rockwool, lalu letakkan di sistem Wick\./gi,
      "Pindahkan bibit ke net pot: letakkan bibit dalam net pot berisi rockwool, lalu pasang net pot pada lubang talang/pipa NFT yang sudah dialiri pompa.",
    ],
    [/wick/gi, "NFT"],
    [/Wick/gi, "NFT"],
  ];

  const buildNftVariant = (data) =>
    data.map(([plantId, day, timeofday, actifity]) => {
      let nftActifity = actifity;
      NFT_REPLACEMENTS.forEach(([pattern, replacement]) => {
        nftActifity = nftActifity.replace(pattern, replacement);
      });

      // Setiap kelipatan 7 hari, tambahkan pengingat spesifik NFT (cek
      // pompa & kemiringan talang) supaya jadwal NFT terasa berbeda dan
      // relevan, bukan cuma ganti kata "wick" jadi "NFT".
      if (day % 7 === 0) {
        nftActifity += " Pastikan juga pompa air menyala normal dan kemiringan talang/pipa NFT tidak berubah.";
      }

      return [plantId, day, timeofday, nftActifity];
    });

  const wickDataTagged = wickData.map((row) => [...row, "Wick System"]);
  const nftDataTagged = buildNftVariant(wickData).map((row) => [...row, "NFT"]);

  const allData = [...wickDataTagged, ...nftDataTagged];

  try {
    const existingCombos = await new Promise((resolve, reject) => {
      db.query(
        "SELECT DISTINCT plant_id, method FROM planting",
        (error, results) => {
          if (error) return reject(error);
          resolve(results.map((row) => `${row.plant_id}::${row.method}`));
        }
      );
    });

    const dataBaru = allData.filter(
      ([plantId, , , , method]) => !existingCombos.includes(`${plantId}::${method}`)
    );

    if (dataBaru.length === 0) {
      console.log("Planting sudah lengkap, tidak ada data baru untuk di-seed.");
      return;
    }

    const query = `
        INSERT INTO planting (plant_id, day, timeofday, actifity, method)
        VALUES ?
      `;

    await new Promise((resolve, reject) => {
      db.query(query, [dataBaru], (error, results) => {
        if (error) return reject(error);
        resolve(results);
      });
    });
    console.log(`Planting successfully seeded (${dataBaru.length} baris baru).`);
  } catch (error) {
    console.error("Error seeding Planting:", error);
  }
};

export default seedPlanting;
