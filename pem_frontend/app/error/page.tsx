import styles from './error.module.css';
import { Poppins } from "next/font/google";
const poppins = Poppins({
    subsets: ['latin'],
    weight: '500'
});

export default function ErrorPage() {
    return (
        <div className={`${styles.errorPage} ${poppins.className}`}>
            <h1>403</h1>
            <p>You are not authorized to access this page!</p>
        </div>
    );
}