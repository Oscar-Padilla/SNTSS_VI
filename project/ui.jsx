/* UI compartida. Exporta a window. */
const { useState, useEffect, useRef } = React;

/* ---------- Logo / marca ---------- */
function Brand({ go, light }) {
  return (
    <a className="brand" href="#" onClick={(e) => { e.preventDefault(); go && go("inicio"); }}>
      <img src="assets/logo.png" alt="SNTSS Sección VI" />
      <span className="brand-txt">
        <b>SNTSS Sección VI</b>
        <span>Yucatán</span>
      </span>
    </a>
  );
}

/* ---------- QR visual (determinista a partir de una semilla) ---------- */
function QR({ seed = "SNTSS", size }) {
  const N = 11;
  // patrón determinista
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const rand = (i) => {
    let x = (h ^ (i * 2654435761)) >>> 0;
    x ^= x << 13; x ^= x >>> 17; x ^= x << 5;
    return ((x >>> 0) % 100) / 100;
  };
  const isFinder = (r, c) => {
    const inBox = (R, C) => r >= R && r < R + 3 && c >= C && c < C + 3;
    return inBox(0, 0) || inBox(0, N - 3) || inBox(N - 3, 0);
  };
  const cells = [];
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      let on;
      if (isFinder(r, c)) {
        const lr = r >= N - 3 ? r - (N - 3) : r;
        const lc = c >= N - 3 ? c - (N - 3) : c;
        on = !(lr === 1 && lc === 1) ? true : false; // marco con centro hueco
        // hacer hueco el anillo medio
        on = (lr === 0 || lr === 2 || lc === 0 || lc === 2) ? true : (lr === 1 && lc === 1);
      } else {
        on = rand(r * N + c) > 0.52;
      }
      cells.push(<i key={r + "-" + c} className={on ? "" : "off"} />);
    }
  }
  return <div className="qr" style={size ? { width: size, height: size } : null}>{cells}</div>;
}

/* ---------- Header público ---------- */
function Header({ route, go }) {
  const [open, setOpen] = useState(false);
  const links = [
    ["inicio", "Inicio"],
    ["nosotros", "Quiénes somos"],
    ["delegados", "Directiva"],
    ["eventos", "Eventos"],
    ["noticias", "Noticias"],
    ["contacto", "Contacto"],
  ];
  const nav = (r) => { go(r); setOpen(false); };
  return (
    <header className="site-header">
      <div className="container nav">
        <Brand go={go} />
        <nav className="nav-links">
          {links.map(([r, l]) => (
            <a key={r} className={"nav-link" + (route === r ? " active" : "")}
               href="#" onClick={(e) => { e.preventDefault(); nav(r); }}>{l}</a>
          ))}
        </nav>
        <div className="nav-cta">
          <button className="btn btn-ghost btn-sm hide-mobile" onClick={() => go("acceso")}>Acceder</button>
          <button className="btn btn-primary btn-sm" onClick={() => go("registro")}>
            <Icon name="qr" size={17} /> Mi credencial
          </button>
          <button className="burger" onClick={() => setOpen(!open)} aria-label="Menú">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">{open ? <><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></> : <><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></>}</svg>
          </button>
        </div>
      </div>
      {open && (
        <div style={{ borderTop: "1px solid var(--line)", background: "#fff" }}>
          <div className="container" style={{ padding: "12px 24px 18px" }}>
            {links.map(([r, l]) => (
              <a key={r} className={"nav-link" + (route === r ? " active" : "")}
                 style={{ display: "block", padding: "12px 14px" }}
                 href="#" onClick={(e) => { e.preventDefault(); nav(r); }}>{l}</a>
            ))}
            <button className="btn btn-outline btn-block" style={{ marginTop: 10 }} onClick={() => nav("acceso")}>Acceder como administrador</button>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------- Footer ---------- */
function Footer({ go }) {
  const col = (title, items) => (
    <div>
      <h5>{title}</h5>
      <ul className="reset">
        {items.map(([l, r]) => (
          <li key={l}><a href="#" onClick={(e) => { e.preventDefault(); r && go(r); }}>{l}</a></li>
        ))}
      </ul>
    </div>
  );
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Brand go={go} light />
            <p style={{ marginTop: 16, maxWidth: 320 }}>
              Portal oficial de la Sección VI del SNTSS en Yucatán. Trámites, eventos y comunicación
              para las y los trabajadores del Seguro Social.
            </p>
            <div className="foot-social">
              <a href="#" aria-label="Facebook"><Icon name="fb" size={19} /></a>
              <a href="#" aria-label="Instagram"><Icon name="ig" size={19} /></a>
              <a href="#" aria-label="WhatsApp"><Icon name="wa" size={19} /></a>
              <a href="#" aria-label="YouTube"><Icon name="yt" size={19} /></a>
            </div>
          </div>
          {col("Sección", [["Quiénes somos", "nosotros"], ["Comité ejecutivo", "delegados"], ["Noticias", "noticias"], ["Contacto", "contacto"]])}
          {col("Trámites", [["Eventos y convocatorias", "eventos"], ["Mi credencial QR", "registro"], ["Cursos de verano", "eventos"], ["Becas", "eventos"]])}
          {col("Acceso", [["Trabajador", "registro"], ["Administración", "acceso"], ["Aviso de privacidad", "contacto"]])}
        </div>
        <div className="foot-bottom">
          <span>© 2026 SNTSS Sección VI · Yucatán. Todos los derechos reservados.</span>
          <span>Conforme a la Ley General de Protección de Datos Personales.</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Helpers UI ---------- */
function Pill({ type = "purple", children, icon }) {
  return <span className={"pill pill-" + type}>{icon ? <Icon name={icon} size={13} /> : <i className="dot" />}{children}</span>;
}

function SecHead({ eyebrow, title, sub }) {
  return (
    <div className="sec-head">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="h2">{title}</h2>
      {sub && <p className="lead">{sub}</p>}
    </div>
  );
}

function Toast({ msg, icon = "check" }) {
  if (!msg) return null;
  return <div className="toast"><Icon name={icon} size={18} />{msg}</div>;
}

function ProgressEvent({ inscritos, cupo }) {
  const pct = Math.min(100, Math.round((inscritos / cupo) * 100));
  return (
    <div className="progress">
      <div className="progress-label"><span>{inscritos} inscritos</span><span style={{ color: "var(--ink-faint)" }}>Cupo {cupo}</span></div>
      <div className="progress-bar"><i style={{ width: pct + "%" }} /></div>
    </div>
  );
}

Object.assign(window, { Brand, QR, Header, Footer, Pill, SecHead, Toast, ProgressEvent });
