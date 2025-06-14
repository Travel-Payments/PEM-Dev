'use client';
// import { usePathname } from 'next/navigation';
import styles from '../../public/styles/loader.module.css'
// import { useEffect, useState } from 'react';

export default function Loader() {
  return (
    // This component displays a loading spinner when the page is loading.
    // It uses a CSS animation to create a spinning effect.
      <div className={`${styles.loadbox} flex items-center justify-center h-screen`}>
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
  );
}