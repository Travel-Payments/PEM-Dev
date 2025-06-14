"use client";
import styles from '../../public/styles/dashboard.module.css';
import { Poppins } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import Loader from './loader';
import { useState } from 'react';

const poppins = Poppins({
    subsets: ['latin'],
    weight: '500'
});
export default function DashboardItemBox({title,path}:{title: string, path: string}) {
    // This component represents a box in the dashboard with a title and a path.
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = useState(false);

    return (
        <>
        <div className={`${styles.dashboardContainer} ${poppins.className}`} onClick={()=>{
            setLoading(true); // Update the next path state
            router.push(`${pathname}/${path}`); // Navigate to the specified path when the box is clicked
        }} >
           <p className={styles.dashboardItem} > {title} </p>
        </div>
        {loading && <Loader/>} {/* Loader component to show loading state when navigating */}
        </>
    );
}