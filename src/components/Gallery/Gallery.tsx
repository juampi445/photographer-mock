"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import styles from './Gallery.module.scss';

interface GalleryItem {
  id: number;
  image: string;
  category: string;
  title: string;
  description: string;
}

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleItems, setVisibleItems] = useState(6);
  const [filteredItems, setFilteredItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const galleryItems: GalleryItem[] = [
    { id: 1, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop&crop=face", category: "portrait", title: "Professional Portrait", description: "Studio portrait session" },
    { id: 2, image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1000&fit=crop", category: "wedding", title: "Wedding Ceremony", description: "Intimate wedding moment" },
    { id: 3, image: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&h=1000&fit=crop", category: "lifestyle", title: "Family Lifestyle", description: "Candid family moments" },
    { id: 4, image: "https://images.unsplash.com/photo-1616776005756-4dca36082d3e?w=800&h=1000&fit=crop&crop=face", category: "portrait", title: "Studio Portrait", description: "Professional headshot" },
    { id: 5, image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=1000&fit=crop", category: "wedding", title: "Bridal Portrait", description: "Beautiful bride moments" },
    { id: 6, image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=800&h=1000&fit=crop", category: "lifestyle", title: "Urban Lifestyle", description: "City lifestyle shoot" },
    { id: 7, image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=800&h=1000&fit=crop&crop=face", category: "portrait", title: "Creative Portrait", description: "Artistic portrait session" },
    { id: 8, image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=1000&fit=crop", category: "wedding", title: "Wedding Details", description: "Wedding preparation moments" },
    { id: 9, image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=1000&fit=crop", category: "lifestyle", title: "Beach Lifestyle", description: "Outdoor lifestyle session" },
    { id: 10, image: "https://images.unsplash.com/photo-1542080681-d4a6bc79be4d?w=800&h=1000&fit=crop&crop=face", category: "portrait", title: "Artistic Portrait", description: "Creative lighting portrait" },
    { id: 11, image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&h=1000&fit=crop", category: "wedding", title: "Wedding Reception", description: "Celebration moments" },
    { id: 12, image: "https://images.unsplash.com/photo-1517638851339-a711cfcf3279?w=800&h=1000&fit=crop", category: "lifestyle", title: "Nature Lifestyle", description: "Outdoor family session" }
  ];

  const filters = [
    { key: 'all', label: 'All Work', count: galleryItems.length },
    { key: 'portrait', label: 'Portraits', count: galleryItems.filter(item => item.category === 'portrait').length },
    { key: 'wedding', label: 'Weddings', count: galleryItems.filter(item => item.category === 'wedding').length },
    { key: 'lifestyle', label: 'Lifestyle', count: galleryItems.filter(item => item.category === 'lifestyle').length }
  ];

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredItems(galleryItems);
    } else {
      setFilteredItems(galleryItems.filter(item => item.category === activeFilter));
    }
    setVisibleItems(6); // Reset visible items when filter changes
  }, [activeFilter]);

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  const loadMore = () => {
    setIsLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setVisibleItems(prev => prev + 6);
      setIsLoading(false);
    }, 500);
  };

  const hasMoreItems = visibleItems < filteredItems.length;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section id="gallery" className={styles.gallery} ref={ref}>
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
        >
          <h2>My Work</h2>
          <h3>Portfolio Gallery</h3>
          <p>Explore my collection of photography work across different categories</p>
        </motion.div>

        <motion.div 
          className={styles.filters}
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {filters.map((filter, index) => (
            <motion.button
              key={filter.key}
              className={`${styles.filterBtn} ${activeFilter === filter.key ? styles.active : ''}`}
              onClick={() => handleFilterClick(filter.key)}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.05 * index }}
            >
              <span className={styles.filterLabel}>{filter.label}</span>
              <span className={styles.filterCount}>({filter.count})</span>
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={activeFilter}
            className={styles.galleryGrid}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {filteredItems.slice(0, visibleItems).map((item, index) => (
              <motion.div 
                key={item.id} 
                className={styles.galleryItem}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 25,
                  duration: 0.2
                }}
              >
                <div className={styles.imageContainer}>
                  <img src={item.image} alt={item.title} loading="lazy" />
                  <motion.div 
                    className={styles.overlay}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <motion.div 
                      className={styles.overlayContent}
                      initial={{ y: 10, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                      <span className={styles.category}>
                        {filters.find(f => f.key === item.category)?.label}
                      </span>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {hasMoreItems && (
          <motion.div 
            className={styles.loadMore}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button 
              onClick={loadMore} 
              className={styles.loadMoreBtn}
              disabled={isLoading}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLoading ? (
                <span className={styles.loading}>
                  <span className={styles.spinner}></span>
                  Loading...
                </span>
              ) : (
                `Load More Photos (${filteredItems.length - visibleItems} remaining)`
              )}
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
