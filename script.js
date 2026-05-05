// GANTI DENGAN URL WEB APP DARI GOOGLE APPS SCRIPT
jr1 = 'https://script.google.com/macros/s/AKfycbxfd87bZ_QUQZD6bB6eP_oalV-3J2omPpER6gAbQMB4ZHSFH6s9qg2feMTnB2ow9Vov/exec';

// FUNGSI MEMBACA DATA (READ)
async function loadData() {
    try {
        const response = await fetch(webAppUrl);
        const data = await response.json(); // Data sekarang berformat JSON (Array)
        
        const tbody = document.getElementById('dataBody');
        tbody.innerHTML = '';

        data.forEach(row => {
            const tr = document.createElement('tr');
            // row[0] = Tanggal, row[1] = Nama, dst sesuai urutan di Sheet
            tr.innerHTML = `
                <td>${new Date(row[0]).toLocaleDateString('id-ID')}</td>
                <td>${row[1]}</td>
                <td>${row[2]}</td>
                <td>${row[3]}</td>
                <td><span class="status">${row[4]}</span></td>
                <td><strong>Rp ${Number(row[5]).toLocaleString('id-ID')}</strong></td>
            `;
            tbody.appendChild(tr);
        });

        document.getElementById('loading').style.display = 'none';
        document.getElementById('tableServis').style.display = 'table';
    } catch (e) {
        document.getElementById('loading').innerHTML = '❌ Gagal memuat data dari Apps Script.';
        console.error(e);
    }
}

// FUNGSI MENYIMPAN DATA (CREATE)
document.getElementById('btnSimpan').addEventListener('click', async () => {
    const params = {
        nama: document.getElementById('nama').value,
        motor: document.getElementById('motor').value,
        keluhan: document.getElementById('keluhan').value,
        biaya: document.getElementById('biaya').value
    };

    if(!params.nama || !params.motor) return alert("Isi data dengan lengkap!");

    try {
        // Mengirim data dengan metode POST ke Apps Script
        await fetch(webAppUrl + "?" + new URLSearchParams(params), { method: 'POST' });
        alert('Data Berhasil Disimpan!');
        location.reload(); 
    } catch (e) {
        alert('Gagal menyimpan data.');
    }
});

loadData();


