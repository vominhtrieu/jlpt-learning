'use client';
import { createContext, useContext, useState, useRef, useEffect, useLayoutEffect, useId } from 'react';
import { createPortal } from 'react-dom';
const TooltipContext = createContext(null);
export function TooltipProvider({ children }) {
 const [active, setActive] = useState(null), [position, setPosition] = useState({ top: 12, left: 12 });
 const box = useRef(null), timer = useRef(null), tooltipId = useId();
 const cancel = () => clearTimeout(timer.current);
 const close = () => { cancel(); setActive(null); };
 const delayedClose = () => { cancel(); timer.current = setTimeout(() => setActive(null), 200); };
 const open = (target, content, id) => { cancel(); setActive({ target, content: content(), id }); };
 useEffect(() => () => clearTimeout(timer.current), []);
 useEffect(() => {
  if (!active) return;
  const onKey = e => { if (e.key === 'Escape') close(); };
  const onOutside = e => { if (!box.current?.contains(e.target) && !active.target.contains(e.target)) close(); };
  const onScroll = e => { if (!box.current?.contains(e.target)) close(); };
  document.addEventListener('keydown', onKey); document.addEventListener('pointerdown', onOutside); document.addEventListener('scroll', onScroll, true); window.addEventListener('resize', close);
  return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', onOutside); document.removeEventListener('scroll', onScroll, true); window.removeEventListener('resize', close); };
 }, [active]);
 useLayoutEffect(() => {
  if (!active || !box.current) return;
  const r = active.target.getBoundingClientRect(), b = box.current.getBoundingClientRect();
  const y = r.bottom + 10 + b.height <= window.innerHeight - 12 ? r.bottom + 10 : r.top - b.height - 10;
  setPosition({ top: Math.max(12, Math.min(y, window.innerHeight - b.height - 12)), left: Math.max(12, Math.min(r.left, window.innerWidth - b.width - 12)) });
 }, [active]);
 return <TooltipContext.Provider value={{ open, delayedClose, active, tooltipId }}>{children}{active && createPortal(<div id={tooltipId} ref={box} role="tooltip" className="conjugation-tip" style={position} onMouseEnter={cancel} onMouseLeave={delayedClose}>{active.content}<div className="tip-dismiss">Nhấn Esc hoặc chạm ra ngoài để đóng</div></div>, document.body)}</TooltipContext.Provider>;
}
export function TooltipTrigger({ content, children, label, className = 'explain-word' }) {
 const ctx = useContext(TooltipContext), id = useId();
 return <button type="button" className={`${className} tooltip-trigger`} aria-label={label} aria-describedby={ctx.active?.id === id ? ctx.tooltipId : undefined} onPointerEnter={e => { if (e.pointerType !== 'touch') ctx.open(e.currentTarget, content, id); }} onPointerLeave={ctx.delayedClose} onFocus={e => ctx.open(e.currentTarget, content, id)} onBlur={ctx.delayedClose} onClick={e => ctx.open(e.currentTarget, content, id)}>{children}</button>;
}
