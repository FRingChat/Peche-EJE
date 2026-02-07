// --- CONFIGURATION ---
const scriptURL = 'URL Apps Script'

// --- GESTION DU MENU HAMBURGER (Commun aux deux pages) ---
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('#nav-list');
if (menu && menuLinks) {
    menu.onclick = function() {
        menuLinks.classList.toggle('active');
    };
}

// --- GESTION DU FORMULAIRE MULTI-ÉTAPES (Page Index uniquement) ---
const steps = document.querySelectorAll(".form-step");
if (steps.length > 0) {
    const nextBtns = document.querySelectorAll(".btn-next");
    const prevBtns = document.querySelectorAll(".btn-prev");

    nextBtns.forEach((btn) => {
        btn.addEventListener("click", () => changeStep(1));
    });

    prevBtns.forEach((btn) => {
        btn.addEventListener("click", () => changeStep(-1));
    });

    function changeStep(direction) {
        let currentStep = document.querySelector(".form-step.active");
        let nextIndex = Array.from(steps).indexOf(currentStep) + direction;
        if (nextIndex >= 0 && nextIndex < steps.length) {
            currentStep.classList.remove("active");
            steps[nextIndex].classList.add("active");
            
            const progressBar = document.getElementById("progressBar");
            if (progressBar) {
                const progressPercentage = ((nextIndex + 1) / steps.length) * 100;
                progressBar.style.width = progressPercentage + "%";
            }
        }
    }
}

// --- GESTION DES ENVOIS (Index ou À Propos) ---
// On écoute tous les formulaires du site
document.addEventListener('submit', e => {
    e.preventDefault();
    const form = e.target; // On récupère le formulaire qui vient d'être soumis
    const btn = form.querySelector('button[type="submit"]');
    const originalBtnText = btn.innerText;

    btn.disabled = true;
    btn.innerText = "Chargement...";

    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => response.text())
      .then(message => {
          alert(message || "Opération réussie !");
          btn.disabled = false;
          btn.innerText = originalBtnText;
          if (!message.includes("Erreur")) form.reset(); // On vide le formulaire si ça a marché
      })
      .catch(error => {
          console.error('Erreur !', error.message);
          alert("Une erreur est survenue lors de l'envoi.");
          btn.disabled = false;
          btn.innerText = originalBtnText;
      });
});

