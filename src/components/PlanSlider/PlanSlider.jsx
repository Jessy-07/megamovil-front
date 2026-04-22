import React, { useRef, useState, useEffect, useCallback, Children } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

/**
 * PlanSlider — Slider reutilizable con flechas centradas dinámicamente.
 *
 * Usa ResizeObserver sobre el primer .swiper-slide real del DOM para medir
 * la altura exacta de la card (imagen + contenido + botón) y posicionar
 * las flechas exactamente en el centro vertical, sin importar cuánto mide
 * cada card ni cuánto padding extra tenga el wrapper por los dots.
 *
 * Props:
 *   children    — Los elementos a renderizar como slides
 *   className   — Clases extra para el wrapper exterior (override de --arrow-color, etc.)
 *   swiperProps — Props adicionales directos al <Swiper>
 *
 * Uso en otra parte del proyecto:
 *   <PlanSlider className="mi-seccion">
 *     {items.map(item => <MiCard item={item} />)}
 *   </PlanSlider>
 *
 *   Para cambiar color de flechas:
 *   .mi-seccion { --arrow-color: #FF7F00; --arrow-bg: rgba(0,0,0,0.1); }
 */
export default function PlanSlider({ children, className = '', swiperProps = {} }) {
  const swiperRef = useRef(null);
  const wrapperRef = useRef(null);
  const [arrowTop, setArrowTop] = useState(null);

  const measureSlide = useCallback(() => {
    if (!wrapperRef.current) return;
    // Busca el primer swiper-slide real en el DOM
    const firstSlide = wrapperRef.current.querySelector('.swiper-slide');
    if (firstSlide) {
      const slideH = firstSlide.offsetHeight;
      // Las flechas se centran en la mitad de la slide (no del wrapper+dots)
      setArrowTop(slideH / 2);
    }
  }, []);

  useEffect(() => {
    // Espera al primer render del Swiper
    const timer = setTimeout(measureSlide, 150);

    let ro;
    if (wrapperRef.current) {
      ro = new ResizeObserver(measureSlide);
      ro.observe(wrapperRef.current);
    }

    return () => {
      clearTimeout(timer);
      ro?.disconnect();
    };
  }, [measureSlide, children]);

  const slides = Children.toArray(children);

  // Mientras no se haya medido, las flechas se ocultan (no hay salto visual)
  const arrowStyle = arrowTop !== null
    ? { top: arrowTop, transform: 'translateY(-50%)' }
    : { display: 'none' };

  return (
    <div ref={wrapperRef} className={`lg:hidden slider-wrapper ${className}`}>
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={16}
        slidesPerView={1}
        centeredSlides={true}
        breakpoints={{
          640: { slidesPerView: 2, centeredSlides: false },
        }}
        className="plan-swiper"
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        onSlideChange={measureSlide}
        {...swiperProps}
      >
        {slides.map((child, i) => (
          <SwiperSlide key={i}>{child}</SwiperSlide>
        ))}
      </Swiper>

      <button
        className="slider-arrow slider-arrow--prev"
        style={arrowStyle}
        onClick={() => swiperRef.current?.slidePrev()}
        aria-label="Anterior"
      />
      <button
        className="slider-arrow slider-arrow--next"
        style={arrowStyle}
        onClick={() => swiperRef.current?.slideNext()}
        aria-label="Siguiente"
      />
    </div>
  );
}
