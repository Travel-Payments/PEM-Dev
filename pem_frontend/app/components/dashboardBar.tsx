"use client";
import Link from "next/link";
import styles from "../../public/styles/dashboard.module.css";
import { Poppins } from "next/font/google";
import Loader from "./loader";
import { useState } from "react";

const poppins = Poppins({
    subsets: ['latin'],
    weight: '500'
});
export default function DashboardBar(){
    const [isLoading, setIsLoading] = useState(false);
    return(
        <>
        <div className={`${styles.dashboardBar} ${poppins.className}`}>
            <Link href="/dashboard" onClick={()=>setIsLoading(true)} >Go to Dashboard</Link>
        </div>
       { isLoading && <Loader/>}
        </>
    )
}