import styles from '../error/error.module.css';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
    subsets: ['latin'],
    weight: '500'
})

export default function UserNotFound(){
    return(
        <div className={`${styles.errorPage} ${poppins.className}`}>
            <h1>404</h1>
            <p>The user you are looking for does not exist. Please contact the administrator</p>
        </div>
    )
}