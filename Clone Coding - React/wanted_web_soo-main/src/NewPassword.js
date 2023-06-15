import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import "./password.css"
let test=false;
const NewPassword=()=>{
    const [password, setPassWord]=useState("");
    const [checkPassword, setCheckPw]=useState("");
    const [active, setActive]=useState(true);
    const [isTrue, setIsTrue]=useState(false);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const passwordReg =  /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{1,}$/;
    const token = useSelector(state=>state.tokenReducer.jwt);
    const id=useSelector(state=>state.tokenReducer.userIdx);
    const oldpassword=useSelector(state=>state.signupReducer.password);
    useEffect(()=>{
        test=passwordReg.test(password);
        console.log(test, password, checkPassword);
        if(test===true && password.length!==0 && password===checkPassword){
            setActive(false);
        }
    }, [password])
    useEffect(()=>{
        test=passwordReg.test(password);
        console.log(test, password, checkPassword, password===checkPassword);
        if(test===true && checkPassword.length!==0 && password===checkPassword){
            setActive(false);
        }
    }, [checkPassword])
    useEffect(()=>{
        let url=`https://prod.wanted-a.online//users/${id}/password`;
        const checkPassword= async()=>{
            try{
                    const data = await axios({
                        method:"patch",
                        url:url,
                        headers:{'Content-Type' : 'application/json', 'Authorization': `Bearer${token}`},
                        data:{
                            "id":id,
                            "oldpassword": oldpassword,
                            "newpassword": password
                        }
                    });
                    dispatch({type:'PATCH', password:password})
                    console.log(data)
                }catch(err){
                    console.log(err)
                }
            }
            if(active===false){
                checkPassword();
            }
        
    })
    return(
        <div className="next">
            <div className="next-wrapper">
                <div className="check-password-container">
                    <div className="check-password-wrapper">
                        <div className="check-password-header">
                            <div className="password-left">
                                <button className="back-button" type="button" onClick={()=>navigate("/password")}>
                                    <span className="svg-icon">
                                        <svg viewBox="0 0 18 18" className="css-ckhhlt"><path d="m6.045 9 5.978-5.977a.563.563 0 1 0-.796-.796L4.852 8.602a.562.562 0 0 0 0 .796l6.375 6.375a.563.563 0 0 0 .796-.796L6.045 9z"></path></svg>
                                    </span>
                                </button>
                            </div>
                            <div className="password-title-wrapper">
                                <p className="password-title">
                                    비밀번호 재설정
                                </p>
                            </div>
                            <div className="password-right"></div>
                        </div>
                        <div className="check-password-content">
                            <form>
                                <div className="box-wrapper">
                                    <label className="box-label" for="checkPassword">새 비밀번호</label>
                                </div>
                                <input className="box" name="checkPassword" type="password" placeholder="새 비밀번호를 입력해주세요." onChange={(e)=>{setPassWord(e.target.value);}}></input>
                                <input className="box" name="checkPassword" type="password" placeholder="새 비밀번호를 다시 한번 입력해주세요." onChange={(e)=>{setCheckPw(e.target.value);}}></input>
                                <p className='password-condition'>영문 대소문자, 숫자, 특수문자를 3가지 이상으로 조합해 8자 이상 16자 이하로 입력해주세요.</p>
                                <div className="submit-button-wrapper">
                                    <button className="submit-button" type="button" disabled={active} onClick={()=>{navigate("/")}}>
                                        <span className="submit-label">계속</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default NewPassword