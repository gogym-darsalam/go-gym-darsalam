document.addEventListener('DOMContentLoaded', () => {
    
    // --- PARTIE 1: Filtrage Dynamique des Exercices ---
    const filterButtons = document.querySelectorAll('.btn-filter');
    const exerciseCards = document.querySelectorAll('.exercise-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const target = button.getAttribute('data-target');

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
    const whatsappNumber = "212678918938"; 

    pricingButtons.forEach(button => {
        button.addEventListener('click', () => {
            const planName = button.getAttribute('data-type');
            const planPrice = button.getAttribute('data-price');
            const planDuration = button.getAttribute('data-duration');

            const baseMessage = `Bonjour GOGYM DAR SALAM, je suis intéressé par l'offre suivante :\n\n` +
                                `🏋️‍♂️ Pack : ${planName}\n` +
                                `💰 Prix : ${planPrice}\n` +
                                `📅 Durée : ${planDuration}\n\n` +
                                `Je souhaite avoir plus d'informations pour finaliser mon inscription. Merci !`;

            const encodedMessage = encodeURIComponent(baseMessage);
            const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;

            window.open(whatsappUrl, '_blank');
        });
    });

    // --- PARTIE 3: Filtrage Dynamique du Planning (H/F) ---
    const planButtons = document.querySelectorAll('.btn-plan-filter');
    const planRows = document.querySelectorAll('.plan-row');

    planButtons.forEach(button => {
        button.addEventListener('click', () => {
            planButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const targetPlan = button.getAttribute('data-plan');

            planRows.forEach(row => {
                const gender = row.getAttribute('data-gender');
                
                if (targetPlan === 'all' || gender === targetPlan) {
                    row.style.display = 'table-row';
                    row.style.opacity = '0';
                    setTimeout(() => { row.style.opacity = '1'; }, 50);
                } else {
                    row.style.display = 'none';
                }
            });
        });
    });
});
