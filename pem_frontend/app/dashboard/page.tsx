import {redirect} from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import styles from '../../public/styles/dashboard.module.css';
import { Poppins } from 'next/font/google';
import DashboardItemBox from '../components/dashboardItemBox';

const poppins = Poppins({
    subsets: ['latin'],
    weight: '500'
});
export default async function Dashboard() {
    const session = await getServerSession(authOptions);
    if(!session || !session.user){
        console.log("Session not found or user not authenticated. Redirecting to sign-in page.");
        redirect('/');
    }
    // else if(session.user && session.user.email && !(session.user.email.endsWith("@travelandpayments.com"))){
    //     console.log("You are not authorized to access this page. Please contact your administrator.");
    //     redirect('/error');
    // }
    const userEmail = session.user.email;
    const res = await fetch(`http://localhost:5000/users?email=${userEmail}`,{
        cache: 'no-store',
    });
    const data = await res.json();
    // Check if the data is valid and contains the expected structure
    // If the data is not valid, redirect to an error page
    if (!data || data.error){
        console.log("User data not found or an error occurred. Redirecting to error page.");
        redirect('/userNotFound');
    }
    const isAdmin = data.role==="admin";
    return (
        <div className={`${poppins.className} ${styles.dashboardContainer}`}>
            <h1 className={styles.dashboardHeader}>My Dashboard</h1>
            <DashboardItemBox title="Timesheet" path="taskForm"/>
            {
                isAdmin?(
                    <>
                    <DashboardItemBox title="View Users" path="viewUsers"/>
                    <DashboardItemBox title="Edit User" path="editUser"/>
                    </>
                ):
                (
                    <></>
                )
            }
        </div>
    );
}