import { useState } from 'react'
import { Icon } from './icons.jsx'
import { Pill, SecHead } from './ui.jsx'
import { EventCard, NewsGrid } from './portal.jsx'
import DATA from './data.js'

const D = DATA;

export function PageHero({ crumb, title, sub, go }) {
  return (
    <section className="page-hero">
      <div className="container">
        <div className="crumb">
          <a href="#" onClick={(e) => { e.preventDefault(); go("inicio"); }}>Inicio</a>
          <Icon name="chevR" size={13} /> <span>{crumb}</span>
        </div>
        <h1 className="h1">{title}</h1>
        {sub && <p className="lead" style={{ marginTop: 12, maxWidth: 640 }}>{sub}</p>}
      </div>
    </section>
  );
}

export function PageNosotros({ go }) {
  return (
    <div>
      <PageHero go={go} crumb="Quiénes somos" title="Quiénes somos"
        sub="La Sección VI representa a las y los trabajadores del IMSS en Yucatán, defendiendo sus derechos y bienestar económico y social." />
      <section className="section">
        <div className="container">
          <div className="two-col">
            <div>
              <span className="eyebrow">Nuestra misión</span>
              <h2 className="h2" style={{ margin: "12px 0 16px" }}>Por el bienestar económico de los trabajadores</h2>
              <p className="lead" style={{ marginBottom: 16 }}>
                Acompañamos a cada agremiado en sus trámites, eventos y prestaciones, con cercanía
                y transparencia. Este portal nace para unificar todos los procesos de la sección
                en una sola herramienta, fácil de usar para todas las edades.
              </p>
              <ul className="check-list">
                {["Representación sindical en las 14 unidades médicas del estado",
                  "Gestión moderna de eventos con control digital de asistencia",
                  "Protección de datos personales conforme a la ley",
                  "Comunicación directa con cada secretaría"].map((t) => (
                  <li key={t}><span className="ck"><Icon name="check" size={14} /></span><span>{t}</span></li>
                ))}
              </ul>
            </div>
            <div className="stack gap-16">
              <div className="card" style={{ overflow: "hidden" }}>
                <img src="https://picsum.photos/seed/sntss-a1/800/600" alt="Asamblea SNTSS" style={{ aspectRatio: "4/3", objectFit: "cover", width: "100%" }} />
              </div>
              <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div className="tint-box center"><b className="h2" style={{ color: "var(--purple)" }}>{D.org.afiliados}</b><p className="small">Agremiados representados</p></div>
                <div className="tint-box center"><b className="h2" style={{ color: "var(--purple)" }}>{D.org.delegaciones}</b><p className="small">Delegaciones</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section" style={{ background: "#fff" }}>
        <div className="container">
          <SecHead eyebrow="Valores" title="Cómo trabajamos" />
          <div className="grid feature-grid">
            {[["users", "Cercanía", "Atendemos a cada trabajador por su nombre, no por un número de folio."],
              ["shield", "Transparencia", "Listas de asistencia verificables y procesos auditables."],
              ["heart", "Bienestar", "Eventos y apoyos que fortalecen a las familias derechohabientes."]].map(([i, t, d]) => (
              <div className="feature" key={t}>
                <div className="ico ico-lg"><Icon name={i} size={26} /></div>
                <h3 className="h3">{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export function PageDelegados({ go }) {
  return (
    <div>
      <PageHero go={go} crumb="Directiva" title="Comité Ejecutivo y delegados"
        sub="Conoce a quienes integran la dirigencia de la Sección VI y a los delegados de cada unidad." />
      <section className="section">
        <div className="container">
          <div className="card lead-card" style={{ marginBottom: 40 }}>
            <div className="ph"><img src={D.delegados[0].img} alt={D.delegados[0].nombre} /></div>
            <div className="info">
              <Pill type="purple" icon="star">Secretario General</Pill>
              <h2 className="h2" style={{ margin: "10px 0 4px" }}>{D.delegados[0].nombre}</h2>
              <p className="lead" style={{ marginBottom: 8 }}>{D.delegados[0].unit}</p>
              <p style={{ color: "var(--ink-soft)", maxWidth: 520 }}>
                Encabeza la representación sindical de la sección y la coordinación entre todas
                las secretarías y delegaciones del estado.
              </p>
            </div>
          </div>
          <SecHead eyebrow="Comité ejecutivo" title="Secretarías de la sección" />
          <div className="grid team-grid">
            {D.delegados.map((p) => (
              <div className="person" key={p.nombre}>
                <div className="avatar"><img src={p.img} alt={p.nombre} /></div>
                <h3 className="h3">{p.nombre}</h3>
                <p className="role">{p.role}</p>
                <p className="unit">{p.unit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-tight">
        <div className="container">
          <div className="tint-box row items-center justify-between wrap gap-16">
            <div className="row items-center gap-16">
              <span className="ico ico-lg" style={{ width: 50, height: 50, borderRadius: 14, display: "grid", placeItems: "center", background: "#fff", color: "var(--purple)" }}>
                <Icon name="phone" size={24} />
              </span>
              <div>
                <b className="h3">¿Eres delegado de tu unidad?</b>
                <p className="small">Solicita acceso para administrar las convocatorias de tu área.</p>
              </div>
            </div>
            <button className="btn btn-primary" onClick={() => go("acceso")}>Acceso administrador</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export function PageEventos({ go }) {
  const [filtro, setFiltro] = useState("Todas");
  const secs = ["Todas", ...new Set(D.eventos.map((e) => e.secretaria))];
  const list = D.eventos.filter((e) => filtro === "Todas" || e.secretaria === filtro);
  return (
    <div>
      <PageHero go={go} crumb="Eventos" title="Eventos y convocatorias"
        sub="Inscríbete con tu credencial digital. Cada secretaría publica sus propias convocatorias." />
      <section className="section">
        <div className="container">
          <div className="row wrap gap-8" style={{ marginBottom: 30 }}>
            {secs.map((s) => (
              <button key={s} className={"btn btn-sm " + (filtro === s ? "btn-primary" : "btn-outline")} onClick={() => setFiltro(s)}>{s}</button>
            ))}
          </div>
          <div className="grid events-grid">
            {list.map((e) => <EventCard key={e.id} e={e} go={go} />)}
          </div>
        </div>
      </section>
    </div>
  );
}

export function PageNoticias({ go }) {
  return (
    <div>
      <PageHero go={go} crumb="Noticias" title="Noticias y artículos"
        sub="Comunicados oficiales, eventos y avisos de la Sección VI." />
      <section className="section"><div className="container"><NewsGrid go={go} /></div></section>
    </div>
  );
}

export function PageNota({ go, params }) {
  const n = D.noticias.find((x) => x.id === (params && params.id)) || D.noticias[0];
  return (
    <div>
      <PageHero go={go} crumb="Noticias" title={n.titulo} />
      <section className="section">
        <div className="container" style={{ maxWidth: 800 }}>
          <div className="row items-center gap-12" style={{ marginBottom: 22 }}>
            <Pill type="purple">{n.cat}</Pill>
            <span className="small" style={{ color: "var(--ink-faint)", fontWeight: 600 }}>
              <Icon name="clock" size={14} style={{ verticalAlign: "-2px" }} /> {n.fecha} · {n.autor}
            </span>
          </div>
          <img src={n.img} alt={n.titulo} className="card" style={{ width: "100%", aspectRatio: "16/8", objectFit: "cover", marginBottom: 28 }} />
          <p className="lead" style={{ marginBottom: 18 }}>{n.extracto}</p>
          <p style={{ marginBottom: 16, color: "var(--ink-soft)" }}>
            La Sección VI del SNTSS en Yucatán reafirma su compromiso con las y los trabajadores del
            Seguro Social. Esta plataforma busca acercar cada trámite y comunicado a los agremiados,
            sin importar su edad o familiaridad con la tecnología.
          </p>
          <p style={{ marginBottom: 28, color: "var(--ink-soft)" }}>
            Para más información acércate a tu delegado sindical o a la secretaría correspondiente.
            Todos los datos se manejan conforme a la Ley General de Protección de Datos Personales.
          </p>
          <button className="btn btn-outline" onClick={() => go("noticias")}><Icon name="chevL" size={18} /> Volver a noticias</button>
        </div>
      </section>
    </div>
  );
}

export function PageContacto({ go, toast }) {
  const [sent, setSent] = useState(false);
  return (
    <div>
      <PageHero go={go} crumb="Contacto" title="Contáctanos"
        sub="¿Dudas sobre un evento o tu credencial? Escríbenos o acude a las oficinas de la sección." />
      <section className="section">
        <div className="container">
          <div className="two-col">
            <div className="card card-pad">
              <h3 className="h3" style={{ marginBottom: 18 }}>Envíanos un mensaje</h3>
              {sent ? (
                <div className="upload done" style={{ flexDirection: "column", alignItems: "flex-start" }}>
                  <div className="row items-center gap-12"><span className="ico"><Icon name="check" size={22} /></span><b className="h3">¡Mensaje enviado!</b></div>
                  <p style={{ marginTop: 8 }}>Te responderemos a la brevedad. Gracias por escribir a la Sección VI.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSent(true); toast && toast("Mensaje enviado correctamente"); }}>
                  <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div className="field"><label>Nombre <span className="req">*</span></label><input className="input" required placeholder="Tu nombre" /></div>
                    <div className="field"><label>Matrícula</label><input className="input" placeholder="Opcional" /></div>
                  </div>
                  <div className="field"><label>Correo <span className="req">*</span></label><input className="input" type="email" required placeholder="tucorreo@ejemplo.com" /></div>
                  <div className="field"><label>Asunto</label>
                    <select className="select">
                      <option>Información de un evento</option>
                      <option>Problema con mi credencial</option>
                      <option>Becas</option>
                      <option>Otro</option>
                    </select>
                  </div>
                  <div className="field"><label>Mensaje <span className="req">*</span></label><textarea className="textarea" required placeholder="Cuéntanos en qué podemos ayudarte" /></div>
                  <button className="btn btn-primary btn-block btn-lg" type="submit"><Icon name="mail" size={19} /> Enviar mensaje</button>
                </form>
              )}
            </div>
            <div className="stack gap-16">
              {[["pin", "Oficinas de la Sección VI", "Calle 60 x 65, Centro, Mérida, Yucatán"],
                ["phone", "Teléfono", "(999) 000 00 00 · Lun a Vie 9:00–15:00"],
                ["mail", "Correo", "contacto@sntss-seccion6.mx"]].map(([i, t, d]) => (
                <div className="card card-pad row items-center gap-16" key={t}>
                  <span className="ico ico-lg" style={{ width: 50, height: 50, borderRadius: 14, display: "grid", placeItems: "center", background: "var(--purple-50)", color: "var(--purple)", flexShrink: 0 }}>
                    <Icon name={i} size={24} />
                  </span>
                  <div><b className="h3" style={{ fontSize: "1.02rem" }}>{t}</b><p style={{ color: "var(--ink-soft)" }}>{d}</p></div>
                </div>
              ))}
              <div className="card" style={{ overflow: "hidden", background: "var(--canvas-2)" }}>
                <div style={{ aspectRatio: "16/9", display: "grid", placeItems: "center", color: "var(--ink-faint)", background: "repeating-linear-gradient(45deg, var(--canvas-2), var(--canvas-2) 12px, #fff 12px, #fff 24px)" }}>
                  <div className="center">
                    <Icon name="pin" size={32} style={{ color: "var(--purple)" }} />
                    <p className="small" style={{ marginTop: 8, fontWeight: 700 }}>Mapa de ubicación</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
