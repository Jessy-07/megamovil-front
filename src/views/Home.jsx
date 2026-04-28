import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import PlanSlider from '../components/PlanSlider/PlanSlider';
import Navbar from '../components/Navbar/Navbar';
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
import pfWave1 from '../assets/img/home/pf-wave-1.svg';
import pfWave2 from '../assets/img/home/pf-wave-2.svg';
import piWave1 from '../assets/img/home/pi-wave-1.svg';
import combatibilidadBg from '../assets/img/home/combatibilidad-bg.jpg';
import cammBg from '../assets/img/home/camm-1.svg';
import ctaWave1 from '../assets/img/home/cta-1.svg';
import ctaWave2 from '../assets/img/home/cta-2.svg';
import paq2Lineas from '../assets/img/home/paq-2-lineas.jpg';
import paq3Lineas from '../assets/img/home/paq-3-lineas.jpg';
import paq4Lineas from '../assets/img/home/paq-4-lineas.jpg';
import './Home.css';

const plans = [
  {
    title: 'PLAN 2 LÍNEAS',
    lines: ['1 línea de 38 GB*', '1 línea de 6 GB*'],
    price: '270',
    image: paq2Lineas
  },
  {
    title: 'PLAN 3 LÍNEAS',
    lines: ['1 línea de 38 GB*', '2 líneas de 6 GB*'],
    price: '360',
    image: paq3Lineas
  },
  {
    title: 'PLAN 4 LÍNEAS',
    lines: ['1 línea de 38 GB*', '3 líneas de 6 GB*'],
    price: '450',
    image: paq4Lineas
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
    data: 'Gigas\nIlimitados',
    dataDesc: '',
    price: '300',
    socials: ['fb', 'x', 'wa', 'tg', 'msg', 'snap', 'ig']
  }
];

