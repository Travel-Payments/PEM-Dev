import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function ProtectedRoute(){
    const session = await getServerSession(authOptions);
    if(!session || !session.user){
        console.log("You are not authorized to access this page. Please contact your administrator.");
        redirect('/api/auth/signin');
    }
    else if(session.user && session.user.email && !(session.user.email.endsWith("@travelandpayments.com"))){
        console.log("You are not authorized to access this page. Please contact your administrator.");
        redirect('/error');
    }
    else{
        redirect('/dashboard');
    }
    return (
        <></>
    );
}