/* ==========================================================================
   ARPITA & DEBABRATA — WEDDING INVITATION
   Edit the settings below to customise the site.
   ========================================================================== */

// ---- EASY CUSTOMISATION SETTINGS ------------------------------------------
// Exact ceremony time has not been confirmed yet — update the time portion
// (after the "T") once it is known. Keep the +05:30 (Asia/Kolkata) offset.
const WEDDING_DATE = "2026-12-13T19:00:00+05:30";

// WhatsApp number that receives RSVPs, digits only, with country code.
const RSVP_WHATSAPP_NUMBER = "918240244879";

// Shown in the Venue section and used to build the Google Maps link.
const WEDDING_LOCATION = "CW92+82V, Denanchar Orphuli Char, West Bengal, India";

// Couple / event details used for the "Save the Date" calendar file.
const COUPLE_NAMES = "Arpita & Debabrata";
const EVENT_TITLE = "Arpita & Debabrata's Wedding";
// ----------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function () {
  initPetals();
  initOpening();
  initMusic();
  initNav();
  initCountdown();
  initVenueLink();
  initGallery();
  initRsvp();
  initSaveTheDate();
});

/* ---------------- Falling petals (ambient) ---------------- */
function initPetals() {
  const field = document.getElementById('petalField');
  if (!field) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const count = window.innerWidth < 600 ? 10 : 18;
  for (let i = 0; i < count; i++) {
    const petal = document.createElement('span');
    petal.className = 'petal';
    petal.style.left = Math.random() * 100 + 'vw';
    petal.style.animationDuration = (10 + Math.random() * 12) + 's';
    petal.style.animationDelay = (Math.random() * 14) + 's';
    petal.style.opacity = (0.35 + Math.random() * 0.35).toFixed(2);
    petal.style.transform = `scale(${(0.6 + Math.random() * 0.8).toFixed(2)})`;
    field.appendChild(petal);
  }
}

/* ---------------- Opening screen ---------------- */
function initOpening() {
  const opening = document.getElementById('opening');
  const enterBtn = document.getElementById('enterBtn');
  const mainSite = document.getElementById('mainSite');
  if (!opening || !enterBtn || !mainSite) return;

  function enter() {
    opening.classList.add('leaving');
    mainSite.classList.add('visible');
    document.body.style.overflow = '';
    setTimeout(function () {
      opening.style.display = 'none';
    }, 950);
  }

  enterBtn.addEventListener('click', enter);
}

/* ---------------- Music ---------------- */
function initMusic() {
  const audio = document.getElementById('weddingAudio');
  const toggle = document.getElementById('musicToggle');
  const label = document.getElementById('musicLabel');
  if (!audio || !toggle || !label) return;

  let playing = false;

  toggle.addEventListener('click', function () {
    if (!playing) {
      audio.play().then(function () {
        playing = true;
        label.textContent = 'Pause Music';
        toggle.setAttribute('aria-pressed', 'true');
      }).catch(function () {
        // Music file may not exist yet — fail silently, site keeps working.
        label.textContent = 'Music Unavailable';
      });
    } else {
      audio.pause();
      playing = false;
      label.textContent = 'Play Music';
      toggle.setAttribute('aria-pressed', 'false');
    }
  });
}

