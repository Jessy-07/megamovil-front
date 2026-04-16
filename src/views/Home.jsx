import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faXTwitter, faWhatsapp, faTelegram, faFacebookMessenger, faSnapchat, faInstagram } from '@fortawesome/free-brands-svg-icons';
import socialMediaIcon from '../assets/icons/home/social-media-icon.png';
import masXMenosIcon from '../assets/icons/home/masxmenos-icon.png';
import datosIcon from '../assets/icons/home/datos-icon.png';
import llamadasIcon from '../assets/icons/home/llamadas-icon.png';
import './Home.css';

const plans = [
  {
    title: 'PLAN 2 LÍNEAS',
    lines: ['1 línea de 38 GB*', '1 línea de 6 GB*'],
    price: '270',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=400&auto=format&fit=crop'
  },
  {
    title: 'PLAN 3 LÍNEAS',
    lines: ['1 línea de 38 GB*', '2 líneas de 6 GB*'],
    price: '360',
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=400&auto=format&fit=crop'
  },
  {
    title: 'PLAN 4 LÍNEAS',
    lines: ['1 línea de 38 GB*', '3 líneas de 6 GB*'],
    price: '450',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=400&auto=format&fit=crop'
  }
];

// Propuesta 3: Factor de escala máxima por proximidad (Efecto Lupa/Magnético)
const BADGE_CONFIG = [
  { id: 'badge-left', maxScale: 1.25 },
  { id: 'badge-center-bottom', maxScale: 1.15 },
  { id: 'badge-right-top', maxScale: 1.30 },
  { id: 'badge-right', maxScale: 1.20 },
];

