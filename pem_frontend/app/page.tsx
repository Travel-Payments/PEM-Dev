"use client";
import styles from "../public/styles/comp.module.css";
import logo from "../public/images/logoBlack.svg";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { Poppins } from "next/font/google";
import DashboardBar from "./components/dashboardBar";

const poppins = Poppins({
  subsets: ['latin'],
  weight: '500'
});

export default function Page() {
  const {data:session,status} = useSession();
  return(
    <div className = {styles.homeDiv}>
      <Image src={logo} alt="Travel and Payments" className={styles.tnplogo} 
        priority/>
        {
          status === "loading" ?(
            <>
            <p> Page loading, please wait</p>
            </>
          ):
          status === "unauthenticated" ?(
            <>
            <p> Welcome to Payment Expert Marketplace!</p>
            <button type='button' className = {`${styles.signIn} ${poppins.className}` } onClick={() => signIn()}> Sign In</button>
            </>
          ):
          status === "authenticated" ?(
            <>
            <DashboardBar/>
            <p> Welcome {session?.user?.name}, to Payment Expert Marketplace!</p>
            <button type='button' className = {`${styles.signIn} ${poppins.className}` } onClick={() => signOut()}> Sign Out</button>
            </>
          ):
          (
            <>
            <p> Error: {status}</p>
            </>
          )
        }
    </div>
  );
}