/* ---------------- Nav ---------------- */
function initNav() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', function () {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------------- Countdown (Asia/Kolkata) ---------------- */
function initCountdown() {
  const target = new Date(WEDDING_DATE).getTime();
  const els = {
    days: document.getElementById('cd-days'),
    hours: document.getElementById('cd-hours'),
    mins: document.getElementById('cd-mins'),
    secs: document.getElementById('cd-secs'),
  };
  const countdownBox = document.getElementById('countdown');
  const doneMsg = document.getElementById('countdownDone');
  if (!els.days) return;

  function tick() {
    const now = Date.now();
    const diff = target - now;

    if (diff <= 0) {
      if (countdownBox) countdownBox.hidden = true;
      if (doneMsg) doneMsg.hidden = false;
      clearInterval(timer);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    els.days.textContent = String(days).padStart(2, '0');
    els.hours.textContent = String(hours).padStart(2, '0');
    els.mins.textContent = String(mins).padStart(2, '0');
    els.secs.textContent = String(secs).padStart(2, '0');
  }

  tick();
  const timer = setInterval(tick, 1000);
}

/* ---------------- Venue / Google Maps ---------------- */
function initVenueLink() {
  const link = document.getElementById('mapsLink');
  if (!link) return;
  const query = encodeURIComponent(WEDDING_LOCATION);
  link.href = `https://www.google.com/maps/search/?api=1&query=${query}`;
}

/* ---------------- Gallery image fallback + lightbox ---------------- */
function handleImgError(img) {
  img.style.display = 'none';
}

function initGallery() {
  // Mark successfully loaded images so their placeholder can hide via CSS.
  document.querySelectorAll('.gallery-item img, .opening-background-image').forEach(function (img) {
    if (img.complete && img.naturalWidth > 0) {
      img.classList.add('loaded');
    }
    img.addEventListener('load', function () {
      if (img.naturalWidth > 0) img.classList.add('loaded');
    });
  });

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('lightboxClose');
  if (!lightbox) return;

  document.querySelectorAll('.gallery-item').forEach(function (item) {
    item.addEventListener('click', function () {
      const img = item.querySelector('img');
      const hasPhoto = img && img.classList.contains('loaded');
      if (!hasPhoto) return; // nothing to enlarge for a placeholder tile
      lightboxImg.src = item.getAttribute('data-full');
      lightboxImg.alt = item.getAttribute('data-caption') || '';
      lightboxCaption.textContent = item.getAttribute('data-caption') || '';
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
    });
  });

  function close() {
    lightbox.hidden = true;
    lightboxImg.src = '';
    document.body.style.overflow = '';
  }
  closeBtn.addEventListener('click', close);
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) close();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !lightbox.hidden) close();
  });
}

/* ---------------- RSVP via WhatsApp ---------------- */
function initRsvp() {
  const form = document.getElementById('rsvpForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('rsvpName').value.trim();
    const mobile = document.getElementById('rsvpMobile').value.trim();
    const attendance = form.querySelector('input[name="attendance"]:checked');
    const attendanceValue = attendance ? attendance.value : '';
    const guests = document.getElementById('rsvpGuests').value.trim();
    const message = document.getElementById('rsvpMessage').value.trim();

    const text =
      `❤️ Wedding RSVP — Arpita & Debabrata\n\n` +
      `Name: ${name}\n` +
      `Mobile: ${mobile}\n` +
      `Attendance: ${attendanceValue}\n` +
      `Number of Guests: ${guests}\n` +
      `Message: ${message}\n\n` +
      `13 December 2026\n` +
      `${WEDDING_LOCATION}`;

    const url = `https://wa.me/${RSVP_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener');
  });
}

/* ---------------- Save the Date (.ics) ---------------- */
function initSaveTheDate() {
  const btn = document.getElementById('saveDateBtn');
  if (!btn) return;

  btn.addEventListener('click', function () {
    const start = new Date(WEDDING_DATE);
    const end = new Date(start.getTime() + 4 * 60 * 60 * 1000); // 4-hour placeholder duration

    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//' + COUPLE_NAMES + '//Wedding//EN',
      'BEGIN:VEVENT',
      'UID:' + Date.now() + '@wedding-invitation',
      'DTSTAMP:' + toIcsDate(new Date()),
      'DTSTART:' + toIcsDate(start),
      'DTEND:' + toIcsDate(end),
      'SUMMARY:' + EVENT_TITLE,
      'DESCRIPTION:Join us as we celebrate the wedding of Arpita & Debabrata.',
      'LOCATION:' + WEDDING_LOCATION,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'arpita-debabrata-wedding.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}

function toIcsDate(date) {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}
