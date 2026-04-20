import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faXTwitter, faWhatsapp, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer-section w-full rounded-[2rem] lg:rounded-[3rem] overflow-hidden">
      <div className="container-fluid mx-auto flex flex-col lg:flex-row items-center justify-end gap-[170px]">

        {/* Columna Izquierda: Iconos y Título */}
        <div className="flex flex-col items-center lg:items-start gap-8">
          <div className="social-cluster">
            <a href="#" className="social-icon-btn social-icon--wa">
              <FontAwesomeIcon icon={faWhatsapp} />
            </a>
            <a href="#" className="social-icon-btn social-icon--ig">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#" className="social-icon-btn social-icon--tk">
              <FontAwesomeIcon icon={faTiktok} />
            </a>
            <a href="#" className="social-icon-btn social-icon--x">
              <FontAwesomeIcon icon={faXTwitter} />
            </a>
            <a href="#" className="social-icon-btn social-icon--fb">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
          </div>
          <h3 className="font-anton text-white text-[44px] md:text-5xl italic tracking-wide mt-2">
            LOCALIZA TU CIS
          </h3>
        </div>

        {/* Columna Derecha: Caja Azul con Links */}
        <div className="footer-links-box rounded-[2.5rem] p-10 lg:p-16 w-full lg:w-[65%] flex flex-col items-center lg:items-end text-center lg:text-right gap-3 shadow-2xl">
          <a href="#" className="footer-link">AYUDA</a>
          <a href="#" className="footer-link">LEGALES</a>
          <a href="#" className="footer-link">GARANTÍAS</a>
          <a href="#" className="footer-link">CÓDIGO DE PRÁCTICAS COMERCIALES</a>
          <a href="#" className="footer-link">CONTRATOS DE ADHESIÓN PREPAGO</a>
          <a href="#" className="footer-link">CONTRATO DE ADHENSIÓN POSPAGO IFT</a>
          <a href="#" className="footer-link">-INSTITUTO FEDERAL DE TELECOMUNICACIONES</a>
        </div>

      </div>
    </footer>
  );
}
