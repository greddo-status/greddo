// Tabs umschalten
function showTab(tabId, event) {
  document.querySelectorAll('.tab-content').forEach(tab => tab.style.display = 'none');
  document.querySelectorAll('header nav button').forEach(btn => btn.classList.remove('active'));
  document.getElementById(tabId).style.display = 'block';
  if (event) event.target.classList.add('active');
}

// Countdown
function startCountdown() {
  const countdownElement = document.getElementById('countdown');
  const headerCountdown = document.getElementById('header-countdown');

  const eventTime = new Date();
  eventTime.setHours(21, 0, 0, 0); // 21:00 Uhr

  function updateCountdown() {
    const now = new Date();
    let diff = eventTime - now;

    if (diff <= 0) {
      countdownElement.textContent = 'RELEASED';
      countdownElement.classList.add('released');
      headerCountdown.textContent = 'RELEASED';
      clearInterval(timer);
      return;
    }

    const hours = Math.floor(diff / 1000 / 60 / 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    const timeText = `${hours}h ${minutes}m ${seconds}s`;
    countdownElement.textContent = timeText;
    headerCountdown.textContent = `Next Event in: ${timeText}`;
  }

  updateCountdown();
  const timer = setInterval(updateCountdown, 1000);
}

// Dark Mode Toggle
document.getElementById('dark-mode-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// Init
document.addEventListener('DOMContentLoaded', () => {
  startCountdown();
});






