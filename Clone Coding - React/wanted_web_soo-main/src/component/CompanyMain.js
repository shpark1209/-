import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CompanyList from "./CompanyItem";
import JobCard from "./JobCard";
import TagListItem from "./TagListItem";
import { useState } from "react";
import { useCallback } from "react";
import target from "../Data/JobData.json"
import axios from "axios";
const CompanyMain =()=>{
    const [show, setShow]=useState("close");
    const [fixed, setFixed]=useState("");
    const [tag, setTag]=useState("");
    const [companyList, setCompanyList]=useState(null);
    const [categoryList, setCategoryList]=useState(null);
    const navigate=useNavigate();
    const [year1, setYear1]=useState(0);
    const [year2, setYear2]=useState(10);
    const location=useLocation();
    let category=location.state;
    let filtercontainer;
    let scrolltop;
    let cartData;
    useEffect(() => { 
        document.getElementById('app')?.scrollTo(0,0); 
       }, []);
    useEffect(() => {
    window.addEventListener('scroll', handleScroll, { capture: true });
    return ()=>{window.removeEventListener('scroll', handleScroll);};
    },[]);
    const handleScroll = useCallback(() => {
        scrolltop=window.pageYOffset;
        filtercontainer=document.getElementById('filter-container')?.offsetTop;
          if (scrolltop >= filtercontainer) {
              setFixed("fixed");
              setTag("center");
          } else {		         
            setFixed("");
            setTag("");
          }
    
          
      }, [filtercontainer]);
      useEffect(()=>{
        let url=`https://prod.wanted-a.online/employments?countries=한국&cities=서울&year1=${year1}&year2=${year2}`;
        const SetCompanyList= async()=>{
            try{
                    const data = await axios({
                        method:"get",
                        url:url,
                        headers:{'Content-Type' : 'application/json'},
                    });
                    setCompanyList(data.data.result);
                    console.log(data)
                }catch(err){
                    console.log(err)
                }
            }
            SetCompanyList();
    },[]) 
    useEffect(()=>{
        let url=`https://prod.wanted-a.online/employments/?categories=${category}&countries=한국&cities=서울&year1=${year1}&year2=${year2}`;
        const SetCategoryList= async()=>{
            try{
                    const data = await axios({
                        method:"get",
                        url:url,
                        headers:{'Content-Type' : 'application/json'},
                    });
                    setCategoryList(data.data.result);
                    console.log(data)
                }catch(err){
                    console.log(err)
                }
            }
        SetCategoryList();
    }) 
    if(companyList ===null || categoryList===null)return null;
    return(
        <div className="job-list">
            <article className="category-nav-wrapper">
                <div className="category-nav">
                    <div>
                        <button className="job-group-button" type="button">
                            <span className="job-group-label">개발</span>
                            <span className="more-button-wrapper">
                                <svg xmlns="https://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" className="MoreButton_MoreButton__icon__L_DpL"><path fill="#767676" fillRule="nonzero" d="M2.28 3.22a.75.75 0 0 0-1.06 1.06l4.25 4.25a.75.75 0 0 0 1.06 0l4.25-4.25a.75.75 0 0 0-1.06-1.06L6 6.94 2.28 3.22z"></path></svg>
                            </span>
                        </button>
                    </div>
                    <div className="job-category">
                        <button className="job-category-button">
                            <span className="job-category-title">개발 전체</span>
                            <span className="more-button-wrapper">
                                <svg xmlns="https://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" className="MoreButton_MoreButton__icon__L_DpL"><path fill="#767676" fillRule="nonzero" d="M2.28 3.22a.75.75 0 0 0-1.06 1.06l4.25 4.25a.75.75 0 0 0 1.06 0l4.25-4.25a.75.75 0 0 0-1.06-1.06L6 6.94 2.28 3.22z"></path></svg>
                            </span>
                        </button>
                    </div>
                </div>
            </article>
            <div className="content-wrapper">
                <div className="list-wrapper">
                    <div>
                        <div id="filter-container" className={`${fixed}`}>
                            <div className={`filter-wrapper ${tag}`}>
                                <div className="filter-group">
                                    <button className="filter-button">
                                        <span className="filter-title">
                                            지역
                                            <span className="filter-count">1</span>
                                        </span>
                                        <span className="filter-display">한국</span>
                                    </button>
                                    <div className="year-filter-wrapper">
                                        <button className="filter-button  skill-button">
                                            <span className="filter-title">경력</span>
                                            <span className="filter-display">전체</span>
                                            <svg width="8" height="7" viewBox="0 0 8 7" fill="none" xmlns="https://www.w3.org/2000/svg"><path d="M7.33334 0.494202C7.85691 0.494202 8.14842 1.1611 7.82205 1.61224L4.50038 6.20371C4.25071 6.54882 3.77503 6.54971 3.5243 6.20554L0.179295 1.61408C-0.149094 1.16332 0.14211 0.494202 0.666672 0.494202H7.33334Z" fill="#333"></path></svg>
                                        </button>
                                    </div>
                                    <div className="skill-filter-wrapper">
                                        <button className="filter-button">
                                            <span className="filter-title">기술스택</span>
                                            <span className="filter-display" style={{display:"none"}}></span>
                                            <svg width="8" height="7" viewBox="0 0 8 7" fill="none" xmlns="https://www.w3.org/2000/svg"><path d="M7.33334 0.494202C7.85691 0.494202 8.14842 1.1611 7.82205 1.61224L4.50038 6.20371C4.25071 6.54882 3.77503 6.54971 3.5243 6.20554L0.179295 1.61408C-0.149094 1.16332 0.14211 0.494202 0.666672 0.494202H7.33334Z" fill="#333"></path></svg>
                                        </button>
                                    </div>
                                    <div className="rearrange-filter-wrapper">
                                        <div className="selector-wrapper">
                                            <div className="selector-custom">
                                                <button type="button" onClick={()=>{show==="open" ? setShow("close"):setShow("open")}}>
                                                    응답률순
                                                    <svg width="8" height="7" viewBox="0 0 8 7" fill="none" xmlns="https://www.w3.org/2000/svg"><path d="M7.33334 0.494202C7.85691 0.494202 8.14842 1.1611 7.82205 1.61224L4.50038 6.20371C4.25071 6.54882 3.77503 6.54971 3.5243 6.20554L0.179295 1.61408C-0.149094 1.16332 0.14211 0.494202 0.666672 0.494202H7.33334Z" fill="#333"></path></svg>
                                                </button>
                                                <ul className={`${show}`}>
                                                    <li>
                                                        <button className="selector-button">최신순</button>
                                                    </li>
                                                    <li>
                                                        <button className="selector-button">보상금순</button>
                                                    </li>
                                                    <li>
                                                        <button className="selector-button">인기순</button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr className="filter-divider"></hr>
                            <div className="tag-filter-wrapper">
                                <div className="tag-filter-list">
                                    <div className="slick-slider">
                                        <div className="slick-list">
                                            <div className="slick-track">
                                            <TagListItem backColor="rgb(242, 251, 245)" title="연봉이 최고의 복지" src="https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Ftags%2F634f02e0-9f6e-11ec-b909-0242ac120002.png&w=50&q=75"></TagListItem>
                                            <TagListItem backColor="rgb(242, 251, 245)" title="연봉이 최고의 복지" src="https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Ftags%2F634f02e0-9f6e-11ec-b909-0242ac120002.png&w=50&q=75"></TagListItem>
                                            <TagListItem backColor="rgb(242, 251, 245)" title="연봉이 최고의 복지" src="https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Ftags%2F634f02e0-9f6e-11ec-b909-0242ac120002.png&w=50&q=75"></TagListItem>
                                            <TagListItem backColor="rgb(242, 251, 245)" title="연봉이 최고의 복지" src="https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Ftags%2F634f02e0-9f6e-11ec-b909-0242ac120002.png&w=50&q=75"></TagListItem>
                                            <TagListItem backColor="rgb(242, 251, 245)" title="연봉이 최고의 복지" src="https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Ftags%2F634f02e0-9f6e-11ec-b909-0242ac120002.png&w=50&q=75"></TagListItem>
                                            <TagListItem backColor="rgb(242, 251, 245)" title="연봉이 최고의 복지" src="https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Ftags%2F634f02e0-9f6e-11ec-b909-0242ac120002.png&w=50&q=75"></TagListItem>
                                            </div>
                                        </div>
                                        <button className="slick-button">
                                            <span className="svg-icon">
                                                <svg className="SvgIcon_SvgIcon__root__svg__DKYBi" viewBox="0 0 18 18"><path d="m11.955 9-5.978 5.977a.563.563 0 0 0 .796.796l6.375-6.375a.563.563 0 0 0 0-.796L6.773 2.227a.562.562 0 1 0-.796.796L11.955 9z"></path></svg>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="company-divider"></hr>
                    <div className="company-bookmark-see">
                        <button type="button" onClick={()=>navigate("/bookmark")}>
                            <svg width="13" height="17" viewBox="0 0 13 17" style={{color: "rgb(51, 102, 255)"}}><defs><path id="bookmarkIconFill" d="M6.25 13.21L.905 16.22c-.403.228-.905-.06-.905-.517V.596C0 .267.27 0 .605 0h11.29c.334 0 .605.267.605.596v15.107c0 .458-.502.745-.905.518L6.25 13.209z"></path></defs><g fill="none" fillRule="evenodd" transform="translate(.188)"><use fill="currentColor" xlinkHref="#bookmarkIconFill"></use></g></svg>
                            <span>북마크 모아보기</span>
                            <svg width="12" height="12" viewBox="0 0 12 12"><path fill="currentColor" d="M3.345 9.72a.75.75 0 0 0 1.06 1.06l4.25-4.25a.75.75 0 0 0 0-1.06l-4.25-4.25a.75.75 0 0 0-1.06 1.06L7.065 6l-3.72 3.72z"></path></svg>
                        </button>
                    </div>
                    <h3 className="featured-title">적극 채용중인 회사</h3>
                    <div className="featured-company-list-wrapper">
                        <div className="featured-company-list">
                           <CompanyList  image="https://static.wanted.co.kr/images/company/7111/ydhlckrrli3dyd3i__1080_790.jpg" thumbnail="https://static.wanted.co.kr/images/wdes/0_4.1263d442.jpg" title="세컨신드롬" position="22개 포지션"></CompanyList>
                           <CompanyList  image="https://static.wanted.co.kr/images/company/7111/ydhlckrrli3dyd3i__1080_790.jpg" thumbnail="https://static.wanted.co.kr/images/wdes/0_4.1263d442.jpg" title="세컨신드롬" position="22개 포지션"></CompanyList>
                           <CompanyList image="https://static.wanted.co.kr/images/company/7111/ydhlckrrli3dyd3i__1080_790.jpg" thumbnail="https://static.wanted.co.kr/images/wdes/0_4.1263d442.jpg" title="세컨신드롬" position="22개 포지션"></CompanyList>
                           <CompanyList image="https://static.wanted.co.kr/images/company/7111/ydhlckrrli3dyd3i__1080_790.jpg" thumbnail="https://static.wanted.co.kr/images/wdes/0_4.1263d442.jpg" title="세컨신드롬" position="22개 포지션"></CompanyList>
                           <CompanyList  image="https://static.wanted.co.kr/images/company/7111/ydhlckrrli3dyd3i__1080_790.jpg" thumbnail="https://static.wanted.co.kr/images/wdes/0_4.1263d442.jpg" title="세컨신드롬" position="22개 포지션"></CompanyList>
                        </div>
                    </div>
                    <div className="list-container">
                        <ul style={{margin:"-10px"}}>
                            {category===null ? companyList.map((item)=>(<JobCard image={item.imageUrl} position={item.name.substring(item.name.split(" ")[0].length)} name={item.name.split(" ")[0]} response={true} city={item.city} nation={item.country} reward={item.compensation} dummy={false}></JobCard>)) : 
                            categoryList.map((item)=>(<JobCard image={item.imageUrl} position={item.name.substring(item.name.split(" ")[0].length)} name={item.name.split(" ")[0]} response={true} city={item.city} nation={item.country} reward={item.compensation} dummy={false}></JobCard>))}

                            {target.jobCard.map((items, index)=>{
                                if(index<=3){
                                    cartData=items;
                                    return <JobCard image={cartData.image} position={cartData.position} name={cartData.name} response={cartData.response} city={cartData.city} nation={cartData.nation} reward={cartData.reward} dummy={true}></JobCard>;
                                }
                            }
                                
                            )}
                            
                            <div className="type-test-banner">
                                <div className="type-test-banner-wrapper">
                                    <div className="type-test-banner-title">
                                        내 유형과 가장 어울리는 회사는?
                                    </div>
                                    <div className="type-test-banner-subtitle">
                                        유형테스트 하러가기
                                        <span className="type-test-banner-arrow">
                                            <span className="svg-icon">
                                                <svg className="SvgIcon_SvgIcon__root__svg__DKYBi" viewBox="0 0 18 18"><path d="m11.955 9-5.978 5.977a.563.563 0 0 0 .796.796l6.375-6.375a.563.563 0 0 0 0-.796L6.773 2.227a.562.562 0 1 0-.796.796L11.955 9z"></path></svg>
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <JobCard image="https://static.wanted.co.kr/images/company/26340/mifvoqnc3s9qj0t4__1080_790.jpg" position="플랫폼개발자 (백엔드)" name="어반유니온" response="true" city="서울" nation="한국" reward="채용 보상금 1,000,000원"></JobCard>
                            <JobCard image="https://static.wanted.co.kr/images/company/26340/mifvoqnc3s9qj0t4__1080_790.jpg" position="플랫폼개발자 (백엔드)" name="어반유니온" response="true" city="서울" nation="한국" reward="채용 보상금 1,000,000원"></JobCard>
                            <JobCard image="https://static.wanted.co.kr/images/company/26340/mifvoqnc3s9qj0t4__1080_790.jpg" position="플랫폼개발자 (백엔드)" name="어반유니온" city="경기" nation="한국" reward="채용 보상금 2,000,000원"></JobCard>
                            <JobCard image="https://static.wanted.co.kr/images/company/26340/mifvoqnc3s9qj0t4__1080_790.jpg" position="플랫폼개발자 (백엔드)" name="어반유니온" city="인천" nation="한국" reward="채용 보상금 3,000,000원"></JobCard>
                        </ul>
                    </div>
                   

                </div>
            </div>
        </div>
    );
}
export default CompanyMain

//<TagListItem backColor="rgb(242, 251, 245)" title="연봉이 최고의 복지" src="https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Ftags%2F634f02e0-9f6e-11ec-b909-0242ac120002.png&w=50&q=75"></TagListItem>
