import { useEffect } from 'react';
import Home from './views/Home';
import './App.css';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Inicializar el Smooth Scroll (Lenis)
    const lenis = new Lenis({
      lerp: 0.07,
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    // Sincronizar Lenis con GSAP ScrollTrigger para que las animaciones
    // del Home.jsx funcionen a la perfección con la inercia
    lenis.on('scroll', ScrollTrigger.update);

    // Integrar el ciclo de renderizado de Lenis dentro del Ticker de GSAP
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Desactivar el suavizado de lag de GSAP para evitar conflictos
    gsap.ticker.lagSmoothing(0);

    return () => {
      // Limpieza al desmontar el componente (buena práctica)
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Home />
    </>
  );
}

export default App;
