// Tabs anzeigen und aktiven Button markieren
function showTab(tabName) {
  const tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => {
    tab.style.display = tab.id === tabName ? 'block' : 'none';
  });

  const buttons = document.querySelectorAll('nav button');
  buttons.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('onclick').includes(tabName));
  });
}

// Status-Text basierend auf Status-Code
function statusText(status) {
  if (status === 'ok') return 'ONLINE';
  if (status === 'error') return 'ISSUES';
  return status.toUpperCase();
}

// Status laden und anzeigen
async function loadStatus() {
  try {
    const response = await fetch('data/status.json');
    if (!response.ok) throw new Error('Failed to load status data');
    const data = await response.json();

    const container = document.getElementById('status-container');
    container.innerHTML = '';

    // Game Status
    if (data.game) {
      const gameDiv = document.createElement('div');
      gameDiv.classList.add('game-status');
      gameDiv.innerHTML = `
        <div class="status-dot"></div>
        <strong>Game: ${data.game.name}</strong>: <span style="color:#064e3b;">${statusText(data.game.status)}</span>
      `;
      container.appendChild(gameDiv);
    }

    // Bots Status mit BOT-Tag
    data.bots.forEach(bot => {
      const botDiv = document.createElement('div');
      botDiv.innerHTML = `
        <strong>Bot: ${bot.name}</strong>: <span class="bot-status">${statusText(bot.status)}</span>
        <span class="bot-tag">BOT</span>
      `;
      container.appendChild(botDiv);
    });
  } catch (error) {
    const container = document.getElementById('status-container');
    container.textContent = 'Error loading status.';
    console.error(error);
  }
}

// Countdown für Event in Main Bereich
function startCountdown() {
  const countdownEl = document.getElementById('countdown');

  function getNextEventTime() {
    const now = new Date();

    // UTC+2 (Sommerzeit Deutschland)
    const event = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 21, 0, 0);

    if (now > event) {
      event.setDate(event.getDate() + 1);
    }
    return event;
  }

  function updateCountdown() {
    const now = new Date();
    const eventTime = getNextEventTime();

    const diff = eventTime - now;

    if (diff <= 0) {
      countdownEl.textContent = 'Event is live now!';
      return;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    countdownEl.textContent = `${hours}h ${minutes}m ${seconds}s`;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// Countdown in Header rechts oben
function startHeaderCountdown() {
  const headerCountdownEl = document.getElementById('header-countdown');

  function getNextEventTime() {
    const now = new Date();

    // UTC+2 (Sommerzeit Deutschland)
    const event = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 21, 0, 0);

    if (now > event) {
      event.setDate(event.getDate() + 1);
    }
    return event;
  }

  function updateCountdown() {
    const now = new Date();
    const eventTime = getNextEventTime();

    const diff = eventTime - now;

    if (diff <= 0) {
      headerCountdownEl.textContent = 'Event Live!';
      return;
    }

    const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0');
    const minutes = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
    const seconds = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');

    headerCountdownEl.textContent = `${hours}:${minutes}:${seconds}`;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// Init nach Laden der Seite
document.addEventListener('DOMContentLoaded', () => {
  showTab('status');
  loadStatus();
  startCountdown();
  startHeaderCountdown();
});






