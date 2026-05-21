/**
 * ============================================================
 * CARRERA POLICÍAS ZARAGOZA 2026
 * script.js — Lógica del contador y cronómetro
 *
 * CÓMO CONFIGURAR:
 *   1. Cambia RACE_START_DATE con la fecha real de la carrera.
 *   2. Ajusta RACE_DURATION_MINUTES con la duración estimada.
 *   3. Modifica RACE_DATE_DISPLAY con el texto de fecha visible.
 *   4. Cambia FOOTER_MESSAGE para el mensaje del pie de página.
 *   5. Pon SHOW_CONTROLS = true para ver los controles desde el inicio.
 *
 * MODOS DE FUNCIONAMIENTO:
 *   · Antes de RACE_START_DATE    → Cuenta atrás
 *   · Durante la carrera          → Cronómetro ascendente
 *   · Pasado RACE_DURATION_MINUTES → Estado "FINALIZADA"
 *
 * ATAJOS DE TECLADO:
 *   C → Mostrar / ocultar controles manuales
 *   F → Activar / desactivar pantalla completa
 *   Espacio → Pausar / reanudar (solo en modo manual)
 * ============================================================
 */

'use strict';

/* ============================================================
   CONFIGURACIÓN PRINCIPAL
   ¡MODIFICA ESTOS VALORES ANTES DE CADA EVENTO!
   ============================================================ */

/**
 * Fecha y hora de inicio de la carrera.
 *
 * Formato:  "YYYY-MM-DDTHH:MM:SS"
 * Ejemplo:  "2026-06-07T09:00:00"  →  7 de junio de 2026 a las 09:00 h
 *
 * NOTA: Se interpreta en la hora LOCAL del ordenador donde se muestra.
 * Para forzar una zona horaria específica usa el desplazamiento UTC:
 *   "2026-06-07T09:00:00+02:00"  (hora de Madrid en verano)
 */
const RACE_START_DATE = new Date('2026-05-24T09:00:00');

/**
 * Duración estimada de la carrera en minutos.
 * Pasado este tiempo desde RACE_START_DATE el estado pasa a "FINALIZADA".
 *
 * Ejemplos:
 *   60  →  1 hora
 *   120 →  2 horas
 *   180 →  3 horas  (valor por defecto)
 */
const RACE_DURATION_MINUTES = 180;

/**
 * Texto de fecha que aparece debajo del contador durante la cuenta atrás.
 * Cambia este texto para que coincida con el formato que prefieras mostrar.
 */
const RACE_DATE_DISPLAY = '24 de Mayo de 2026 · 09:00 h';

/**
 * Mensaje del pie de página.
 * Ejemplos: "Gracias por participar", "¡Ánimo a todos los corredores!"
 */
const FOOTER_MESSAGE = 'Gracias por participar';

/**
 * Mostrar controles manuales al cargar la página.
 *   true  → visibles desde el inicio (útil para configuración y pruebas)
 *   false → ocultos; usa la tecla C para mostrarlos
 */
const SHOW_CONTROLS = false;

/* ============================================================
   CONSTANTES INTERNAS (no hace falta modificar)
   ============================================================ */

/** Identificadores de modo */
const MODE = Object.freeze({
  COUNTDOWN: 'countdown',
  RUNNING:   'running',
  FINISHED:  'finished',
});

/* ============================================================
   ESTADO INTERNO
   ============================================================ */

let currentMode      = null;   // Modo activo en pantalla
let timerInterval    = null;   // Referencia al setInterval principal

/** Control manual */
let manualOverride   = false;  // true cuando el usuario ha iniciado manualmente
let manualStartTime  = null;   // Instante de inicio manual
let isPaused         = false;  // Está el contador pausado
let pausedElapsed    = 0;      // Milisegundos acumulados durante pausas
let pauseStartTime   = null;   // Instante en que se pausó

/* ============================================================
   REFERENCIAS AL DOM
   ============================================================ */

/** Objeto de acceso rápido a los elementos del DOM */
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
  raceDateDisplay: document.getElementById('race-date-display'),

  footerMessage:  document.getElementById('footer-message'),
  manualControls: document.getElementById('manual-controls'),
  btnPause:       document.getElementById('btn-pause'),
};

/* ============================================================
   INICIALIZACIÓN
   ============================================================ */

