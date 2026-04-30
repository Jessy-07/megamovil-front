import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import PlanSlider from '../components/PlanSlider/PlanSlider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faXTwitter, faWhatsapp, faTelegram, faFacebookMessenger, faSnapchat, faInstagram } from '@fortawesome/free-brands-svg-icons';
import pfWave1 from '../assets/img/home/pf-wave-1.svg';
import pfWave2 from '../assets/img/home/pf-wave-2.svg';
import socialMediaIcon from '../assets/icons/home/social-media-icon.png';
import masXMenosIcon from '../assets/icons/home/masxmenos-icon.png';
import datosIcon from '../assets/icons/home/datos-icon.png';
import llamadasIcon from '../assets/icons/home/llamadas-icon.png';
import ctaWave1 from '../assets/img/home/cta-1.svg';
import ctaWave2 from '../assets/img/home/cta-2.svg';
import bannerRoaming from '../assets/img/roaming-int/banner-roaming-internacional.jpg';
import './RoamingInternacional.css';

gsap.registerPlugin(ScrollTrigger);

/* ── Datos de planes roaming ── */
const roamingPlans = [
  { title: 'AMÉRICA', data: '500 MB', dataDesc: 'por 30 días', price: '390', socials: ['fb', 'x', 'wa', 'tg', 'msg'] },
  { title: 'EUROPA', data: '500 MB', dataDesc: 'por 30 días', price: '780', socials: ['fb', 'x', 'wa', 'tg', 'msg'] },
  { title: 'EUROPA', data: '1 GB', dataDesc: 'por 30 días', price: '1,100', socials: ['fb', 'x', 'wa', 'tg', 'msg', 'snap', 'ig'] },
];

const socialConfig = {
  fb:   { icon: faFacebookF },
  x:    { icon: faXTwitter },
  wa:   { icon: faWhatsapp },
  tg:   { icon: faTelegram },
  msg:  { icon: faFacebookMessenger },
  snap: { icon: faSnapchat },
  ig:   { icon: faInstagram },
};

/* ── Preguntas frecuentes ── */
const faqs = [
  {
    q: '¿Qué incluye el plan adicional de roaming internacional?',
    a: 'Los planes adicionales de roaming incluirán una bolsa de datos específica para su uso en territorio internacional, la cual dependerá del paquete contratado.',
  },
  {
    q: '¿Cuáles países son considerados Europa?',
    a: 'Albania, Alemania, Australia, Austria, Bangladés, Baréin, Bélgica, Belice, Bielorrusia, Bolivia, Bulgaria, Catar, China, Corea del Sur, Croacia, Dinamarca, Eslovaquia, Eslovenia, España, Estonia, Filipinas, Finlandia, Fiyi, Francia, Ghana, Grecia, Hong Kong, Hungría, Indonesia, Irlanda, Israel, Italia, Japón, Kuwait, Letonia, Liechtenstein, Lituania, Luxemburgo, Macao, Malasia, Malta, Montenegro, Noruega, Nueva Zelanda, Países Bajos, Polonia, Portugal, Reino Unido, República Checa, República de Macedonia, Rumanía, Rusia, Serbia, Singapur, Sri Lanka, Sudáfrica, Sudán, Suecia, Suiza, Tailandia, Taiwán, Ucrania.',
  },
  {
    q: '¿Cuáles países son considerados América?',
    a: 'Argentina, Brasil, Chile, Colombia, Costa Rica, Ecuador, El Salvador, Guatemala, Honduras, Nicaragua, Panamá, Paraguay, Perú, República Dominicana y Uruguay.',
  },
  {
    q: '¿Cuándo comienza a aplicarse el plan de roaming?',
    a: 'Una vez sea contratado el plan roaming será activado.',
  },
  {
    q: '¿Cuánto tiempo dura el plan adicional?',
    a: '30 días naturales.',
  },
  {
    q: '¿El consumo en roaming afecta mi plan base?',
    a: 'No, este plan es adicional a tu plan base por lo que no afecta.',
  },
  {
    q: '¿Qué pasa si se me terminan los GB o minutos incluidos?',
    a: 'Conéctate a una red wifi y comunícate por medio de Whatsapp para poder adquirir un nuevo paquete romaing nacional\nWhatsApp: 33 9690 0001',
  },
  {
    q: '¿El plan adicional se renueva automáticamente?',
    a: 'No, en caso de necesitar 1 mes adicional tendrás que comunicarte con soporte al cliente para adquirir un paquete nuevo adicional.',
  },
  {
    q: '¿Puedo usar mi número normalmente para llamadas y WhatsApp en el extranjero?',
    a: 'Si, tu número habitual seguirá funcionando y será compatible con el paquete contratado de roaming internacional.',
  },
  {
    q: '¿Qué debo hacer si no tengo señal al llegar al país?',
    a: 'Comunícate con nuestro soporte al cliente disponible 24/7 por medio de WhatsApp: 33 9690 0001.',
  },
  {
    q: '¿Puedo usar mi plan adicional en varios países durante el mismo viaje?',
    a: 'Si, siempre y cuando este dentro de la cobertura contratada.',
  },
];

