import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Login from "../Login";
import MenuCategoryItem from "./MenuCategoryItem";
import SubMenuItem from "./SubMenuItem";
import styled,{css} from "styled-components";
import { useDispatch, useSelector } from "react-redux";



const Header =()=>{
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [menubar, setMenubar]=useState("close");
    const [submenu, setSubMenu]=useState("close");
    const succeed=useSelector(state=>state.tokenReducer.jwt);
    const [menuTag, setMenuTag]=useState("");
    const [popUp, setpopUp]=useState("");
    console.log(succeed);
    const name = useSelector(state=>state.signupReducer.name);
    return(
        <div className="navbar-header">
            <div className="navbar-wrapper isLoggedin">
                <nav className="navbar-main">
                    <div className="navbar-logo-wrapper" >
                        <div className="navbar-logo">
                            <div>
                                <button className="navbar-logo-list" onMouseOver={()=>setMenubar("open")} >
                                    <img src="https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Ficon-menu.png&w=17&q=75" className="navbar-logo-list-image"></img>
                                </button>
                                <Link to={"/"}>
                                    <svg width="74" height="21" viewBox="0 0 140 32">
                                        <path fill="currentColor" d="M89.8 2.2l-5.6 2.4v4.8h-3.8v5.2h3.8v10.2c0 4.2 2.6 7 6.6 7 1.6 0 2.6-.4 3.2-.6V26c-.2 0-1 .2-1.8.2-1.6 0-2.4-.6-2.4-2.6v-8.8H94V9.6h-4.2V2.2zM28.6 9.6l-4 14-4.6-14h-5.6l-4.6 14L6 9.6H0l6.8 21.8h6l4.4-14.6 4.6 14.6h6l6.8-21.8zM134.4 2.2v8.6c-1.4-1-3-1.6-4.8-1.8h-.4-1.6c-5 .4-8.2 4.2-9.2 9-.2.8-.2 1.4-.2 2.2V22c.6 5.6 4.4 10 10.2 10 2.4 0 4.4-.6 6-1.8v1.4h5.4V0l-5.4 2.2zm-5.2 24.4c-3 0-5.6-2.4-5.6-6.2 0-4 2.6-6.2 5.6-6.2s5.2 2.2 5.2 6c0 4.2-2.2 6.4-5.2 6.4zM116.2 18c-.8-5.2-4.6-9-10-9s-9.2 3.8-10 9c-.2.8-.2 1.6-.2 2.6v1.6c.6 5.6 4.4 10 10.2 10 4.6 0 8-2.8 9.4-6.8l-5-1.2c-.8 1.8-2.4 3.2-4.4 3.2-2.8 0-4.6-2.2-5-5.2h15.2v-1.6c0-1 0-1.8-.2-2.6zm-14.8 0c.8-2.2 2.4-3.6 4.8-3.6s4 1.6 4.8 3.6h-9.6zM50.6 11c-1.4-1-3.2-1.8-5.2-1.8H44.8h-.6c-5.2.4-8.6 4-9.4 9-.2.8-.2 1.4-.2 2.2v1.8c.6 5.6 4.4 10 10.2 10 2.4 0 4.4-.6 6-1.8v1.4h5.6V9.6h-5.6V11zm-5.2 15.6c-3 0-5.6-2.4-5.6-6.2 0-4 2.6-6.2 5.6-6.2s5.2 2.2 5.2 6c0 4.2-2.2 6.4-5.2 6.4zM71.2 9c-2.2 0-4.6 1-6 3.2V9.6h-5.6v21.8h5.6V18.8c0-2.6 1.4-4.6 4-4.6 2.8 0 3.8 2 3.8 4.4v12.8h5.6V17.6c.2-4.8-2.2-8.6-7.4-8.6z"></path>
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <ul className="navbar-list">
                        <li className="navbar-list-item">
                            <Link>
                                채용
                            </Link>
                        </li>
                        <li className="navbar-list-item">
                            <Link to={"/event"}>
                                이벤트
                            </Link>
                        </li>
                        <li className="navbar-list-item">
                            <Link>
                                직군별 연봉
                            </Link>
                        </li>
                        <li className="navbar-list-item">
                            <Link>
                                이력서
                            </Link>
                        </li>
                        <li className="navbar-list-item">
                            <Link>
                                커뮤니티
                            </Link>
                        </li>
                        <li className="navbar-list-item">
                            <Link>
                                프리랜서
                            </Link>
                        </li>
                        <li className="navbar-list-item">
                            <Link>
                                AI 합격예측
                            </Link>
                        </li>
                    </ul>
                    <aside className="navbar-aside isLoggedin">
                        <ul>
                            <li className="navbar-search-wrapper">
                                <button className="navbar-search-button">
                                    <svg xmlns="https://www.w3.org/2000/svg" xmlnsXlink="https://www.w3.org/1999/xlink" width="18" height="18" viewBox="0 0 18 18">
                                        <defs>
                                            <path id="qt2dnsql4a" d="M15.727 17.273a.563.563 0 10.796-.796l-4.875-4.875-.19-.165a.563.563 0 00-.764.028 5.063 5.063 0 111.261-2.068.562.562 0 101.073.338 6.188 6.188 0 10-1.943 2.894l4.642 4.644z"></path>
                                        </defs>
                                        <g fill="none" fillRule="evenodd">
                                            <use fill="#333" fillRule="nonzero" stroke="#333" strokeWidth=".3" xlinkHref="#qt2dnsql4a"></use>
                                        </g>
                                    </svg>
                                </button>
                            </li>
                            {succeed==="" && <li className="login-button-wrapper">
                                <button className="loginSignup-button" onClick={()=>{navigate("/login");}}>
                                    회원가입/로그인
                                </button>
                            </li>}
                            {succeed!=="" && <li className="navbar-alarm-wrapper">
                                <button className="navbar-alarm-button">
                                    <svg xmlns="https://www.w3.org/2000/svg" xmlnsXlink="https://www.w3.org/1999/xlink" width="18" height="18" viewBox="0 0 18 18">
                                        <defs>
                                            <path id="bpnpn3yn0a" d="M7.554 14.813h3.183a1.689 1.689 0 01-3.183 0zm1.592 2.25a2.813 2.813 0 002.812-2.813.563.563 0 00-.562-.563h-7.5c-.31 0-.541-.014-.699-.04.018-.036.04-.077.066-.123.036-.065.354-.605.46-.8.477-.875.735-1.676.735-2.599V6.75c0-2.656 2.057-4.688 4.688-4.688 2.63 0 4.687 2.032 4.687 4.688v3.375c0 .923.258 1.724.736 2.6.106.194.424.734.46.799.026.046.047.087.065.123-.157.026-.389.04-.698.04a.564.564 0 000 1.126c1.263 0 1.896-.221 1.896-1.002 0-.26-.092-.494-.28-.833-.045-.083-.361-.619-.456-.792-.395-.724-.598-1.355-.598-2.061V6.75c0-3.28-2.563-5.813-5.812-5.813S3.333 3.47 3.333 6.75v3.375c0 .706-.203 1.337-.598 2.06-.094.174-.41.71-.456.793-.188.339-.279.572-.279.833 0 .78.632 1.002 1.896 1.002H6.39a2.813 2.813 0 002.756 2.25z"></path>
                                        </defs>
                                        <g fill="none" fillRule="evenodd">
                                            <g transform="translate(-1079 -16) translate(224 7) translate(855 9)">
                                                <mask id="1dencd96ob" fill="#fff">
                                                    <use xlinkHref="#bpnpn3yn0a"></use>
                                                </mask>
                                                <use fillRule="nonzero" stroke="currentColor" strokeWidth=".3" xlinkHref="#bpnpn3yn0a"></use>
                                                <g fill="currentColor" mask="url(#1dencd96ob)">
                                                    <path d="M0 0H18V18H0z"></path>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </button>
                            </li>}
                            {succeed!=="" && <li className="navbar-profile">
                                <button className="navbar-profile-button" onClick={()=>popUp==="showDetail" ? setpopUp(""):setpopUp("showDetail")}>
                                    <div className="avatar-wrapper">
                                        <div className="avatar-image">
                                            {name}
                                        </div>
                                    </div>
                                </button>
                                <span style={{display:"none"}}></span>
                                <div className={`profile-menu-container ${popUp}`}>
                                    <div className="profile-menu-wrapper">
                                        <ul className="profile-menu-list">
                                            <li className="profile-menu-item">
                                                <Link>MY 원티드</Link>
                                            </li>
                                            <li className="profile-menu-item">
                                                <Link>프로필</Link>
                                            </li>
                                            <li className="profile-menu-item"><Link>지원 현황</Link></li>
                                            <li className="profile-menu-item"><Link>제안받기 현황</Link></li>
                                            <li className="profile-menu-item"><Link>좋아요</Link></li>
                                            <li className="profile-menu-item"><Link>북마크</Link></li>
                                            <li className="profile-menu-item"><Link>추천</Link></li>
                                            <li className="profile-menu-item"><Link>포인트</Link></li>
                                            <li>
                                                <button className="logout-button" onClick={()=>{dispatch({type:"DELETE"});dispatch({type:"RESET"});navigate("/")}}>
                                                    <span>로그아웃</span>
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="profile-menu-bubble"></div>
                                </div>
                            </li>}
                            
                            
                            <li className="navbar-service">
                                <Link className="navbar-service-link">
                                    기업 서비스
                                </Link>
                            </li>
                        </ul>
                        
                    </aside>
                </nav>
                <div className={`menu-pop-wrapper ${menubar}`}>
                    <div>
                                <nav className={`menu-container ${menubar}`} onMouseOut={()=>{setMenubar("close");}}>
                                    <section className="menu-section" onMouseOver={()=>setMenubar("open")} >
                                        <Link className="menu-category-all" to="/company">
                                            <em><h2>직군 전체</h2></em>
                                        </Link>
                                        <ul>
                                            <MenuCategoryItem title="개발" setMouseOver={setSubMenu} setMenuTag={setMenuTag} menuTag={menuTag}></MenuCategoryItem>
                                            <MenuCategoryItem title="경영·비즈니스" setMouseOver={setSubMenu} setMenuTag={setMenuTag}></MenuCategoryItem>
                                            <MenuCategoryItem title="마케팅·광고" setMouseOver={setSubMenu} setMenuTag={setMenuTag}></MenuCategoryItem>
                                            <MenuCategoryItem title="디자인" setMouseOver={setSubMenu} setMenuTag={setMenuTag}></MenuCategoryItem>
                                            <MenuCategoryItem title="영업" setMouseOver={setSubMenu} setMenuTag={setMenuTag}></MenuCategoryItem>
                                            <MenuCategoryItem title="고객서비스·리테일" setMouseOver={setSubMenu} setMenuTag={setMenuTag}></MenuCategoryItem>
                                            <MenuCategoryItem title="게임 제작" setMouseOver={setSubMenu} setMenuTag={setMenuTag}></MenuCategoryItem>
                                            <MenuCategoryItem title="미디어" setMouseOver={setSubMenu} setMenuTag={setMenuTag}></MenuCategoryItem>
                                            <MenuCategoryItem title="HR" setMouseOver={setSubMenu} setMenuTag={setMenuTag}></MenuCategoryItem>
                                            <MenuCategoryItem title="엔지니어링·설계" setMouseOver={setSubMenu} setMenuTag={setMenuTag}></MenuCategoryItem>
                                            <MenuCategoryItem title="금융" setMouseOver={setSubMenu} setMenuTag={setMenuTag}></MenuCategoryItem>
                                            <MenuCategoryItem title="제조·생산" setMouseOver={setSubMenu} setMenuTag={setMenuTag}></MenuCategoryItem>
                                            <MenuCategoryItem title="의료·무역·바이오" setMouseOver={setSubMenu} setMenuTag={setMenuTag}></MenuCategoryItem>
                                            <MenuCategoryItem title="물류·무역" setMouseOver={setSubMenu} setMenuTag={setMenuTag}></MenuCategoryItem>
                                            <MenuCategoryItem title="교육" setMouseOver={setSubMenu} setMenuTag={setMenuTag}></MenuCategoryItem>
                                            <MenuCategoryItem title="법률·법집행기관" setMouseOver={setSubMenu} setMenuTag={setMenuTag}></MenuCategoryItem>
                                            <MenuCategoryItem title="식·음료 " setMouseOver={setSubMenu} setMenuTag={setMenuTag}></MenuCategoryItem>
                                            <MenuCategoryItem title="건설·시설" setMouseOver={setSubMenu} setMenuTag={setMenuTag}></MenuCategoryItem>
                                            <MenuCategoryItem title="공공·복지" setMouseOver={setSubMenu} setMenuTag={setMenuTag}></MenuCategoryItem>
                                            <li>
                                                <Link className="explore-freelancer-link">
                                                    <div className="freelancer-banner">
                                                        <span>프리랜서</span>
                                                    </div>
                                                </Link>
                                            </li>
                                        </ul>
                                    </section>
                                    <section className={`sub-menu-list ${submenu}`} onMouseOver={()=>{setSubMenu("open");setMenubar("open")}} onMouseOut={()=>setSubMenu("close")}>
                                        <ul>
                                            <SubMenuItem content="개발 전체"></SubMenuItem>
                                            <SubMenuItem content="개발 전체"></SubMenuItem>
                                            <SubMenuItem content="개발 전체"></SubMenuItem>
                                            <SubMenuItem content="개발 전체"></SubMenuItem>
                                            <SubMenuItem content="개발 전체"></SubMenuItem>
                                            <SubMenuItem content="개발 전체"></SubMenuItem>
                                            <SubMenuItem content="개발 전체"></SubMenuItem>
                                            <SubMenuItem content="개발 전체"></SubMenuItem>
                                            <SubMenuItem content="개발 전체"></SubMenuItem>
                                            <SubMenuItem content="개발 전체"></SubMenuItem>
                                            <SubMenuItem content="개발 전체"></SubMenuItem>
                                            <SubMenuItem content="개발 전체"></SubMenuItem>
                                            <SubMenuItem content="개발 전체"></SubMenuItem>
                                            <SubMenuItem content="개발 전체"></SubMenuItem>
                                            <SubMenuItem content="개발 전체"></SubMenuItem>
                                            <SubMenuItem content="개발 전체"></SubMenuItem>
                                            <SubMenuItem content="개발 전체"></SubMenuItem>
                                            <SubMenuItem content="개발 전체"></SubMenuItem>
                                            <SubMenuItem content="개발 전체"></SubMenuItem>
                                            <SubMenuItem content="개발 전체"></SubMenuItem>
                                            <SubMenuItem content="개발 전체"></SubMenuItem>
                                            <SubMenuItem content="개발 전체"></SubMenuItem>
                                            <SubMenuItem content="개발 전체"></SubMenuItem>
                                            <SubMenuItem content="개발 전체"></SubMenuItem>
                                            <SubMenuItem content="개발 전체"></SubMenuItem>
                                            <SubMenuItem content="개발 전체"></SubMenuItem>
                                            <SubMenuItem content="개발 전체"></SubMenuItem>
                                        </ul>
                                    </section>
                                </nav>
                            </div>
                </div>
            </div>
        </div>
    );
}
export default Header