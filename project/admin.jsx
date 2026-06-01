/* Acceso + Panel de administración (Igualdad Sustantiva) */
const { useState } = React;
const D = window.DATA;

/* ===================== ACCESO ===================== */
function PageAcceso({ go, toast }) {
  const [role, setRole] = useState("admin");
  return (
    <div className="auth-wrap">
      <div className="auth-art">
        <Brand go={go} light />
        <div>
          <Pill type="gold" icon="shield">Acceso seguro</Pill>
          <h2 style={{ margin: "16px 0 12px" }}>Cada secretaría administra su propio espacio.</h2>
          <p style={{ color: "rgba(255,255,255,.85)" }}>
            Crea convocatorias, define requisitos y revisa inscripciones y asistencia en tiempo real,
            sin depender de nadie más.
          </p>
        </div>
        <p className="small" style={{ color: "rgba(255,255,255,.6)" }}>© 2026 SNTSS Sección VI · Yucatán</p>
      </div>
      <div className="auth-form">
        <div className="inner">
          <button className="btn btn-ghost btn-sm" style={{ marginBottom: 22 }} onClick={() => go("inicio")}><Icon name="chevL" size={16} /> Volver al portal</button>
          <h2 className="h2" style={{ marginBottom: 6 }}>Iniciar sesión</h2>
          <p style={{ color: "var(--ink-soft)", marginBottom: 22 }}>Selecciona tu tipo de acceso.</p>
          <div className="role-switch">
            <button className={role === "trabajador" ? "on" : ""} onClick={() => setRole("trabajador")}>Trabajador</button>
            <button className={role === "admin" ? "on" : ""} onClick={() => setRole("admin")}>Administrador</button>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); role === "admin" ? go("admin") : go("registro"); }}>
            <div className="field"><label>{role === "admin" ? "Usuario de secretaría" : "Matrícula"}</label>
              <input className="input" defaultValue={role === "admin" ? "igualdad.sustantiva" : ""} placeholder={role === "admin" ? "" : "Tu matrícula IMSS"} /></div>
            <div className="field"><label>Contraseña</label><input className="input" type="password" defaultValue="••••••••" /></div>
            <button className="btn btn-primary btn-block btn-lg" type="submit" style={{ marginTop: 6 }}>Entrar <Icon name="arrowR" size={18} /></button>
          </form>
          <p className="small" style={{ color: "var(--ink-faint)", marginTop: 18, textAlign: "center" }}>
            {role === "admin" ? "Demostración: Igualdad Sustantiva · Romy Casanova" : "¿Sin cuenta? Genera tu credencial al inscribirte."}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ===================== ADMIN ===================== */
function AdminApp({ go, toast, isMobile }) {
  const [tab, setTab] = useState("resumen");
  const sec = D.secretarias[0]; // Igualdad Sustantiva
  const nav = [
    ["resumen", "Resumen", "home"],
    ["convocatorias", "Convocatorias", "calendar"],
    ["inscritos", "Inscritos", "users"],
    ["estadisticas", "Estadísticas", "chart"],
  ];
  const titles = { resumen: "Resumen de la secretaría", convocatorias: "Convocatorias", crear: "Nueva convocatoria", inscritos: "Inscritos · Día de las Madres", estadisticas: "Estadísticas" };

  return (
    <div className="admin">
      <aside className="admin-side">
        <div className="admin-brand">
          <img src="assets/logo.png" alt="" />
          <div><b>Igualdad Sustantiva</b><span>Panel · Sección VI</span></div>
        </div>
        {nav.map(([id, l, ic]) => (
          <a key={id} href="#" className={"admin-nav" + (tab === id || (tab === "crear" && id === "convocatorias") ? " active" : "")}
             onClick={(e) => { e.preventDefault(); setTab(id); }}>
            <Icon name={ic} size={19} /> {l}
          </a>
        ))}
        <div style={{ marginTop: "auto", paddingTop: 14, borderTop: "1px solid rgba(255,255,255,.1)" }}>
          <a href="#" className="admin-nav" onClick={(e) => { e.preventDefault(); go("inicio"); }}><Icon name="logout" size={19} /> Salir del panel</a>
        </div>
      </aside>

      <main className="admin-main">
        {/* Tabs móviles */}
        {isMobile && (
          <div className="row gap-8 wrap" style={{ marginBottom: 18 }}>
            {nav.map(([id, l, ic]) => (
              <button key={id} className={"btn btn-sm " + (tab === id ? "btn-primary" : "btn-outline")} onClick={() => setTab(id)}><Icon name={ic} size={15} /> {l}</button>
            ))}
          </div>
        )}
        <div className="admin-topbar">
          <div>
            <p className="small" style={{ color: "var(--purple)", fontWeight: 700 }}>Igualdad Sustantiva · Romy Casanova</p>
            <h1 className="h2">{titles[tab]}</h1>
          </div>
          <div className="row items-center gap-12">
            <button className="btn btn-outline btn-sm hide-mobile"><Icon name="bell" size={17} /></button>
            <button className="btn btn-primary btn-sm" onClick={() => setTab("crear")}><Icon name="plus" size={17} /> Nueva convocatoria</button>
          </div>
        </div>

        {tab === "resumen" && <AdminResumen go={go} setTab={setTab} />}
        {tab === "convocatorias" && <AdminConvocatorias setTab={setTab} />}
        {tab === "crear" && <AdminCrear setTab={setTab} toast={toast} />}
        {tab === "inscritos" && <AdminInscritos toast={toast} />}
        {tab === "estadisticas" && <AdminEstadisticas />}
      </main>
    </div>
  );
}

