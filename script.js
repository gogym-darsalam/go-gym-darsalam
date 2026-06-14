// ==========================================
// DATA: De vraies annonces avec des images HD
// ==========================================
const initialAnimals = [
  {
    id: 1,
    name: "Rex",
    type: "chien",
    race: "Labrador",
    sexe: "Mâle",
    age: "2 ans",
    ville: "Casablanca",
    img: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=600",
    pedigree: true,
    vaccine: true
  },
  {
    id: 2,
    name: "Luna",
    type: "chat",
    race: "Persan",
    sexe: "Femelle",
    age: "1 an et demi",
    ville: "Rabat",
    img: "https://images.unsplash.com/photo-1614035030394-b6e5b01e0737?auto=format&fit=crop&q=80&w=600",
    pedigree: true,
    vaccine: true
  },
  {
    id: 3,
    name: "Rocky",
    type: "chien",
    race: "Berger Allemand",
    sexe: "Mâle",
    age: "3 ans",
    ville: "Marrakech",
    img: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&q=80&w=600",
    pedigree: false,
    vaccine: true
  },
  {
    id: 4,
    name: "Mimi",
    type: "chat",
    race: "Siamois",
    sexe: "Femelle",
    age: "2 ans",
    ville: "Tanger",
    img: "https://images.unsplash.com/photo-1513360309081-36f5e880003f?auto=format&fit=crop&q=80&w=600",
    pedigree: true,
    vaccine: true
  },
  {
    id: 5,
    name: "Simba",
    type: "chat",
    race: "Maine Coon",
    sexe: "Mâle",
    age: "4 ans",
    ville: "Fès",
    img: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&q=80&w=600",
    pedigree: true,
    vaccine: false
  },
  {
    id: 6,
    name: "Bella",
    type: "chien",
    race: "Golden Retriever",
    sexe: "Femelle",
    age: "10 mois",
    ville: "Agadir",
    img: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=600",
    pedigree: true,
    vaccine: true
  }
];

let animals = [...initialAnimals];
const MY_PHONE = "0608006156";
const MY_EMAIL = "petmatch@gmail.com";

// ==========================================
// DOM ELEMENTS
// ==========================================
const cardsGrid = document.getElementById('cardsGrid');
const filterTabs = document.querySelectorAll('.tab');
const navbar = document.getElementById('navbar');
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');
const mmLinks = document.querySelectorAll('.mm-link');

// Actions buttons
const loginBtn = document.getElementById('loginBtn');
const heroSearch = document.getElementById('heroSearch');

// Modal & Toast & Inputs multimédia
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const toast = document.getElementById('toast');
const fileInput = document.getElementById('fileInput');
const uploadArea = document.getElementById('uploadArea');

const publishButtons = [
  document.getElementById('registerBtn'),
  document.getElementById('heroPublish'),
  document.getElementById('ctaPublish')
];

// Recherche inputs
const searchRace = document.getElementById('searchRace');
const searchSexe = document.getElementById('searchSexe');
const searchVille = document.getElementById('searchVille');
const searchBtn = document.getElementById('searchBtn');

// ==========================================
// FUNCTIONS
// ==========================================

// 1. Affichage des cartes dynamiques
function renderCards(data) {
  cardsGrid.innerHTML = '';
  
  if (data.length === 0) {
    cardsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 3rem 0; font-weight: 500;">Aucun animal trouvé pour ces critères. 🐾 Veuillez modifier les filtres.</p>`;
    return;
  }

  data.forEach(animal => {
    const card = document.createElement('div');
    card.className = 'animal-card';
    const emoji = animal.type === 'chien' ? '🐕' : (animal.type === 'chat' ? '🐈' : '🐇');

    card.innerHTML = `
      <div class="animal-card-img" style="background-image: url('${animal.img}'); background-size: cover; background-position: center;">
        <span class="animal-card-type">${emoji} ${animal.race}</span>
      </div>
      <div class="animal-card-body">
        <h3 class="animal-card-name">${animal.name}</h3>
        <p class="animal-card-info">${animal.age} • ${animal.sexe}</p>
        <div class="animal-card-tags">
          <span class="tag ${animal.sexe === 'Mâle' ? 'blue' : ''}">${animal.sexe}</span>
          ${animal.pedigree ? '<span class="tag green">Pedigree ✓</span>' : ''}
          ${animal.vaccine ? '<span class="tag">Vacciné ✓</span>' : ''}
        </div>
        <div class="animal-card-footer">
          <span class="animal-card-location">📍 ${animal.ville}</span>
          <button class="btn-contact-small" onclick="contactOwner('${animal.name}')">Contacter</button>
        </div>
      </div>
    `;
    cardsGrid.appendChild(card);
  });
}

// 2. Bouton Contacter (Utilise le numéro et e-mail demandés)
window.contactOwner = function(petName) {
  alert(`💬 Pour planifier un accouplement avec ${petName}, contactez l'administration :\n📱 Téléphone : ${MY_PHONE}\n✉️ Email : ${MY_EMAIL}`);
};

// 3. Animation des compteurs statistiques
function initCounters() {
  const stats = document.querySelectorAll('.stat-num');
  stats.forEach(stat => {
    const target = +stat.getAttribute('data-target');
    let count = 0;
    const speed = target / 40;
    
    const updateCount = () => {
      if (count < target) {
        count = Math.ceil(count + speed);
        stat.innerText = count > target ? target : count;
        setTimeout(updateCount, 30);
      } else {
        stat.innerText = target;
      }
    };
    updateCount();
  });
}

