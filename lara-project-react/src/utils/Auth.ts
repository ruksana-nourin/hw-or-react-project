import { redirect } from "react-router";
import { api } from "../api";

export const needAuth = async ()=>{
    const token = await checkAuth();
    if(token){
        // alert("You have a token")
        return true;
    }else{
        // alert("no token")
        throw redirect('/access-denied');
    }
}
export const notAuth = async ()=>{
    const token = await checkAuth();
    if(!token){
        // alert("You have a token")
        return true;
    }else{
        // alert("no token")
        throw redirect('/users');
    }

}
const checkAuth = ()=>{
    // return localStorage.getItem('lara_token');
    return api.post('check-token')
    .then(res=>{
        console.log(res);
        if(res.status == 401){
        return false;


        }else if(res.status==200){
            return true;

        }
    })
    .catch(err=>{
        return false;
    })

}
