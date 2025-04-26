const badWords = [
    "bodoh", "tolol", "goblok", "bangsat", "brengsek", "sialan", "keparat", "anjing", "bajingan", "kampret",
    "setan", "iblis", "tai", "kontol", "memek", "jembut", "perek", "lonte", "pelacur", "bencong", "banci",
    "sinting", "gila", "edun", "bedebah", "sundal", "asu", "bego", "dongo", "pukimak", "pantek",
    "bangke", "kampungan", "sial", "sampah", "tai kucing", "tai sapi", "babi", "anjrit", "bitch",
    "fuck", "shit", "asshole", "bastard", "dick", "pussy", "slut", "whore", "motherfucker", "cunt",
    "fucker", "douchebag", "jackass", "prick", "moron", "retard", "stupid", "idiot", "scumbag",
    "jerk", "twat", "wanker", "arsehole", "arse", "fag", "faggot", "gay", "lesbo", "homo", "kafir",
    "laknat", "tolol banget", "bodoh amat", "bangsat lo", "brengsek lu", "tai lu", "sialan banget",
    "pelacur murahan", "bego lu", "dongo banget", "pukimak kau", "anjing lo", "kampret lu", "keparat lu",
    "iblis lu", "setan lu", "gila lu", "bajingan kecil", "brengsek kecil", "bangsat kecil", "tai kecil",
    "kontol kecil", "memek kecil","picceng"
];

const heavyWords = [
    "kontol", "memek", "anjing", "fuck", "shit", "asshole", "bitch", "whore", "cunt", "motherfucker",
];

// Fungsi untuk moderasi teks
function moderateText() {
    let text = document.getElementById('textInput').value;
    let result = text;
    let badCount = 0;

    badWords.forEach(word => {
        let regex = new RegExp(`\\b(${word})\\b`, 'gi');
        if (regex.test(text)) badCount++;

        const className = heavyWords.includes(word) ? "highlight-heavy" : "highlight-light";
        result = result.replace(regex, `<span class="${className}">$1</span>`);
    });

    document.getElementById('resultArea').innerHTML = `
        <p>${result}</p>
        <p><strong>${badCount}</strong> kata kasar ditemukan.</p>
    `;

    let meter = document.getElementById('meterFill');
    let level = Math.min(badCount * 10, 100);
    meter.style.width = level + "%";

    let alertMessage = document.getElementById('alertMessage');
    alertMessage.classList.remove('heartbeat');
    meter.classList.remove('shake');

    const alertSound = document.getElementById('alertSound');
    if (alertSound) {
        alertSound.pause();
        alertSound.currentTime = 0;
    }

    if (level <= 30) {
        alertMessage.innerText = "Aman";
        alertMessage.style.color = "lightgreen";
    } else if (level <= 60) {
        alertMessage.innerText = "Waspada";
        alertMessage.style.color = "yellow";
    } else if (level <= 80) {
        alertMessage.innerText = "Bahaya";
        alertMessage.style.color = "orange";
    } else {
        alertMessage.innerText = "WASPADA TINGGI!";
        alertMessage.style.color = "red";
        meter.classList.add('shake');
        alertMessage.classList.add('heartbeat');
        if (alertSound) alertSound.play();

        showModal();
    }
}

function showModal() {
    const modal = document.getElementById("warningModal");
    if (modal) {
        modal.style.display = "flex";
    }
}


function closeModal() {
    const modal = document.getElementById("warningModal");
    if (modal) {
        modal.style.display = "none";
    }
}

function clearText() {
    document.getElementById('textInput').value = "";
    document.getElementById('resultArea').innerHTML = "";
    document.getElementById('meterFill').style.width = "0%";
    let alertMessage = document.getElementById('alertMessage');
    alertMessage.innerText = "";
    alertMessage.style.color = "white";
}

function downloadResult() {
    const text = document.getElementById('textInput').value;
    if (!text) {
        alert("Tidak ada teks untuk diunduh.");
        return;
    }
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'hasil_moderasi.txt';
    a.click();

    URL.revokeObjectURL(url);
}

