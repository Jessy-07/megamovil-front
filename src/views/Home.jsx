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

export default function Home() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      gsap.to('.bg-blob', {
        y: 'random(-40, 40)', x: 'random(-40, 40)', scale: 'random(0.9, 1.2)',
        duration: 5, yoyo: true, repeat: -1, ease: 'sine.inOut'
      });

      tl.from('.header-text', { y: -30, opacity: 0, duration: 0.8, ease: 'power3.out' });
      tl.from('.title-plan-familiar', { y: 60, opacity: 0, duration: 1, ease: 'back.out(1.5)' }, '-=0.4');
      tl.from('.floating-badge', {
        scale: 0, opacity: 0, rotation: 'random(-20, 20)', duration: 0.6, stagger: 0.15, ease: 'back.out(2.5)'
      }, '-=0.6');
      gsap.to('.floating-badge', {
        y: -12, yoyo: true, repeat: -1, duration: 2.5, stagger: { each: 0.2, from: 'random' }, ease: 'sine.inOut'
      });
      tl.from('.card-item', {
        y: 100, opacity: 0, rotationY: 15, duration: 0.9, stagger: 0.15, ease: 'power4.out'
      }, '-=0.3');
      tl.from('.bottom-text', { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3');
      tl.from('.app-icon', {
        scale: 0, rotation: -180, opacity: 0, duration: 0.5, stagger: 0.05, ease: 'back.out(2)'
      }, '-=0.2');
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
              <span className="floating-badge badge-left bg-pink-300 text-pink-900 border-2 border-pink-400 px-3 py-2 md:py-1 rounded-full text-[10px] md:text-xs font-bold shadow-lg flex items-center gap-1.5 absolute z-10">
                <img src={socialMediaIcon} alt="Icono Redes Sociales" className="w-4 h-4 md:w-5 md:h-5 object-contain" /> REDES SOCIALES
              </span>
              <span className="floating-badge badge-center-bottom bg-blue-300 text-blue-900 border-2 border-blue-400 px-3 py-2 md:py-1 rounded-full text-[10px] md:text-xs font-bold shadow-lg flex items-center gap-1.5 absolute z-10">
                <img src={masXMenosIcon} alt="Icono Más x Menos" className="w-4 h-4 md:w-5 md:h-5 object-contain" /> MÁSxMENOS
              </span>
              <span className="floating-badge badge-right-top bg-purple-300 text-purple-900 border-2 border-purple-400 px-3 py-2 md:py-1 rounded-full text-[10px] md:text-xs font-bold shadow-lg flex items-center gap-1.5 absolute z-10">
                <img src={datosIcon} alt="Icono Datos" className="w-4 h-4 md:w-5 md:h-5 object-contain" /> DATOS
              </span>
              <span className="floating-badge badge-right bg-teal-100 text-teal-900 border-2 border-teal-300 px-3 py-2 md:py-1 rounded-full text-[10px] md:text-xs font-bold shadow-lg flex items-center gap-1.5 absolute z-10">
                <img src={llamadasIcon} alt="Icono Llamadas" className="w-4 h-4 md:w-5 md:h-5 object-contain" /> LLAMADAS
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
                  <div key={i} className={`app-icon social-${app.id} w-8 h-8 md:w-11 md:h-11 rounded-lg md:rounded-xl shadow-lg flex items-center justify-center text-base md:text-xl hover:scale-110 transition-transform cursor-pointer`}>
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
    <div className="card-item relative bg-[#d4d4d4] rounded-2xl flex flex-col items-center pb-10 shadow-2xl  w-full h-full">
      {/* Imagen */}
      <div className="w-full h-40 overflow-hidden relative">
        <div className="absolute inset-0 bg-black/10 z-10"></div>
        <img src={plan.image} alt={plan.title} className="w-full h-full object-cover" />
      </div>
      {/* Contenido */}
      <div className="text-center mt-5 px-4 w-full">
        <p className="text-[9px] text-gray-500 font-bold tracking-widest mb-1 uppercase">Conservando tu mismo número</p>
        <h3 className="text-lg font-black mb-3 text-gray-900">{plan.title}</h3>
        <div className="min-h-[40px]">
          {plan.lines.map((line, i) => (
            <p key={i} className="text-xs font-semibold text-gray-700">{line}</p>
          ))}
        </div>
        <div className="mt-4 flex flex-col items-center">
          <div className="flex items-start tracking-tighter">
            <span className="text-5xl font-black text-gray-900">${plan.price}</span>
            <span className="text-sm font-bold text-gray-900 mt-1">*</span>
          </div>
          <span className="text-[10px] text-gray-500 font-bold uppercase mt-1">al mes</span>
        </div>
      </div>
      {/* Botón */}
      <button className="absolute -bottom-5 px-8 flex justify-center py-3 bg-[#b5ffd8] hover:bg-[#85f5bc] rounded-full text-[13px] font-black text-teal-900 shadow-xl transition-colors duration-300">
        ¡LO QUIERO!
      </button>
    </div>
  );
}
