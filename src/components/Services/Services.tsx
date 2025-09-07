import styles from './Services.module.scss';

export default function Services() {
  const services = [
    {
      title: "Portrait Photography",
      price: "$299",
      duration: "2-3 hours",
      features: [
        "Professional studio or outdoor session",
        "50+ high-resolution edited photos",
        "Online gallery for easy sharing",
        "Print release included",
        "Wardrobe consultation"
      ]
    },
    {
      title: "Wedding Photography",
      price: "$1,999",
      duration: "Full day",
      features: [
        "8-10 hours of coverage",
        "500+ high-resolution edited photos",
        "Online private gallery",
        "USB drive with all images",
        "Engagement session included",
        "Second photographer available"
      ],
      popular: true
    },
    {
      title: "Event Photography",
      price: "$599",
      duration: "4-6 hours",
      features: [
        "Professional event coverage",
        "200+ high-resolution edited photos",
        "Quick turnaround (72 hours)",
        "Online gallery sharing",
        "Print release included"
      ]
    }
  ];

  return (
    <section id="services" className={styles.services}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Services</h2>
          <h3>Photography Packages</h3>
          <p>Choose the perfect package for your photography needs</p>
        </div>

        <div className={styles.servicesGrid}>
          {services.map((service, index) => (
            <div key={index} className={`${styles.serviceCard} ${service.popular ? styles.popular : ''}`}>
              {service.popular && <div className={styles.popularBadge}>Most Popular</div>}
              <div className={styles.serviceHeader}>
                <h4>{service.title}</h4>
                <div className={styles.price}>
                  <span className={styles.amount}>{service.price}</span>
                  <span className={styles.duration}>/ {service.duration}</span>
                </div>
              </div>
              <ul className={styles.features}>
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>{feature}</li>
                ))}
              </ul>
              <button className={styles.bookBtn}>Book Now</button>
            </div>
          ))}
        </div>

        <div className={styles.cta}>
          <h3>Need a Custom Package?</h3>
          <p>Contact me to discuss your specific photography needs and get a personalized quote.</p>
          <a href="#contact" className={styles.ctaBtn}>Get Custom Quote</a>
        </div>
      </div>
    </section>
  );
}
