
import { useEffect } from 'react';

function Footer() {
    useEffect(() => {
        // Load Ionicons
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js';
        script.async = true;
        document.body.appendChild(script);
    
        return () => {
          // Clean up Ionicons
          document.body.removeChild(script);
        };
      }, []);
      
    return (
    <footer className="footer">
        <div className="waves">
        <div className="wave" id="wave1"></div>
        <div className="wave" id="wave2"></div>
        <div className="wave" id="wave3"></div>
        <div className="wave" id="wave4"></div>
        </div>
        <ul className="social-icon">
        <li className="social-icon__item"><a className="social-icon__link" href="#">
            <ion-icon name="logo-facebook"></ion-icon>
            </a></li>
        <li className="social-icon__item"><a className="social-icon__link" href="#">
            <ion-icon name="logo-twitter"></ion-icon>
            </a></li>
        <li className="social-icon__item"><a className="social-icon__link" href="#">
            <ion-icon name="logo-linkedin"></ion-icon>
            </a></li>
        <li className="social-icon__item"><a className="social-icon__link" href="#">
            <ion-icon name="logo-instagram"></ion-icon>
            </a></li>
        </ul>
        <p>Art Designed By Xiaole Su</p>
        <p>Qihong Wu | Vivian Zou | Gillian Palmer | Ahan Jain</p>
    </footer>
    )
}

export default Footer;