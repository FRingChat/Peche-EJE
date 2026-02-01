// -- Envoi du formulaire --

const scriptURL = 'https://script.google.com/macros/s/AKfycbz7ck6DXRUA8hIVfp2i89PSCZ5l94e9xpqwQ93WP_1OkNrLPaPaWrd5gnqIJj1MgwjMmA/exec'; 
const form = document.getElementById('monFormulaire');

form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    btn.disabled = true;
    btn.innerText = "Envoi en cours...";

    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
            alert("Succès ! Les données sont envoyées !");
            form.reset();
            btn.disabled = false;
            btn.innerText = "Envoyé au tableau";
        })
        .catch(error => {
            console.error('Erreur !', error.message);
            alert("Une erreur est survenue.");
            btn.disabled = false;
        });
});

// -- Bouton hamburger -- 

// On sélectionne le bouton et la liste
const toggleBtn = document.getElementById('mobile-menu');
const navList = document.getElementById('nav-list');

// On vérifie si les éléments existent avant d'ajouter l'événement
if(toggleBtn && navList) {
    toggleBtn.onclick = function() {
        // On ajoute ou on retire la classe "active"
        navList.classList.toggle('active');
        console.log("Menu cliqué !"); // Pour vérifier dans la console
    };
}

// -- Etapes du formulaire --

const nextBtns = document.querySelectorAll(".btn-next");
const prevBtns = document.querySelectorAll(".btn-prev");
const steps = document.querySelectorAll(".form-step");

nextBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        changeStep(1);
    });
});

prevBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        changeStep(-1);
    });
});

function changeStep(direction) {
    let currentStep = document.querySelector(".form-step.active");
    let nextIndex = Array.from(steps).indexOf(currentStep) + direction;

    if (nextIndex >= 0 && nextIndex < steps.length) {
        currentStep.classList.remove("active");
        steps[nextIndex].classList.add("active");
        
        // mise à jour de la barre de progression
        const progressBar = document.getElementById("progressBar");
        // On calcule le pourcentage (ex: 2 étapes sur 3 = 66%)
        const progressPercentage = ((nextIndex + 1) / steps.length) * 100;
        progressBar.style.width = progressPercentage + "%";
    }
}

// -- Modifier une ligne --

const updateForm = document.getElementById('updateForm');

if (updateForm) {
    updateForm.addEventListener('submit', e => {
        e.preventDefault();
        const btn = document.getElementById('submitBtn');
        btn.disabled = true;
        btn.innerText = "Recherche en cours...";

        fetch(scriptURL, { method: 'POST', body: new FormData(updateForm)})
        .then(response => response.text())
        .then(message => {
            alert(message); // Affiche "Mise à jour réussie" ou "Erreur"
            btn.disabled = false;
            btn.innerText = "Mettre à jour";
        })
        .catch(error => alert("Erreur de connexion"));
    });
}


