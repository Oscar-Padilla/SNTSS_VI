import { useState, useEffect, useRef } from 'react'
import { useTweaks, TweaksPanel, TweakSection, TweakSelect, TweakSlider, TweakRadio } from './TweaksPanel.jsx'
import { Header, Footer, Toast } from './ui.jsx'
import { PageInicio } from './portal.jsx'
import { PageNosotros, PageDelegados, PageEventos, PageNoticias, PageNota, PageContacto } from './portal2.jsx'
import { MemberFlow } from './member.jsx'
import { PageAcceso, AdminApp } from './admin.jsx'

const FONTS = {
  moderno:   { head: '"Plus Jakarta Sans"', body: '"Manrope"',  label: "Moderno" },
  editorial: { head: '"Sora"',              body: '"DM Sans"',  label: "Editorial" },
  amigable:  { head: '"Poppins"',           body: '"Figtree"',  label: "Amigable" },
  sistema:   { head: "system-ui",           body: "system-ui",  label: "Sistema" },
};

const TWEAK_DEFAULTS = {
  fuente: "moderno",
  vista: "escritorio",
  escala: 1,
};

export default function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [route, setRoute] = useState("inicio");
  const [params, setParams] = useState({});
  const [toastMsg, setToastMsg] = useState(null);
  const toastTimer = useRef(null);
  const hostRef = useRef(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("sntss_route") || "null");
      if (saved && saved.route) { setRoute(saved.route); setParams(saved.params || {}); }
    } catch (e) {}
  }, []);

  const go = (r, p = {}) => {
    setRoute(r); setParams(p);
    try { localStorage.setItem("sntss_route", JSON.stringify({ route: r, params: p })); } catch (e) {}
    if (hostRef.current) { const sc = hostRef.current.querySelector(".scroll"); sc && (sc.scrollTop = 0); }
    window.scrollTo && window.scrollTo(0, 0);
  };

  const toast = (msg, icon) => {
    setToastMsg({ msg, icon: icon || "check" });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMsg(null), 2600);
  };

  useEffect(() => {
    const f = FONTS[t.fuente] || FONTS.moderno;
    const root = document.documentElement;
    root.style.setProperty("--head", f.head + ", system-ui, sans-serif");
    root.style.setProperty("--body", f.body + ", system-ui, sans-serif");
    root.style.setProperty("--fs", t.escala);
  }, [t.fuente, t.escala]);

  const mobile = t.vista === "movil";
  const fullscreen = route === "acceso" || route === "admin";

  let content;
  if (route === "acceso") content = <PageAcceso go={go} toast={toast} />;
  else if (route === "admin") content = <AdminApp go={go} toast={toast} isMobile={mobile} />;
  else {
    let page;
    switch (route) {
      case "nosotros": page = <PageNosotros go={go} />; break;
      case "delegados": page = <PageDelegados go={go} />; break;
      case "eventos": page = <PageEventos go={go} />; break;
      case "noticias": page = <PageNoticias go={go} />; break;
      case "nota": page = <PageNota go={go} params={params} />; break;
      case "contacto": page = <PageContacto go={go} toast={toast} />; break;
      case "registro": page = <MemberFlow go={go} params={params} toast={toast} />; break;
      default: page = <PageInicio go={go} />;
    }
    content = (
      <div>
        <Header route={route} go={go} />
        {page}
        <Footer go={go} />
      </div>
    );
  }

  const wrapped = (
    <div style={fullscreen ? { minHeight: mobile ? "auto" : "100vh" } : null}>{content}</div>
  );

  return (
    <div className={"viewport-host" + (mobile ? " is-mobile" : "")} ref={hostRef}>
      {mobile ? (
        <div className="device">
          <div className="notch" />
          <div className="scroll">{wrapped}</div>
        </div>
      ) : wrapped}

      <Toast msg={toastMsg && toastMsg.msg} icon={toastMsg && toastMsg.icon} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Tipografía" />
        <TweakSelect label="Familia tipográfica" value={t.fuente}
          options={Object.keys(FONTS).map((k) => ({ value: k, label: FONTS[k].label }))}
          onChange={(v) => setTweak("fuente", v)} />
        <TweakSlider label="Escala de texto" value={t.escala} min={0.9} max={1.25} step={0.05} unit="×"
          onChange={(v) => setTweak("escala", v)} />
        <TweakSection label="Dispositivo" />
        <TweakRadio label="Vista" value={t.vista}
          options={[{ value: "escritorio", label: "Escritorio" }, { value: "movil", label: "Móvil" }]}
          onChange={(v) => setTweak("vista", v)} />
      </TweaksPanel>
    </div>
  );
}
