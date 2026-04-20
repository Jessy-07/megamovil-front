import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faXTwitter, faWhatsapp, faTelegram, faFacebookMessenger, faSnapchat, faInstagram } from '@fortawesome/free-brands-svg-icons';
import Footer from '../components/Footer/Footer';
import socialMediaIcon from '../assets/icons/home/social-media-icon.png';
import masXMenosIcon from '../assets/icons/home/masxmenos-icon.png';
import datosIcon from '../assets/icons/home/datos-icon.png';
import llamadasIcon from '../assets/icons/home/llamadas-icon.png';
import promoVideo from '../assets/videos/video-megamovil.mp4';
import phoneImei from '../assets/img/home/phone-imei.png';
import esimImg from '../assets/icons/home/esim.png';
import coberturaImg from '../assets/icons/home/cobertura.png';
import masGigasImg from '../assets/icons/home/mas-megas.png';
import solicitaNipIcon from '../assets/icons/home/solicita-nip-icon.png';
import asociaNipIcon from '../assets/icons/home/asocia-tu-nip.png';
import tramiteProcesoIcon from '../assets/icons/home/tramite-en-proceso-icon.png';
import cambioListoIcon from '../assets/icons/home/cambio-megamovil-listo.png';
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

const individualPlans = [
  {
    title: 'ESENCIAL',
    data: '6GB',
    dataDesc: 'para navegar',
    price: '100',
    socials: ['fb', 'x', 'wa', 'tg', 'msg']
  },
  {
    title: 'CONECTADO',
    data: '30GB',
    dataDesc: 'para navegar',
    price: '200',
    socials: ['fb', 'x', 'wa', 'tg', 'msg']
  },
  {
    title: 'ILIMITADO',
    data: 'Datos\nIlimitados',
    dataDesc: '',
    price: '300',
    socials: ['fb', 'x', 'wa', 'tg', 'msg', 'snap', 'ig']
  }
];

const socialConfig = {
  fb: { icon: faFacebookF, bg: 'bg-[#1877F2]', color: 'text-white' },
  x: { icon: faXTwitter, bg: 'bg-[#000000]', color: 'text-white' },
  wa: { icon: faWhatsapp, bg: 'bg-[#25D366]', color: 'text-white' },
  tg: { icon: faTelegram, bg: 'bg-[#2AABEE]', color: 'text-white' },
  msg: { icon: faFacebookMessenger, bg: 'bg-gradient-to-tr from-[#00A6FF] to-[#FF0073]', color: 'text-white' },
  snap: { icon: faSnapchat, bg: 'bg-[#FFFC00]', color: 'text-black' },
  ig: { icon: faInstagram, bg: 'bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]', color: 'text-white' },
};

// Propuesta 3: Factor de escala máxima por proximidad (Efecto Lupa/Magnético)
const BADGE_CONFIG = [
  { id: 'badge-left', maxScale: 1.25 },
  { id: 'badge-center-bottom', maxScale: 1.15 },
  { id: 'badge-right-top', maxScale: 1.30 },
  { id: 'badge-right', maxScale: 1.20 },
];

