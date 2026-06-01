import { useState, useEffect, useRef } from 'react'
import { Header, Footer, Toast } from './ui.jsx'
import { PageInicio } from './portal.jsx'
import { PageNosotros, PageDelegados, PageEventos, PageNoticias, PageNota, PageContacto } from './portal2.jsx'
import { MemberFlow } from './member.jsx'
import { PageAcceso, AdminApp } from './admin.jsx'

export default function App() {
  const [route, setRoute] = useState("inicio");
  const [params, setParams] = useState({});
  const [toastMsg, setToastMsg] = useState(null);
  const toastTimer = useRef(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("sntss_route") || "null");
      if (saved && saved.route) { setRoute(saved.route); setParams(saved.params || {}); }
    } catch (e) {}
  }, []);

  const go = (r, p = {}) => {
    setRoute(r); setParams(p);
    try { localStorage.setItem("sntss_route", JSON.stringify({ route: r, params: p })); } catch (e) {}
    window.scrollTo && window.scrollTo(0, 0);
  };

  const toast = (msg, icon) => {
    setToastMsg({ msg, icon: icon || "check" });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMsg(null), 2600);
  };

  let content;
  if (route === "acceso") content = <PageAcceso go={go} toast={toast} />;
  else if (route === "admin") content = <AdminApp go={go} toast={toast} />;
  else {
    let page;
    switch (route) {
      case "nosotros":  page = <PageNosotros  go={go} />; break;
      case "delegados": page = <PageDelegados go={go} />; break;
      case "eventos":   page = <PageEventos   go={go} />; break;
      case "noticias":  page = <PageNoticias  go={go} />; break;
      case "nota":      page = <PageNota      go={go} params={params} />; break;
      case "contacto":  page = <PageContacto  go={go} toast={toast} />; break;
      case "registro":  page = <MemberFlow    go={go} params={params} toast={toast} />; break;
      default:          page = <PageInicio    go={go} />;
    }
    content = (
      <div>
        <Header route={route} go={go} />
        {page}
        <Footer go={go} />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh" }}>
      {content}
      <Toast msg={toastMsg && toastMsg.msg} icon={toastMsg && toastMsg.icon} />
    </div>
  );
}
