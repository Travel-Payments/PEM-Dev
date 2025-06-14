"use client";
import style from './edit.module.css';
import { Poppins } from 'next/font/google';
import { useState } from 'react';
import Loader from '@/app/components/loader';
import StatusModal from '@/app/components/statusModal';

const poppins = Poppins({
    subsets: ['latin'],
    weight: '500'
});

export default function EditUser(){
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [role,setRole] = useState("user");
    const [formStatus,setFormStatus] = useState<string | null>("Hello, Please fill the form to add or delete a user");
    const [isLoading,setIsLoading] = useState(false);
    const [btVal,setBtVal] = useState("");
    const [showFormStatus,setShowFormStatus] = useState(false);

    const handleSumit = (e : React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        setIsLoading(true);
        if(!name || !email || !role){
            setFormStatus("Please fill all the fields");
            return;
        }
        if(name==="" || email==="" || role===""){
            setFormStatus("Please enter valid values");  
            return;
        }
        if(!(email.endsWith("@travelandpayments.com"))){
            setFormStatus("Email must belong to Travel and Payments organization");
            return;
        }
        console.log("Form submitted with values:", {name, email, role});
        console.log("Button clicked:", btVal);
        setFormStatus("Form submitted");
        if(btVal === "Delete"){
            deleteUser();
        }
        else if(btVal === "Add"){
            addUser();
        }
        setShowFormStatus(true);
        // Hide the form status message after 3 seconds
        setTimeout(()=>{
            setShowFormStatus(false);
        }, 8000);
        // Reset form fields after submission
        resetForm();
    }
    const addUser = async () =>{
        try{
            const res = await fetch('http://localhost:5000/addUser',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "name": name,
                    "email": email,
                    "role": role
                }),  
            });
            const data = await res.json();
            if(!data || data.error){
                setFormStatus(data.error);
                console.log("Error in adding user:", data.error);
            } 
            else{
                setFormStatus(data.message || "User added successfully");
                console.log("User added successfully:", data);
            }
        }
        catch(error){
            setFormStatus(error instanceof Error ? error.message : "An unexpected error occurred");
            console.log("Error in adding user:", error);
        }
        setIsLoading(false);
    }

    const deleteUser = async() =>{
        try{
            const res =  await fetch('http://localhost:5000/deleteUser',{
                method: 'DELETE',
                headers:{
                    'content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "email": email,
                }),
            });
            const data = await res.json();
            if(!data || data.error){
                setFormStatus("Error in deleting user, Please try later");
                console.log("Error in deleting user:", data.error);
            }
            else{
                setFormStatus(data.message || "User deleted successfully");
                console.log("User deleted successfully:", data);
            }
        }
        catch(error){
            setFormStatus(error instanceof Error ? error.message : "An unexpected error occurred");
            console.log("Error in deleting user:", error);
        }
        setIsLoading(false);
    }

    const resetForm = () =>{
        setName("");
        setEmail("");
        setRole("user");
        setBtVal("");
        setFormStatus(null);
    }
    return(
        <>
        {isLoading && <Loader/>}
        {showFormStatus && formStatus!=null && <StatusModal message={formStatus} />}
        {/* <StatusModal message={formStatus} /> */}
        <form className={`${poppins.className} ${style.formDiv}`} onSubmit={handleSumit} >
            <h1> Edit User </h1>
            <div className={`${style.inputDiv}`}>
                <div>
                    <label htmlFor="text">Name</label>
                    <input type="text" placeholder="Type here.." 
                       value={name} onChange={(e)=>setName(e.target.value)}  required/>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder="Type here.."
                      value={email} onChange={(e)=>setEmail(e.target.value)}  required/>
                </div>
                <div>
                    <label htmlFor="role-select">Role:</label>
                    <select id="role-select" name="role" defaultValue={"user"}
                        onChange={(e)=>setRole(e.target.value)} required>
                        <option value="admin">admin</option>
                        <option value="user">user</option>
                    </select>
                </div>
            </div>
            <div className={`${style.submitDiv}`}>
                <div><button type="submit" className={style.add} onClick={()=>setBtVal("Add")} >Add</button> </div>
                <div><button type="submit" className={style.delete} onClick={()=>setBtVal("Delete")} >Delete</button></div>
            </div>
        </form>
        </>
    )
}