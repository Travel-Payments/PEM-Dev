"use client";
import styles from  '../../public/styles/statusModal.module.css';
export default function statusModal({message}: {message: string | null}) {
    return(
        <div className={styles.statusBox} >
            <p>{message}</p>
        </div>
    )
}