/**
 * Punto de entrada. Se ejecuta cuando el DOM está listo.
 * Aplica los textos configurables e inicia el bucle del reloj.
 */
function init() {
  // Aplicar textos configurables al DOM
  if (el.raceDateDisplay) {
    el.raceDateDisplay.textContent = RACE_DATE_DISPLAY;
  }
  if (el.footerMessage) {
    el.footerMessage.textContent = FOOTER_MESSAGE;
  }

  // Mostrar controles si el flag está activado
  if (SHOW_CONTROLS && el.manualControls) {
    el.manualControls.classList.add('visible');
  }

  // Primera actualización inmediata + bucle cada segundo
  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);
}

/* ============================================================
   BUCLE PRINCIPAL DEL CONTADOR
   ============================================================ */

/**
 * Calcula el tiempo actual y actualiza la pantalla.
 * Se llama cada segundo mediante setInterval.
 */
function updateTimer() {
  // No actualizar si el contador está pausado
  if (isPaused) return;

  const now     = new Date();
  const raceEnd = new Date(RACE_START_DATE.getTime() + RACE_DURATION_MINUTES * 60 * 1000);

  /* ── Modo manual: ignora la fecha configurada ── */
  if (manualOverride) {
    const elapsed = (now - manualStartTime) - pausedElapsed;

    if (elapsed < 0) {
      // Cuenta atrás hacia el inicio manual
      setMode(MODE.COUNTDOWN);
      displayTime(Math.abs(elapsed), false);
    } else if (elapsed < RACE_DURATION_MINUTES * 60 * 1000) {
      // Cronómetro ascendente
      setMode(MODE.RUNNING);
      displayTime(elapsed, true);
    } else {
      // Finalizada
      setMode(MODE.FINISHED);
      displayTime(RACE_DURATION_MINUTES * 60 * 1000, true);
      stopClock();
    }
    return;
  }

  /* ── Modo automático: basado en RACE_START_DATE ── */
  if (now < RACE_START_DATE) {
    // Faltan X días/horas/min/seg para el inicio → cuenta atrás
    const remaining = RACE_START_DATE - now;
    setMode(MODE.COUNTDOWN);
    displayTime(remaining, false);

  } else if (now < raceEnd) {
    // La carrera está en curso → cronómetro ascendente
    const elapsed = now - RACE_START_DATE;
    setMode(MODE.RUNNING);
    displayTime(elapsed, true);

  } else {
    // Pasó la duración → finalizada
    setMode(MODE.FINISHED);
    displayTime(RACE_DURATION_MINUTES * 60 * 1000, true);
    stopClock();
  }
}

/* ============================================================
   ACTUALIZACIÓN DEL DISPLAY
   ============================================================ */

/**
 * Descompone los milisegundos en días/horas/min/seg y los muestra.
 *
 * @param {number}  ms        - Milisegundos a mostrar (≥ 0)
 * @param {boolean} isElapsed - true → tiempo transcurrido (atenuar días si son 0)
 */
