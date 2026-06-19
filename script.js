document.addEventListener("DOMContentLoaded", function () {
  const musicBtn = document.getElementById("musicBtn");
  const bgMusic = document.getElementById("bgMusic");

  if (musicBtn && bgMusic) {
    const currentTrackTime = localStorage.getItem("musicTime");
    const isPlaying = localStorage.getItem("musicPlaying") === "true";

    if (currentTrackTime) {
      bgMusic.currentTime = parseFloat(currentTrackTime);
    }

    if (isPlaying) {
      bgMusic.play().then(() => {
        musicBtn.textContent = "⏸";
        musicBtn.style.backgroundColor = "#003087";
      }).catch(() => {
        console.log("El navegador bloqueó el autoplay. Requiere click.");
      });
    }

    bgMusic.addEventListener("timeupdate", function () {
      localStorage.setItem("musicTime", bgMusic.currentTime);
    });

    musicBtn.addEventListener("click", function () {
      if (bgMusic.paused) {
        bgMusic.play();
        musicBtn.textContent = "⏸";
        musicBtn.style.backgroundColor = "#003087";
        localStorage.setItem("musicPlaying", "true");
      } else {
        bgMusic.pause();
        musicBtn.textContent = "▶";
        musicBtn.style.backgroundColor = "#C8102E";
        localStorage.setItem("musicPlaying", "false");
      }
    });
  }
});

function openTab(evt, tabName) {
  const tabContents = document.getElementsByClassName("tab-content");
  const tabButtons = document.getElementsByClassName("tab-btn");

  for (let i = 0; i < tabContents.length; i++) {
    tabContents[i].classList.remove("active");
  }
  for (let i = 0; i < tabButtons.length; i++) {
    tabButtons[i].classList.remove("active");
  }

  document.getElementById(tabName).classList.add("active");
  evt.currentTarget.classList.add("active");
}

function cambiarVideoLocal(archivoVideo, tituloVideo) {
  const videoPlayer = document.getElementById("videoPrincipal");
  const titulo = document.getElementById("tituloVideoActual");
  
  if (videoPlayer && titulo) {
    videoPlayer.pause();
    videoPlayer.oncanplay = null; 
    
    titulo.textContent = tituloVideo;
    videoPlayer.src = archivoVideo; 
    
    videoPlayer.load();
    videoPlayer.muted = true;
    
    videoPlayer.play().catch(error => {
      console.log("Interacción requerida por el usuario:", error);
    });
  }
}

const catalogoFotos = [
  {
    src: "Multimedia/img1.jpg",
    pie: "Sumapaz 1988",
  },
  {
    src: "Multimedia/img2.jpg",
    pie: "Memorias",
  },
  {
    src: "Multimedia/img3.jpg",
    pie: "Cámaras QUAC!",
  },
  {
    src: "Multimedia/img4.jpg",
    pie: "Archivo de Prensa",
  },
];

let fotoIndexActual = 0;

function abrirMesaFotos(index) {
  fotoIndexActual = index;
  renderizarFotoModal();
  const modal = document.getElementById("modalFotos");
  if (modal) modal.style.display = "flex";
}

function cerrarMesaFotos() {
  const modal = document.getElementById("modalFotos");
  if (modal) modal.style.display = "none";
}

function navegarFotos(direccion) {
  fotoIndexActual += direccion;
  if (fotoIndexActual >= catalogoFotos.length) fotoIndexActual = 0;
  if (fotoIndexActual < 0) fotoIndexActual = catalogoFotos.length - 1;
  renderizarFotoModal();
}

function renderizarFotoModal() {
  const targetImg = document.getElementById("imgModalDestino");
  const targetTxt = document.getElementById("txtModalDestino");
  if (targetImg && targetTxt) {
    targetImg.src = catalogoFotos[fotoIndexActual].src;
    targetTxt.textContent = catalogoFotos[fotoIndexActual].pie;
  }
}

window.addEventListener("click", function (e) {
  const modal = document.getElementById("modalFotos");
  if (e.target === modal) {
    modal.style.display = "none";
  }
});