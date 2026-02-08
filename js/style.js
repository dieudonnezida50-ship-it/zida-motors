document.addEventListener('DOMContentLoaded', function() {
    
    // Fonction universelle d'envoi
    function handleFormSubmit(formId, successBoxId) {
        const form = document.getElementById(formId);
        const successBox = document.getElementById(successBoxId);

        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault(); // Bloque le rechargement

                const btn = form.querySelector('button');
                const data = new FormData(e.target);
                const originalBtnText = btn.innerHTML;

                btn.innerHTML = "<i class='fas fa-spinner fa-spin'></i> Envoi...";
                btn.disabled = true;

                fetch(form.action, {
                    method: 'POST',
                    body: data,
                    headers: { 'Accept': 'application/json' }
                }).then(response => {
                    if (response.ok) {
                        form.style.display = 'none';
                        if (successBox) successBox.style.display = 'block';
                    } else {
                        alert("Erreur lors de l'envoi.");
                        btn.innerHTML = originalBtnText;
                        btn.disabled = false;
                    }
                }).catch(error => {
                    alert("Erreur réseau.");
                    btn.innerHTML = originalBtnText;
                    btn.disabled = false;
                });
            });
        }
    }

    // Activer l'envoi pour le formulaire de la page d'accueil (index.html)
    handleFormSubmit('contactForm', 'successBox');

    // Activer l'envoi pour le formulaire de la page contact (contact.html)
    handleFormSubmit('mainContactForm', 'successMessage');
});


document.getElementById('mainContactForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Empêche le rechargement de la page
    
    const form = this;
    const btn = form.querySelector('button');
    const successBox = document.getElementById('successMessage');

    // Animation du bouton pendant l'envoi
    btn.innerHTML = "Envoi en cours...";
    btn.style.opacity = "0.7";
    btn.disabled = true;

    // Simulation d'un délai d'envoi (1.5 seconde)
    setTimeout(() => {
        form.style.display = 'none'; // Cache le formulaire
        successBox.style.display = 'block'; // Affiche le succès avec l'animation CSS
    }, 1500);
});

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('mainContactForm');
    const successMessage = document.getElementById('successMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Bloque le rechargement

            const btn = contactForm.querySelector('button');
            const data = new FormData(e.target);

            btn.innerHTML = "<i class='fas fa-spinner fa-spin'></i> Envoi en cours...";
            btn.disabled = true;

            // Envoi réel vers Formspree
            fetch(contactForm.action, {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            }).then(response => {
                if (response.ok) {
                    contactForm.style.display = 'none';
                    successMessage.style.display = 'block';
                } else {
                    alert("Une erreur est survenue lors de l'envoi.");
                    btn.innerHTML = "Envoyer ma demande";
                    btn.disabled = false;
                }
            }).catch(error => {
                alert("Erreur réseau. Vérifiez votre connexion.");
                btn.innerHTML = "Envoyer ma demande";
                btn.disabled = false;
            });
        });
    }
});