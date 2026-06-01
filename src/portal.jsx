import { Icon } from './icons.jsx'
import { Pill, SecHead, ProgressEvent } from './ui.jsx'
import DATA from './data.js'

const D = DATA;

export function PageInicio({ go }) {
  return (
    <div>
      {/* HERO */}
      <section className="hero">
        <span className="decor ring" style={{ width: 220, height: 220, top: -40, right: "8%" }} />
        <span className="decor fill" style={{ width: 90, height: 90, bottom: 40, left: "4%", opacity: .6 }} />
        <div className="container">
          <div className="hero-grid">
            <div>
              <Pill type="purple" icon="shield">Portal oficial de la Sección VI</Pill>
              <h1 className="h-display" style={{ marginTop: 18 }}>
                Tu sindicato, <span className="mark">más cerca</span> y en un solo lugar.
              </h1>
              <p className="lead" style={{ maxWidth: 520 }}>
                Inscríbete a eventos, obtén tu credencial digital con código QR y mantente al día
                con las noticias de la Sección VI del SNTSS en Yucatán. Sin filas, sin papeleo.
              </p>
              <div className="hero-actions">
                <button className="btn btn-primary btn-lg" onClick={() => go("registro")}>
                  <Icon name="qr" size={20} /> Obtener mi credencial
                </button>
                <button className="btn btn-outline btn-lg" onClick={() => go("eventos")}>Ver eventos</button>
              </div>
              <div className="hero-stats">
                <div className="hero-stat"><b>{D.org.afiliados}</b><span>Agremiados</span></div>
                <div className="hero-stat"><b>{D.org.hospitales}</b><span>Unidades médicas</span></div>
                <div className="hero-stat"><b>{D.org.secretarias}</b><span>Secretarías</span></div>
              </div>
            </div>
            <div className="hero-visual">
              <span className="hero-blob" style={{ width: 360, height: 360, top: -20, right: -30 }} />
              <div className="hero-card">
                <img className="photo" src="/assets/about-2.jpg" alt="Trabajadores SNTSS" />
              </div>
              <div className="float-chip" style={{ top: 24, left: -24 }}>
                <span className="ico" style={{ background: "var(--rose)" }}><Icon name="heart" size={18} /></span>
                <span>Día de las Madres<small>512 inscritas · cupo 800</small></span>
              </div>
              <div className="float-chip" style={{ bottom: 26, right: -18 }}>
                <span className="ico" style={{ background: "var(--teal)" }}><Icon name="check" size={18} /></span>
                <span>Asistencia registrada<small>QR escaneado ✓</small></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section" style={{ background: "#fff" }}>
        <div className="container">
          <SecHead eyebrow="Una sola plataforma"
            title="Todos los trámites de la sección, unificados"
            sub="Cada secretaría administra sus propios eventos y convocatorias. Tú solo necesitas tu credencial." />
          <div className="grid feature-grid">
            {[
              ["qr", "Credencial digital con QR", "Un identificador único que sirve para todos los eventos: Día de la Madre, juguetes, becas y más. Guárdalo en la billetera de tu celular."],
              ["doc", "Tus documentos, una sola vez", "El sistema recuerda lo que ya subiste (acta, CURP, afiliación) para no pedírtelo de nuevo. Formatos correctos garantizados."],
              ["scan", "Registro de asistencia ágil", "Al llegar al evento se escanea tu QR y quedas registrado al instante. Adiós a las listas en papel."],
              ["shield", "Transparencia y datos seguros", "El QR funciona como firma electrónica. Tu información se resguarda conforme a la Ley de Protección de Datos."],
              ["chart", "Cupos y asistencia en tiempo real", "Las secretarías ven cuántas personas se inscribieron y cuántas asistieron, al momento."],
              ["users", "Pensado para todas las edades", "Funciona desde cualquier computadora o celular, sin instalar nada ni hacer actualizaciones."],
            ].map(([ic, t, d]) => (
              <div className="feature" key={t}>
                <div className="ico ico-lg"><Icon name={ic} size={26} /></div>
                <h3 className="h3">{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECRETARÍAS */}
      <section className="section">
        <div className="container">
          <SecHead eyebrow="Secretarías" title="Cada área, con su propio espacio"
            sub="Las secretarías alimentan y administran sus convocatorias de forma independiente." />
          <div className="sec-2col">
            {D.secretarias.map((s) => (
              <div className="card card-pad card-hover row gap-16" key={s.id} style={{ alignItems: "flex-start" }}>
                <div className="ico ico-lg" style={{ width: 54, height: 54, borderRadius: 15, display: "grid", placeItems: "center", background: "var(--purple-50)", color: s.color, flexShrink: 0 }}>
                  <Icon name={s.icon} size={26} />
                </div>
                <div>
                  <h3 className="h3" style={{ marginBottom: 4 }}>{s.nombre}</h3>
                  <p className="small" style={{ color: "var(--purple)", fontWeight: 700, marginBottom: 8 }}>Titular: {s.titular}</p>
                  <p style={{ color: "var(--ink-soft)" }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTOS DESTACADOS */}
      <section className="section" style={{ background: "#fff" }}>
        <div className="container">
          <div className="row items-center justify-between wrap gap-16" style={{ marginBottom: 36 }}>
            <div>
              <span className="eyebrow">Próximos eventos</span>
              <h2 className="h2" style={{ marginTop: 10 }}>Inscripciones abiertas</h2>
            </div>
            <button className="btn btn-ghost" onClick={() => go("eventos")}>Ver todos <Icon name="arrowR" size={18} /></button>
          </div>
          <div className="grid events-grid">
            {D.eventos.map((e) => <EventCard key={e.id} e={e} go={go} />)}
          </div>
        </div>
      </section>

      {/* NOTICIAS */}
      <section className="section">
        <div className="container">
          <SecHead eyebrow="Comunicación" title="Noticias de la Sección VI"
            sub="Lo que antes vivía en Facebook, ahora con identidad propia y siempre disponible." />
          <NewsGrid go={go} limit={4} />
          <div className="center" style={{ marginTop: 36 }}>
            <button className="btn btn-outline" onClick={() => go("noticias")}>Todas las noticias</button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-tight">
        <div className="container">
          <div className="cta-band">
            <span className="ring" style={{ width: 320, height: 320, top: -120, right: -60 }} />
            <span className="ring" style={{ width: 180, height: 180, bottom: -80, left: 40 }} />
            <div className="row items-center justify-between wrap gap-24" style={{ position: "relative" }}>
              <div style={{ maxWidth: 560 }}>
                <h2 className="h2">¿Listo para tu credencial digital?</h2>
                <p>Genera tu QR una sola vez y úsalo en todos los eventos del año. Te toma menos de 3 minutos.</p>
              </div>
              <button className="btn btn-light btn-lg" onClick={() => go("registro")}>
                <Icon name="qr" size={20} /> Comenzar ahora
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function EventCard({ e, go }) {
  return (
    <div className="card event-card card-hover">
      <div className="cover">
        <img src={e.img} alt={e.titulo} />
        <div className="tag"><Pill type={e.tagType} icon={e.icon}>{e.tag}</Pill></div>
      </div>
      <div className="body">
        <p className="small" style={{ color: "var(--purple)", fontWeight: 700 }}>{e.secretaria}</p>
        <h3 className="h3" style={{ fontSize: "1.12rem", lineHeight: 1.25 }}>{e.titulo}</h3>
        <div className="meta">
          <span><Icon name="calendar" size={15} /> {e.fecha}</span>
          <span><Icon name="pin" size={15} /> {e.lugar}</span>
        </div>
        <ProgressEvent inscritos={e.inscritos} cupo={e.cupo} />
        <button className="btn btn-primary btn-sm btn-block" style={{ marginTop: 14 }} onClick={() => go("registro", { evento: e.id })}>
          Inscribirme <Icon name="arrowR" size={16} />
        </button>
      </div>
    </div>
  );
}

export function NewsGrid({ go, limit }) {
  const items = D.noticias.slice(0, limit || D.noticias.length);
  const [feat, ...rest] = items;
  return (
    <div className="grid news-grid">
      <div className="card news-card feat card-hover" onClick={() => go("nota", { id: feat.id })} style={{ cursor: "pointer" }}>
        <div className="cover"><img src={feat.img} alt={feat.titulo} /></div>
        <div className="body">
          <Pill type="purple">{feat.cat}</Pill>
          <h3>{feat.titulo}</h3>
          <p className="excerpt">{feat.extracto}</p>
          <div className="news-meta"><Icon name="clock" size={14} /> {feat.fecha} · {feat.autor}</div>
        </div>
      </div>
      <div className="stack gap-24" style={{ gridColumn: "span 2" }}>
        <div className="news-inner">
          {rest.map((n) => (
            <div className="card news-card card-hover" key={n.id} onClick={() => go("nota", { id: n.id })} style={{ cursor: "pointer" }}>
              <div className="cover"><img src={n.img} alt={n.titulo} /></div>
              <div className="body">
                <Pill type="gold">{n.cat}</Pill>
                <h3>{n.titulo}</h3>
                <div className="news-meta"><Icon name="clock" size={14} /> {n.fecha}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
