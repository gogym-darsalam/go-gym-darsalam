document.addEventListener('DOMContentLoaded', () => {
    
    // --- PARTIE 1: Filtrage Dynamique des Exercices ---
    const filterButtons = document.querySelectorAll('.btn-filter');
    const exerciseCards = document.querySelectorAll('.exercise-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Activer le bouton cliqué
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const target = button.getAttribute('data-target');

            // Filtrer les cartes
            exerciseCards.forEach(card => {
                const level = card.getAttribute('data-level');
                
                if (target === 'all' || level === target) {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    setTimeout(() => { card.style.opacity = '1'; }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- PARTIE 2: Liaison Directe avec WhatsApp ---
    const pricingButtons = document.querySelectorAll('.interaction-btn');
    const whatsappNumber = "212678918938"; // Numéro de téléphone cible

    pricingButtons.forEach(button => {
        button.addEventListener('click', () => {
            const planName = button.getAttribute('data-type');
            const planPrice = button.getAttribute('data-price');
            const planDuration = button.getAttribute('data-duration');

            // Formater le message envoyé sur WhatsApp
            const baseMessage = `Bonjour GOGYM DAR SALAM, je suis intéressé par l'offre suivante :\n\n` +
                                `🏋️‍♂️ Pack : ${planName}\n` +
                                `💰 Prix : ${planPrice}\n` +
                                `📅 Durée : ${planDuration}\n\n` +
                                `Je souhaite avoir plus d'informations pour finaliser mon inscription. Merci !`;

            // Encoder le texte pour l'URL
            const encodedMessage = encodeURIComponent(baseMessage);

            // Lien WhatsApp Universel (PC et Mobile)
            const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;

            // Ouvrir dans un nouvel onglet
            window.open(whatsappUrl, '_blank');
        });
    });
});