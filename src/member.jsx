import { useState, useEffect } from 'react'
import { Icon } from './icons.jsx'
import { Pill, QR } from './ui.jsx'
import { PageHero } from './portal2.jsx'
import DATA from './data.js'

const D = DATA;

export function MemberFlow({ go, params, toast }) {
  const W = D.worker;
  const evento = D.eventos.find((e) => e.id === (params && params.evento)) || D.eventos[0];
  const [step, setStep] = useState(0);
  const [docs, setDocs] = useState({ credencial: true, afiliacion: true, acta: false, curp: false });
  const steps = ["Identidad", "Tus datos", "Documentos", "Listo"];
  const next = () => setStep((s) => Math.min(s + 1, 3));
  const back = () => setStep((s) => Math.max(s - 1, 0));
  const docsOk = docs.acta && docs.curp;

  useEffect(() => { window.scrollTo && window.scrollTo(0, 0); }, [step]);

  return (
    <div>
      <PageHero go={go} crumb="Mi credencial"
        title={step === 3 ? "¡Inscripción confirmada!" : "Inscripción al evento"}
        sub={step === 3 ? null : evento.titulo + " · " + evento.secretaria} />
      <section className="section">
        <div className="container" style={{ maxWidth: 860 }}>
          <div className="stepper">
            {steps.map((l, i) => (
              <div key={l} className={"step" + (i === step ? " active" : i < step ? " done" : "")}>
                <span className="num">{i < step ? <Icon name="check" size={18} /> : i + 1}</span>
                <span className="lbl">{l}</span>
                {i < steps.length - 1 && <span className="bar" />}
              </div>
            ))}
          </div>

          {step === 0 && (
            <div className="card card-pad">
              <h3 className="h3" style={{ marginBottom: 6 }}>Identifícate</h3>
              <p style={{ color: "var(--ink-soft)", marginBottom: 22 }}>Validamos tus datos contra el padrón sindical. Solo lo hacemos una vez.</p>
              <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div className="field"><label>Matrícula IMSS <span className="req">*</span></label><input className="input" defaultValue={W.matricula} /></div>
                <div className="field"><label>CURP <span className="req">*</span></label><input className="input" defaultValue={W.curp} /></div>
              </div>
              <div className="field"><label>Fecha de nacimiento <span className="req">*</span></label><input className="input" type="date" defaultValue="1985-06-12" /></div>
              <div className="tint-box row items-center gap-12" style={{ marginBottom: 20 }}>
                <Icon name="shield" size={20} style={{ color: "var(--purple)", flexShrink: 0 }} />
                <p className="small">Tus datos se tratan conforme a la <b>Ley General de Protección de Datos Personales</b>. Solo la secretaría correspondiente podrá consultarlos.</p>
              </div>
              <div className="row justify-between gap-12 wrap">
                <button className="btn btn-outline" onClick={() => go("eventos")}><Icon name="chevL" size={18} /> Cancelar</button>
                <button className="btn btn-primary" onClick={next}>Validar y continuar <Icon name="arrowR" size={18} /></button>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="card card-pad">
              <div className="row items-center gap-12" style={{ marginBottom: 6 }}>
                <Pill type="teal" icon="check">Identidad verificada</Pill>
              </div>
              <h3 className="h3" style={{ margin: "10px 0 6px" }}>Confirma tus datos</h3>
              <p style={{ color: "var(--ink-soft)", marginBottom: 22 }}>Los tomamos del padrón. Revisa que estén correctos.</p>
              <div className="row items-center gap-16" style={{ marginBottom: 22 }}>
                <img src={W.img} alt={W.nombre} style={{ width: 72, height: 72, borderRadius: 18, objectFit: "cover", boxShadow: "var(--shadow-sm)" }} />
                <div><b className="h3">{W.nombre}</b><p style={{ color: "var(--ink-soft)" }}>{W.adscripcion}</p></div>
              </div>
              <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[["Matrícula", W.matricula], ["Categoría", W.categoria], ["Adscripción", W.adscripcion], ["Antigüedad", W.antiguedad]].map(([k, v]) => (
                  <div className="field" key={k} style={{ marginBottom: 0 }}>
                    <label>{k}</label>
                    <input className="input" defaultValue={v} readOnly style={{ background: "var(--canvas)" }} />
                  </div>
                ))}
              </div>
              <div className="field" style={{ marginTop: 16 }}><label>Teléfono de contacto <span className="req">*</span></label><input className="input" placeholder="999 000 0000" /></div>
              <div className="row justify-between gap-12 wrap" style={{ marginTop: 6 }}>
                <button className="btn btn-outline" onClick={back}><Icon name="chevL" size={18} /> Atrás</button>
                <button className="btn btn-primary" onClick={next}>Continuar <Icon name="arrowR" size={18} /></button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="card card-pad">
              <h3 className="h3" style={{ marginBottom: 6 }}>Documentos requeridos</h3>
              <p style={{ color: "var(--ink-soft)", marginBottom: 22 }}>
                Para <b>{evento.titulo}</b>. Lo que ya tenemos guardado no hace falta volver a subirlo.
              </p>
              <div className="stack gap-12">
                <DocRow label="Credencial sindical vigente" fmt="JPG o PDF" saved={docs.credencial} />
                <DocRow label="Comprobante de afiliación" fmt="PDF" saved={docs.afiliacion} />
                <DocRow label="Acta de nacimiento" fmt="PDF · máx 5 MB" done={docs.acta} onUpload={() => { setDocs({ ...docs, acta: true }); toast && toast("Acta de nacimiento subida"); }} />
                <DocRow label="CURP" fmt="PDF · máx 5 MB" done={docs.curp} onUpload={() => { setDocs({ ...docs, curp: true }); toast && toast("CURP subida"); }} />
              </div>
              <div className="tint-box row items-center gap-12" style={{ margin: "20px 0" }}>
                <Icon name="info" size={20} style={{ color: "var(--purple)", flexShrink: 0 }} />
                <p className="small">El sistema solo acepta el formato correcto. Si subes una imagen <b>.png</b> donde se pide PDF, te avisará antes de enviar.</p>
              </div>
              <div className="row justify-between gap-12 wrap">
                <button className="btn btn-outline" onClick={back}><Icon name="chevL" size={18} /> Atrás</button>
                <button className="btn btn-primary" disabled={!docsOk} onClick={() => { next(); toast && toast("¡Inscripción registrada!"); }}>
                  Confirmar inscripción <Icon name="check" size={18} />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="stack gap-24 items-center">
              <div className="card card-pad center" style={{ maxWidth: 560 }}>
                <div className="ico" style={{ width: 72, height: 72, borderRadius: 50, display: "grid", placeItems: "center", background: "var(--ok-bg)", color: "var(--ok-fg)", margin: "0 auto 16px" }}>
                  <Icon name="check" size={38} />
                </div>
                <h2 className="h2" style={{ marginBottom: 8 }}>Quedaste inscrita</h2>
                <p className="lead" style={{ marginBottom: 6 }}>{evento.titulo}</p>
                <p style={{ color: "var(--ink-soft)" }}>
                  <Icon name="calendar" size={15} style={{ verticalAlign: "-2px" }} /> {evento.fecha} · {evento.hora} · {evento.lugar}
                </p>
                <div className="divider" />
                <p style={{ color: "var(--ink-soft)" }}>Presenta este código QR el día del evento para registrar tu asistencia. Es el mismo para todos los eventos del año.</p>
              </div>

              <CredentialCard W={W} />

              <div className="row gap-12 wrap justify-center">
                <button className="btn btn-ghost" onClick={() => toast && toast("Agregada a la billetera digital")}><Icon name="wallet" size={18} /> Agregar a la billetera</button>
                <button className="btn btn-outline" onClick={() => toast && toast("Credencial descargada")}><Icon name="download" size={18} /> Descargar</button>
                <button className="btn btn-primary" onClick={() => go("eventos")}>Ver más eventos <Icon name="arrowR" size={18} /></button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export function DocRow({ label, fmt, saved, done, onUpload }) {
  if (saved) {
    return (
      <div className="upload done">
        <span className="ico"><Icon name="check" size={22} /></span>
        <div className="txt"><b>{label}</b><p>Ya guardado en tu expediente · no necesitas subirlo</p></div>
        <Pill type="teal">Guardado</Pill>
      </div>
    );
  }
  return (
    <div className={"upload" + (done ? " done" : "")}>
      <span className="ico"><Icon name={done ? "check" : "upload"} size={22} /></span>
      <div className="txt"><b>{label}</b><p>{done ? "Documento cargado correctamente" : "Formato " + fmt}</p></div>
      {done
        ? <Pill type="teal">Listo</Pill>
        : <button className="btn btn-ghost btn-sm" onClick={onUpload}><Icon name="upload" size={16} /> Subir</button>
      }
    </div>
  );
}

export function CredentialCard({ W }) {
  return (
    <div className="credential">
      <div className="top">
        <img className="logo" src="/assets/logo.png" alt="" />
        <div className="t"><b>SNTSS Sección VI</b><span>Credencial digital · Yucatán</span></div>
      </div>
      <img className="pp" src={W.img} alt={W.nombre} />
      <div className="who"><h3>{W.nombre}</h3><p>{W.categoria}</p></div>
      <div className="data">
        <div><small>Matrícula</small><b>{W.matricula}</b></div>
        <div><small>Adscripción</small><b>{W.adscripcion.split(" · ")[0]}</b></div>
        <div><small>Antigüedad</small><b>{W.antiguedad}</b></div>
        <div><small>Vigencia</small><b>2026</b></div>
      </div>
      <div className="qr-wrap">
        <QR seed={W.qrId} />
        <p className="qr-id">{W.qrId}</p>
        <p className="small" style={{ color: "var(--ink-faint)" }}>Válido como firma electrónica de asistencia</p>
      </div>
    </div>
  );
}
