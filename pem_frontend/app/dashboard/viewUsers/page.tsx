"use client";
import { Poppins } from "next/font/google";
import { useState } from "react";
import { useEffect } from "react";
import styles from '../../../public/styles/user.module.css';
import Loader from "@/app/components/loader";
import UserData from "@/app/components/userData";

type User = {
    id: number,
    email:string,
    name:string,
    role:string
}
const poppins = Poppins({
    subsets: ['latin'],
    weight: '500'
});

export default function ViewUsers(){
    const [users, setUsers] = useState<User[]>([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(()=>{
        const fetchUsers = async () => {
            const res = await fetch('http://localhost:5000/allUsers',{
                cache: 'no-store',
            });
            const data = await res.json();
            if(!data || data.error){
                console.log("Error fetching users or no users found.");
                setIsError(true);
            }
            else{
                setUsers(data);
                setIsError(false);
            }
            setIsLoading(false);
        }
        fetchUsers();
        
    },[]);
    return (
        <>
        {
            isLoading? (
                <Loader/>
            ):(
                <>
        {
            isError?(
                <h1> Error in Fetching data, Please try later</h1>
            ):(
               <>
               {
                  users.length == 0 ? (
                    <h1> No Users found</h1>
                  ):(
                    <div className={`${poppins.className} ${styles.dataDiv}`}>
                            <h1 className={styles.dataDivHeader}>User IDs</h1>

                        {
                            users.map((user,index)=>{
                                return(
                                        <UserData userId={user.email.split('@')[0]} key={index} />
                                )
                            })
                        }

                    </div>
                  )
               }
               </>

            )
        }
                </>
            )
        }
        </>
    );
}