// Constantes y configuración
const RELATIONSHIP_START = new Date('2023-01-01'); // Ajusta esta fecha
const WELCOME_MESSAGE = "Cada día me enamoro más de ti...";

// Utilidades
function getTimeSince(date) {
  const now = new Date();
  const diff = now - date;
  
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60)
  };
}

// Gestión de la pantalla de bienvenida
class WelcomeScreen {
  constructor() {
    this.container = document.querySelector('.hearts-container');
    this.typingText = document.querySelector('.typing-text');
    this.enterBtn = document.querySelector('.enter-btn');
    this.setupEventListeners();
    this.createHearts();
    this.typeMessage();
  }

  setupEventListeners() {
    this.enterBtn.addEventListener('click', () => {
      document.getElementById('welcome-screen').classList.remove('active');
      document.getElementById('main-content').classList.remove('hidden');
    });
  }

  createHearts() {
    for (let i = 0; i < 20; i++) {
      const heart = document.createElement('div');
      heart.classList.add('heart');
      heart.innerHTML = '❤️';
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.animationDelay = `${Math.random() * 4}s`;
      this.container.appendChild(heart);
    }
  }

  async typeMessage() {
    for (let char of WELCOME_MESSAGE) {
      this.typingText.textContent += char;
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
}

// Gestión de la navegación
class Navigation {
  constructor() {
    this.navButtons = document.querySelectorAll('.nav-btn');
    this.sections = document.querySelectorAll('.section');
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.navButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const sectionId = btn.dataset.section;
        this.showSection(sectionId);
      });
    });
  }

  showSection(sectionId) {
    this.navButtons.forEach(btn => btn.classList.remove('active'));
    this.sections.forEach(section => section.classList.remove('active'));
    
    document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');
    document.getElementById(sectionId).classList.add('active');
  }
}

// Gestión de la galería de recuerdos
class MemoriesGallery {
  constructor() {
    this.container = document.querySelector('.memories-grid');
    this.memories = [
      { title: 'Nuestro Primer Día', description: 'El día que todo comenzó...' },
      { title: 'Primera Cita', description: 'Un momento mágico...' },
      { title: 'Nuestro Primer Viaje', description: 'Aventuras juntos...' },
      // Agrega más recuerdos aquí
    ];
    this.renderMemories();
  }

  renderMemories() {
    this.memories.forEach(memory => {
      const card = document.createElement('div');
      card.classList.add('memory-card');
      card.innerHTML = `
        <div class="memory-placeholder">
          <span>❤️</span>
        </div>
        <div class="memory-content">
          <h3>${memory.title}</h3>
          <p>${memory.description}</p>
        </div>
      `;
      this.container.appendChild(card);
    });
  }
}

// Gestión del contador
class LoveCounter {
  constructor() {
    this.daysElement = document.getElementById('days');
    this.hoursElement = document.getElementById('hours');
    this.minutesElement = document.getElementById('minutes');
    this.milestoneElement = document.querySelector('.milestone-message');
    this.startCounting();
  }

  startCounting() {
    this.updateCounter();
    setInterval(() => this.updateCounter(), 60000);
  }

  updateCounter() {
    const time = getTimeSince(RELATIONSHIP_START);
    this.daysElement.textContent = time.days;
    this.hoursElement.textContent = time.hours;
    this.minutesElement.textContent = time.minutes;

    if (time.days % 100 === 0) {
      this.showMilestone(time.days);
    }
  }

  showMilestone(days) {
    this.milestoneElement.textContent = `¡${days} días juntos! 🎉`;
    this.milestoneElement.style.display = 'block';
    setTimeout(() => {
      this.milestoneElement.style.display = 'none';
    }, 5000);
  }
}

// Gestión de mensajes
class MessagesWall {
  constructor() {
    this.container = document.querySelector('.messages-wall');
    this.form = document.querySelector('.message-form');
    this.textarea = this.form.querySelector('textarea');
    this.sendBtn = this.form.querySelector('.send-btn');
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.sendBtn.addEventListener('click', () => this.addMessage());
  }

  addMessage() {
    const message = this.textarea.value.trim();
    if (!message) return;

    const bubble = document.createElement('div');
    bubble.classList.add('message-bubble');
    bubble.textContent = message;
    this.container.insertBefore(bubble, this.container.firstChild);
    this.textarea.value = '';
  }
}

// Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', () => {
  new WelcomeScreen();
  new Navigation();
  new MemoriesGallery();
  new LoveCounter();
  new MessagesWall();

  // Inicializar la caja sorpresa
  document.querySelector('.surprise-box').addEventListener('click', function() {
    const content = this.querySelector('.box-content');
    content.style.display = content.style.display === 'block' ? 'none' : 'block';
  });
});