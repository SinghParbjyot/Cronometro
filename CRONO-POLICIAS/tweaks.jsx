// Tweaks — Cronometro race display
// Controls: state mode, demo time, accent palette, event copy.

const CR_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "stateMode": "auto",
  "demoMinutes": 0,
  "accent": "cyan",
  "eventName": "CARRERA",
  "eventSubtitle": "POLICÍA LOCAL DE ZARAGOZA",
  "eventYear": "2026",
  "raceDateText": "24 de Mayo de 2026 · 09:00 h",
  "startISO": "2026-05-24T09:00:00",
  "durationMin": 180,
  "showSalidas": true,
  "showBgTag": true
}/*EDITMODE-END*/;

function CronoTweaksApp() {
  const [t, setTweak] = useTweaks(CR_TWEAK_DEFAULTS);

  // ── Apply tweak values to the page ──
  React.useEffect(() => {
    document.body.dataset.accent = t.accent;
  }, [t.accent]);

  React.useEffect(() => {
    const elName = document.getElementById('event-name');
    const elSub  = document.getElementById('event-subtitle');
    const elYear = document.getElementById('event-year');
    if (elName) elName.textContent = t.eventName;
    if (elSub)  elSub.textContent  = t.eventSubtitle;
    if (elYear) elYear.textContent = t.eventYear;
  }, [t.eventName, t.eventSubtitle, t.eventYear]);

  React.useEffect(() => {
    window.CR && window.CR.setRaceDateDisplay(t.raceDateText);
  }, [t.raceDateText]);

  React.useEffect(() => {
    window.CR && window.CR.setStartDate(t.startISO);
  }, [t.startISO]);

  React.useEffect(() => {
    window.CR && window.CR.setDurationMinutes(t.durationMin);
  }, [t.durationMin]);

  // ── State + demo-time interlock ──
  // stateMode drives the state machine. When user is in "auto" with a non-zero
  // demoMinutes, snap forcedNow accordingly. Otherwise clear it.
  React.useEffect(() => {
    if (!window.CR) return;
    if (t.stateMode === 'auto') {
      if (t.demoMinutes === 0) {
        window.CR.clearForcedNow();
        window.CR.setStateOverride('auto');
      } else if (t.demoMinutes < 0) {
        // negative = minutes until start (still in countdown)
        window.CR.setMinutesUntilStart(Math.abs(t.demoMinutes));
      } else {
        window.CR.setMinutesIntoRace(t.demoMinutes);
      }
    } else {
      window.CR.clearForcedNow();
      window.CR.setStateOverride(t.stateMode);
    }
  }, [t.stateMode, t.demoMinutes]);

  React.useEffect(() => {
    const elTag = document.querySelector('.bg-tag');
    if (elTag) elTag.style.display = t.showBgTag ? '' : 'none';
  }, [t.showBgTag]);

  React.useEffect(() => {
    const elSalidas = document.querySelector('.salidas-section');
    if (elSalidas) elSalidas.style.display = t.showSalidas ? '' : 'none';
  }, [t.showSalidas]);

  return (
    <TweaksPanel title="Cronometro">

      <TweakSection label="Estado de carrera" />
      <TweakRadio label="Modo"
        value={t.stateMode}
        options={[
          { value: 'auto',      label: 'Auto'  },
          { value: 'countdown', label: 'Pre'   },
          { value: 'running',   label: 'Vivo'  },
          { value: 'finished',  label: 'Fin'   },
        ]}
        onChange={(v) => setTweak('stateMode', v)} />
      <TweakSlider label="Offset demo (min)"
        value={t.demoMinutes}
        min={-2880} max={300} step={1} unit="m"
        onChange={(v) => setTweak('demoMinutes', v)} />
      <TweakButton label="Reiniciar offset demo"
        secondary
        onClick={() => setTweak('demoMinutes', 0)} />

      <TweakSection label="Tema" />
      <TweakRadio label="Acento"
        value={t.accent}
        options={[
          { value: 'cyan',    label: 'Cian'    },
          { value: 'amber',   label: 'Ámbar'   },
          { value: 'magenta', label: 'Magenta' },
          { value: 'emerald', label: 'Esmeralda'},
        ]}
        onChange={(v) => setTweak('accent', v)} />

      <TweakSection label="Textos del evento" />
      <TweakText label="Subtítulo"
        value={t.eventSubtitle}
        onChange={(v) => setTweak('eventSubtitle', v)} />
      <TweakText label="Nombre"
        value={t.eventName}
        onChange={(v) => setTweak('eventName', v)} />
      <TweakText label="Año"
        value={t.eventYear}
        onChange={(v) => setTweak('eventYear', v)} />
      <TweakText label="Fecha visible"
        value={t.raceDateText}
        onChange={(v) => setTweak('raceDateText', v)} />

      <TweakSection label="Configuración" />
      <TweakText label="Inicio ISO"
        value={t.startISO}
        onChange={(v) => setTweak('startISO', v)} />
      <TweakNumber label="Duración"
        value={t.durationMin} min={1} max={1440} step={1} unit="min"
        onChange={(v) => setTweak('durationMin', v)} />

      <TweakSection label="Diseño" />
      <TweakToggle label="Mostrar salidas"
        value={t.showSalidas}
        onChange={(v) => setTweak('showSalidas', v)} />
      <TweakToggle label="Mostrar etiqueta de fondo"
        value={t.showBgTag}
        onChange={(v) => setTweak('showBgTag', v)} />

    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('tweaks-root')).render(<CronoTweaksApp />);