function displayTime(ms, isElapsed) {
  const totalSec = Math.floor(Math.max(0, ms) / 1000);

  const days    = Math.floor(totalSec / 86400);
  const hours   = Math.floor((totalSec % 86400) / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;

  el.days.textContent    = pad(days);
  el.hours.textContent   = pad(hours);
  el.minutes.textContent = pad(minutes);
  el.seconds.textContent = pad(seconds);

  // Durante la carrera, atenuar el bloque DÍAS si vale 00
  if (el.blockDays) {
    el.blockDays.style.opacity = (isElapsed && days === 0) ? '0.3' : '1';
  }
}

/**
 * Rellena con cero a la izquierda si el número es menor que 10.
 *
 * @param  {number} n
 * @returns {string}  "05", "12", "00"…
 */
function pad(n) {
  return n < 10 ? '0' + n : String(n);
}

/* ============================================================
   GESTIÓN DE MODOS VISUALES
   ============================================================ */

/**
 * Actualiza el badge de estado, las clases CSS de los elementos
 * y los textos de icono/estado.
 *
 * @param {string} mode - Uno de MODE.COUNTDOWN | MODE.RUNNING | MODE.FINISHED
 */
function setMode(mode) {
  // Evitar parpadeos si ya estamos en el mismo modo
  if (currentMode === mode) return;
  currentMode = mode;

  const badge = el.statusBadge;
  const row   = el.counterRow;
  const info  = el.raceInfo;

  // Eliminar clases de estado anteriores
  badge.classList.remove('running', 'finished');
  row.classList.remove('running', 'finished');

  switch (mode) {

    case MODE.COUNTDOWN:
      el.statusIcon.textContent = '⏳';
      el.statusText.textContent = 'CUENTA ATRÁS';
      if (info) info.classList.remove('hidden');
      break;

    case MODE.RUNNING:
      badge.classList.add('running');
      row.classList.add('running');
      el.statusIcon.textContent = '▶';
      el.statusText.textContent = 'EN CURSO';
      // Ocultar info de fecha durante la carrera
      if (info) info.classList.add('hidden');
      break;

    case MODE.FINISHED:
      badge.classList.add('finished');
      row.classList.add('finished');
      el.statusIcon.textContent = '🏁';
      el.statusText.textContent = 'FINALIZADA';
      if (info) info.classList.add('hidden');
      break;
  }
}

/* ============================================================
   CONTROLES MANUALES
   (llamados desde los botones del panel y desde el teclado)
   ============================================================ */

/**
 * Inicia el cronómetro manualmente desde cero.
 * Anula la lógica de fecha automática (manualOverride = true).
 */
function manualStart() {
  manualOverride  = true;
  isPaused        = false;
  pausedElapsed   = 0;
  pauseStartTime  = null;
  manualStartTime = new Date();
  currentMode     = null;           // Forzar actualización visual

  restartClock();
  if (el.btnPause) el.btnPause.textContent = '⏸ Pausar';
}

/**
 * Alterna entre pausar y reanudar el contador.
 * Solo tiene efecto si hay un override manual activo.
 */
function togglePause() {
  if (!isPaused) {
    // --- Pausar ---
    isPaused       = true;
    pauseStartTime  = new Date();
    if (el.btnPause) el.btnPause.textContent = '▶ Reanudar';
  } else {
    // --- Reanudar ---
    isPaused = false;
    if (pauseStartTime) {
      pausedElapsed += new Date() - pauseStartTime;
    }
    pauseStartTime = null;
    if (el.btnPause) el.btnPause.textContent = '⏸ Pausar';
    // Actualizar inmediatamente al reanudar
    updateTimer();
  }
}

/**
 * Vuelve al modo automático basado en la fecha configurada.
 * Descarta cualquier override manual y pausa activa.
 */
function resetTimer() {
  manualOverride  = false;
  isPaused        = false;
  pausedElapsed   = 0;
  manualStartTime = null;
  pauseStartTime  = null;
  currentMode     = null;

  restartClock();
  if (el.btnPause) el.btnPause.textContent = '⏸ Pausar';
}

/**
 * Muestra u oculta el panel de controles manuales.
 * También se activa con la tecla C.
 */
function toggleControlsVisibility() {
  if (el.manualControls) {
    el.manualControls.classList.toggle('visible');
  }
}

/* ============================================================
   UTILIDADES INTERNAS
   ============================================================ */

/** Detiene el bucle del reloj */
function stopClock() {
  if (timerInterval !== null) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

/** Reinicia el bucle del reloj (actualización inmediata + cada segundo) */
function restartClock() {
  stopClock();
  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);
}

/* ============================================================
   ATAJOS DE TECLADO
   ============================================================ */

document.addEventListener('keydown', function (e) {
  // Evitar interferencia con campos de formulario si los hubiera
  if (e.target && e.target.tagName === 'INPUT') return;

  switch (e.key.toLowerCase()) {

    /* C → Mostrar / ocultar panel de controles */
    case 'c':
      toggleControlsVisibility();
      break;

    /* Espacio → Pausar / reanudar (solo en override manual) */
    case ' ':
      if (manualOverride) {
        e.preventDefault();
        togglePause();
      }
      break;

    /* F → Pantalla completa / salir de pantalla completa */
    case 'f':
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(function (err) {
          /* Algunos navegadores bloquean fullscreen sin interacción del usuario */
          console.warn('Pantalla completa no disponible:', err.message);
        });
      } else {
        document.exitFullscreen();
      }
      break;
  }
});

/* ============================================================
   ARRANQUE
   ============================================================ */
document.addEventListener('DOMContentLoaded', init);
