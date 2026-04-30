import { useEffect, useRef, createContext, useContext, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Home from './views/Home';
import RoamingInternacional from './views/RoamingInternacional';
import './App.css';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* Contexto que expone transitionTo(path) al resto de la app */
export const TransitionContext = createContext(null);

/* ─────────────────────────────────────────────────────────
   Blur + Skew sin opacity — la pantalla SIEMPRE muestra
   contenido, nunca un color sólido ni flash.
   · Salida:  blur aumenta hasta tapar el contenido viejo.
   · navigate() ocurre con blur máximo (nuevo contenido
     ya está bajo el blur, invisible por el desenfoque).
   · Entrada: blur baja + página sube con skewY 3°
     simultáneamente — la nueva página "aterriza".
   Total: ~0.48s, cero pantallas de color.
───────────────────────────────────────────────────────── */
function TransitionProvider({ children }) {
  const navigate    = useNavigate();
  const isAnimating = useRef(false);
  const wrapperRef  = useRef(null);

  const transitionTo = useCallback((path) => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const el = wrapperRef.current;

    // Forzar GPU desde el inicio para evitar repaint brusco
    gsap.set(el, { willChange: 'filter, transform' });

    gsap.timeline({ onComplete: () => {
      gsap.set(el, { willChange: 'auto' });
      isAnimating.current = false;
    }})
      // ── Salida: solo blur, sin tocar opacity ──
      .to(el, {
        filter: 'blur(20px)',
        duration: 0.1,
        ease: 'power2.in',
        onComplete: () => {
          navigate(path);
          window.scrollTo(0, 0);
          // La nueva página renderiza aquí, aún cubierta por el blur
          // Preparamos la posición inicial de la entrada
          gsap.set(el, { y: 24, skewY: 2.5 });
        },
      })
      // ── Pausa mínima para que React pinte ──
      .to({}, { duration: 0.02 })
      // ── Entrada: blur se limpia + sube + se endereza, todo a la vez ──
      .to(el, {
        filter: 'blur(0px)',
        y: 0,
        skewY: 0,
        duration: 0.24,
        ease: 'cubic-bezier(0.19, 1, 0.22, 1)',
        clearProps: 'filter,transform,willChange',
      });

  }, [navigate]);

  return (
    <TransitionContext.Provider value={transitionTo}>
      <div ref={wrapperRef}>
        {children}
      </div>
    </TransitionContext.Provider>
  );
}

function AppContent() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.07, smoothWheel: true, wheelMultiplier: 1 });
    lenis.on('scroll', ScrollTrigger.update);
    const ticker = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(ticker); lenis.destroy(); };
  }, []);

  return (
    <TransitionProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/roaming-internacional" element={<RoamingInternacional />} />
      </Routes>
    </TransitionProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;


