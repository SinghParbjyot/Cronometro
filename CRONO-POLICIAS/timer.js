/**
 * Cronometro — countdown / race-clock / finished state machine.
 *
 * Exposes a small global API the Tweaks panel calls:
 *   window.CR.setStartDate(iso)         — change target date
 *   window.CR.setDurationMinutes(n)     — change race duration
 *   window.CR.setStateOverride(mode)    — 'auto' | 'countdown' | 'running' | 'finished'
 *   window.CR.setMinutesUntilStart(n)   — quick demo: snap countdown to N minutes
 *   window.CR.setMinutesIntoRace(n)     — quick demo: snap to N minutes into the race
 *   window.CR.setRaceDateDisplay(text)  — pretty start-date string under counter
 */
'use strict';

const MODE = Object.freeze({ COUNTDOWN: 'countdown', RUNNING: 'running', FINISHED: 'finished' });

const state = {
  startDate: new Date('2026-05-24T09:00:00'),
  durationMin: 180,
  override: 'auto',         // 'auto' | 'countdown' | 'running' | 'finished'
  forcedNow: null,          // when set, replaces 'now' for state calc (demo)
  currentMode: null,
};

const el = {
  days:           document.getElementById('days'),
  hours:          document.getElementById('hours'),
  minutes:        document.getElementById('minutes'),
  seconds:        document.getElementById('seconds'),
  statusBadge:    document.getElementById('status-badge'),
  statusText:     document.getElementById('status-text'),
  statusIcon:     document.getElementById('status-icon'),
  counterRow:     document.getElementById('counter-row'),
  blockDays:      document.getElementById('block-days'),
  raceInfo:       document.getElementById('race-info'),
  raceDateDisplay:document.getElementById('race-date-display'),
};

function pad(n) { return n < 10 ? '0' + n : String(n); }

function displayTime(ms, isElapsed) {
  const totalSec = Math.floor(Math.max(0, ms) / 1000);
  const d = Math.floor(totalSec / 86400);
  const h = Math.floor((totalSec % 86400) / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  el.days.textContent    = pad(d);
  el.hours.textContent   = pad(h);
  el.minutes.textContent = pad(m);
  el.seconds.textContent = pad(s);

  // Dim "days" block when it's 00 during running/finished — visual cue
  if (el.blockDays) {
    el.blockDays.classList.toggle('dim', isElapsed && d === 0);
  }
}

function setMode(mode) {
  if (state.currentMode === mode) return;
  state.currentMode = mode;
  const { statusBadge, counterRow, raceInfo, statusIcon, statusText } = el;
  statusBadge.classList.remove('running', 'finished');
  counterRow.classList.remove('running', 'finished');
  switch (mode) {
    case MODE.COUNTDOWN:
      statusIcon.textContent = '⏳';
      statusText.textContent = 'CUENTA ATRÁS';
      raceInfo.classList.remove('hidden');
      break;
    case MODE.RUNNING:
      statusBadge.classList.add('running');
      counterRow.classList.add('running');
      statusIcon.textContent = '▶';
      statusText.textContent = 'EN CURSO';
      raceInfo.classList.add('hidden');
      break;
    case MODE.FINISHED:
      statusBadge.classList.add('finished');
      counterRow.classList.add('finished');
      statusIcon.textContent = '🏁';
      statusText.textContent = 'FINALIZADA';
      raceInfo.classList.add('hidden');
      break;
  }
}

function update() {
  const now = state.forcedNow || new Date();
  const start = state.startDate;
  const end = new Date(start.getTime() + state.durationMin * 60_000);

  // State-override branches still recompute the timer relative to the configured start
  if (state.override === 'countdown') {
    setMode(MODE.COUNTDOWN);
    // If now is past start, show 0; else remaining
    displayTime(Math.max(0, start - now), false);
    return;
  }
  if (state.override === 'running') {
    setMode(MODE.RUNNING);
    // Show elapsed within the race; if now < start, clamp to 0
    displayTime(Math.max(0, Math.min(end - start, now - start)), true);
    return;
  }
  if (state.override === 'finished') {
    setMode(MODE.FINISHED);
    displayTime(state.durationMin * 60_000, true);
    return;
  }

  // Auto
  if (now < start) {
    setMode(MODE.COUNTDOWN);
    displayTime(start - now, false);
  } else if (now < end) {
    setMode(MODE.RUNNING);
    displayTime(now - start, true);
  } else {
    setMode(MODE.FINISHED);
    displayTime(state.durationMin * 60_000, true);
  }
}

window.CR = {
  setStartDate(iso) {
    const d = new Date(iso);
    if (!isNaN(d)) state.startDate = d;
    update();
  },
  setDurationMinutes(n) {
    state.durationMin = Math.max(1, n | 0);
    update();
  },
  setStateOverride(mode) {
    state.override = ['countdown', 'running', 'finished'].includes(mode) ? mode : 'auto';
    // When entering auto, drop any demo "forcedNow"
    if (state.override === 'auto') state.forcedNow = null;
    update();
  },
  setMinutesUntilStart(n) {
    // Snap demo clock: now = start − n minutes
    state.forcedNow = new Date(state.startDate.getTime() - n * 60_000);
    state.override = 'auto';
    update();
  },
  setMinutesIntoRace(n) {
    state.forcedNow = new Date(state.startDate.getTime() + n * 60_000);
    state.override = 'auto';
    update();
  },
  clearForcedNow() {
    state.forcedNow = null;
    update();
  },
  setRaceDateDisplay(text) {
    if (el.raceDateDisplay) el.raceDateDisplay.textContent = text;
  },
  // Read access for the Tweaks UI
  _state: state,
};

// Tick
update();
setInterval(update, 1000);