/* ── Componente FAQ Accordion con animación GSAP ── */
function FaqItem({ faq, isOpen, onToggle }) {
  const answerRef = useRef(null);
  const iconRef   = useRef(null);
  const firstRun  = useRef(true);

  useEffect(() => {
    const el = answerRef.current;
    if (!el) return;

    if (firstRun.current) {
      // Estado inicial sin animación
      gsap.set(el, { height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 });
      firstRun.current = false;
      return;
    }

    if (isOpen) {
      // Abrir: medir altura real y animar
      gsap.set(el, { height: 'auto', opacity: 1 });
      const h = el.offsetHeight;
      gsap.fromTo(el,
        { height: 0, opacity: 0 },
        { height: h, opacity: 1, duration: 0.32, ease: 'power3.out',
          onComplete: () => gsap.set(el, { height: 'auto' }) }
      );
    } else {
      // Cerrar
      gsap.to(el, { height: 0, opacity: 0, duration: 0.24, ease: 'power3.in' });
    }

    // Rotar chevron
    gsap.to(iconRef.current, {
      rotation: isOpen ? 180 : 0,
      duration: 0.28,
      ease: 'power2.inOut',
    });
  }, [isOpen]);

  return (
    <div className={`ri-faq-item ${isOpen ? 'ri-faq-item--open' : ''}`}>
      <button
        className="ri-faq-question"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span>{faq.q}</span>
        <span ref={iconRef} style={{ display: 'inline-flex' }}>
          <FontAwesomeIcon icon={faChevronDown} className="ri-faq-icon" />
        </span>
      </button>
      <div ref={answerRef} style={{ overflow: 'hidden', height: 0, opacity: 0 }}>
        <div className="ri-faq-answer">
          <p>{faq.a}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Componente Card de Plan Roaming (estilo Plan Individual del Home) ── */
function RoamingCard({ plan }) {
  return (
    <div
      className="card-item card-individual relative rounded-[30px] flex flex-col items-center pt-8 pb-14 shadow-2xl w-full h-full bg-white"
      style={{ outline: '3px solid transparent', outlineOffset: '0px' }}
    >
      {/* Título */}
      <div className="flex flex-col items-center w-full px-4 pb-3">
        <h3
          className="text-[28px] md:text-[54px] font-anton tracking-wider leading-none"
          style={{ color: 'var(--color-orange-brand)' }}
        >
          {plan.title}
        </h3>
        <div className="w-[60%] h-[1px] mt-3" style={{ backgroundColor: 'var(--color-orange-brand)' }} />
      </div>

      {/* Datos */}
      <div className="flex flex-1 flex-col items-center justify-center text-center px-4">
        <span className="text-[48px] md:text-[60px] font-semibold text-black tracking-tight leading-none">{plan.data}</span>
        <span className="text-[13px] md:text-[24px] font-light text-black leading-none mt-0.5">{plan.dataDesc}</span>
      </div>

      {/* Precio */}
      <div className="flex flex-col items-center w-full px-8 pt-8 pb-4">
        <span className="text-[10px] md:text-[12px] text-black font-normal tracking-widest uppercase mb-1">POR SOLO</span>
        <div className="flex items-start tracking-tighter justify-center leading-none">
          <span className="text-[46px] md:text-[56px] font-semibold text-black leading-none">${plan.price}</span>
          <span className="text-[16px] md:text-[20px] font-bold text-black mt-1 leading-none">*</span>
        </div>
        <span className="text-[12px] md:text-[14px] text-black font-light mt-0.5 tracking-widest leading-none">al mes</span>
      </div>

      {/* Botón */}
      <button
        className="card-familiar-btn absolute -bottom-[24px] px-8 md:px-12 flex justify-center py-2.5 md:py-3.5 rounded-full text-[16px] md:text-[20px] font-semibold text-black shadow-xl transition-colors duration-300"
        style={{ backgroundColor: 'var(--card-familiar-btn-bg)' }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--card-familiar-btn-hover)'}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--card-familiar-btn-bg)'}
      >¡LO QUIERO!</button>
    </div>
  );
}

/* ── Vista principal ── */
export default function RoamingInternacional() {
  const mainRef = useRef(null);
  const [openFaq, setOpenFaq] = useState(0);

  useGSAP(() => {
    // Plans section — matching Plan Familiar from Home
    gsap.from('.ri-subtitle-plan', {
      scrollTrigger: { trigger: '.ri-plans-section', start: 'top 80%' },
      duration: 1, y: -50, opacity: 0, ease: 'power3.out', delay: 0.2
    });
    gsap.from('.ri-plans-title', {
      scrollTrigger: { trigger: '.ri-plans-section', start: 'top 80%' },
      duration: 1, scale: 0.8, opacity: 0, ease: 'back.out(1.7)', delay: 0.3
    });
    gsap.from('.ri-plan-card', {
      scrollTrigger: { trigger: '.ri-plans-section', start: 'top 70%' },
      duration: 1, y: 100, opacity: 0, stagger: 0.2, ease: 'power4.out'
    });
    gsap.from('.ri-pf-wave-1', {
      duration: 2, y: -300, rotation: -15, scale: 1.2, opacity: 0, ease: 'power4.out'
    });
    gsap.from('.ri-pf-wave-2', {
      duration: 2, y: 300, rotation: 15, scale: 1.2, opacity: 0, ease: 'power4.out', delay: 0.2
    });
    gsap.to('.ri-pf-wave-1', {
      y: '+=30', rotation: '+=3', duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut'
    });
    gsap.to('.ri-pf-wave-2', {
      y: '-=40', rotation: '-=3', duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut'
    });

    // FAQ — título entra con split char por char
    gsap.from('.ri-faq-title', {
      scrollTrigger: { trigger: '.ri-faq-section', start: 'top 82%' },
      duration: 0.7, y: 40, opacity: 0, ease: 'power3.out',
    });
    // FAQ — items entran en cascada desde abajo
    gsap.from('.ri-faq-item', {
      scrollTrigger: { trigger: '.ri-faq-section', start: 'top 75%' },
      duration: 0.5, y: 24, opacity: 0, stagger: 0.06, ease: 'power3.out',
    });

    // CTA waves
    gsap.from('.ri-cta-wave-1', {
      scrollTrigger: { trigger: '.ri-cta-section', start: 'top 80%' },
      duration: 2, y: -300, rotation: -15, scale: 1.2, opacity: 0, ease: 'power4.out'
    });
    gsap.from('.ri-cta-wave-2', {
      scrollTrigger: { trigger: '.ri-cta-section', start: 'top 80%' },
      duration: 2, y: 300, rotation: 15, scale: 1.2, opacity: 0, ease: 'power4.out', delay: 0.2
    });
    gsap.to('.ri-cta-wave-1', {
      y: '+=30', rotation: '+=3', duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut'
    });
    gsap.to('.ri-cta-wave-2', {
      y: '-=40', rotation: '-=3', duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut'
    });

  }, { scope: mainRef });

  return (
    <div ref={mainRef} className="ri-page min-h-screen p-[8px] md:p-[20px] flex flex-col items-center gap-[8px] md:gap-[20px]">

      {/* ── Navbar separado (como en Home, dentro de la primera sección) ── */}
      <section
        className="relative w-full rounded-[2rem] lg:rounded-[3rem] shadow-xl"
        style={{ backgroundColor: 'var(--color-blue-primary)' }}
      >
        <Navbar />
        <div className="pt-[72px] md:pt-[80px]" />
      </section>

      {/* ── Sección 1: Hero — banner imagen estático ── */}
      <section className="ri-hero-section w-full shadow-xl">
        <img
          src={bannerRoaming}
          alt="Planes Internacionales para tu celular"
          className="ri-hero-banner"
        />
      </section>

      {/* ── Sección 2: Elige Tu Plan (igual que Plan Familiar del Home) ── */}
      <section
        className="ri-plans-section relative w-full overflow-hidden rounded-[2rem] lg:rounded-[3rem] py-10 md:py-16 pt-24 md:pt-16 shadow-xl"
        style={{ backgroundColor: 'var(--color-blue-primary)' }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          gsap.to('.ri-pf-wave-1', { x: x * 30, y: y * 20, duration: 1, ease: 'power2.out' });
          gsap.to('.ri-pf-wave-2', { x: -x * 30, y: -y * 20, duration: 1, ease: 'power2.out' });
        }}
      >
        <img src={pfWave1} alt="" className="ri-pf-wave-1 pf-wave pf-wave-1 absolute top-[-700px] left-[-700px] w-full max-w-[300px] md:max-w-[400px] lg:max-w-[2500px] opacity-100 pointer-events-none z-0 object-contain object-left-bottom" />
        <img src={pfWave2} alt="" className="ri-pf-wave-2 pf-wave pf-wave-2 absolute bottom-[-700px] right-[-300px] w-full max-w-[350px] md:max-w-[450px] lg:max-w-[1600px] opacity-100 pointer-events-none z-0 object-contain object-right-top" />

        <div className="relative z-10 container mx-auto px-4 max-w-[1320px]">
          <div className="grid grid-cols-12 gap-x-4 md:gap-x-6">
            <div className="col-span-12 text-center pt-2 pb-0">
              <h3 className="ri-subtitle-plan text-white uppercase subtitle-p-plan">
                ELIGE EL PLAN QUE SE ADAPTA A TI
              </h3>
            </div>

            <div className="col-span-12 relative flex items-center justify-center title-row ">
              <h2 className="ri-plans-title title-p-plan font-anton text-white uppercase text-center w-full">
                ROAMING INTERNACIONAL
              </h2>
              
            </div>

            <div className="col-span-12 pt-6 pb-10">
              {/* Desktop grid */}
              <div className="hidden lg:grid grid-cols-3 gap-x-4 md:gap-x-6">
                {roamingPlans.map((plan, i) => (
                  <div key={i} className="ri-plan-card plan-familiar-card preserve-3d pb-8">
                    <RoamingCard plan={plan} />
                  </div>
                ))}
              </div>

              {/* Mobile slider */}
              <PlanSlider>
                {roamingPlans.map((plan, i) => (
                  <div key={i} className="ri-plan-card plan-familiar-card preserve-3d pb-10">
                    <RoamingCard plan={plan} />
                  </div>
                ))}
              </PlanSlider>
            </div>

          </div>
        </div>
      </section>

      {/* ── Sección 3: Preguntas Frecuentes ── */}
      <section
        className="ri-faq-section relative w-full rounded-[2rem] lg:rounded-[3rem] overflow-hidden shadow-xl py-12 md:py-20"
        onMouseMove={(e) => {
          const x = (e.clientX / window.innerWidth - 0.5);
          const y = (e.clientY / window.innerHeight - 0.5);
          gsap.to('.ri-faq-wave-1', { x: x * -80, y: y * -50, rotation: x * -10, duration: 1.5, ease: 'back.out(1.2)' });
          gsap.to('.ri-faq-wave-2', { x: x * 100, y: y * 70, rotation: x * 15, duration: 1.5, ease: 'back.out(1.2)' });
        }}
      >
        {/* Waves grises con movimiento igual a sección contratar del Home */}
        <img src={ctaWave1} alt="" className="ri-faq-wave-1 absolute top-[-1100px] left-[-700px] w-full max-w-[300px] md:max-w-[400px] lg:max-w-[2500px] pointer-events-none z-0 object-contain object-left-bottom" />
        <img src={ctaWave2} alt="" className="ri-faq-wave-2 absolute bottom-[-900px] right-[-450px] w-full max-w-[350px] md:max-w-[450px] lg:max-w-[1600px] pointer-events-none z-0 object-contain object-right-top" />
        <div className="relative z-10 container mx-auto px-4 max-w-[900px]">
          <h2 className="ri-faq-title title-section font-anton text-center uppercase leading-none mb-10 md:mb-14" style={{ color: '#111' }}>
            Preguntas Frecuentes
          </h2>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <FaqItem
                key={i}
                faq={faq}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
          
        </div>
      </section>

      {/* ── Footer ── */}
      <Footer />

    </div>
  );
}
