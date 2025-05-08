
const forbiddenWords = [
  "anjing", "babi", "goblok", "bodoh", "sialan", "kontol", "memek", "setan", "bangsat",
  "pecundang", "perek", "jancok", "brengsek", "tolol", "kampret", "pelacur", "monyet",
  "sundal", "ngentot", "sundala", "tai", "keparat", "laknat", "bajingan", "bencong",
  "banci", "lonte", "jalang", "jablay", "dancok", "gila", "edun", "kapret", "taik",
  "asu", "pantat", "burit", "jembut", "colmek", "masturbasi", "titit", "biji", "peler",
  "kintil", "puki", "peju", "cerai", "boker", "pipis", "idiot", "otak udang", "mampus",
  "mati aja", "neraka", "jahanam", "bego", "kampungan", "mukamu jelek", "malesin",
  "sakit jiwa", "sinting", "nista", "hina", "cabul", "mesum", "porno", "bokep", "vcs",
  "open bo", "cewek murahan", "cowok murahan", "brengsek lo", "jijik", "najis",
  "sarap", "nyet", "bangke", "brengsek banget", "bacot", "mulut sampah", "palsu",
  "fake", "toksik", "racun", "provokator", "teroris", "pembunuh",
  "pemerkosa", "penipu", "scam", "penjilat", "pengkhianat", "penghianat", "kafir",
  "musuh agama", "homo", "lesbi", "kadrun", "cebong", "tolib", "kampungan banget",
  "ngeselin", "berengsek", "dungu", "gak guna", "alay",
];

// Fungsi untuk moderasi teks
function moderateText() {
    const textInput = document.getElementById('textInput');
    let text = textInput.value.trim();
    const alertMessage = document.getElementById('alertMessage');
    const meterFill = document.getElementById('meterFill');

    if (text === '') {
        alertMessage.textContent = "Teks kosong. Silakan isi dulu.";
        meterFill.style.width = '0%';
        return;
    }

    let filteredText = text;
    let foundWords = [];

    forbiddenWords.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        if (regex.test(filteredText)) {
            foundWords.push(word);
            filteredText = filteredText.replace(regex, '');
        }
    });

    // Bersihkan spasi ganda
    filteredText = filteredText.replace(/\s{2,}/g, ' ').trim();

    // Update alert & siaga meter
    if (foundWords.length > 0) {
        const percentage = Math.min((foundWords.length / forbiddenWords.length) * 100, 100);
        alertMessage.textContent = `Teks mengandung ${foundWords.length} kata kasar.`;
        meterFill.style.width = `${percentage}%`;
    } else {
        alertMessage.textContent = "Tidak ada kata kasar ditemukan!";
        meterFill.style.width = '0%';
    }

    // Update hasil ke newResultAreaContainer
    const container = document.getElementById('newResultAreaContainer');
    container.innerHTML = `
  <textarea
    id="resultArea"
    class="result-textarea"
    readonly
    rows="10"
    placeholder="Hasil akan muncul di sini..."
  >${filteredText}</textarea>
`;

}

// Fungsi untuk reset teks dan semua tampilan
function clearText() {
    document.getElementById('textInput').value = '';
    document.getElementById('alertMessage').textContent = '';
    document.getElementById('meterFill').style.width = '0%';
    document.getElementById('newResultAreaContainer').innerHTML = '';
}

// Fungsi untuk download hasil moderasi
function downloadResult() {
    const resultArea = document.getElementById('resultArea');
    
    if (!resultArea || resultArea.value.trim() === '') {
        alert('Teks kosong atau belum dimoderasi. Klik "Siaga" dulu!');
        return;
    }

    const filteredText = resultArea.value.trim();
    const blob = new Blob([filteredText], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'hasil_moderasi.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
