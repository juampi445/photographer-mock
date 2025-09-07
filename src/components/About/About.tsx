"use client";

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './About.module.scss';

export default function About() {
  const [stats] = useState([
    { number: '500+', label: 'Happy Clients' },
    { number: '1000+', label: 'Photos Taken' },
    { number: '5+', label: 'Years Experience' },
    { number: '50+', label: 'Events Covered' },
  ]);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="about" className={styles.about} ref={ref}>
      <div className={styles.container}>
        <motion.div 
          className={styles.aboutContent}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div 
            className={styles.aboutImage}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80" 
              alt="Alexandra Chen - Professional Photographer"
            />
            <div className={styles.overlay}></div>
          </motion.div>
          <motion.div 
            className={styles.aboutText}
            variants={itemVariants}
          >
            <motion.h2 variants={itemVariants}>About Me</motion.h2>
            <motion.h3 variants={itemVariants}>Passionate About Capturing Memories</motion.h3>
            <motion.p variants={itemVariants}>
              Hello! I'm Alexandra Chen, a professional photographer with over 5 years of experience
              in capturing life's most precious moments. My passion lies in creating timeless images
              that tell unique stories and preserve memories for generations to come.
            </motion.p>
            <motion.p variants={itemVariants}>
              I specialize in portrait photography, wedding photography, and lifestyle sessions.
              My approach combines technical expertise with creative vision to deliver stunning
              results that exceed expectations.
            </motion.p>
            <motion.div 
              className={styles.skills}
              variants={itemVariants}
            >
              <div className={styles.skill}>
                <span>Portrait Photography</span>
                <div className={styles.skillBar}>
                  <motion.div 
                    className={styles.skillProgress} 
                    initial={{ width: 0 }}
                    animate={isInView ? { width: '95%' } : { width: 0 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  ></motion.div>
                </div>
              </div>
              <div className={styles.skill}>
                <span>Wedding Photography</span>
                <div className={styles.skillBar}>
                  <motion.div 
                    className={styles.skillProgress} 
                    initial={{ width: 0 }}
                    animate={isInView ? { width: '90%' } : { width: 0 }}
                    transition={{ duration: 1.5, delay: 0.7 }}
                  ></motion.div>
                </div>
              </div>
              <div className={styles.skill}>
                <span>Event Photography</span>
                <div className={styles.skillBar}>
                  <motion.div 
                    className={styles.skillProgress} 
                    initial={{ width: 0 }}
                    animate={isInView ? { width: '85%' } : { width: 0 }}
                    transition={{ duration: 1.5, delay: 0.9 }}
                  ></motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
        <motion.div 
          className={styles.stats}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              className={styles.statItem}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <h3>{stat.number}</h3>
              <p>{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
