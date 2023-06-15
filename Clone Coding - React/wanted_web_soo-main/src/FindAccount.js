import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const FindAccount=()=>{
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [phone, setPhone]=useState("");
    const [phoneNational, setNational]=useState("South Korea +82");
    const [active, setActive]=useState(true);
    const [data, setData]=useState(null);
    const phoneReg= /^01[0|1|6|7|8|9]-?([0-9]{3,4})-?([0-9]{4})$/;
    let userAcc;
    useEffect(()=>{
        if(phoneReg.test(phone)){
            setActive(false);
        }
    },[phone])
    useEffect(()=>{
        let url=`https://prod.wanted-a.online/users`;
        const checkAccount= async()=>{
            try{
                    const data = await axios({
                        method:"get",
                        url:url,
                        headers:{'Content-Type' : 'application/json'},
                    });
                    setData(data.data.result);
                    console.log(data.data.result)
                }catch(err){
                    console.log(err)
                }
            }
            let url2=`https://prod.wanted-a.online/users/logIn`;
            const checkPassword= async()=>{
            try{
                    const data = await axios({
                        method:"post",
                        url:url2,
                        headers:{'Content-Type' : 'application/json'},
                        data:{
                            "email":userAcc.email,
                            "password": userAcc.password
                        }
                    });
                    dispatch({type:'SET', email:userAcc.email});
                    dispatch({type:'SETREST', password:userAcc.password, phone:userAcc.phoneNumber, name:userAcc.name, phoneNational:userAcc.phoneNational,marketAgreement:userAcc.marketAgreement})
                    dispatch({type:'FETCH', jwt:data.data.jwt, index:data.data.id});
                    
                    console.log(data)
                }catch(err){
                    console.log(err)
                }
            }
            if(active===false){
                checkAccount();
                
                if(data!==null){
                    userAcc=data.find((item)=>(item.phoneNumber === phone && item.phoneNational === phoneNational));
                    console.log(userAcc);
                    checkPassword();}

            }
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
                                    비밀번호 재설정
                                </p>
                            </div>
                            <div className="password-right"></div>
                        </div>
                        <div className="check-password-content">
                            <form>
                                <div className="box-wrapper">
                                    <label className="box-label" for="checkPassword">휴대폰 번호</label>
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
                                        <input placeholder="(예시) 01013245768" name="mobile" className="phone-number-input" onChange={(e)=>{setPhone(e.target.value);}}></input>
                                        <button type="button" className="phone-number-request" disabled>인증번호 받기</button>
                                    </div>
                                    <div className="phone-number-wrapper">
                                        <input className="phone-number-check" placeholder="인증번호를 입력해주세요." disabled></input>
                                    </div>
                                </div>
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
export default FindAccount