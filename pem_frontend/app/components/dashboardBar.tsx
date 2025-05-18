import Link from "next/link";
import styles from "../../public/styles/dashboard.module.css";
import { Poppins } from "next/font/google";
const poppins = Poppins({
    subsets: ['latin'],
    weight: '500'
});
export default function DashboardBar(){
    return(
        <div className={`${styles.dashboardBar} ${poppins.className}`}>
            <Link href="/protected" >Go to Dashboard</Link>
        </div>
    )
}