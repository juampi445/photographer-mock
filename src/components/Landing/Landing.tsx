import styles from './Landing.module.scss';
import Header from '../Header/Header';
import Hero from '../Hero/Hero';
import About from '../About/About';
import Gallery from '../Gallery/Gallery';
import Services from '../Services/Services';
import Contact from '../Contact/Contact';
import Footer from '../Footer/Footer';

export default function Landing() {
  return (
    <div className={styles.landing}>
      <Header />
      <Hero />
      <About />
      <Gallery />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
}