export default function Home() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      gsap.to('.bg-blob', {
        y: 'random(-40, 40)', x: 'random(-40, 40)', scale: 'random(0.9, 1.2)',
        duration: 5, yoyo: true, repeat: -1, ease: 'sine.inOut'
      });

      tl.from('.subtitle-p-plan', { y: -30, opacity: 0, duration: 0.8, ease: 'power3.out' });
      tl.from('.title-p-plan', { y: 60, opacity: 0, duration: 1, ease: 'back.out(1.5)' }, '-=0.4');
      tl.from('.floating-badge', {
        scale: 0, opacity: 0, rotation: 'random(-20, 20)', duration: 0.6, stagger: 0.15, ease: 'back.out(2.5)'
      }, '-=0.6');

      // Flote continuo base (amplitude pequeña; el parallax añade movimiento encima)
      gsap.to('.floating-badge', {
        y: -10, yoyo: true, repeat: -1, duration: 2.5, stagger: { each: 0.2, from: 'random' }, ease: 'sine.inOut'
      });

      // ── Propuesta 3: Proximidad Orgánica (Efecto Lupa/Respiración) ──
      // Los badges reaccionan expandiéndose en función de qué tan cerca está el cursor de ellos físicamente.
      const section = sectionRef.current;
      const badgeEls = BADGE_CONFIG.map(({ id }) => section.querySelector('.' + id));

      const onMouseMove = (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const effectRadius = 350; // Distancia en píxeles donde el ratón empieza a "afectar" al badge

        BADGE_CONFIG.forEach(({ maxScale }, i) => {
          const el = badgeEls[i];
          if (!el) return;

          const rect = el.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;

          const dist = Math.sqrt(Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2));

          let newScale = 1;
          if (dist < effectRadius) {
            // Factor de cercanía de 0 a 1 (1 es estar justo encima, 0 es estar lejos)
            const proximity = (effectRadius - dist) / effectRadius;
            newScale = 1 + (maxScale - 1) * proximity;
          }

          gsap.to(el, {
            scale: newScale,
            duration: 0.6,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        });
      };

      const onMouseLeave = () => {
        badgeEls.forEach(el => {
          if (!el) return;
          gsap.to(el, { scale: 1, duration: 1.0, ease: 'power2.out', overwrite: 'auto' });
        });
      };

      section.addEventListener('mousemove', onMouseMove);
      section.addEventListener('mouseleave', onMouseLeave);

      tl.from('.card-item', {
        y: 100, opacity: 0, rotationY: 15, duration: 0.9, stagger: 0.15, ease: 'power4.out'
      }, '-=0.3');
      tl.from('.bottom-text', { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3');

      // Animación de entrada para los íconos de redes (Flip 3D desde abajo)
      tl.from('.app-icon', {
        y: 60,
        rotationX: -90,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.5)',
        clearProps: 'all'
      }, '-=0.2');

      return () => {
        section.removeEventListener('mousemove', onMouseMove);
        section.removeEventListener('mouseleave', onMouseLeave);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    /* Contenedor principal de la página (fondo blanco/gris) */
    <div className="min-h-screen bg-[#e8eff5] p-2 md:p-6 xl:p-10 flex justify-center">

      {/* Sección principal: fondo azul con bordes redondeados, NO full-width de la ventana */}
      <section ref={sectionRef} className="relative w-[100%] overflow-hidden bg-[#1565e8] rounded-[2rem] lg:rounded-[3rem] py-10 md:py-16 shadow-xl">

        {/* Blobs decorativos */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="bg-blob absolute top-[-15%] left-[-5%] w-[55vw] h-[55vw] rounded-full bg-[#3178f5] blur-[120px] opacity-60"></div>
          <div className="bg-blob absolute bottom-[-20%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-[#0847c5] blur-[100px] opacity-70"></div>
          <div className="bg-blob absolute top-[30%] right-[15%] w-[35vw] h-[35vw] rounded-full bg-[#4a8cff] blur-[90px] opacity-50"></div>
        </div>

        <div className="relative container mx-auto px-4 max-w-[1320px]">
          <div className="grid grid-cols-12 gap-x-4 md:gap-x-6">

            <div className="col-span-12 text-center pt-2 pb-0">
              <h3 className="text-white uppercase subtitle-p-plan">
                DESCUBRE EL PAQUETE IDEAL CON NUESTRO
              </h3>
            </div>

            <div className="col-span-12 relative flex items-center justify-center title-row mb-6">
              <h2 className="title-p-plan font-anton text-white uppercase text-center w-full">
                PLAN FAMILIAR
              </h2>

              {/* Badges */}
              <span className="floating-badge badge-left bg-[#FFDCF0] text-[#E6007E] border-2 border-[#E6007E] px-3 md:px-4 py-2 rounded-full text-[11px] md:text-[16px] font-medium shadow-lg flex items-center gap-2 absolute z-10">
                <img src={socialMediaIcon} alt="Icono Redes Sociales" className="w-5 h-5 md:w-6 md:h-6 object-contain" /> REDES SOCIALES
              </span>
              <span className="floating-badge badge-center-bottom bg-[#D9F0FF] text-[#1776FF] border-2 border-[#1776FF] px-3 md:px-4 py-2 rounded-full text-[11px] md:text-[16px] font-medium shadow-lg flex items-center gap-2 absolute z-10">
                <img src={masXMenosIcon} alt="Icono Más x Menos" className="w-5 h-5 md:w-6 md:h-6 object-contain" /> MÁSXMENOS
              </span>
              <span className="floating-badge badge-right-top bg-[#DCC5FF] text-[#570C99] border-2 border-[#570C99] px-3 md:px-4 py-2 rounded-full text-[11px] md:text-[16px] font-medium shadow-lg flex items-center gap-2 absolute z-10">
                <img src={datosIcon} alt="Icono Datos" className="w-5 h-5 md:w-6 md:h-6 object-contain" /> DATOS
              </span>
              <span className="floating-badge badge-right bg-[#A0F9DE] text-[#1E5353] border-2 border-[#1E5353] px-3 md:px-4 py-2 rounded-full text-[11px] md:text-[16px] font-medium shadow-lg flex items-center gap-2 absolute z-10">
                <img src={llamadasIcon} alt="Icono Llamadas" className="w-5 h-5 md:w-6 md:h-6 object-contain" /> LLAMADAS
              </span>
            </div>

            {/* ── ROW 3: Cards (4 columnas exactas de las 12) ── */}
            {/* Ocupan el 100% de la columna 4 y usamos el gap del grid para la separación */}
            <div className="col-span-12 md:col-span-4 preserve-3d pt-6 pb-8">
              <CardPlan plan={plans[0]} />
            </div>
            <div className="col-span-12 md:col-span-4 preserve-3d pt-6 pb-8">
              <CardPlan plan={plans[1]} />
            </div>
            <div className="col-span-12 md:col-span-4 preserve-3d pt-6 pb-8">
              <CardPlan plan={plans[2]} />
            </div>

            {/* ── ROW 4: Texto + Íconos de Redes Sociales ── */}
            <div className="col-span-12 flex flex-col items-center text-center pt-8 pb-4">
              <p className="bottom-text text-white/90 text-[15px] md:text-lg font-medium leading-tight">
                Todos los planes cuentan con<br />
                Redes Sociales, Minutos y SMS
              </p>
              <h2 className="bottom-text font-black text-white text-3xl md:text-5xl mt-1 tracking-wider">
                ILIMITADOS
              </h2>

              <div className="flex gap-2 md:gap-3 mt-4">
                {[
                  { id: 'fb', icon: faFacebookF },
                  { id: 'x', icon: faXTwitter },
                  { id: 'wa', icon: faWhatsapp },
                  { id: 'tg', icon: faTelegram },
                  { id: 'msg', icon: faFacebookMessenger },
                  { id: 'snap', icon: faSnapchat },
                  { id: 'ig', icon: faInstagram }
                ].map((app, i) => (
                  <div key={i} className={`app-icon social-${app.id} w-8 h-8 md:w-11 md:h-11 rounded-lg md:rounded-xl shadow-lg flex items-center justify-center text-base md:text-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 cursor-pointer`}>
                    <FontAwesomeIcon icon={app.icon} />
                  </div>
                ))}
              </div>
            </div>

          </div>{/* /grid */}
        </div>{/* /container */}
      </section>
    </div>
  );
}

/* Componente de Card separado para mantener el JSX limpio */
function CardPlan({ plan }) {
  return (
    <div className="card-item relative bg-[#D9D9D9] rounded-[30px] flex flex-col items-center pb-12 shadow-2xl w-full h-full">
      {/* Imagen con borde azul debajo y radio ajustado para no desbordar el contenedor de 30px */}
      <div className="w-full h-40 overflow-hidden relative rounded-t-[30px] border-b-[2px] border-[#1565e8]">
        <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none"></div>
        <img src={plan.image} alt={plan.title} className="w-full h-full object-cover" />
      </div>
      {/* Contenido */}
      <div className="text-center mt-6 px-4 w-full flex-grow flex flex-col">
        <p className="text-[10px] md:text-[10px] text-black font-normal tracking-widest mb-1.5 uppercase leading-none">Conservando tu mismo número</p>
        <h3 className="text-[24px] md:text-[34px] font-semibold text-black leading-tight mb-2">{plan.title}</h3>
        <div className="flex flex-col gap-1 mb-4">
          {plan.lines.map((line, i) => (
            <p key={i} className="text-[15px] md:text-[24px] font-normal text-black leading-tight">{line}</p>
          ))}
        </div>
        <div className="mt-auto pt-2 flex flex-col items-center">
          <div className="flex items-start tracking-tighter justify-center leading-none">
            <span className="text-[46px] md:text-[56px] font-semibold text-black leading-none">${plan.price}</span>
            <span className="text-[18px] md:text-[24px] font-semibold text-black mt-1 leading-none">*</span>
          </div>
          <span className="text-[12px] md:text-[16px] text-black font-light mt-0 mt-2 tracking-widest leading-none ">al mes</span>
        </div>
      </div>
      {/* Botón */}
      <button className="absolute -bottom-[30px] px-8 md:px-12 flex justify-center py-2.5 md:py-3.5 bg-[#A0F9DE] hover:bg-[#8de8cd] rounded-full text-[16px] md:text-[20px] font-semibold text-black shadow-xl transition-colors duration-300">
        ¡LO QUIERO!
      </button>
    </div>
  );
}