export default function Home() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  // Observer para reproducir video cuando esté visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(e => console.log("Auto-play prevented", e));
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

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
    <div className="home-section min-h-screen bg-[#e8eff5] p-2 md:p-6 xl:p-10 flex flex-col items-center gap-6 xl:gap-10">

      {/* Sección principal: fondo azul con bordes redondeados, NO full-width de la ventana */}
      <section ref={sectionRef} className="relative w-[100%] overflow-hidden bg-[#0080ff] rounded-[2rem] lg:rounded-[3rem] py-10 md:py-16 shadow-xl">

        {/* Blobs decorativos (Ocultos con 'hidden' para que GSAP los encuentre y no rompa el contenedor padre) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden">
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
              <p className="bottom-text text-white/90 text-[15px] md:text-[28px] font-thin leading-tight">
                Todos los planes cuentan con<br />
                Redes Sociales, Minutos y SMS
              </p>
              <h2 className="bottom-text font-medium text-white text-3xl md:text-5xl mt-1 tracking-wider">
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
                  <div key={i} className={`app-icon social-${app.id} w-8 h-8 md:w-[50px] md:h-[50px] rounded-lg md:rounded-xl shadow-lg flex items-center justify-center text-base md:text-[30px] hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 cursor-pointer`}>
                    <FontAwesomeIcon icon={app.icon} />
                  </div>
                ))}
              </div>
            </div>

          </div>{/* /grid */}
        </div>{/* /container */}
      </section>

      {/* Segunda Sección: Video */}
      <section className="relative w-[100%] h-[300px] sm:h-[350px] md:h-[450px] lg:h-[500px] xl:h-[550px] overflow-hidden bg-[#000000] rounded-[2rem] lg:rounded-[3rem] shadow-xl flex items-center justify-center">
        <video
          ref={videoRef}
          src={promoVideo}
          className="w-full h-full object-cover pointer-events-none"
          loop
          muted
          playsInline
        />
      </section>

      {/* Tercera Sección: Plan Individual (Fondo Naranja) */}
      <section className="relative w-[100%] overflow-hidden bg-[#ff8a00] rounded-[2rem] lg:rounded-[3rem] py-10 md:py-16 shadow-xl">

        {/* Blobs decorativos */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="bg-blob absolute top-[-15%] left-[-5%] w-[55vw] h-[55vw] rounded-full bg-[#ffa94d] blur-[120px] opacity-60"></div>
          <div className="bg-blob absolute bottom-[-20%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-[#e65c00] blur-[100px] opacity-70"></div>
          <div className="bg-blob absolute top-[30%] right-[15%] w-[35vw] h-[35vw] rounded-full bg-[#ffc070] blur-[90px] opacity-50"></div>
        </div>

        <div className="relative container mx-auto px-4 max-w-[1320px]">
          <div className="grid grid-cols-12 gap-x-4 md:gap-x-6">

            <div className="col-span-12 text-center pt-2 pb-0">
              <h3 className="text-white uppercase subtitle-p-plan">
                DESCUBRE EL PLAN QUE SE ADAPTA A TI
              </h3>
            </div>

            <div className="col-span-12 relative flex items-center justify-center title-row mb-12">
              <h2 className="title-p-plan font-anton text-white uppercase text-center w-full">
                PLAN INDIVIDUAL
              </h2>

              {/* Badges Individuales */}
              <span className="floating-badge-ind badge-ind-social bg-[#FFDCF0] text-[#E6007E] border-2 border-[#E6007E] px-3 md:px-4 py-2 rounded-full text-[11px] md:text-[16px] font-medium shadow-lg flex items-center gap-2 absolute z-10">
                <img src={socialMediaIcon} alt="Icono Redes Sociales" className="w-5 h-5 md:w-6 md:h-6 object-contain" /> REDES SOCIALES
              </span>
              <span className="floating-badge-ind badge-ind-masxmenos bg-[#D9F0FF] text-[#1776FF] border-2 border-[#1776FF] px-3 md:px-4 py-2 rounded-full text-[11px] md:text-[16px] font-medium shadow-lg flex items-center gap-2 absolute z-10">
                <img src={masXMenosIcon} alt="Icono Más x Menos" className="w-5 h-5 md:w-6 md:h-6 object-contain" /> MÁSXMENOS
              </span>
              <span className="floating-badge-ind badge-ind-datos bg-[#DCC5FF] text-[#570C99] border-2 border-[#570C99] px-3 md:px-4 py-2 rounded-full text-[11px] md:text-[16px] font-medium shadow-lg flex items-center gap-2 absolute z-10">
                <img src={datosIcon} alt="Icono Datos" className="w-5 h-5 md:w-6 md:h-6 object-contain" /> DATOS
              </span>
              <span className="floating-badge-ind badge-ind-llamadas bg-[#A0F9DE] text-[#1E5353] border-2 border-[#1E5353] px-3 md:px-4 py-2 rounded-full text-[11px] md:text-[16px] font-medium shadow-lg flex items-center gap-2 absolute z-10">
                <img src={llamadasIcon} alt="Icono Llamadas" className="w-5 h-5 md:w-6 md:h-6 object-contain" /> LLAMADAS
              </span>
            </div>

            {/* ── ROW 3: Cards ── */}
            <div className="col-span-12 md:col-span-4 preserve-3d pt-6 pb-8 flex">
              <CardPlanIndividual plan={individualPlans[0]} />
            </div>
            <div className="col-span-12 md:col-span-4 preserve-3d pt-6 pb-8 flex">
              <CardPlanIndividual plan={individualPlans[1]} />
            </div>
            <div className="col-span-12 md:col-span-4 preserve-3d pt-6 pb-8 flex">
              <CardPlanIndividual plan={individualPlans[2]} />
            </div>

            {/* ── ROW 4: Texto ── */}
            <div className="col-span-12 flex flex-col items-center text-center pt-8 pb-4">
              <h2 className="bottom-text font-medium text-white/90 text-[16px] md:text-[28px] tracking-wide">
                TODOS NUESTROS PLANES TIENEN<br />
                <span>+Minutos y SMS incluidos</span>
              </h2>
            </div>

          </div>{/* /grid */}
        </div>{/* /container */}
      </section>

      {/* Cuarta Sección: Compatibilidad IMEI */}
      <section className="relative w-[100%] overflow-hidden bg-[#1565e8] rounded-[2rem] lg:rounded-[3rem] py-8 md:py-14 shadow-xl">

        {/* Blobs decorativos */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="bg-blob absolute top-[-20%] left-[-8%] w-[50vw] h-[50vw] rounded-full bg-[#1e5fff] blur-[130px] opacity-70"></div>
          <div className="bg-blob absolute bottom-[-20%] right-[0%] w-[40vw] h-[40vw] rounded-full bg-[#0847c5] blur-[100px] opacity-60"></div>
        </div>

        <div className="relative z-10 w-full max-w-[1200px] mx-auto">

          {/* Título y subtítulo centrados */}
          <h2 className="title-section font-anton text-white uppercase text-center leading-none mb-1">
            ¿MI EQUIPO ES COMPATIBLE?
          </h2>
          <p className="text-white text-[13px] md:text-[28px] font-normal text-center mb-6 md:mb-10">
            Descubre la forma para obtener el IMEI!
          </p>

          {/* Fila principal */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6  w-full">

            {/* ── Card Izquierda: teléfono sobresale arriba-derecha ── */}
            <div className="relative flex-shrink-0 w-full md:w-[360px] lg:w-[420px]">
              {/* Card blanca */}
              <div className="relative bg-white rounded-[1.5rem] overflow-hidden shadow-2xl px-6 pt-5 pb-6 h-[160px] md:h-[210px]">
                {/* Texto */}
                <div className="relative z-10 flex flex-col justify-center h-full w-[55%]">
                  <span className="text-[10px] md:text-[18px] text-[#686868] italic font-normal leading-none mb-1">Obtén tu IMEI</span>
                  <h3 className="font-anton text-[22px] md:text-[40px] leading-[1] text-[#111827] uppercase italic" style={{ fontStyle: 'italic' }}>
                    SOLO MARCA
                  </h3>
                  <p className="text-[#001b35] leading-snug mt-5">
                    <span className="text-[24px]">*#06#</span><br />
                    <span className="font-normal text-[18px]">desde tu celular.</span>
                  </p>
                </div>
              </div>

              <img
                src={phoneImei}
                alt="Teléfono IMEI"
                className="imei-phone-img"
                style={{ transform: 'rotate(5deg)' }}
              />
            </div>

            {/* ── Contenido Derecho ── */}
            <div className="flex flex-col w-full items-center md:w-auto">
              <h3 className="title-form-imei font-anton text-white uppercase leading-[1.05] mb-5 tracking-wide">
                YA LO TIENES...INGRESALO AQUÍ
              </h3>

              {/* Barra input + botón (separados) */}
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-[600px]">
                <input
                  type="text"
                  placeholder="INGRESA AQUÍ TU IMEI"
                  className="flex-1 w-full sm:w-auto bg-white rounded-full border-none outline-none text-gray-600 placeholder-gray-400 text-[11px] md:text-[12px] font-semibold px-6 py-3.5 uppercase tracking-wider shadow-lg text-center sm:text-left"
                />
                <button className="w-full sm:w-auto bg-[#A0F9DE] text-[#000] hover:bg-[#8de8cd] font-black uppercase rounded-full px-6 md:px-8 py-3 text-[12px] md:text-[16px] transition-colors shadow-lg whitespace-nowrap">
                  VALIDA AQUÍ
                </button>
              </div>

              <p className="text-white text-[11px] md:text-[16px] font-light mt-3">
                Conoce nuestros planes compatibles con todos los equipos,{' '}
                <a href="#" className="underline text-white/90 hover:text-white transition-colors">click aquí</a>
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── Quinta Sección: Marquee de Beneficios (full-width) ── */}
      <section className="benefits-marquee-section w-full overflow-hidden ">
        <InfiniteMarquee speed={1}>
          <div className="benefit-card benefit-card--blue">
            <div className="benefit-card__text">
              <h4 className="benefit-card__title">COBERTURA</h4>
              <p className="benefit-card__desc">Navega y llama en todo México, EE.UU y Cánada</p>
            </div>
            <img src={coberturaImg} alt="Cobertura" className="benefit-card__icon" />

          </div>
          <div className="benefit-card benefit-card--lavender">
            <div className="benefit-card__text">
              <h4 className="benefit-card__title">eSIM</h4>
              <p className="benefit-card__desc">Suma Megas a tu internet de casa al contratar Mega móvil.</p>
            </div>
            <img src={esimImg} alt="eSIM" className="benefit-card__icon" />

          </div>
          <div className="benefit-card benefit-card--white">
            <div className="benefit-card__text">
              <h4 className="benefit-card__title">MÁS MEGAS</h4>
              <p className="benefit-card__desc">Suma Megas a tu internet de casa al contratar Mega móvil.</p>
            </div>
            <img src={masGigasImg} alt="Más Megas" className="benefit-card__icon" />
          </div>
          <div className="benefit-card benefit-card--teal">
            <div className="benefit-card__text">
              <h4 className="benefit-card__title">eSIM</h4>
              <p className="benefit-card__desc">Suma Megas a tu internet de casa al contratar Mega móvil.</p>
            </div>
            <img src={esimImg} alt="eSIM" className="benefit-card__icon" />
          </div>
        </InfiniteMarquee>
      </section>

      {/* ── Sexta Sección: Cámbiate a Mega Móvil ── */}
      <section className="cambiate-section w-full rounded-[2rem] lg:rounded-[3rem] overflow-hidden shadow-xl">
        <div className="relative container mx-auto max-w-[1320px] px-4 pt-14 pb-20">
          {/* Header */}
          <div className="text-center pb-12 px-4">
            <h2 className="title-section font-anton text-white uppercase text-center leading-none mb-1">
              CÁMBIATE A MEGA MÓVIL
            </h2>
            <p className="text-white text-[13px] md:text-[28px] font-normal text-center mb-6 md:mb-10">
              Cambiate y conserva tu número, fácil y rápido.
            </p>
          </div>

          {/* Cards de pasos */}
          <div className="cambiate-cards-grid">

            {/* Paso 1 */}
            <div className="cambiate-card">
              <span className="cambiate-badge">1</span>
              <img src={solicitaNipIcon} alt="Solicita tu NIP" className="cambiate-card__icon" />
              <p className="cambiate-card__text">
                Solicita tu NIP mandando<br />un mensaje<br />al <strong>051</strong> con la palabra nip
              </p>
            </div>

            {/* Paso 2 */}
            <div className="cambiate-card flex flex-col justify-between">
              <span className="cambiate-badge">2</span>
              <div>
                <img src={asociaNipIcon} alt="Asocia tu NIP" className="cambiate-card__icon mx-auto" />
                <p className="cambiate-card__text mt-4">
                  Danos tu NIP y el número<br />celular que deseas conservar
                </p>
              </div>
              <div className="mt-4">
                <a href="#" className="cambiate-btn">CÁMBIATE AQUÍ</a>
              </div>
            </div>

            {/* Paso 3 */}
            <div className="cambiate-card">
              <span className="cambiate-badge">3</span>
              <img src={tramiteProcesoIcon} alt="Trámite en proceso" className="cambiate-card__icon" />
              <p className="cambiate-card__text">
                Tu trámite está en proceso<br />y tomará de 24 a 48 horas.
              </p>
            </div>

            {/* Paso 4 */}
            <div className="cambiate-card">
              <span className="cambiate-badge">4</span>
              <img src={cambioListoIcon} alt="Cambio listo" className="cambiate-card__icon" />
              <p className="cambiate-card__text">
                Una vez que te<br />quedes sin señal es hora de<br />insertar tu chip<br />Mega Móvil.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── Séptima Sección: Quiero contratar Megamóvil ── */}
      <section className="contratar-section w-full rounded-[2rem] lg:rounded-[3rem] mb-10">
        <div className="relative container mx-auto max-w-[1320px] px-4">

          {/* Pills flotantes — lado izquierdo */}
          <div className="contratar-pill contratar-pill--llamadas">
            <img src={llamadasIcon} alt="" className="contratar-pill__icon" />
            <span>LLAMADAS</span>
          </div>
          <div className="contratar-pill contratar-pill--facebook">
            <FontAwesomeIcon icon={faFacebookF} className="contratar-pill__icon" />
            <span>FACEBOOK</span>
          </div>
          <div className="contratar-pill contratar-pill--datos">
            <img src={datosIcon} alt="" className="contratar-pill__icon text-purple-700" />
            <span>DATOS</span>
          </div>

          {/* Pills flotantes — lado derecho */}
          <div className="contratar-pill contratar-pill--whatsapp">
            <FontAwesomeIcon icon={faWhatsapp} className="contratar-pill__icon" />
            <span>WHATSAPP</span>
          </div>
          <div className="contratar-pill contratar-pill--masxmenos">
            <img src={masXMenosIcon} alt="" className="contratar-pill__icon" />
            <span>MÁSXMENOS</span>
          </div>
          <div className="contratar-pill contratar-pill--redes">
            <img src={socialMediaIcon} alt="" className="contratar-pill__icon" />
            <span>REDES SOCIALES</span>
          </div>

          {/* Contenido central */}
          <div className="contratar-center">
            <h2 className="title-section font-anton uppercase text-center leading-none mb-1">Quiero contratar Mega móvil</h2>
            <div className="contratar-form mt-4">
              <input
                type="tel"
                className="contratar-input shadow-sm"
                placeholder=""
              />
              <button className="contratar-cta font-bold">LLAMAME</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Octava Sección: Footer ── */}
      <Footer />

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
          <span className="text-[12px] md:text-[16px] text-black font-light mt-0 tracking-widest leading-none ">al mes</span>
        </div>
      </div>
      {/* Botón */}
      <button className="absolute -bottom-[28px] px-8 md:px-12 flex justify-center py-2.5 md:py-3.5 bg-[#A0F9DE] hover:bg-[#8de8cd] rounded-full text-[16px] md:text-[20px] font-semibold text-black shadow-xl transition-colors duration-300">
        ¡LO QUIERO!
      </button>
    </div>
  );
}

