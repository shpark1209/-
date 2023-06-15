import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import styled, {css} from "styled-components";
import LoginAPI from "./api/LoginAPI";
let nameCheck=false;
let passwordCheck=false;
let phoneCheck=false;
let corPwCheck=false;
const CheckedWrapper=styled.div`
    display:none;
    width: 18px;
    height: 18px;
    justify-content: center;
    align-items: center;
    background-color: #36f;
    box-sizing:border-box;

    ${(props)=>props.isOn &&`
        display:block;
        border-radius:3px;
        padding-top:3px;
    `}
`
const Signup=()=>{
    let marketAgreement=0;
    const email=useSelector(state=>state.signupReducer.email);
    const dispatch=useDispatch();
    const nameReg=/^[가-힣]{2,4}$/;
    const passwordReg =  /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{1,}$/;
    const [name, setName]=useState("");
    const [phone, setPhone]=useState("");
    const [password, SetPassWord]=useState("");
    const [corPassword, SetCorPassWord]=useState("");
    const [active, setActive]=useState(true);
    const [style1, setStyle1]=useState(false);
    const [style2, setStyle2]=useState(false);
    const [style3, setStyle3]=useState(false);
    const [style4, setStyle4]=useState(false);
    const [style, setStyle]=useState(false);
    const [phoneNational, setNational]=useState("South Korea +82");
    const [all, setAll]=useState(false);
    const navigate=useNavigate();
    useEffect(()=>{
        if(style===true){
            setStyle(false);
            setStyle1(false);
            setStyle2(false);
            setStyle3(false);
            setStyle4(false); 
            
        }
        else{
            
            setStyle(true);
            setStyle1(true);
            setStyle2(true);
            setStyle3(true);
            setStyle4(true); 
            
        }
    }, [all])
    function checkButton(){
        console.log(nameCheck, passwordCheck, phoneCheck, corPwCheck, style1, style2, style3);
        if(nameCheck===true && passwordCheck===true && phoneCheck===true && corPwCheck===true&& style1===true && style2===true && style3===true){
            setActive(false);
        }
        else{
            setActive(true);
        }
    }
    
    useEffect(()=>{
        nameCheck=nameReg.test(name);
    }, [name]);
    useEffect(()=>{
        if(phone.length===11){
            phoneCheck=true;
        }
    },[phone]);
    useEffect(()=>{
        passwordCheck=passwordReg.test(password);
        if(corPassword !== ""){
            if(corPassword === password){
                corPwCheck=true;
            }
        }
    },[password]);
    useEffect(()=>{
        if(corPassword !== ""){
            if(corPassword === password){
                corPwCheck=true;
            }
        }
    }, [corPassword])

    return(
        <div className="next">
            <div className="next-wrapper">
                <div className="signup-container">
                    <div className="signup-wrapper">
                        <div className="signup-header">
                            <div className="signup-left">
                                <button className="signup-cancel">
                                    <p className="signup-cancel-label" onClick={()=>{navigate("/login")}}>취소</p>
                                </button>
                            </div>
                            <div className="signup-middle">
                                <p className="signup-middle-label">회원가입</p>
                            </div>
                            <div className="signup-right"></div>
                        </div>
                        <div className="signup-condition">
                            <form>
                                <div className="box-wrapper">
                                    <label className="box-label" for="email">이메일</label>
                                </div>
                                <input className="box" name="email" disabled value={email}></input>
                                <div className="box-wrapper">
                                    <label className="box-label" for="name">이름</label>
                                </div>
                                <input className="box" name="name"  placeholder="이름을 입력해주세요" onChange={(e)=>{setName(e.target.value);checkButton();}}></input>
                                <div className="box-wrapper">
                                    <label className="box-label" for="mobile">휴대폰 번호</label>
                                </div>
                                <div>
                                    <div className="country-select-wrapper">
                                        <select className="country-select" onChange={(e)=>{setNational(e.target.value)}}>
                                            <option>South Korea +82</option>
                                            <option>Japan +81</option>
                                            <option>Taiwan +886</option>
                                            <option>Hong Kong +852</option>
                                            <option>Singapore +65</option>
                                            <option>Afghanistan +93</option>
                                            <option>Albania +355</option>
                                            <option>Algeria +213</option>
                                            <option>Angola +244</option>
                                            <option>Argentina +54</option>
                                            <option>South Korea +82</option>
                                            <option>Japan +81</option>
                                            <option>Taiwan +886</option>
                                            <option>Hong Kong +852</option>
                                            <option>Singapore +65</option>
                                            <option>Afghanistan +93</option>
                                            <option>Albania +355</option>
                                            <option>Algeria +213</option>
                                            <option>Angola +244</option>
                                            <option>Argentina +54</option>
                                        </select>
                                    </div>
                                    <div className="phone-number-wrapper">
                                        <input placeholder="(예시) 01013245768" name="mobile" className="phone-number-input" onChange={(e)=>{setPhone(e.target.value);checkButton();}}></input>
                                        <button type="button" className="phone-number-request" disabled>인증번호 받기</button>
                                    </div>
                                    <div className="phone-number-wrapper">
                                        <input className="phone-number-check" placeholder="인증번호를 입력해주세요." disabled></input>
                                    </div>
                                </div>
                                <div className="box-wrapper">
                                    <label className="box-label" for="password">비밀번호</label>
                                </div>
                                <input className="box" name="password" type="password" placeholder="비밀번호를 입력해주세요." onChange={(e)=>{SetPassWord(e.target.value);checkButton();}}></input>
                                <input className="box" name="passwordConfirm" type={"password"} placeholder="비밀번호를 다시 한번 입력해주세요." onChange={(e)=>{SetCorPassWord(e.target.value);checkButton();}}></input>
                                <p className="password-confirm-label">
                                    영문 대소문자, 숫자, 특수문자를 3가지 이상으로 조합해 8자 이상 16자 이하로 입력해주세요.
                                </p>
                                <div className="all-confirm">
                                    <div className="checkbox">
                                        <CheckedWrapper isOn={style}> 
                                            <span className="svg-icon">
                                                    <svg viewBox="0 0 12 8" className="css-1h47l4s"><path d="M1.5 4L4.5 7L10.5 1" stroke="var(--theme-palette-colors-common-white)" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                                </span>
                                        </CheckedWrapper>
                                        
                                    </div>
                                    <input className="confirm-check" type={"checkbox"} name="is-all-confirm" onClick={()=>{all===true ? setAll(false):setAll(true);checkButton();}}></input>
                                    <div className="checkbox-text-wrapper">
                                        <p className="checkbox-text">전체 동의</p>
                                    </div>
                                </div>
                                <hr className="signup-divider"></hr>
                                <div className="confirm-checkbox-wrapper">
                                    <div className="checkbox">
                                    <CheckedWrapper isOn={style1}> 
                                        <span className="svg-icon">
                                                <svg viewBox="0 0 12 8" className="css-1h47l4s"><path d="M1.5 4L4.5 7L10.5 1" stroke="var(--theme-palette-colors-common-white)" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                            </span>
                                    </CheckedWrapper>
                                        
                                    </div>
                                    <input className="confirm-check" type={"checkbox"} name="is-above-14" onClick={()=>{style1===true ? setStyle1(false) : setStyle1(true);}}></input>
                                    
                                    <div className="checkbox-text-wrapper" >
                                        <p className="checkbox-text">만 14세 이상입니다 (필수)</p>
                                    </div>
                                </div>
                                
                                <div className="confirm-checkbox-wrapper">
                                    <div className="checkbox">
                                        <CheckedWrapper isOn={style2}> 
                                            <span className="svg-icon">
                                                    <svg viewBox="0 0 12 8" className="css-1h47l4s"><path d="M1.5 4L4.5 7L10.5 1" stroke="var(--theme-palette-colors-common-white)" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                                </span>
                                        </CheckedWrapper>
                                        
                                    </div>
                                    <input className="confirm-check" type={"checkbox"} name="is-terms"  onClick={()=>{style2===true ? setStyle2(false) : setStyle2(true)}}></input>
                                    <div className="checkbox-text-wrapper">
                                        <p className="checkbox-text">원티드 이용약관 동의 (필수)</p>
                                    </div>
                                    <Link className="confirm-detail">
                                        자세히
                                    </Link>
                                </div>
                                <div className="confirm-checkbox-wrapper">
                                    <div className="checkbox">
                                        <CheckedWrapper isOn={style3}> 
                                            <span className="svg-icon">
                                                    <svg viewBox="0 0 12 8" className="css-1h47l4s"><path d="M1.5 4L4.5 7L10.5 1" stroke="var(--theme-palette-colors-common-white)" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                                </span>
                                        </CheckedWrapper>
                                        
                                    </div>
                                    <input className="confirm-check" type={"checkbox"} name="is-collect-info" onClick={()=>{style3===true ? setStyle3(false) : setStyle3(true)}}></input>
                                    <div className="checkbox-text-wrapper">
                                        <p className="checkbox-text">원티드 개인정보 수집 및 이용 동의 (필수)</p>
                                    </div>
                                    <Link className="confirm-detail">
                                        자세히
                                    </Link>
                                </div>
                                <div className="confirm-checkbox-wrapper">
                                    <div className="checkbox">
                                        <CheckedWrapper isOn={style4}> 
                                            <span className="svg-icon">
                                                    <svg viewBox="0 0 12 8" className="css-1h47l4s"><path d="M1.5 4L4.5 7L10.5 1" stroke="var(--theme-palette-colors-common-white)" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                                </span>
                                        </CheckedWrapper>
                                        
                                    </div>
                                    <input className="confirm-check" type={"checkbox"} name="is-accept-all-event" onClick={()=>{style4===true ? setStyle4(false) : setStyle4(true)}}></input>
                                    <div className="checkbox-text-wrapper">
                                        <p className="checkbox-text">채용 소식, 커리어 콘텐츠, 이벤트 등 원티드 맞춤 정보 받기</p>
                                    </div>
                                </div>
                                <div className="event-wrapper">
                                    <label className="event">
                                        <input name="accept-email"></input>
                                        <span className="svg-icon">
                                            <svg viewBox="0 0 12 8" className="css-1h47l4s"><path d="M1.5 4L4.5 7L10.5 1" stroke="var(--theme-palette-colors-gray-300)" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                        </span>
                                        <p className="check-label">이메일</p>
                                    </label>
                                    <label className="event">
                                        <input name="accept-app"></input>
                                        <span className="svg-icon">
                                            <svg viewBox="0 0 12 8" className="css-1h47l4s"><path d="M1.5 4L4.5 7L10.5 1" stroke="var(--theme-palette-colors-gray-300)" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                        </span>
                                        <p className="check-label">앱 푸시</p>
                                    </label>
                                    <label className="event">
                                        <input name="accept-msg"></input>
                                        <span className="svg-icon">
                                            <svg viewBox="0 0 12 8" className="css-1h47l4s"><path d="M1.5 4L4.5 7L10.5 1" stroke="var(--theme-palette-colors-gray-300)" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                        </span>
                                        <p className="check-label">문자 메시지</p>
                                    </label>
                                </div>
                                <div className="submit-button-wrapper">
                                    <button className="submit-button" type="button" disabled={active} onClick={()=>{console.log(phoneNational); dispatch({type:'SETREST', password:password, phone:phone, name:name, phoneNational:phoneNational,marketAgreement:marketAgreement});navigate("/users");}}>
                                        <span className="submit-label">가입하기</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Signup