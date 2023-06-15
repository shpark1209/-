import React, { useEffect } from "react"
import "./password.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
const Password=()=>{
    const [password, setPassWord]=useState("");
    const [active, setActive]=useState(true);
    const [isTrue, setIsTrue]=useState(false);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const email = useSelector(state=>state.signupReducer.email);
    console.log(email)
    useEffect(()=>{
        if(password.length>0)setActive(false);
    },[password])
    useEffect(()=>{
        let url=`https://prod.wanted-a.online/users/logIn`;
        const checkPassword= async()=>{
            try{
                    const data = await axios({
                        method:"post",
                        url:url,
                        headers:{'Content-Type' : 'application/json'},
                        data:{
                            "email":email,
                            "password": password
                        }
                    });
                    setIsTrue(data.data.isSuccess);
                    dispatch({type:'FETCH', jwt:data.data.jwt, index:data.data.id})
                    console.log(data)
                }catch(err){
                    console.log(err)
                }
            }
        checkPassword();
    })
    return(
        <div className="next">
            <div className="next-wrapper">
                <div className="check-password-container">
                    <div className="check-password-wrapper">
                        <div className="check-password-header">
                            <div className="password-left">
                                <button className="back-button" type="button" onClick={()=>navigate("/login")}>
                                    <span className="svg-icon">
                                        <svg viewBox="0 0 18 18" className="css-ckhhlt"><path d="m6.045 9 5.978-5.977a.563.563 0 1 0-.796-.796L4.852 8.602a.562.562 0 0 0 0 .796l6.375 6.375a.563.563 0 0 0 .796-.796L6.045 9z"></path></svg>
                                    </span>
                                </button>
                            </div>
                            <div className="password-title-wrapper">
                                <p className="password-title">
                                    이메일로 로그인
                                </p>
                            </div>
                            <div className="password-right"></div>
                        </div>
                        <div className="check-password-content">
                            <form>
                                <div className="box-wrapper">
                                    <label className="box-label" for="checkPassword">비밀번호</label>
                                </div>
                                <input className="box" name="checkPassword" type="password" placeholder="비밀번호를 입력해주세요." onChange={(e)=>{setPassWord(e.target.value);}}></input>
                                <div className="submit-button-wrapper">
                                    <button className="submit-button" type="button" disabled={active} onClick={()=>{isTrue ? navigate("/"):alert("비밀번호가 틀렸습니다")}}>
                                        <span className="submit-label">다음</span>
                                    </button>
                                </div>
                                <button className="password-reset" onClick={()=>navigate("/checkPw")}>
                                    <span className="password-reset-label">비밀번호 초기화/변경</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Password