/* Componente de Card para el Plan Individual (sección naranja) */
function CardPlanIndividual({ plan }) {
  const isMultiLineData = plan.data.includes('\n');

  return (
    <div className="card-item relative bg-[#FFE7D0] rounded-[30px] flex flex-col items-center pt-8 pb-14 shadow-2xl w-full h-full border-[3px] border-[#FF7F00]">

      {/* ── ZONA 1: Título ── */}
      <div className="flex flex-col items-center w-full px-4 pb-3">
        <h3 className="text-[28px] md:text-[54px] font-anton text-[#FF7F00] tracking-wider leading-none">{plan.title}</h3>
        <div className="w-[60%] h-[1px] bg-[#FF7F00] mt-3"></div>
      </div>

      {/* ── ZONA 2: Gigas (flex-1, alineado al centro vertical) ── */}
      <div className="flex flex-1 flex-col items-center justify-center text-center px-4">
        {isMultiLineData ? (
          <span className="text-[36px] md:text-[40px] font-semibold text-black tracking-tight whitespace-pre-line leading-[1.1]">{plan.data}</span>
        ) : (
          <>
            <span className="text-[48px] md:text-[60px] font-semibold text-black tracking-tight leading-none">{plan.data}</span>
            <span className="text-[13px] md:text-[14px] font-light text-black leading-none mt-0.5">{plan.dataDesc}</span>
          </>
        )}
      </div>

      {/* ── ZONA 3: Precio (siempre alineado al mismo nivel) ── */}
      <div className="flex flex-col items-center w-full px-8 pt-4 pb-4">
        <span className="text-[10px] md:text-[12px] text-black font-normal tracking-widest uppercase mb-1">POR SOLO</span>
        <div className="flex items-start tracking-tighter justify-center leading-none">
          <span className="text-[46px] md:text-[56px] font-semibold text-black leading-none">${plan.price}</span>
          <span className="text-[16px] md:text-[20px] font-bold text-black mt-1 leading-none">*</span>
        </div>
        <span className="text-[12px] md:text-[14px] text-black font-light mt-0.5 tracking-widest leading-none">al mes</span>
      </div>

      {/* ── ZONA 4: Redes ilimitadas + íconos ── */}
      <div className="flex flex-col items-center text-center w-full px-4 pt-2 pb-2">
        <p className="text-[10px] md:text-[11px] text-black tracking-wide mb-3">Conservando tu número</p>
        <p className="text-[12px] md:text-[14px] text-black leading-tight mb-2">Redes Sociales<br /><b>ILIMITADAS<sup>*</sup></b></p>
        <div className="flex gap-1 md:gap-2 flex-wrap justify-center">
          {plan.socials.map((appKey) => {
            const app = socialConfig[appKey];
            return (
              <div key={appKey} className={`social-${appKey} w-6 h-6 md:w-[45px] md:h-[45px] rounded-[6px] md:rounded-[10px] flex items-center justify-center text-[12px] md:text-[24px] shadow-sm`}>
                <FontAwesomeIcon icon={app.icon} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Button */}
      <button className="absolute -bottom-[24px] px-8 md:px-12 flex justify-center py-2.5 md:py-3.5 bg-[#1776FF] hover:bg-[#1565e8] rounded-full text-[16px] md:text-[20px] font-semibold text-white shadow-xl transition-colors duration-300">
        ¡LO QUIERO!
      </button>
    </div>
  );
}

/* ── Marquee Infinito con Drag ──
   - Mide el ancho de 1 set de cards y calcula copias dinámicamente.
   - Anima con requestAnimationFrame (translate3d, GPU).
   - Soporta drag con el mouse (pointer events) con momentum.
   - Wrap seamless: el offset siempre se mantiene en [-setWidth, 0). */
function InfiniteMarquee({ children, speed = 0.5 }) {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const [copies, setCopies] = useState(3);
  const childArray = React.Children.toArray(children);

  // Refs para el estado de animación (no provocan re-render)
  const anim = useRef({
    offset: 0,
    velocity: 0,
    isDragging: false,
    isHovered: false,
    dragStartX: 0,
    dragStartOffset: 0,
    lastX: 0,
    lastTime: 0,
    setWidth: 0,
  });

  // 1. Medir el ancho de 1 set y calcular copias necesarias
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      const group = track.querySelector('[data-g="0"]');
      if (!group) return;
      const w = group.scrollWidth;
      anim.current.setWidth = w;
      const needed = Math.ceil(window.innerWidth / w) + 2;
      setCopies(prev => {
        const next = Math.max(3, needed);
        return next !== prev ? next : prev;
      });
    };

    // Esperar a que las imágenes carguen para medir bien
    const waitAndMeasure = () => {
      const imgs = track.querySelectorAll('img');
      if (imgs.length === 0) { measure(); return; }
      let count = 0;
      const check = () => { count++; if (count >= imgs.length) measure(); };
      imgs.forEach(img => {
        if (img.complete) check();
        else img.addEventListener('load', check, { once: true });
      });
    };

    requestAnimationFrame(waitAndMeasure);
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [copies]);

  // 2. Loop de animación (rAF)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const a = anim.current;
    let raf;

    const loop = () => {
      const sw = a.setWidth;
      if (sw > 0) {
        if (!a.isDragging && !a.isHovered) {
          // Auto-scroll
          a.offset -= speed;

          // Momentum del drag
          if (Math.abs(a.velocity) > 0.05) {
            a.offset += a.velocity;
            a.velocity *= 0.94;
          } else {
            a.velocity = 0;
          }
        }

        // Wrap seamless: mantener offset en [-setWidth, 0)
        while (a.offset <= -sw) a.offset += sw;
        while (a.offset > 0) a.offset -= sw;

        track.style.transform = `translate3d(${a.offset}px, 0, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [speed, copies]);

  // 3. Drag handlers (pointer events)
  const onDown = useCallback((e) => {
    const a = anim.current;
    a.isDragging = true;
    a.velocity = 0;
    a.dragStartX = e.clientX;
    a.dragStartOffset = a.offset;
    a.lastX = e.clientX;
    a.lastTime = performance.now();
    e.currentTarget.setPointerCapture(e.pointerId);
    if (wrapperRef.current) wrapperRef.current.style.cursor = 'grabbing';
  }, []);

  const onMove = useCallback((e) => {
    const a = anim.current;
    if (!a.isDragging) return;
    const dx = e.clientX - a.dragStartX;
    a.offset = a.dragStartOffset + dx;

    // Calcular velocidad para el momentum
    const now = performance.now();
    const dt = now - a.lastTime;
    if (dt > 0) {
      a.velocity = ((e.clientX - a.lastX) / dt) * 16;
    }
    a.lastX = e.clientX;
    a.lastTime = now;
  }, []);

  const onUp = useCallback(() => {
    anim.current.isDragging = false;
    if (wrapperRef.current) wrapperRef.current.style.cursor = 'grab';
  }, []);

  // 4. Pausar al hacer hover en una card (mouseenter/mouseleave nativos, no burbujean)
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const onCardEnter = () => { anim.current.isHovered = true; };
    const onCardLeave = () => { anim.current.isHovered = false; };

    const cards = wrapper.querySelectorAll('.benefit-card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', onCardEnter);
      card.addEventListener('mouseleave', onCardLeave);
    });

    return () => {
      cards.forEach(card => {
        card.removeEventListener('mouseenter', onCardEnter);
        card.removeEventListener('mouseleave', onCardLeave);
      });
    };
  }, [copies]);

  return (
    <div
      ref={wrapperRef}
      className="marquee-wrapper"
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerLeave={() => { onUp(); anim.current.isHovered = false; }}
    >
      <div ref={trackRef} className="marquee-track">
        {Array.from({ length: copies }, (_, i) => (
          <div key={i} data-g={i} className="marquee-group" aria-hidden={i > 0}>
            {childArray}
          </div>
        ))}
      </div>
    </div>
  );
}