// 4. Notification Toast
function showToast(message) {
  toast.innerText = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

// ==========================================
// LOGIQUE ET ÉVÉNEMENTS
// ==========================================

// --- BARRE DE RECHERCHE FONCTIONNELLE ---
function executeSearch() {
  const raceVal = searchRace.value.trim().toLowerCase();
  const sexeVal = searchSexe.value;
  const villeVal = searchVille.value;

  const filtered = initialAnimals.filter(animal => {
    const matchRace = !raceVal || animal.race.toLowerCase().includes(raceVal);
    // Filtrage souple du sexe selon le choix dans le sélecteur
    const matchSexe = !sexeVal || animal.sexe === sexeVal || (sexeVal.includes(animal.sexe));
    const matchVille = !villeVal || animal.ville === villeVal;
    
    return matchRace && matchSexe && matchVille;
  });

  renderCards(filtered);
  
  // Fait défiler la page automatiquement vers la grille de résultats
  document.getElementById('animaux').scrollIntoView({ behavior: 'smooth' });
}

searchBtn.addEventListener('click', executeSearch);

if(heroSearch) {
  heroSearch.addEventListener('click', () => {
    document.querySelector('.search-bar-section').scrollIntoView({ behavior: 'smooth' });
  });
}

// Onglets de filtrage par catégorie (Chiens / Chats)
filterTabs.forEach(tab => {
  tab.addEventListener('click', (e) => {
    filterTabs.forEach(t => t.classList.remove('active'));
    e.target.classList.add('active');
    
    const filterValue = e.target.getAttribute('data-filter');
    if (filterValue === 'all') {
      animals = [...initialAnimals];
    } else {
      animals = initialAnimals.filter(animal => animal.type === filterValue);
    }
    renderCards(animals);
  });
});

// --- DE CONNEXION INTERACTIVE ---
if(loginBtn) {
  loginBtn.addEventListener('click', () => {
    const nom = prompt("Entrez votre nom ou pseudonyme pour vous connecter :");
    if(nom) {
      showToast(`👋 Bienvenue sur PetMatch Maroc, ${nom} !`);
      loginBtn.innerText = nom; // Met à jour le bouton de la navbar
    }
  });
}

// --- APPAREIL PHOTO & UPLOAD RÉEL (FONCTIONNEL) ---
if(uploadArea && fileInput) {
  // Clique sur la zone en pointillé active le gestionnaire de fichiers/caméra du téléphone
  uploadArea.addEventListener('click', () => {
    fileInput.click();
  });

  fileInput.addEventListener('change', (e) => {
    if(e.target.files.length > 0) {
      const filesCount = e.target.files.length;
      uploadArea.style.borderColor = "var(--green)";
      uploadArea.innerHTML = `<span>✅ ${filesCount} image(s) détectée(s) et chargée(s) !</span>`;
      showToast("📸 Vos images réelles ont été attachées à la session.");
    }
  });
}

// --- LOGIQUE FORMULAIRE MODAL ---
publishButtons.forEach(btn => {
  if(btn) {
    btn.addEventListener('click', () => {
      modalOverlay.classList.add('open');
      const phoneInput = document.querySelector('input[type="tel"]');
      if(phoneInput) phoneInput.value = MY_PHONE; // Assigne automatiquement votre numéro
    });
  }
});

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay || e.target === modalClose) {
    modalOverlay.classList.remove('open');
  }
});

const submitBtn = document.getElementById('submitBtn');
if (submitBtn) {
  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    const modalInputs = document.querySelectorAll('.form-input');
    const name = modalInputs[0]?.value || "Compagnon";
    const race = modalInputs[1]?.value || "Pure";
    const age = modalInputs[3]?.value || "1 an";
    const ville = modalInputs[4]?.value || "Casablanca";

    const defaultImg = "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=600";

    const newAnimal = {
      id: initialAnimals.length + 1,
      name: name,
      type: race.toLowerCase().includes('chat') || ['persan','siamois','maine coon'].includes(race.toLowerCase()) ? 'chat' : 'chien',
      race: race,
      sexe: "Mâle",
      age: age,
      ville: ville,
      img: defaultImg,
      pedigree: true,
      vaccine: true
    };

    initialAnimals.unshift(newAnimal); // Ajoute la nouvelle annonce au début du tableau
    renderCards(initialAnimals);
    
    modalOverlay.classList.remove('open');
    showToast(`✅ Annonce de ${name} enregistrée ! Contact admin : ${MY_EMAIL}`);
    
    // Réinitialise la boîte d'upload
    uploadArea.style.borderColor = "var(--border)";
    uploadArea.innerHTML = `<span>📷 Cliquez ici pour prendre/ajouter des photos</span>`;
  });
}

// --- STYLE DE NAVBAR & MENU MOBILE ---
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

if(burger) burger.addEventListener('click', () => mobileMenu.classList.add('open'));
if(closeMenu) closeMenu.addEventListener('click', () => mobileMenu.classList.remove('open'));
mmLinks.forEach(link => link.addEventListener('click', () => mobileMenu.classList.remove('open')));

// --- CHARGEMENT INITIAL ---
document.addEventListener('DOMContentLoaded', () => {
  renderCards(initialAnimals);
  initCounters();
});