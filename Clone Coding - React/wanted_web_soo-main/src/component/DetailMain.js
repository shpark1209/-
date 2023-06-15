import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import JobCard from './JobCard';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
const DetailMain=()=>{
    const dispatch=useDispatch();
    const [detail, SetDetail]=useState("");
    const [modal, setModal]=useState("");
    const [bookmark, setBookMark]=useState(false);
    let scrolltop;
    let companyinfo;
    let warningbody=190;
    useEffect(() => { 
        document.getElementById('app')?.scrollTo(0,0); 
       }, []);
    useEffect(() => {
    window.addEventListener('scroll', handleScroll, { capture: true });
    return ()=>{window.removeEventListener('scroll', handleScroll);};
    },[]);
    const handleScroll = useCallback(()=>{
        scrolltop=window.pageYOffset;
        companyinfo=document.getElementsByClassName('company-info')[0]?.offsetTop;
        console.log(companyinfo, warningbody, scrolltop)
        if(scrolltop>=companyinfo-warningbody){
            setModal("stop");
        }
        else{
            setModal("");
        }
    },[scrolltop])
    return(
        <div>
            <div className='detail-container'>
                <div className='detail-wrapper'>
                    <div className='detail-content-wrapper'>
                        <div className='detail-content'>
                            <section className='detail-image'>
                                <button className='detail-left-button'>
                                    <svg width="24" height="24" viewBox="0 0 12 12"><path fill="#b5b5b5" d="M3.345 9.72a.75.75 0 0 0 1.06 1.06l4.25-4.25a.75.75 0 0 0 0-1.06l-4.25-4.25a.75.75 0 0 0-1.06 1.06L7.065 6l-3.72 3.72z"></path></svg>
                                </button>
                                <button className='detail-right-button'>
                                    <svg width="24" height="24" viewBox="0 0 12 12"><path fill="#b5b5b5" d="M3.345 9.72a.75.75 0 0 0 1.06 1.06l4.25-4.25a.75.75 0 0 0 0-1.06l-4.25-4.25a.75.75 0 0 0-1.06 1.06L7.065 6l-3.72 3.72z"></path></svg>
                                </button>
                                <div className='detail-image-slider'>
                                    <div className='detail-image-item'>
                                        <img src='https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fcompany%2F26340%2Fmifvoqnc3s9qj0t4__1080_790.jpg&w=1000&q=75'></img>
                                    </div>
                                    
                                </div>
                            </section>
                            <section className='detail-header'>
                                <h2>플랫폼 개발자 (백엔드)</h2>
                                <div>
                                    <h6>
                                        <Link>
                                            어반유니온
                                        </Link>
                                    </h6>
                                    <div className='job-card-tag-wrapper'>
                                        <button className='job-card-button'>
                                            <div className='response'>
                                                <span>응답률 매우 높음</span>
                                            </div>
                                            <div className='response-detail'>지원 후 응답받을 확률이 95% 이상입니다.</div>
                                        </button>
                                    </div>
                                    <span className='detail-location-wrapper'>
                                        서울
                                        <span className='detail-dot'>.</span>
                                        한국
                                    </span>
                                </div>
                                <div className='detail-tag-wrapper'>
                                    <ul>
                                        <li>
                                            <Link>#퇴사율5%미만만</Link>
                                        </li>
                                        <li>
                                            <Link>#50명 이하</Link>
                                        </li>
                                        <li>
                                            <Link>#설립4~9년</Link>
                                        </li>
                                        <li>
                                            <Link>#자율복장</Link>
                                        </li>
                                        <li>
                                            <Link>#커피</Link>
                                        </li>
                                        <li>
                                            <Link>#와인</Link>
                                        </li>
                                        <li>
                                            <Link>#간식</Link>
                                        </li>
                                        <li>
                                            <Link>#인공지능</Link>
                                        </li>
                                    </ul>
                                </div>
                            </section>
                            <div className='description-wrapper'>
                                <section className='detail-description'>
                                    <p>
                                        <span>빅데이터와 인공지능을 기반으로 다양한 시장을 변화시킵니다.<br></br><br></br>어반유니온은 빅데이터를 통해 패션사업에 새로운 시장을 개척하였고, 그 외의 산업에 있어서도 인공지능 연구 역량을 이용하여 다양한 혁신을 추구하는 인공지능/빅데이터 전문 기업입니다.<br></br><br></br><br></br>1. 패션 사업<br></br>섬유패션산업연합회 주관의 패션 리테일 플랫폼을 통해 국내 인디디자이너 및 1,000여개의 인디브랜드를 육성하는 상생 프로젝트를 운영 중이며, 한국전자통신연구원과 패션 산업 표준화를 위한 패션 자연어 사전 구축사업 등을 진행하고 있습니다. <br></br>패션테크 및 패션 O4O(Online For Offline) 플랫폼비즈니스, 인공지능 패션 MD 서비스 개발 등을 통해 활발하게 패션융복합 사업을 추진하고 있습니다. 또한, 자회사인 어반데이터랩을 통해서 이미지 처리, 자연언어처리 등 기계 학습과 데이터 추론을 기반으로 하는 새로운 혁신 서비스를 <br></br>개발하고 있습니다. 자체 개발 보유하고 있는 Computer Vision을 이용한 이미지 처리 기술과 한국전자통신연구원으로부터 이전 받은 자연어 분석 기술을 고도화 시켜 글로벌 경쟁력을 확보하기 위해 노력하고 있습니다.<br></br><br></br>- AI FASHION MD<br></br>인공지능 패션 MD는 빠르게 변화하는 패션 시장의 정보를 매일매일 분석하여, 패션시장 참여자들 누구나 최신의 패션 트렌드를 쉽게 이해하게 하고 고객 맞춤형 패션 상품을 추천/관리할 수 있도록 하는 고객 중심의 패션 MD 서비스입니다.<br></br><br></br><br></br>2. 해커톤 경진대회<br></br>어반유니온은 어반에이핏이라는 그룹사를 통해 기존의 B2B 클라우드 서비스를 수행하고 있습니다.<br></br>더불어 2021년부터 NAVER NSML 플랫폼을 이용하여 데이터를 이용한 해커톤을 운영해 오고 있습니다.<br></br>2022년에도 제2회 한국어 음성인식 경진대회를 시작으로 앞으로도 어반유니온의 경진대회 자체 플랫폼 기반의 인공지능 외 여러 분야의 해커톤을 활성화 하고자 합니다.<br></br><br></br><br></br>3. 헬스케어 (AI 의료 플랫폼)<br></br>어반유니온은 AI-CDSS 개발 및 디지털 병리 기반 암 전문 AI 분석 솔루션 개발 사업 내 AI 플랫폼 구축 및 운영을 담당합니다. <br></br><br></br><br></br>4. 메타버스<br></br>AI솔루션과 스마트 오프라인 매장 운영을 통해 메타버스 구축 및 운영에 사용되는 기반 기술을 개발 및 고도화 시켜왔습니다. 이를 기반으로 메타버스 플랫폼 기업으로의 도약을 시작합니다.</span>
                                    </p>
                                    <h6>주요업무</h6>
                                    <p>
                                        <span>• 회사내 자체 플래폼 운영 및 개발<br></br>  - 헬스케어, 해커톤, AI MD 등<br></br>• 정부과제 및 외부용역 구축 사이트 개발</span>
                                    </p>
                                    <h6>자격요건</h6>
                                    <p>
                                        <span>• JAVA, nodejs(typescript) 개발경력 2년이상 경험 혹은 그에 준하는 실력<br></br>• 개발시 필요한 SQL 작성에 문제가 없으신분<br></br>• REST API 이해와 CRUD를 실제로 개발할 수 있는 능력</span>
                                    </p>
                                    <h6>우대사항</h6>
                                    <p>
                                        <span>• 웹서비스 환경 및 개발 프로세스에 대한 높은 이해를 가지신 분<br></br>• Backend 프레임워크에 대한 높은 이해를 가지신 분<br></br>   - sprintboot, node(nest) 등<br></br>• Python 개발경험 있으신분 (django, flask)<br></br>• frontend 개발에 관심이 있거나 경험이 있으신분</span>
                                    </p>
                                    <h6>혜택 및 복지</h6>
                                    <p>
                                        <span>[업무환경]<br></br>• 완전 자율 복장<br></br>• 09:00 ~ 10:00 시차출근제도 (자율형)<br></br>• 업무에 필요한 장비 지원 노트북, 듀얼 모니터 제공<br></br>• 불가피한 초과근무 시 대체휴무 or 대체수당 지급 / 야근 식대 지급<br></br>• 자유로운 연차 사용<br></br>• 50여명의 젊은 조직으로 자유로운 상호 존중 분위기 (파티션이 없는 자유로운 자리)<br></br><br></br>[자기개발 지원]<br></br>• 업무 관련 자기 개발 도서 지원<br></br>• 업무 관련 자격증 취득 시 비용 지원<br></br><br></br>[편의시설 지원]<br></br>• 스낵바 운영을 통한 간식 지원<br></br>• 에스프레소 머신기 / 캡슐커피 머신기 / 냉장고 / 얼음정수기 / 전자레인지 비치<br></br><br></br>[다양한 복지 지원]<br></br>• 명절 선물 지급 및 경조사 지원<br></br>• 생일자 기프트카드 지급<br></br>• 사내 추천 제도 시행으로 보상금 지급<br></br><br></br>[인근 환경]<br></br>• 편리한 출퇴근 (4호선 혜화역 200m 이내)<br></br>• 대학로 맛집 주변 위치 및 창경궁 산책 가능</span>
                                    </p>
                                    <h6>기술스택 ・ 툴</h6>
                                    <p>
                                        <div className='description-skill-wrapper'>
                                            <div className='description-skill-item'>
                                                Python
                                            </div>
                                        </div>
                                    </p>
                                </section>
                            </div>
                            <hr className='detail-divider'></hr>
                            <section className='company-location'>
                                <div>
                                    <span className='info-header'>마감일</span>
                                    <span className='info-body'>상시</span>
                                </div>
                                <div>
                                    <span className='info-header'>근무지역</span>
                                    <span className='info-body'>서울시 종로구 창경궁로 240-7 2층</span>
                                </div>
                                <Link className='navermap'>
                                    <img src="https://naveropenapi.apigw.ntruss.com/map-static/v2/raster-cors?w=700&h=254&markers=type:d|size:mid|pos:126.9990329 37.5824085|color:red&scale=2&X-NCP-APIGW-API-KEY-ID=z7e7ujba1u"></img>
                                </Link>
                            </section>
                            <section className='company-info'>
                                <button className='left-company'>
                                    <div className='company-logo' style={{backgroundImage:`url("https://static.wanted.co.kr/images/wdes/0_5.84824502.jpg")`}}></div>
                                    <div>
                                        <h5>어반유니온</h5>
                                        <h6>IT, 컨텐츠</h6>
                                    </div>
                                </button>
                                <button className='company-follow-button'>
                                    <span className="follow-label">팔로우</span>
                                </button>
                            </section>
                            <section>
                                <div className='warning-wrapper'>
                                    <div className='warning-header'>
                                        <svg width="24" height="24" viewBox="0 0 24 24"><g fill="currentColor" fillRule="evenodd"><path fillRule="nonzero" d="M15.266 20.658A9.249 9.249 0 0112 21.25a9.25 9.25 0 010-18.5 9.21 9.21 0 016.54 2.71A9.217 9.217 0 0121.25 12a9.213 9.213 0 01-2.71 6.54.75.75 0 101.061 1.062A10.713 10.713 0 0022.75 12c0-2.89-1.146-5.599-3.149-7.601A10.717 10.717 0 0012 1.25C6.063 1.25 1.25 6.063 1.25 12S6.063 22.75 12 22.75c1.31 0 2.591-.235 3.794-.688a.75.75 0 10-.528-1.404z"></path><path d="M13 16a1 1 0 11-2 0 1 1 0 012 0"></path><path fillRule="nonzero" d="M11.25 7v5a.75.75 0 101.5 0V7a.75.75 0 10-1.5 0z"></path></g></svg>
                                        <div className='warning-header-content'>
                                            <h5 className='warning-header-h5'>
                                                본 채용정보는 원티드랩의 동의없이 무단전재, 재배포, 재가공할 수 없으며, 구직활동 이외의 용도로 사용할 수 없습니다.
                                            </h5>
                                            <button type='button' onClick={()=>{detail===""?SetDetail("showDetail"):SetDetail("")}}>
                                                <span className={`svg-icon ${detail==="showDetail" && "turn" }`}>
                                                    <svg className="SvgIcon_SvgIcon__root__svg__DKYBi" viewBox="0 0 19 19"><path d="M2.71967 5.71967C2.98594 5.4534 3.4026 5.4292 3.69621 5.64705L3.78033 5.71967L9.499 11.438L15.2162 5.7211C15.4824 5.45479 15.899 5.43051 16.1927 5.64832L16.2768 5.72092C16.5431 5.98715 16.5674 6.40381 16.3496 6.69745L16.277 6.78158L10.0304 13.0302C9.76416 13.2966 9.34745 13.3208 9.0538 13.103L8.96967 13.0303L2.71967 6.78033C2.42678 6.48744 2.42678 6.01256 2.71967 5.71967Z" fill="currentColor"></path></svg>
                                                </span>
                                            </button>
                                        </div>
                                        
                                    </div>
                                    <div className={`warning-body ${detail}`}>
                                            <p className='warning-body-content'>
                                                본 채용 정보는&nbsp;<strong>어반유니온</strong>에서 제공한 자료를 바탕으로 원티드랩에서 표현을 수정하고 이의 배열 및 구성을 편집하여 완성한 원티드랩의 저작자산이자 영업자산입니다. 본 정보 및 데이터베이스의 일부 내지는 전부에 대하여 원티드랩의 동의 없이 무단전재 또는 재배포, 재가공 및 크롤링할 수 없으며, 게재된 채용기업의 정보는 구직자의 구직활동 이외의 용도로 사용될 수 없습니다. 원티드랩은 <strong>어반유니온</strong>에서 게재한 자료에 대한 오류나 그 밖에 원티드랩이 가공하지 않은 정보의 내용상 문제에 대하여 어떠한 보장도 하지 않으며, 사용자가 이를 신뢰하여 취한 조치에 대해 책임을 지지 않습니다.&nbsp;<strong>&lt;저작권자 (주)원티드랩. 무단전재-재배포금지&gt;</strong>
                                            </p>
                                        </div>
                                </div>
                            </section>
                        </div>
                        <aside className={`detail-label-wrapper ${modal}`}>
                            <div className='detail-label-container'>
                                <header>
                                    <div className='label-reward-container'>
                                        <h3>채용보상금</h3>
                                        <ul>
                                            <li>
                                                <h4>추천인</h4>
                                                <p>500,000원</p>
                                            </li>
                                            <li>
                                                <h4>지원자</h4>
                                                <p>500,000원</p>
                                            </li>
                                        </ul>
                                        <button className='detail-share-button'>
                                            <span className="SvgIcon_SvgIcon__root__8vwon"><svg className="SvgIcon_SvgIcon__root__svg__DKYBi" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M20.8419 5.13156C20.8419 3.34425 19.3929 1.89474 17.6051 1.89474C15.8181 1.89474 14.3682 3.34457 14.3682 5.13156L14.3777 5.37944C14.384 5.46157 14.3934 5.54316 14.4058 5.62409L14.4152 5.67411L6.48256 9.86022L6.41109 9.78015C5.79271 9.13677 4.91641 8.75021 3.9697 8.75021C2.1352 8.75021 0.631592 10.194 0.631592 11.9933C0.631592 13.7933 2.13485 15.2364 3.9697 15.2364L4.20171 15.2286C5.04647 15.1719 5.82161 14.8075 6.3874 14.2307L6.45098 14.1587L15.0769 18.7102C15.2605 18.8071 15.4707 18.841 15.6754 18.8067L15.7022 18.8022L15.8292 18.7718C16.077 18.6942 16.2842 18.5172 16.3988 18.28L16.4722 18.148C16.5528 18.0206 16.6553 17.9073 16.7783 17.8116C17.3632 17.3544 18.2064 17.4579 18.6625 18.0422C19.1191 18.627 19.0157 19.4704 18.4326 19.9256C17.8475 20.3823 17.004 20.2788 16.5478 19.6945L16.4536 19.5905C16.1191 19.272 15.593 19.238 15.2181 19.5307C14.8057 19.8527 14.7324 20.4481 15.0543 20.8605C16.1547 22.2699 18.1889 22.5196 19.5985 21.4192C21.007 20.3199 21.2563 18.2855 20.156 16.8762C19.0556 15.4667 17.0211 15.2169 15.6126 16.3178L15.4226 16.4779C15.3616 16.5334 15.303 16.5911 15.2426 16.6547L6.6973 12.1478L6.67428 12.1292C6.60376 12.0831 6.52833 12.0476 6.45025 12.0225L6.41688 12.0139L6.49246 11.9899C6.53023 11.9752 6.56816 11.9579 6.60613 11.9379L15.9611 7.00213L16.1289 6.88917L16.159 6.86384L16.2612 6.76385C16.5102 6.48039 16.57 6.07014 16.4003 5.72293L16.3408 5.5818C16.2895 5.43808 16.263 5.28694 16.263 5.13156C16.263 4.391 16.8645 3.78948 17.6051 3.78948C18.3463 3.78948 18.9471 4.39053 18.9471 5.13156C18.9471 5.87326 18.3467 6.47363 17.6051 6.47363L17.4765 6.48228C17.0141 6.54501 16.6577 6.94138 16.6577 7.421C16.6577 7.94422 17.0818 8.36837 17.6051 8.36837C19.3932 8.36837 20.8419 6.91969 20.8419 5.13156ZM2.52634 11.9933C2.52634 11.2581 3.16483 10.6449 3.9697 10.6449L4.14547 10.6549C4.60709 10.7073 5.00699 10.9637 5.22962 11.334L5.26108 11.395L5.28192 11.4515C5.38641 11.702 5.59409 11.9092 5.85157 12.0023L5.89393 12.0152L5.85009 12.0269C5.61829 12.1049 5.41331 12.2729 5.296 12.5268L5.22001 12.668C4.96724 13.0762 4.49734 13.3416 3.9697 13.3416C3.16435 13.3416 2.52634 12.7292 2.52634 11.9933Z" fill="#3366ff"></path></svg></span>
                                        </button>
                                    </div>
                                    <button className='label-bookmark-button' type='button' onClick={()=>{dispatch({type:'ADD', name:"어반유니온", position:"플랫폼 개발자(백엔드)"});bookmark===true ? setBookMark(false):setBookMark(true);}}>
                                        {bookmark===false && <svg width="13" height="17" viewBox="0 0 13 17" style={{color: "rgb(51, 102, 255)"}}><defs><path id="bookmarkIconLine" d="M1.481 1.481h9.382v10.727c0 .409.331.74.74.74.41 0 .741-.331.741-.74V.74c0-.41-.331-.741-.74-.741H.74C.33 0 0 .332 0 .74v14.814c0 .568.614.925 1.108.643l5.18-2.873 5.104 2.873c.355.203.807.08 1.01-.276.203-.355.08-.808-.275-1.01l-5.471-3.083c-.228-.13-.507-.13-.735 0l-4.44 2.45V1.48z"></path></defs><g fill="none" fillRule="evenodd"><use fill="currentColor" xlinkHref="#bookmarkIconLine"></use></g></svg>}
                                        {bookmark===true && <svg width="13" height="17" viewBox="0 0 13 17" style={{color: "rgb(51, 102, 255)"}}><defs><path id="bookmarkIconFill" d="M6.25 13.21L.905 16.22c-.403.228-.905-.06-.905-.517V.596C0 .267.27 0 .605 0h11.29c.334 0 .605.267.605.596v15.107c0 .458-.502.745-.905.518L6.25 13.209z"></path></defs><g fill="none" fillRule="evenodd" transform="translate(.188)"><use fill="currentColor" xlinkHref="#bookmarkIconFill"></use></g></svg>}
                                        {bookmark===false ? "북마크하기":"북마크완료"}
                                    </button>
                                    <div className='apply-button-container'>
                                        <div className='apply-button-wrapper'>
                                            <button className='apply-button'>
                                                지원하기
                                            </button>
                                        </div>
                                    </div>
                                    <div className='label-reaction'>
                                        <button className='label-like'>
                                            <span className="SvgIcon_SvgIcon__root__8vwon"><svg className="SvgIcon_SvgIcon__root__svg__DKYBi" viewBox="0 0 24 24"><path d="M11.9999 6.49201L13.4848 5.00461C15.5225 2.9634 18.8529 2.9634 20.8905 5.00445C22.9308 7.04707 22.9308 10.3876 20.8928 12.4291L13.4587 19.9397L13.4565 19.9419C13.067 20.332 12.5427 20.5339 11.9999 20.5261C11.4563 20.5339 10.9319 20.3321 10.5402 19.9397L3.10804 12.4311C1.06908 10.3875 1.06908 7.04719 3.10835 5.00445C5.14712 2.96345 8.47614 2.96345 10.5151 5.00461L11.9999 6.49201Z" fill="#e1e2e3"></path></svg></span>
                                            <span>10</span>
                                        </button>
                                        <button type='button' className='reaction-profile'>
                                            <ul>
                                                <li style={{backgroundImage:`url("https://s3.ap-northeast-2.amazonaws.com/wanted-public/profile_default.png")`}}></li>
                                                <li style={{backgroundImage:`url("https://s3.ap-northeast-2.amazonaws.com/wanted-public/profile_default.png")`}}></li>
                                                <li style={{backgroundImage:`url("https://s3.ap-northeast-2.amazonaws.com/wanted-public/profile_default.png")`}}></li>
                                            </ul>
                                        </button>
                                    </div>
                                </header>
                                <footer className='detail-label-footer'></footer>
                            </div>
                        </aside>
                    </div>
                    <div className='job-associated'>
                        <div className='job-associated-title'>이 포지션을 찾고 계셨나요?</div>
                        <div className='job-associated-list'>
                            <div className='list-container'>
                                <ul style={{margin:"-10px"}}>
                                <JobCard image="https://static.wanted.co.kr/images/company/26340/mifvoqnc3s9qj0t4__1080_790.jpg" position="플랫폼개발자 (백엔드)" name="어반유니온" response="true" city="서울" nation="한국" reward="채용 보상금 1,000,000원"></JobCard>
                                <JobCard image="https://static.wanted.co.kr/images/company/26340/mifvoqnc3s9qj0t4__1080_790.jpg" position="플랫폼개발자 (백엔드)" name="어반유니온" response="true" city="서울" nation="한국" reward="채용 보상금 1,000,000원"></JobCard>
                                <JobCard image="https://static.wanted.co.kr/images/company/26340/mifvoqnc3s9qj0t4__1080_790.jpg" position="플랫폼개발자 (백엔드)" name="어반유니온" city="경기" nation="한국" reward="채용 보상금 2,000,000원"></JobCard>
                                <JobCard image="https://static.wanted.co.kr/images/company/26340/mifvoqnc3s9qj0t4__1080_790.jpg" position="플랫폼개발자 (백엔드)" name="어반유니온" city="인천" nation="한국" reward="채용 보상금 3,000,000원"></JobCard>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DetailMain