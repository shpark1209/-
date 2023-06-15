import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Main from "../Main";
import { redirect } from "react-router-dom";
const LoginAPI =()=>{
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const url=`https://prod.wanted-a.online/users`;
    const name=useSelector(state=>state.signupReducer.name);
    const email=useSelector(state=>state.signupReducer.email);
    const phone=useSelector(state=>state.signupReducer.phone);
    const phoneNational=useSelector(state=>state.signupReducer.phoneNational);
    const password=useSelector(state=>state.signupReducer.password);
    const marketAgreement = useSelector(state=>state.signupReducer.marketAgreement);
    const [move, setMove]=useState(false);

    let result=undefined;
    useEffect(()=>{
        console.log(name, email, phone, phoneNational, password, marketAgreement)
        const Signup= async()=>{
            try{
                const data = await axios({
                    method:"post",
                    url: url,
                    headers:{'Content-Type' : 'application/json'},
                    data:{
                        "name":name,
                        "email":email,
                        "phoneNumber":phone,
                        "phoneNational":phoneNational,
                        "password":password,
                        "marketingAgreement":marketAgreement
                    }
                });
                console.log(data.data);
                result = data.data.result;
                console.log(data.data.result, data.data.result.jwt, data.data.result.userIdx);
                dispatch({type:"SIGNUP"});
                dispatch({type:"FETCH", jwt:data.data.result.jwt, index:data.data.result.userIdx});
                navigate("/", {state:{result}});

            }catch(err){
                console.log(err);
            }
        }
        Signup();
    })
    
}
export default LoginAPI