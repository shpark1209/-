import React from "react";
import TopBanner from "./TopBanner";
import CareerCategory from "./CareerCategory";
import { Link } from "react-router-dom";
import CareerCard from "./CareerCard";
import CareerSliderTrack from "./CareerSliderTrack";
import RecruitContent from "./RecruitContent";
import InsightAPI from "../api/InsightAPI";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
const MainContent =()=>{
    const [insight, setInsight]=useState(null);
    const [insightTag, setInsightTag]=useState(null);
    const [tag, setTag]=useState("취업/이직");
    let korParam=encodeURIComponent(tag);
    useEffect(()=>{
        let url=`https://prod.wanted-a.online/insights?tags=`+korParam;
        
        const insight= async()=>{
            try{
                    const data = await axios({
                        method:"get",
                        url:url,
                        headers:{'Content-Type' : 'application/json'},
                    });
                    //console.log(data);
                    setInsight(data.data.result);
                }catch(err){
                    console.log(err)
                }
            }
            
            insight();
            
    })
    useEffect(()=>{
        korParam=encodeURIComponent(tag);
    },[tag])
    useEffect(()=>{
        let url2=`https://prod.wanted-a.online/insights/tags`;
        const insightTagFunc= async()=>{
            try{
                    const data = await axios({
                        method:"get",
                        url:url2,
                        headers:{'Content-Type' : 'application/json'},
                    });
                    setInsightTag(data.data.result);

                }catch(err){
                    console.log(err)
                }
            }
            insightTagFunc();
    },[])
    const checkChannel=()=>{
       return insight[0].contentType==="WANTED"? WANTED : insight[0].contentType==="YOUTUBE" ? YOUTUBE : BRUNCH;
    }
    const YOUTUBE = "https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fwanted-public.s3.ap-northeast-2.amazonaws.com%2Fyoutube_opengraph.png&w=60&q=90";
    const WANTED = "https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Ffavicon%2F144x144.png&w=60&q=90";
    const BRUNCH="https://image.wanted.co.kr/optimize?src=https%3A%2F%2Ft1.daumcdn.net%2Fbrunch%2Fstatic%2Ficon%2Fios%2Ficon120.png&w=60&q=90";
    if(insight===null)return null;

    return(
        <main className="main">
            <TopBanner></TopBanner>
            <section className="career-section">
                <div className="career-section-wrapper">
                    <div className="career-title">
                        <div className="career-title-wrapper">
                            <h2>나에게 필요한 커리어 인사이트</h2>
                            <button type="button">
                            <svg width="24" height="24" viewBox="0 0 17 17"><defs><filter id="bfoh3u0w3a"><feColorMatrix in="SourceGraphic" values="0 0 0 0 0.600000 0 0 0 0 0.600000 0 0 0 0 0.600000 0 0 0 1.000000 0"></feColorMatrix></filter></defs><g fill="none" fillRule="evenodd"><g><g><g transform="translate(-1080 -374) translate(1080 374)"><g><path stroke="#999" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M9.421 13.334c-.736.277-1.535.43-2.368.43-3.706 0-6.71-3.005-6.71-6.711 0-3.707 3.004-6.71 6.71-6.71 1.853 0 3.53.75 4.745 1.965 1.214 1.214 1.965 2.892 1.965 4.745 0 1.853-.75 3.53-1.965 4.745" transform="translate(1 1)"></path><path fill="#999" d="M6.382 10.408c0-.371.3-.671.67-.671.371 0 .672.3.672.67 0 .372-.3.672-.671.672-.37 0-.671-.3-.671-.671" transform="translate(1 1) rotate(-180 7.053 10.408)"></path><path stroke="#999" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M5.04 5.655c0-1.08.901-1.958 2.013-1.958 1.11 0 2.013.877 2.013 1.958 0 1.08-1.007 1.957-2.013 1.957v.783" transform="translate(1 1)"></path></g></g></g></g></g></svg>
                            </button>
                        </div>
                    </div>
                    <div className="career-category">
                        <div className="career-content-list">
                            <div className="career-content-slide">
                                <div className="career-slide-tag">
                                    {insightTag!==null && insightTag.map((item)=>(<CareerCategory desc={item.tagName} setTag={setTag}></CareerCategory>))}
                                    
                                </div>
                                <div className="career-slide-left-arrow">
                                    <button type="button">
                                        <span className="svg-icon">
                                            <svg className="SvgIcon_SvgIcon__root__svg__DKYBi" viewBox="0 0 18 18"><path d="m6.045 9 5.978-5.977a.563.563 0 1 0-.796-.796L4.852 8.602a.562.562 0 0 0 0 .796l6.375 6.375a.563.563 0 0 0 .796-.796L6.045 9z"></path></svg>
                                        </span>
                                    </button>
                                </div>
                                <div className="career-slide-right-arrow">
                                    <button type="button">
                                        <span className="svg-icon">
                                            <svg className="SvgIcon_SvgIcon__root__svg__DKYBi" viewBox="0 0 18 18"><path d="m11.955 9-5.978 5.977a.563.563 0 0 0 .796.796l6.375-6.375a.563.563 0 0 0 0-.796L6.773 2.227a.562.562 0 1 0-.796.796L11.955 9z"></path></svg>
                                        </span>
                                    </button>
                                </div>
                            </div>
                            <button className="more-career-content-slide">
                                <svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M12 10a2 2 0 1 1-.001 4.001A2 2 0 0 1 12 10zm7 0a2 2 0 1 1-.001 4.001A2 2 0 0 1 19 10zM5 10a2 2 0 1 1-.001 4.001A2 2 0 0 1 5 10z"></path></svg>
                            </button>
                        </div>
                        <aside className="career-aside">
                            <button type="button" onClick={()=>{document.getElementsByClassName("career-aside")[0].style.display="none";}}>
                                <span className="svg-icon">
                                    <svg className="SvgIcon_SvgIcon__root__svg__DKYBi" viewBox="0 0 24 24"><path d="M17.97 19.03a.749.749 0 1 0 1.06-1.06l-6.5-6.5a.749.749 0 0 0-1.06 0l-6.5 6.5a.749.749 0 1 0 1.06 1.06L12 13.06l5.97 5.97zM12 10.94 6.03 4.97a.749.749 0 1 0-1.06 1.06l6.5 6.5a.749.749 0 0 0 1.06 0l6.5-6.5a.749.749 0 1 0-1.06-1.06L12 10.94z"></path></svg>
                                </span>
                            </button>
                            <img src="https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fimage.wanted.co.kr%2Fuserweb%2Fcareerhome%2Fcreator-application.png&w=144&q=90"></img>
                            <div className="career-aside-desc">
                                즐겨보는<br></br>
                                <span>크리에이터의</span>
                                <br></br>
                                글도 추천하고 싶다면?
                            </div>
                            <hr className="career-aside-divider"></hr>
                            <Link className="career-aside-link">
                                <span className="career-aside-link-label">
                                    크리에이터 추천하기
                                    <span className="career-aside-link-arrow">
                                        <span className="svg-icon">
                                            <svg className="SvgIcon_SvgIcon__root__svg__DKYBi" viewBox="0 0 18 18"><path d="m11.955 9-5.978 5.977a.563.563 0 0 0 .796.796l6.375-6.375a.563.563 0 0 0 0-.796L6.773 2.227a.562.562 0 1 0-.796.796L11.955 9z"></path></svg>
                                        </span>
                                    </span>
                                </span>
                            </Link>
                        </aside>
                    </div>
                    <ul className="career-list">
                        {insight!==null && insight.map((item)=>(<CareerCard url={item.contentUrl} ThumbSrc={item.thumbnail} title={item.title} name={item.author} ChannelSrc={checkChannel()} ChannelType={item.contentType}></CareerCard>))}
                        <CareerCard url={insight[0].contentUrl} ThumbSrc={insight[0].thumbnail} title={insight[0].title} name={insight[0].author} ChannelSrc={checkChannel()} ChannelType={insight[0].contentType}></CareerCard>
                        <CareerCard url={insight[0].contentUrl} ThumbSrc={insight[0].thumbnail} title={insight[0].title} name={insight[0].author} ChannelSrc={checkChannel()} ChannelType={insight[0].contentType}></CareerCard>
                        <CareerCard url={insight[0].contentUrl} ThumbSrc={insight[0].thumbnail} title={insight[0].title} name={insight[0].author} ChannelSrc={checkChannel()} ChannelType={insight[0].contentType}></CareerCard>
                        <CareerCard url={insight[0].contentUrl} ThumbSrc={insight[0].thumbnail} title={insight[0].title} name={insight[0].author} ChannelSrc={checkChannel()} ChannelType={insight[0].contentType}></CareerCard>
                        <CareerCard url="https://www.youtube.com/watch?v=cdaGPeQ5mNM" ThumbSrc="https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fi.ytimg.com%2Fvi%2FcdaGPeQ5mNM%2Fhqdefault.jpg%3Fsqp%3D-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg%3D%3D%26rs%3DAOn4CLBIPoIp8GoWchr0My1YhB6IuHo8zA&w=750&q=100" title="? 시드머니 모으는법 부터! 잘 키워 노후자금 으로! 금리채권 상관관계 - 삼프로TV 김프로 김동환 '변화와 생존' 김미경의 북토크" ChannelSrc="https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fwanted-public.s3.ap-northeast-2.amazonaws.com%2Fyoutube_opengraph.png&w=60&q=90" name="MKTV 김미경TV" ChannelType="YOUTUBE"></CareerCard>
                        <CareerCard url="https://www.youtube.com/watch?v=cdaGPeQ5mNM" ThumbSrc="https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fi.ytimg.com%2Fvi%2FcdaGPeQ5mNM%2Fhqdefault.jpg%3Fsqp%3D-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg%3D%3D%26rs%3DAOn4CLBIPoIp8GoWchr0My1YhB6IuHo8zA&w=750&q=100" title="? 시드머니 모으는법 부터! 잘 키워 노후자금 으로! 금리채권 상관관계 - 삼프로TV 김프로 김동환 '변화와 생존' 김미경의 북토크" ChannelSrc="https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fwanted-public.s3.ap-northeast-2.amazonaws.com%2Fyoutube_opengraph.png&w=60&q=90" name="MKTV 김미경TV" ChannelType="YOUTUBE"></CareerCard>
                        <CareerCard url="https://www.youtube.com/watch?v=cdaGPeQ5mNM" ThumbSrc="https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fi.ytimg.com%2Fvi%2FcdaGPeQ5mNM%2Fhqdefault.jpg%3Fsqp%3D-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg%3D%3D%26rs%3DAOn4CLBIPoIp8GoWchr0My1YhB6IuHo8zA&w=750&q=100" title="? 시드머니 모으는법 부터! 잘 키워 노후자금 으로! 금리채권 상관관계 - 삼프로TV 김프로 김동환 '변화와 생존' 김미경의 북토크" ChannelSrc="https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fwanted-public.s3.ap-northeast-2.amazonaws.com%2Fyoutube_opengraph.png&w=60&q=90" name="MKTV 김미경TV" ChannelType="YOUTUBE"></CareerCard>
                        <CareerCard url="https://www.youtube.com/watch?v=cdaGPeQ5mNM" ThumbSrc="https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fi.ytimg.com%2Fvi%2FcdaGPeQ5mNM%2Fhqdefault.jpg%3Fsqp%3D-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg%3D%3D%26rs%3DAOn4CLBIPoIp8GoWchr0My1YhB6IuHo8zA&w=750&q=100" title="? 시드머니 모으는법 부터! 잘 키워 노후자금 으로! 금리채권 상관관계 - 삼프로TV 김프로 김동환 '변화와 생존' 김미경의 북토크" ChannelSrc="https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fwanted-public.s3.ap-northeast-2.amazonaws.com%2Fyoutube_opengraph.png&w=60&q=90" name="MKTV 김미경TV" ChannelType="YOUTUBE"></CareerCard>
                    </ul>
                    <div className="career-list-more">
                        <button className="career-list-more-button">
                            <span className="more-button-label">
                                더 많은 컨텐츠 보기
                                <span className="career-list-end-icon">
                                    <svg className="SvgIcon_SvgIcon__root__svg__DKYBi" viewBox="0 0 19 19"><path d="M2.71967 5.71967C2.98594 5.4534 3.4026 5.4292 3.69621 5.64705L3.78033 5.71967L9.499 11.438L15.2162 5.7211C15.4824 5.45479 15.899 5.43051 16.1927 5.64832L16.2768 5.72092C16.5431 5.98715 16.5674 6.40381 16.3496 6.69745L16.277 6.78158L10.0304 13.0302C9.76416 13.2966 9.34745 13.3208 9.0538 13.103L8.96967 13.0303L2.71967 6.78033C2.42678 6.48744 2.42678 6.01256 2.71967 5.71967Z" fill="currentColor"></path></svg>
                                </span>
                            </span>
                        </button>
                    </div>
                </div>
            </section>
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
            <div className="main-divider-wrapper">
                <hr className="main-divider"></hr>
            </div>
            <div className="tag-setting-banner">
                <Link>
                    <div className="tag-setting-banner-wrapper">
                        <div className="tag-setting-banner-box">
                            <span>
                                관심 태그를 설정하면 취향에 맞는 콘텐츠를 추천해 드려요.
                                <em className="tag-setting-emoticon">🎁</em>
                                <span className="svg-icon">
                                    <svg className="SvgIcon_SvgIcon__root__svg__DKYBi" viewBox="0 0 18 18"><path d="m11.955 9-5.978 5.977a.563.563 0 0 0 .796.796l6.375-6.375a.563.563 0 0 0 0-.796L6.773 2.227a.562.562 0 1 0-.796.796L11.955 9z"></path></svg>
                                </span>
                            </span>
                        </div>
                    </div>
                </Link>
            </div>
            <section className="career-event">
                <div className="career-event-wrapper">
                    <div className="career-event-header">
                        <button disabled type="button" className="previous-career-button">
                            <span className="svg-icon">
                                <svg className="SvgIcon_SvgIcon__root__svg__DKYBi" viewBox="0 0 18 18"><path d="m6.045 9 5.978-5.977a.563.563 0 1 0-.796-.796L4.852 8.602a.562.562 0 0 0 0 .796l6.375 6.375a.563.563 0 0 0 .796-.796L6.045 9z"></path></svg>
                            </span>
                        </button>
                        <div className="career-event-title-container">
                            <div className="career-event-title-wrapper">
                                <h2 className="career-event-title">
                                    커리어 성장을 위한 맞춤 이벤트
                                </h2>
                            </div>
                            <Link className="career-event-subtitle">
                                이벤트 전체보기
                                <span className="svg-icon">
                                    <svg className="SvgIcon_SvgIcon__root__svg__DKYBi" viewBox="0 0 19 19"><path d="m11.955 9-5.978 5.977a.563.563 0 0 0 .796.796l6.375-6.375a.563.563 0 0 0 0-.796L6.773 2.227a.562.562 0 1 0-.796.796L11.955 9z"></path></svg>
                                </span>
                            </Link>
                        </div>
                        <button type="button" className="next-career-button">
                            <span className="svg-icon">
                                <svg className="SvgIcon_SvgIcon__root__svg__DKYBi" viewBox="0 0 18 18"><path d="m11.955 9-5.978 5.977a.563.563 0 0 0 .796.796l6.375-6.375a.563.563 0 0 0 0-.796L6.773 2.227a.562.562 0 1 0-.796.796L11.955 9z"></path></svg>
                            </span>
                        </button>
                    </div>
                    <div className="career-event-slide-container">
                        <div className="career-slider">
                            <div className="career-slider-list">
                                <div className="career-slider-track">
                                    <CareerSliderTrack src="https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fevents%2F2732%2F258ff636.jpg&w=1200&q=100" label1="온라인" label2="네트워킹" title="3월 원티드 살롱 (성장지원제도편)" tag1="online" tag2="network"></CareerSliderTrack>
                                    <CareerSliderTrack src="https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fevents%2F2669%2F22da8214.jpg&w=1200&q=100" label1="아티클" title="채용 담당자를 사로잡는 경력직 이력서 쓰는 법" tag1="article"></CareerSliderTrack>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="main-divider-wrapper">
                        <hr className="main-divider"></hr>
                    </div>
                    <div className="recruit-section">
                        <div className="recruit-section-wrapper">
                            <div className="recruit-section-header">
                                <div className="recruit-header-title-container">
                                    <div className="recruit-header-title-wrapper">
                                        <h2 className="recruit-header-title">
                                            채용 정보를 찾고 계셨나요?
                                        </h2>
                                    </div>
                                </div>
                            </div>
                            <div className="recruit-section-content">
                                <RecruitContent icon="search" content="채용공고"></RecruitContent>
                                <RecruitContent icon="profile" content="내 프로필"></RecruitContent>
                                <RecruitContent icon="matchup" content="매치업"></RecruitContent>
                                <RecruitContent icon="salary" content="직군별 연봉"></RecruitContent>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
export default MainContent