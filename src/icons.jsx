const P = {
  home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v10h14V10"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 8h.01"/>',
  users: '<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-5 6-5s6 1.7 6 5"/><path d="M16 6a3 3 0 0 1 0 6"/><path d="M21 20c0-2.5-1.3-4-3.5-4.6"/>',
  news: '<rect x="3" y="4" width="14" height="16" rx="2"/><path d="M17 8h3v9a2 2 0 0 1-4 0"/><path d="M7 8h6M7 12h6M7 16h4"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  phone: '<path d="M5 4h4l1.5 5-2.5 2a12 12 0 0 0 5 5l2-2.5 5 1.5v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
  pin: '<path d="M12 21s-6-5.3-6-10a6 6 0 0 1 12 0c0 4.7-6 10-6 10Z"/><circle cx="12" cy="11" r="2.2"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/>',
  qr: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3M21 14v.01M17 21h.01M21 17v4h-4"/>',
  shield: '<path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z"/><path d="m9 12 2 2 4-4"/>',
  doc: '<path d="M6 3h8l4 4v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"/><path d="M14 3v4h4"/><path d="M8 13h8M8 17h6"/>',
  check: '<path d="m5 12 5 5L20 7"/>',
  chevR: '<path d="m9 6 6 6-6 6"/>',
  chevL: '<path d="m15 6-6 6 6 6"/>',
  arrowR: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  upload: '<path d="M12 16V5M8 9l4-4 4 4"/><path d="M5 16v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2"/>',
  chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  pie: '<path d="M12 3a9 9 0 1 0 9 9h-9Z"/><path d="M12 3v9h9A9 9 0 0 0 12 3Z"/>',
  wallet: '<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18"/><circle cx="17" cy="14" r="1.3"/>',
  bell: '<path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6"/><path d="M10 20a2 2 0 0 0 4 0"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>',
  logout: '<path d="M14 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-2"/><path d="M18 12H9M15 9l3 3-3 3"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  star: '<path d="m12 3 2.6 5.6 6 .7-4.4 4.1 1.2 6L12 18.6 6.6 19.4l1.2-6L3.4 9.3l6-.7Z"/>',
  heart: '<path d="M12 20s-7-4.7-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.3-7 10-7 10Z"/>',
  gift: '<rect x="4" y="9" width="16" height="11" rx="1"/><path d="M2 9h20M12 9v11M12 9S9 4 6.5 5.5 9 9 12 9Zm0 0s3-5 5.5-3.5S15 9 12 9Z"/>',
  scan: '<path d="M4 7V5a1 1 0 0 1 1-1h2M17 4h2a1 1 0 0 1 1 1v2M20 17v2a1 1 0 0 1-1 1h-2M7 20H5a1 1 0 0 1-1-1v-2"/><path d="M4 12h16"/>',
  fb: '<path d="M14 9h3V6h-3a3 3 0 0 0-3 3v2H8v3h3v6h3v-6h2.5l.5-3H14V9a1 1 0 0 1 1-1Z" fill="currentColor" stroke="none"/>',
  ig: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17" cy="7" r="1" fill="currentColor" stroke="none"/>',
  yt: '<rect x="3" y="6" width="18" height="12" rx="3"/><path d="m11 9 4 3-4 3Z" fill="currentColor" stroke="none"/>',
  wa: '<path d="M4 20l1.3-4A8 8 0 1 1 9 19.5L4 20Z"/><path d="M9 9c.5 3 3 5.5 6 6 1 .3 1.5-1.5.8-2L15 12c-.5 1-2 .2-3-1s-1.8-2.5-.8-3L10 7c-.5-.7-2.3-.2-2 .8"/>',
  edit: '<path d="M5 19h14M14 5l3 3-9 9H5v-3l9-9Z"/>',
  eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  filter: '<path d="M3 5h18l-7 8v6l-4-2v-4L3 5Z"/>',
  download: '<path d="M12 4v11M8 11l4 4 4-4"/><path d="M5 19h14"/>',
  money: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.6"/><path d="M6 12h.01M18 12h.01"/>',
  book: '<path d="M5 4h11a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2V4Z"/><path d="M5 16h13"/>',
  award: '<circle cx="12" cy="9" r="5"/><path d="m9 13-1 8 4-2 4 2-1-8"/>',
};

export function Icon({ name, size = 22, stroke = 2, className = '', style }) {
  const d = P[name] || '';
  return (
    <svg
      className={className}
      style={style}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      dangerouslySetInnerHTML={{ __html: d }}
    />
  );
}