/* --- Resumen --- */
function AdminResumen({ setTab }) {
  const kpis = [
    ["users", "var(--purple)", "1,452", "Inscritos (3 eventos)", "+128 esta semana"],
    ["check", "var(--teal)", "64%", "Asistencia promedio", "+5% vs 2025"],
    ["calendar", "var(--gold)", "3", "Convocatorias activas", "1 cierra pronto"],
    ["doc", "var(--rose)", "12", "Documentos por revisar", "Requiere atención"],
  ];
  return (
    <div className="stack gap-24">
      <div className="grid kpi-grid">
        {kpis.map(([ic, c, n, l, t]) => (
          <div className="card kpi" key={l}>
            <div className="ico" style={{ background: "var(--purple-50)", color: c }}><Icon name={ic} size={22} /></div>
            <b>{n}</b><span>{l}</span>
            <p className="trend" style={{ color: c }}>{t}</p>
          </div>
        ))}
      </div>
      <div className="two-col">
        <div className="card card-pad">
          <div className="row items-center justify-between" style={{ marginBottom: 16 }}>
            <h3 className="h3">Inscripciones por semana</h3>
            <Pill type="purple">Día de las Madres</Pill>
          </div>
          <Bars data={[["Sem 1", 60], ["Sem 2", 110], ["Sem 3", 95], ["Sem 4", 160], ["Sem 5", 87]]} max={160} />
        </div>
        <div className="card card-pad">
          <h3 className="h3" style={{ marginBottom: 16 }}>Asistencia registrada</h3>
          <div className="row items-center justify-center" style={{ marginBottom: 18 }}>
            <Donut pct={64} label="asistió" />
          </div>
          <div className="stack gap-8">
            <LegendRow c="var(--purple)" l="Asistió (escaneó QR)" v="512" />
            <LegendRow c="var(--line-strong)" l="Inscrito sin asistir" v="288" />
          </div>
        </div>
      </div>
      <div className="card card-pad">
        <div className="row items-center justify-between" style={{ marginBottom: 14 }}>
          <h3 className="h3">Últimas inscripciones</h3>
          <button className="btn btn-ghost btn-sm" onClick={() => setTab("inscritos")}>Ver todas <Icon name="arrowR" size={16} /></button>
        </div>
        <InscritosTable rows={D.inscritos.slice(0, 4)} compact />
      </div>
    </div>
  );
}

function LegendRow({ c, l, v }) {
  return <div className="row items-center justify-between"><span className="row items-center gap-8"><i style={{ width: 12, height: 12, borderRadius: 4, background: c }} /> <span className="small" style={{ fontWeight: 600 }}>{l}</span></span><b style={{ fontFamily: "var(--head)" }}>{v}</b></div>;
}

function Bars({ data, max }) {
  return (
    <div className="bars">
      {data.map(([l, v]) => (
        <div className="b" key={l}><i style={{ height: (v / max * 100) + "%" }} /><small>{l}</small></div>
      ))}
    </div>
  );
}

function Donut({ pct, label }) {
  return (
    <div className="donut" style={{ background: `conic-gradient(var(--purple) ${pct}%, var(--line-strong) 0)` }}>
      <div className="c"><b>{pct}%</b><span>{label}</span></div>
    </div>
  );
}

