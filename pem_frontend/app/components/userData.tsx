"use client";
import styles from '../../public/styles/user.module.css';
import { Poppins } from 'next/font/google';
const poppins = Poppins({
    subsets: ['latin'],
    weight: '500'
});
export default function UserData({userId}:{userId: string}){
    return (
        <>
        <div className={`${poppins.className} ${styles.userDataDiv}`}>
        <div className={styles.userIcon}>
            <p className= "w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-full font-bold"> {userId.charAt(0).toUpperCase().slice(0, 1)}</p>
        </div>
        <div className={styles.userId}>
           <p> {userId} </p>
        </div>
        </div>
        </>
    )
}