const socialConfig = {
  fb: { icon: faFacebookF },
  x: { icon: faXTwitter },
  wa: { icon: faWhatsapp },
  tg: { icon: faTelegram },
  msg: { icon: faFacebookMessenger },
  snap: { icon: faSnapchat },
  ig: { icon: faInstagram },
};

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const mainRef = useRef(null);
  const videoRef = useRef(null);

  /* ── Observer: reproducir video cuando esté visible ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(e => console.log('Auto-play prevented', e));
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  /* ── Animaciones GSAP ── */
  useGSAP(() => {
    // 1. Animación del Hero / Plan Familiar
    gsap.from('.subtitle-p-plan', {
      duration: 1, y: -50, opacity: 0, ease: 'power3.out', delay: 0.2
    });
    gsap.from('.title-p-plan', {
      duration: 1, scale: 0.8, opacity: 0, ease: 'back.out(1.7)', delay: 0.3
    });
    gsap.from('.badge-left, .badge-center-bottom, .badge-right-top, .badge-right', {
      duration: 0.8, scale: 0, opacity: 0, stagger: 0.15, ease: 'back.out(2)', delay: 0.6, clearProps: 'all'
    });
    gsap.from('.plan-familiar-card', {
      scrollTrigger: { trigger: '.plan-familiar-section', start: 'top 70%' },
      duration: 1, y: 100, opacity: 0, stagger: 0.2, ease: 'power4.out'
    });

    // Propuesta 2: Animación Olas (Entrada dramática "Marea")
    gsap.from('.pf-wave-1', {
      duration: 2,
      y: -300,
      rotation: -15,
      scale: 1.2,
      opacity: 0,
      ease: 'power4.out'
    });

    gsap.from('.pf-wave-2', {
      duration: 2,
      y: 300,
      rotation: 15,
      scale: 1.2,
      opacity: 0,
      ease: 'power4.out',
      delay: 0.2
    });

    // Animación infinita "Respiración orgánica" (hace que siempre se estén moviendo solas)
    gsap.to('.pf-wave-1', {
      y: "+=30",
      rotation: "+=3",
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    gsap.to('.pf-wave-2', {
      y: "-=40",
      rotation: "-=3",
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });



    // 2. Animación Social Icons Hero
    gsap.from('.social-icon-hero', {
      scrollTrigger: { trigger: '.social-icon-container', start: 'top 85%' },
      duration: 0.6, scale: 0, opacity: 0, stagger: 0.05, ease: 'back.out(1.5)', clearProps: 'all'
    });

    // 3. Plan Individual
    gsap.from('.plan-ind-title-col', {
      scrollTrigger: { trigger: '.plan-ind-section', start: 'top 75%' },
      duration: 0.8, y: 50, opacity: 0, ease: 'power3.out'
    });
    gsap.from('.badge-ind-social, .badge-ind-masxmenos, .badge-ind-datos, .badge-ind-llamadas', {
      scrollTrigger: { trigger: '.plan-ind-section', start: 'top 70%' },
      duration: 0.8, scale: 0, opacity: 0, stagger: 0.15, ease: 'back.out(2)', clearProps: 'all'
    });
    gsap.from('.plan-ind-card', {
      scrollTrigger: { trigger: '.plan-ind-cards-container', start: 'top 75%' },
      duration: 1, y: 100, opacity: 0, rotationY: 15, stagger: 0.2, ease: 'power4.out', transformOrigin: 'left center'
    });

    // 3.5 Animación Ola Naranja (Misma que Plan Familiar pero más suave y sin conflictos)
    // 1. Entrada suave (Solo opacidad y escala para no pelear con el mouse)
    gsap.from('.pi-wave-1', {
      scrollTrigger: { trigger: '.plan-ind-section', start: 'top 70%' },
      duration: 3,
      scale: 1.05,
      opacity: 0,
      ease: 'power2.out'
    });

    // 2. Respiración Infinita (Idle) - Animamos la imagen directa
    gsap.to('.pi-wave-1', {
      y: 20,
      rotation: 2,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });



    // 4. IMEI Section
    const tlImei = gsap.timeline({
      scrollTrigger: { trigger: '.imei-section', start: 'top 70%' }
    });
    tlImei.from('.imei-phone-img', { opacity: 0, duration: 1, ease: 'power3.out' })
      .from('.imei-card-box', { x: 50, y: 50, opacity: 0, rotation: 5, duration: 1, ease: 'back.out(1.5)', clearProps: 'all' }, '-=0.8')
      .from('.title-form-imei, .imei-input-box', { y: 30, opacity: 0, duration: 0.8, stagger: 0.2, ease: 'power2.out', clearProps: 'all' }, '-=0.5');

    gsap.to('.imei-phone-img-inner', {
      y: 8,
      rotation: "-=1",
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // 5. Cámbiate a Mega Móvil
    gsap.from('.cambiate-card', {
      scrollTrigger: { trigger: '.cambiate-cards-grid', start: 'top 80%' },
      duration: 0.8, y: 50, opacity: 0, stagger: 0.15, ease: 'back.out(1.2)', clearProps: 'all'
    });

    // 5.5 Respiración suave para fondo de Cámbiate
    gsap.to('.camm-wave', {
      y: "+=45",
      rotation: "+=4",
      duration: 4.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // 6.5 Entrada y respiración de olas CTA
    gsap.from('.cta-wave-1', {
      scrollTrigger: { trigger: '.contratar-section', start: 'top 80%' },
      duration: 2,
      y: -300,
      rotation: -15,
      scale: 1.2,
      opacity: 0,
      ease: 'power4.out'
    });

    gsap.from('.cta-wave-2', {
      scrollTrigger: { trigger: '.contratar-section', start: 'top 80%' },
      duration: 2,
      y: 300,
      rotation: 15,
      scale: 1.2,
      opacity: 0,
      ease: 'power4.out',
      delay: 0.2
    });

    // Animación infinita "Respiración orgánica" para CTA
    gsap.to('.cta-wave-1', {
      y: "+=30",
      rotation: "+=3",
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    gsap.to('.cta-wave-2', {
      y: "-=40",
      rotation: "-=3",
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // 6. Contratar Section (Pills implosionando)
    gsap.from('.contratar-pill', {
      scrollTrigger: { trigger: '.contratar-section', start: 'top 75%' },
      duration: 1, scale: 0, opacity: 0, x: () => gsap.utils.random(-200, 200), y: () => gsap.utils.random(-200, 200), rotation: () => gsap.utils.random(-90, 90), stagger: 0.1, ease: 'back.out(1.2)'
    });
    gsap.from('.contratar-center', {
      scrollTrigger: { trigger: '.contratar-section', start: 'top 80%' },
      duration: 1, scale: 0.8, opacity: 0, ease: 'power3.out', delay: 0.2
    });

    // 7. Stacked Cards Effect (Efecto apilado - DESACTIVADO temporalmente)
    // ScrollTrigger.create({
    //   trigger: '.video-section',
    //   start: "top top",
    //   end: "max",
    //   pin: true,
    //   pinSpacing: false,
    // });

    // 8. Ocultar el video (DESACTIVADO temporalmente)
    // ScrollTrigger.create({
    //   trigger: '.plan-ind-section',
    //   start: "top top",
    //   onEnter: () => gsap.set('.video-section', { opacity: 0 }),
    //   onLeaveBack: () => gsap.set('.video-section', { opacity: 1 }),
    // });

  }, { scope: mainRef });

  return (
    /* Contenedor principal de la página */
    <div ref={mainRef} className="home-section min-h-screen p-[8px] md:p-[20px] flex flex-col items-center gap-[8px]  md:gap-[20px]">

      {/* ── Sección 1: Plan Familiar (fondo azul) ── */}
      <section
        className="plan-familiar-section relative w-full overflow-hidden rounded-[2rem] lg:rounded-[3rem] py-10 md:py-16 pt-24 md:pt-32 shadow-xl"
        style={{ backgroundColor: 'var(--color-blue-primary)' }}
        onMouseMove={(e) => {
          // Propuesta 2: Efecto magnético/elástico con rotación
          const { clientX, clientY } = e;
          const x = (clientX / window.innerWidth - 0.5); // Rango de -0.5 a 0.5
          const y = (clientY / window.innerHeight - 0.5);

          // Ahora el mouse no solo mueve, sino que tuerce (rota) ligeramente las olas
          // y usa un rebote 'back.out' para dar una sensación líquida y divertida.
          gsap.to('.pf-wave-1', {
            x: x * -80,
            y: y * -50,
            rotation: x * -10, // Torsión interactiva
            duration: 1.5,
            ease: 'back.out(1.2)' // Sensación de rebote elástico
          });

          gsap.to('.pf-wave-2', {
            x: x * 100,
            y: y * 70,
            rotation: x * 15,
            duration: 1.5,
            ease: 'back.out(1.2)'
          });
        }}
      >
        {/* Background Waves */}
        <img src={pfWave1} alt="" className="pf-wave pf-wave-1 absolute top-[-700px]  left-[-700px] w-full max-w-[300px] md:max-w-[400px] lg:max-w-[2500px] opacity-100 pointer-events-none z-0 object-contain object-left-bottom" />
        <img src={pfWave2} alt="" className="pf-wave pf-wave-2 absolute bottom-[-700px] right-[-300px] w-full max-w-[350px] md:max-w-[450px] lg:max-w-[1600px] opacity-100 pointer-events-none z-0 object-contain object-right-top" />

        <Navbar />

        <div className="relative z-10 container mx-auto px-4 max-w-[1320px]">
          <div className="grid grid-cols-12 gap-x-4 md:gap-x-6">

            {/* Subtítulo */}
            <div className="col-span-12 text-center pt-2 pb-0">
              <h3 className="text-white uppercase subtitle-p-plan">
                DESCUBRE EL PAQUETE IDEAL CON NUESTRO
              </h3>
            </div>

            {/* Título + Badges */}
            <div className="col-span-12 relative flex items-center justify-center title-row mb-6">
              <h2 className="title-p-plan font-anton text-white uppercase text-center w-full">
                PLAN FAMILIAR
              </h2>

              <span className="floating-badge badge--social badge-left">
                <img src={socialMediaIcon} alt="Redes Sociales" className="w-3 h-5 md:w-4 xl:w-6 xl:h-6 object-contain" />
                REDES SOCIALES
              </span>
              <span className="floating-badge badge--masxmenos badge-center-bottom">
                <img src={masXMenosIcon} alt="Más x Menos" className="w-3 h-5 md:w-4 xl:w-6 xl:h-6 object-contain" />
                MÁSXMENOS
              </span>
              <span className="floating-badge badge--datos badge-right-top">
                <img src={datosIcon} alt="Datos" className="w-3 h-5 md:w-4 xl:w-6 xl:h-6 object-contain" />
                DATOS
              </span>
              <span className="floating-badge badge--llamadas badge-right">
                <img src={llamadasIcon} alt="Llamadas" className="w-3 h-5 md:w-4 xl:w-6 xl:h-6 object-contain" />
                LLAMADAS
              </span>
            </div>

            {/* Cards Plan Familiar: slider en <1024px, grid en >=1024px */}
            <div className="col-span-12 pt-6 pb-10">
              {/* ── Desktop: grid normal ── */}
              <div className="hidden lg:grid grid-cols-3 gap-x-4 md:gap-x-6">
                {plans.map((plan, i) => (
                  <div key={i} className="plan-familiar-card preserve-3d pb-8"><CardPlan plan={plan} /></div>
                ))}
              </div>
              {/* ── Mobile / Tablet: Slider ── */}
              <PlanSlider>
                {plans.map((plan, i) => (
                  <div key={i} className="plan-familiar-card preserve-3d pb-10"><CardPlan plan={plan} /></div>
                ))}
              </PlanSlider>
            </div>

            {/* Texto + íconos de redes */}
            <div className="col-span-12 flex flex-col items-center text-center pt-0 md:pt-8 pb-4">
              <p className="bottom-text text-white/90 text-[15px] md:text-[28px] font-thin leading-tight">
                Todos los planes cuentan con<br />
                Redes Sociales, Minutos y SMS
              </p>
              <h2 className="bottom-text font-medium text-white text-3xl md:text-5xl mt-1 tracking-wider">
                ILIMITADOS
              </h2>

              <div className="flex gap-2 md:gap-3 mt-4 social-icon-container">
                {[
                  { id: 'fb', icon: faFacebookF },
                  { id: 'x', icon: faXTwitter },
                  { id: 'wa', icon: faWhatsapp },
                  { id: 'tg', icon: faTelegram },
                  { id: 'msg', icon: faFacebookMessenger },
                  { id: 'snap', icon: faSnapchat },
                  { id: 'ig', icon: faInstagram }
                ].map((app, i) => (
                  <div
                    key={i}
                    className={`social-icon-hero app-icon social-${app.id} w-8 h-8 md:w-[50px] md:h-[50px] rounded-lg md:rounded-xl shadow-lg flex items-center justify-center text-base md:text-[30px]`}
                  >
                    <FontAwesomeIcon icon={app.icon} />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Sección 2: Video ── */}
      <section className="video-section stack-section relative w-full h-[300px] sm:h-[350px] md:h-[450px] lg:h-[500px] xl:h-[550px] flex items-center justify-center">
        <video
          ref={videoRef}
          src={promoVideo}
          className="w-full h-full object-cover pointer-events-none rounded-[2rem] lg:rounded-[3rem] shadow-xl bg-black"
          loop muted playsInline
        />
      </section>

      {/* ── Sección 3: Plan Individual (fondo naranja) ── */}
      <section
        className="plan-ind-section relative w-full overflow-hidden rounded-[2rem] lg:rounded-[3rem] py-10 md:py-16 shadow-xl"
        style={{ backgroundColor: 'var(--color-orange-primary)' }}
        onMouseMove={(e) => {
          // 3. Efecto parallax sutil con el mouse (Animamos un contenedor padre para no chocar con la respiración)
          const { clientX, clientY } = e;
          const x = (clientX / window.innerWidth - 0.5);
          const y = (clientY / window.innerHeight - 0.5);

          gsap.to('.pi-wave-1-parallax', {
            x: x * -30,       // Menos desplazamiento
            y: y * -15,       // Menos desplazamiento
            rotation: x * -3, // Rotación casi imperceptible
            duration: 2.5,    // Más tiempo para que sea más lento y suave
            ease: 'power2.out' // Ease sin rebote
          });
        }}
      >
        {/* Wrapper de Parallax para evitar el "bajón brusco" */}
        <div className="pi-wave-1-parallax absolute top-[-800px] left-[-1000px] w-[1500px] md:w-[3500px] lg:w-[3500px] z-0 pointer-events-none">
          <img src={piWave1} alt="" className="pi-wave-1 w-full max-w-none object-cover" />
        </div>

        <div className="relative z-10 container mx-auto px-4 max-w-[1320px]">
          <div className="grid grid-cols-12 gap-x-4 md:gap-x-6">

            {/* Subtítulo */}
            <div className="plan-ind-title-col col-span-12 text-center pt-2 pb-0">
              <h3 className="text-white uppercase subtitle-p-plan">
                DESCUBRE EL PLAN QUE SE ADAPTA A TI
              </h3>
            </div>

            {/* Título + Badges */}
            <div className="plan-ind-title-col col-span-12 relative flex items-center justify-center title-row mb-12">
              <h2 className="title-p-plan font-anton text-white uppercase text-center w-full">
                PLAN INDIVIDUAL
              </h2>

              <span className="floating-badge-ind badge--social badge-ind-social">
                <img src={socialMediaIcon} alt="Redes Sociales" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
                REDES SOCIALES
              </span>
              <span className="floating-badge-ind badge--masxmenos badge-ind-masxmenos">
                <img src={masXMenosIcon} alt="Más x Menos" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
                MÁSXMENOS
              </span>
              <span className="floating-badge-ind badge--datos badge-ind-datos">
                <img src={datosIcon} alt="Datos" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
                DATOS
              </span>
              <span className="floating-badge-ind badge--llamadas badge-ind-llamadas">
                <img src={llamadasIcon} alt="Llamadas" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
                LLAMADAS
              </span>
            </div>

            {/* Cards Plan Individual: slider en <1024px, grid en >=1024px */}
            <div className="plan-ind-cards-container col-span-12 pt-6 pb-10">
              {/* ── Desktop: grid normal ── */}
              <div className="hidden lg:grid grid-cols-3 gap-x-4 md:gap-x-6">
                {individualPlans.map((plan, i) => (
                  <div key={i} className="plan-ind-card preserve-3d pb-8 flex"><CardPlanIndividual plan={plan} /></div>
                ))}
              </div>
              {/* ── Mobile / Tablet: Slider ── */}
              <PlanSlider>
                {individualPlans.map((plan, i) => (
                  <div key={i} className="plan-ind-card preserve-3d pb-10 flex"><CardPlanIndividual plan={plan} /></div>
                ))}
              </PlanSlider>
            </div>

            {/* Texto inferior */}
            <div className="col-span-12 flex flex-col items-center text-center pt-0 md:pt-8 pb-4">
              <h2 className="bottom-text font-medium text-white/90 text-[16px] md:text-[28px] tracking-wide">
                TODOS NUESTROS PLANES TIENEN<br />
                <span>+Minutos y SMS incluidos</span>
              </h2>
            </div>

          </div>
        </div>
      </section>

      {/* ── Sección 4: Compatibilidad IMEI ── */}
      <section
        className="imei-section relative w-full p-5 2xl:px-0 overflow-hidden rounded-[2rem] lg:rounded-[3rem] py-8 md:py-14 shadow-xl"
        style={{
          backgroundImage: `url(${combatibilidadBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#f1f5f9' /* Un color de fallback por si la imagen tarda en cargar */
        }}
      >

        <div className="relative z-10 w-full max-w-[1200px] mx-auto">
          <h2 className="title-section font-anton text-white uppercase text-center leading-none mb-1">
            ¿MI EQUIPO ES COMPATIBLE?
          </h2>
          <p className="text-white text-[13px] md:text-[28px] font-normal text-center mb-6 md:mb-10">
            Descubre la forma para obtener el IMEI!
          </p>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 w-full">

            {/* Card izquierda: teléfono IMEI */}
            <div className="relative flex-shrink-0 w-full md:w-[260px] lg:w-[420px]">
              <div className="imei-card-box relative bg-white rounded-[1.5rem] overflow-hidden shadow-2xl px-6 pt-5 pb-6 h-[260px] md:h-[280px] lg:h-[220px]">
                <div className="relative z-10 flex flex-col justify-end lg:justify-center h-full text-center lg:text-left w-[100%] lg:w-[65%] lg:w-[55%]">
                  <span className="text-[16px] md:text-[18px] italic font-normal leading-none mb-1" style={{ color: 'var(--color-gray-text)' }}>
                    Obtén tu IMEI
                  </span>
                  <h3 className="font-anton text-[32px] md:text-[40px] leading-[1] uppercase italic" style={{ color: 'var(--color-text-dark)' }}>
                    SOLO MARCA
                  </h3>
                  <p className="leading-snug mt-5" style={{ color: 'var(--color-imei-code, var(--color-bg-page-dark))' }}>
                    <span className="text-[24px]">*#06#</span><br />
                    <span className="font-normal text-[18px]">desde tu celular.</span>
                  </p>
                </div>
              </div>

              <div className="imei-phone-img">
                <img src={phoneImei} alt="Teléfono IMEI" className="imei-phone-img-inner" style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
            </div>

            {/* Contenido derecho: formulario */}
            <div className="flex flex-col w-full items-center md:w-auto">
              <h3 className="title-form-imei font-anton text-white uppercase text-center md:text-left leading-[1.05] mb-5 tracking-wide">
                YA LO TIENES... INGRESALO AQUÍ
              </h3>

              <div className="imei-input-box flex flex-col sm:flex-row items-center gap-3 w-full max-w-[600px]">
                <input
                  type="text"
                  placeholder="INGRESA AQUÍ TU IMEI"
                  className="flex-1 w-full sm:w-auto bg-white rounded-full border-none outline-none text-gray-600 placeholder-gray-400 text-[11px] md:text-[12px] font-semibold px-6 py-3.5 uppercase tracking-wider shadow-lg text-center sm:text-left"
                />
                <button className="imei-validate-btn w-full sm:w-auto font-black uppercase rounded-full px-6 md:px-8 py-3 text-[12px] md:text-[16px] shadow-lg whitespace-nowrap transition-colors">
                  VALIDA AQUÍ
                </button>
              </div>

              <p className="text-white text-center md:text-left text-[11px] md:text-[16px] font-light mt-3">
                Conoce nuestros planes compatibles con todos los equipos,{' '}
                <a href="#" className="underline text-white/90 hover:text-white transition-colors">click aquí</a>
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── Sección 5: Marquee de Beneficios ── */}
      <section className="benefits-marquee-section w-full overflow-hidden">
        <InfiniteMarquee speed={1}>
          <div className="benefit-card benefit-card--blue">
            <h4 className="benefit-card__title">COBERTURA</h4>
            <img src={coberturaImg} alt="Cobertura" className="benefit-card__icon" />
            <p className="benefit-card__desc">Navega y llama en todo México, EE.UU y Cánada</p>
          </div>
          <div className="benefit-card benefit-card--lavender">
            <h4 className="benefit-card__title">eSIM</h4>
            <img src={esimImg} alt="eSIM" className="benefit-card__icon" />
            <p className="benefit-card__desc">Suma Megas a tu internet de casa al contratar Mega móvil.</p>
          </div>
          <div className="benefit-card benefit-card--white">
            <h4 className="benefit-card__title">MÁS MEGAS</h4>
            <img src={masGigasImg} alt="Más Megas" className="benefit-card__icon" />
            <p className="benefit-card__desc">Suma Megas a tu internet de casa al contratar Mega móvil.</p>
          </div>
          <div className="benefit-card benefit-card--teal">
            <h4 className="benefit-card__title">eSIM</h4>
            <img src={esimImg} alt="eSIM" className="benefit-card__icon" />
            <p className="benefit-card__desc">Suma Megas a tu internet de casa al contratar Mega móvil.</p>
          </div>
        </InfiniteMarquee>
      </section>

      {/* ── Sección 6: Cámbiate a Mega Móvil ── */}
      <section
        className="cambiate-section w-full rounded-[2rem] lg:rounded-[3rem] overflow-hidden shadow-xl"
        onMouseMove={(e) => {
          const { clientX, clientY } = e;
          const x = (clientX / window.innerWidth - 0.5);
          const y = (clientY / window.innerHeight - 0.5);

          gsap.to('.camm-parallax', {
            x: x * -30,
            y: y * -15,
            rotation: x * -3,
            duration: 2.5,
            ease: 'power2.out'
          });
        }}
      >
        {/* Wrapper de Parallax */}
        <div className="camm-parallax absolute top-[-1000px] left-[-1000px] w-[1500px] md:w-[3500px] lg:w-[3500px] z-0 pointer-events-none">
          <img src={cammBg} alt="" className="camm-wave w-full max-w-none object-cover" />
        </div>

        <div className="relative z-10 container mx-auto max-w-[1320px] px-4 pt-14 pb-20">
          <div className="text-center pb-12 px-4">
            <h2 className="title-section font-anton text-white uppercase text-center leading-none mb-1">
              CÁMBIATE A MEGA MÓVIL
            </h2>
            <p className="text-white text-[13px] md:text-[28px] font-normal text-center mb-6 md:mb-10">
              Cambiate y conserva tu número, fácil y rápido.
            </p>
          </div>

          <div className="cambiate-cards-grid">
            <div className="cambiate-card">
              <span className="cambiate-badge">1</span>
              <img src={solicitaNipIcon} alt="Solicita tu NIP" className="cambiate-card__icon" />
              <p className="cambiate-card__text">
                Solicita tu NIP mandando<br />un mensaje<br />al <strong>051</strong> con la palabra nip
              </p>
            </div>
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
            <div className="cambiate-card">
              <span className="cambiate-badge">3</span>
              <img src={tramiteProcesoIcon} alt="Trámite en proceso" className="cambiate-card__icon" />
              <p className="cambiate-card__text">
                Tu trámite está en proceso<br />y tomará de 24 a 48 horas.
              </p>
            </div>
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

      {/* ── Sección 7: Quiero contratar Megamóvil ── */}
      <section
        className="contratar-section relative w-full rounded-[2rem] lg:rounded-[3rem] overflow-hidden"
        onMouseMove={(e) => {
          const { clientX, clientY } = e;
          const x = (clientX / window.innerWidth - 0.5);
          const y = (clientY / window.innerHeight - 0.5);

          gsap.to('.cta-wave-1', {
            x: x * -80,
            y: y * -50,
            rotation: x * -10,
            duration: 1.5,
            ease: 'back.out(1.2)'
          });

          gsap.to('.cta-wave-2', {
            x: x * 100,
            y: y * 70,
            rotation: x * 15,
            duration: 1.5,
            ease: 'back.out(1.2)'
          });
        }}
      >
        {/* Background Waves */}
        <img src={ctaWave1} alt="" className="cta-wave-1 absolute top-[-1200px] left-[-700px] w-full max-w-[300px] md:max-w-[400px] lg:max-w-[2500px] opacity-100 pointer-events-none z-0 object-contain object-left-bottom" />
        <img src={ctaWave2} alt="" className="cta-wave-2 absolute bottom-[-900px] right-[-450px] w-full max-w-[350px] md:max-w-[450px] lg:max-w-[1600px] opacity-100 pointer-events-none z-0 object-contain object-right-top" />

        <div className="relative z-10 container mx-auto max-w-[1320px] px-4">

          {/* Pills lado izquierdo */}
          <div className="contratar-pill contratar-pill--llamadas">
            <img src={llamadasIcon} alt="" className="contratar-pill__icon" />
            <span>LLAMADAS</span>
          </div>
          <div className="contratar-pill contratar-pill--facebook">
            <FontAwesomeIcon icon={faFacebookF} className="contratar-pill__icon" />
            <span>FACEBOOK</span>
          </div>
          <div className="contratar-pill contratar-pill--datos">
            <img src={datosIcon} alt="" className="contratar-pill__icon" />
            <span>DATOS</span>
          </div>

          {/* Pills lado derecho */}
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
            <h2 className="title-section font-anton uppercase text-center leading-none mb-1">
              Quiero contratar Mega móvil
            </h2>
            <div className="contratar-form mt-4">
              <input type="tel" className="contratar-input shadow-sm" placeholder="Ingresa tu número" />
              <button className="contratar-cta font-bold">LLAMAME</button>
            </div>
          </div>

        </div>
      </section>

      {/* ── Sección 8: Footer ── */}
      <Footer />

    </div>
  );
}

/* ── CardPlan: Plan Familiar ──────────────────────────────── */
function CardPlan({ plan }) {
  return (
    <div
      className="card-item card-familiar relative rounded-[30px] flex flex-col items-center pb-12 shadow-2xl w-full h-full bg-white"
    >
      {/* Imagen con borde azul */}
      <div
        className="w-full h-40 overflow-hidden relative rounded-t-[30px] border-b-[2px]"
        style={{ borderColor: 'var(--card-familiar-border)' }}
      >
        <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none" />
        <img src={plan.image} alt={plan.title} className="w-full h-full object-cover" />
      </div>

      {/* Contenido */}
      <div className="text-center mt-6 px-4 w-full flex-grow flex flex-col">
        <p className="text-[10px] text-black font-normal tracking-widest mb-1.5 uppercase leading-none">
          Conservando tu mismo número
        </p>
        <h3 className="text-[24px] md:text-[34px] font-semibold text-black leading-tight mb-2">
          {plan.title}
        </h3>
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
          <span className="text-[12px] md:text-[16px] text-black font-light mt-0 tracking-widest leading-none">al mes</span>
        </div>
      </div>

      {/* Botón */}
      <button
        className="card-familiar-btn absolute -bottom-[28px] px-8 md:px-12 flex justify-center py-2.5 md:py-3.5 rounded-full text-[16px] md:text-[20px] font-semibold text-black shadow-xl transition-colors duration-300"
        style={{ backgroundColor: 'var(--card-familiar-btn-bg)' }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--card-familiar-btn-hover)'}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--card-familiar-btn-bg)'}
      >
        ¡LO QUIERO!
      </button>
    </div>
  );
}

/* ── CardPlanIndividual: Plan Individual ──────────────────── */
function CardPlanIndividual({ plan }) {
  const isMultiLineData = plan.data.includes('\n');

  return (
    <div
      className="card-item card-individual relative rounded-[30px] flex flex-col items-center pt-8 pb-14 shadow-2xl w-full h-full border-[3px] bg-white"
      style={{
        borderColor: 'var(--card-ind-border)'
      }}
    >
      {/* ZONA 1: Título */}
      <div className="flex flex-col items-center w-full px-4 pb-3">
        <h3
          className="text-[28px] md:text-[54px] font-anton tracking-wider leading-none"
          style={{ color: 'var(--color-orange-brand)' }}
        >
          {plan.title}
        </h3>
        <div className="w-[60%] h-[1px] mt-3" style={{ backgroundColor: 'var(--color-orange-brand)' }} />
      </div>

      {/* ZONA 2: Gigas */}
      <div className="flex flex-1 flex-col items-center justify-center text-center px-4">
        {isMultiLineData ? (
          <span className="text-[36px] md:text-[40px] font-semibold text-black tracking-tight whitespace-pre-line leading-[1.1]">
            {plan.data}
          </span>
        ) : (
          <>
            <span className="text-[48px] md:text-[60px] font-semibold text-black tracking-tight leading-none">{plan.data}</span>
            <span className="text-[13px] md:text-[14px] font-light text-black leading-none mt-0.5">{plan.dataDesc}</span>
          </>
        )}
      </div>

      {/* ZONA 3: Precio */}
      <div className="flex flex-col items-center w-full px-8 pt-4 pb-4">
        <span className="text-[10px] md:text-[12px] text-black font-normal tracking-widest uppercase mb-1">POR SOLO</span>
        <div className="flex items-start tracking-tighter justify-center leading-none">
          <span className="text-[46px] md:text-[56px] font-semibold text-black leading-none">${plan.price}</span>
          <span className="text-[16px] md:text-[20px] font-bold text-black mt-1 leading-none">*</span>
        </div>
        <span className="text-[12px] md:text-[14px] text-black font-light mt-0.5 tracking-widest leading-none">al mes</span>
      </div>

      {/* ZONA 4: Redes ilimitadas + íconos */}
      <div className="flex flex-col items-center text-center w-full px-4 pt-2 pb-2">
        <p className="text-[10px] md:text-[11px] text-black tracking-wide mb-3">Conservando tu número</p>
        <p className="text-[12px] md:text-[14px] text-black leading-tight mb-2">
          Redes Sociales<br /><b>ILIMITADAS<sup>*</sup></b>
        </p>
        <div className="flex gap-1 md:gap-2 flex-wrap justify-center">
          {plan.socials.map((appKey) => {
            const app = socialConfig[appKey];
            return (
              <div
                key={appKey}
                className={`social-${appKey} w-6 h-6 md:w-[45px] md:h-[45px] rounded-[6px] md:rounded-[10px] flex items-center justify-center text-[12px] md:text-[24px] shadow-sm`}
              >
                <FontAwesomeIcon icon={app.icon} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Botón */}
      <button
        className="absolute -bottom-[24px] px-8 md:px-12 flex justify-center py-2.5 md:py-3.5 rounded-full text-[16px] md:text-[20px] font-semibold text-white shadow-xl transition-colors duration-300"
        style={{ backgroundColor: 'var(--card-ind-btn-bg)' }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--card-ind-btn-hover)'}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--card-ind-btn-bg)'}
      >
        ¡LO QUIERO!
      </button>
    </div>
  );
}

/* ── Marquee Infinito con Drag ──────────────────────────────
   - Mide el ancho de 1 set de cards y calcula copias dinámicamente.
   - Anima con requestAnimationFrame (translate3d, GPU).
   - Soporta drag con pointer events con momentum.
   - Wrap seamless: el offset siempre se mantiene en [-setWidth, 0). */
function InfiniteMarquee({ children, speed = 0.5 }) {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const [copies, setCopies] = useState(3);
  const childArray = React.Children.toArray(children);

  const anim = useRef({
    offset: 0, velocity: 0, isDragging: false, isHovered: false,
    dragStartX: 0, dragStartOffset: 0, lastX: 0, lastTime: 0, setWidth: 0,
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
          a.offset -= speed;
          if (Math.abs(a.velocity) > 0.05) {
            a.offset += a.velocity;
            a.velocity *= 0.94;
          } else {
            a.velocity = 0;
          }
        }
        while (a.offset <= -sw) a.offset += sw;
        while (a.offset > 0) a.offset -= sw;
        track.style.transform = `translate3d(${a.offset}px, 0, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [speed, copies]);

  // 3. Drag handlers
  const onDown = useCallback((e) => {
    const a = anim.current;
    a.isDragging = true; a.velocity = 0;
    a.dragStartX = e.clientX; a.dragStartOffset = a.offset;
    a.lastX = e.clientX; a.lastTime = performance.now();
    e.currentTarget.setPointerCapture(e.pointerId);
    if (wrapperRef.current) wrapperRef.current.style.cursor = 'grabbing';
  }, []);

  const onMove = useCallback((e) => {
    const a = anim.current;
    if (!a.isDragging) return;
    a.offset = a.dragStartOffset + (e.clientX - a.dragStartX);
    const now = performance.now();
    const dt = now - a.lastTime;
    if (dt > 0) a.velocity = ((e.clientX - a.lastX) / dt) * 16;
    a.lastX = e.clientX; a.lastTime = now;
  }, []);

  const onUp = useCallback(() => {
    anim.current.isDragging = false;
    if (wrapperRef.current) wrapperRef.current.style.cursor = 'grab';
  }, []);

  // 4. Pausar al hacer hover en una card
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