/* --- Convocatorias --- */
function AdminConvocatorias({ setTab }) {
  return (
    <div className="stack gap-16">
      <div className="card" style={{ overflow: "hidden" }}>
        <div className="table-wrap" style={{ border: "none" }}>
          <table className="data">
            <thead><tr><th>Convocatoria</th><th>Fecha</th><th>Cupo</th><th>Inscritos</th><th>Estado</th><th></th></tr></thead>
            <tbody>
              {D.eventos.map((e) => (
                <tr key={e.id}>
                  <td><b style={{ fontFamily: "var(--head)" }}>{e.titulo}</b><br /><span className="small" style={{ color: "var(--ink-faint)" }}>{e.secretaria}</span></td>
                  <td>{e.fecha}</td>
                  <td>{e.cupo}</td>
                  <td><b style={{ color: "var(--purple)" }}>{e.inscritos}</b> <span className="small" style={{ color: "var(--ink-faint)" }}>({Math.round(e.inscritos / e.cupo * 100)}%)</span></td>
                  <td><Pill type={e.tagType}>{e.tag}</Pill></td>
                  <td><button className="btn btn-ghost btn-sm"><Icon name="edit" size={15} /> Editar</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <button className="btn btn-primary" onClick={() => setTab("crear")}><Icon name="plus" size={18} /> Crear nueva convocatoria</button>
      </div>
    </div>
  );
}

/* --- Crear convocatoria --- */
function AdminCrear({ setTab, toast }) {
  const [reqs, setReqs] = useState(["Credencial sindical vigente", "CURP"]);
  const allReqs = ["Credencial sindical vigente", "Acta de nacimiento", "Comprobante de afiliación", "CURP", "Último talón de pago", "Boleta de calificaciones"];
  const [foto, setFoto] = useState(false);
  const toggle = (r) => setReqs((p) => p.includes(r) ? p.filter((x) => x !== r) : [...p, r]);
  return (
    <div className="two-col">
      <div className="card card-pad">
        <form onSubmit={(e) => { e.preventDefault(); toast && toast("Convocatoria publicada"); setTab("convocatorias"); }}>
          <div className="field"><label>Nombre del evento <span className="req">*</span></label><input className="input" placeholder="Ej. Festejo Día del Padre 2026" required /></div>
          <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div className="field"><label>Secretaría</label><input className="input" value="Igualdad Sustantiva" readOnly style={{ background: "var(--canvas)" }} /></div>
            <div className="field"><label>Cupo máximo <span className="req">*</span></label><input className="input" type="number" placeholder="800" required /></div>
          </div>
          <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div className="field"><label>Fecha del evento <span className="req">*</span></label><input className="input" type="date" required /></div>
            <div className="field"><label>Cierre de inscripciones</label><input className="input" type="date" /></div>
          </div>
          <div className="field"><label>Lugar</label><input className="input" placeholder="Salón, dirección…" /></div>
          <div className="field"><label>Documentos requeridos</label>
            <div className="row wrap gap-8" style={{ marginTop: 4 }}>
              {allReqs.map((r) => (
                <button type="button" key={r} className={"btn btn-sm " + (reqs.includes(r) ? "btn-primary" : "btn-outline")} onClick={() => toggle(r)}>
                  {reqs.includes(r) && <Icon name="check" size={14} />} {r}
                </button>
              ))}
            </div>
          </div>
          <div className="field"><label>Imagen del evento</label>
            <div className={"upload" + (foto ? " done" : "")}>
              <span className="ico"><Icon name={foto ? "check" : "upload"} size={22} /></span>
              <div className="txt"><b>{foto ? "imagen-evento.jpg" : "Sube una foto de portada"}</b><p>{foto ? "Cargada correctamente" : "JPG o PNG · máx 3 MB"}</p></div>
              {foto ? <Pill type="teal">Lista</Pill> : <button type="button" className="btn btn-ghost btn-sm" onClick={() => setFoto(true)}>Elegir</button>}
            </div>
          </div>
          <div className="field"><label>Descripción</label><textarea className="textarea" placeholder="Detalles del evento, horarios, indicaciones…" /></div>
          <div className="row justify-between gap-12 wrap">
            <button type="button" className="btn btn-outline" onClick={() => setTab("convocatorias")}>Cancelar</button>
            <button type="submit" className="btn btn-primary"><Icon name="check" size={18} /> Publicar convocatoria</button>
          </div>
        </form>
      </div>
      <div className="stack gap-16">
        <div className="tint-box">
          <h3 className="h3" style={{ marginBottom: 8 }}>Vista previa</h3>
          <p className="small" style={{ color: "var(--ink-soft)" }}>Así verán tu convocatoria los trabajadores en el portal. Tú la administras sin depender de nadie.</p>
        </div>
        <div className="card" style={{ overflow: "hidden" }}>
          <div style={{ aspectRatio: "16/9", background: foto ? "url(assets/news-5.jpg) center/cover" : "repeating-linear-gradient(45deg,var(--canvas-2),var(--canvas-2) 12px,#fff 12px,#fff 24px)" }} />
          <div className="card-pad">
            <Pill type="rose" icon="heart">Inscripciones abiertas</Pill>
            <h3 className="h3" style={{ margin: "10px 0 6px" }}>Tu nuevo evento</h3>
            <div className="row items-center gap-8 small" style={{ color: "var(--ink-faint)", fontWeight: 600 }}><Icon name="users" size={14} /> {reqs.length} documentos requeridos</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --- Inscritos --- */
function AdminInscritos({ toast }) {
  const [rows, setRows] = useState(D.inscritos);
  const [scan, setScan] = useState(false);
  const [q, setQ] = useState("");
  const filtered = rows.filter((r) => r.nombre.toLowerCase().includes(q.toLowerCase()) || r.folio.toLowerCase().includes(q.toLowerCase()));
  const toggleAsist = (folio) => setRows((p) => p.map((r) => r.folio === folio ? { ...r, asistio: !r.asistio } : r));
  const asistieron = rows.filter((r) => r.asistio).length;

  const doScan = () => {
    const pend = rows.find((r) => !r.asistio && r.estado === "Validado");
    if (pend) { toggleAsist(pend.folio); toast && toast("Asistencia registrada: " + pend.nombre); }
    else toast && toast("Sin pendientes válidos por escanear");
    setScan(false);
  };

  return (
    <div className="stack gap-16">
      <div className="grid kpi-grid" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
        <div className="card kpi"><div className="ico" style={{ background: "var(--purple-50)", color: "var(--purple)" }}><Icon name="users" size={22} /></div><b>{rows.length}</b><span>Inscritos mostrados</span></div>
        <div className="card kpi"><div className="ico" style={{ background: "var(--ok-bg)", color: "var(--ok-fg)" }}><Icon name="check" size={22} /></div><b>{asistieron}</b><span>Asistencia registrada</span></div>
        <div className="card kpi"><div className="ico" style={{ background: "var(--warn-bg)", color: "var(--warn-fg)" }}><Icon name="doc" size={22} /></div><b>{rows.filter((r) => r.estado !== "Validado").length}</b><span>Documentos por revisar</span></div>
      </div>

      <div className="card card-pad">
        <div className="row items-center justify-between wrap gap-12" style={{ marginBottom: 16 }}>
          <div className="row items-center gap-8" style={{ flex: 1, minWidth: 220, maxWidth: 360, border: "1.5px solid var(--line-strong)", borderRadius: 10, padding: "0 12px" }}>
            <Icon name="filter" size={17} style={{ color: "var(--ink-faint)" }} />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar por nombre o folio…" style={{ border: "none", outline: "none", padding: "11px 0", width: "100%", fontFamily: "var(--body)", fontSize: ".95rem", background: "transparent" }} />
          </div>
          <div className="row gap-8 wrap">
            <button className="btn btn-primary btn-sm" onClick={() => setScan(true)}><Icon name="scan" size={16} /> Escanear QR</button>
            <button className="btn btn-outline btn-sm" onClick={() => toast && toast("Lista exportada a Excel")}><Icon name="download" size={16} /> Excel</button>
            <button className="btn btn-outline btn-sm" onClick={() => toast && toast("Lista exportada a PDF")}><Icon name="doc" size={16} /> PDF</button>
          </div>
        </div>
        <InscritosTable rows={filtered} onToggle={toggleAsist} />
      </div>

      {scan && <ScanModal onClose={() => setScan(false)} onScan={doScan} />}
    </div>
  );
}

function InscritosTable({ rows, onToggle, compact }) {
  const badge = (estado) => estado === "Validado" ? "teal" : estado === "Pendiente" ? "gold" : "rose";
  return (
    <div className="table-wrap">
      <table className="data">
        <thead><tr><th>Folio</th><th>Nombre</th><th>Unidad</th>{!compact && <th>Documentos</th>}<th>Estado</th><th>Asistencia</th></tr></thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.folio}>
              <td><b style={{ fontFamily: "var(--head)", color: "var(--purple)" }}>{r.folio}</b></td>
              <td>{r.nombre}<br /><span className="small" style={{ color: "var(--ink-faint)" }}>Mat. {r.matricula}</span></td>
              <td>{r.unidad}</td>
              {!compact && <td><span className="small" style={{ fontWeight: 600, color: r.docs === "Completos" ? "var(--ok-fg)" : "var(--warn-fg)" }}>{r.docs}</span></td>}
              <td><Pill type={badge(r.estado)}>{r.estado}</Pill></td>
              <td>
                {onToggle ? (
                  <button className={"btn btn-sm " + (r.asistio ? "btn-primary" : "btn-outline")} onClick={() => onToggle(r.folio)} style={{ minWidth: 116 }}>
                    {r.asistio ? <><Icon name="check" size={15} /> Asistió</> : "Registrar"}
                  </button>
                ) : (r.asistio ? <Pill type="teal" icon="check">Asistió</Pill> : <span className="small" style={{ color: "var(--ink-faint)" }}>—</span>)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ScanModal({ onClose, onScan }) {
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(42,34,48,.55)", backdropFilter: "blur(4px)", zIndex: 9000, display: "grid", placeItems: "center", padding: 20 }}>
      <div className="card card-pad center" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 380, width: "100%" }}>
        <Pill type="purple" icon="scan">Escáner de asistencia</Pill>
        <h3 className="h3" style={{ margin: "14px 0 6px" }}>Apunta al código QR</h3>
        <p className="small" style={{ color: "var(--ink-soft)", marginBottom: 18 }}>Al escanear la credencial del trabajador se registra su asistencia automáticamente.</p>
        <div style={{ position: "relative", width: 220, height: 220, margin: "0 auto 18px", borderRadius: 20, background: "var(--canvas-2)", display: "grid", placeItems: "center", overflow: "hidden" }}>
          <QR seed="SNTSS-VI-SCAN" size={150} />
          <div style={{ position: "absolute", inset: 0, border: "3px solid var(--purple)", borderRadius: 20, boxShadow: "inset 0 0 0 100vmax rgba(128,31,130,.04)" }} />
          <div style={{ position: "absolute", left: 14, right: 14, height: 3, background: "var(--purple)", boxShadow: "0 0 10px var(--purple)", animation: "scanline 1.6s ease-in-out infinite" }} />
        </div>
        <div className="row gap-12">
          <button className="btn btn-outline btn-block" onClick={onClose}>Cancelar</button>
          <button className="btn btn-primary btn-block" onClick={onScan}><Icon name="check" size={18} /> Simular escaneo</button>
        </div>
      </div>
    </div>
  );
}

/* --- Estadísticas --- */
function AdminEstadisticas() {
  const [hosp, setHosp] = useState("Todas");
  const base = [["HGZ No. 1", 142], ["UMF No. 57", 98], ["HGR Mérida", 120], ["UMF No. 12", 76], ["HGZ No. 2", 64], ["O'Horán", 88]];
  const max = 142;
  return (
    <div className="stack gap-24">
      <div className="card card-pad">
        <div className="row items-center justify-between wrap gap-12" style={{ marginBottom: 18 }}>
          <h3 className="h3">Inscripciones por unidad médica</h3>
          <select className="select" style={{ maxWidth: 240 }} value={hosp} onChange={(e) => setHosp(e.target.value)}>
            <option>Todas</option>
            {D.hospitales.map((h) => <option key={h}>{h}</option>)}
          </select>
        </div>
        <Bars data={base.map(([l, v]) => [l, hosp === "Todas" ? v : (l.startsWith(hosp.slice(0, 6)) ? v : Math.round(v * 0.25))])} max={max} />
      </div>
      <div className="two-col">
        <div className="card card-pad">
          <h3 className="h3" style={{ marginBottom: 16 }}>Distribución por evento</h3>
          <div className="stack gap-16">
            {D.eventos.map((e) => {
              const pct = Math.round(e.inscritos / e.cupo * 100);
              return (
                <div key={e.id}>
                  <div className="progress-label"><span>{e.titulo}</span><span style={{ color: "var(--purple)" }}>{e.inscritos}</span></div>
                  <div className="progress-bar"><i style={{ width: pct + "%" }} /></div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="card card-pad">
          <h3 className="h3" style={{ marginBottom: 16 }}>Comparativo de asistencia</h3>
          <div className="row items-center justify-center" style={{ marginBottom: 16 }}><Donut pct={64} label="2026" /></div>
          <div className="stack gap-8">
            <LegendRow c="var(--purple)" l="Asistencia 2026" v="64%" />
            <LegendRow c="var(--line-strong)" l="Asistencia 2025" v="59%" />
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { PageAcceso, AdminApp });
