import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import EventItem from './EventItem';
import CareerCategory from './CareerCategory';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
const EventMain=()=>{
    const [data, setData]=useState(null);
    const [insightTag, setInsightTag]=useState(null);
    const [tag, setTag]=useState("");
    const [modalTag,setModalTag]=useState(null);
    const reducerTag=useSelector(state=>state.modalReducer.tag);
    const confirm=useSelector(state=>state.modalReducer.confirm);
    console.log(confirm, reducerTag);
    
    useEffect(()=>{
        setModalTag(reducerTag);
        console.log(modalTag)
        let url=`https://prod.wanted-a.online/events/${tag}`;
        let param={"sort": "1",
        "eventType":reducerTag,
        "charge":"FREE"};
        console.log(param)
        const TagFunc= async()=>{
            try{
                    const data = await axios({
                        method:"get",
                        url:url,
                        headers:{'Content-Type' : 'application/json'},
                        data:JSON.stringify(param)
                    });
                    setData(data.data.result);
                    console.log(data);
                }catch(err){
                    console.log(err)
                }
            }
            if(confirm && modalTag!==null)TagFunc();
            
    }, [confirm])
    let korParam=encodeURIComponent(tag);
    const dispatch=useDispatch();
    const modalShow=useSelector(state=>state.modalReducer.show);
    useEffect(()=>{korParam=encodeURIComponent(tag);},[tag])
    useEffect(()=>{
        let url=`https://prod.wanted-a.online/insights/tags`;
        const insightTagFunc= async()=>{
            try{
                    const data = await axios({
                        method:"get",
                        url:url,
                        headers:{'Content-Type' : 'application/json'},
                    });
                    setInsightTag(data.data.result);

                }catch(err){
                    console.log(err)
                }
            }
        
        insightTagFunc();
    })
    useEffect(()=>{
        let url2=`https://prod.wanted-a.online/events?tags=`+korParam;
        const eventTagFunc= async()=>{
            
            try{
                    const data = await axios({
                        method:"get",
                        url:url2,
                        headers:{'Content-Type' : 'application/json'},
                    });
                    setData(data.data.result);

                }catch(err){
                    console.log(err)
                }
            }
            if(!confirm)eventTagFunc();
            
    },[tag])
    return(
        <div className='event-list-container'>
            <header>
                <Link>
                    <section className='event-list-banner'></section>
                </Link>
            </header>
            <div className='event-list-wrapper'>
                <h1 className='event-list-header'>다양한 커리어 관련 이벤트를 만나보세요!</h1>
                <div className='event-filter-wrapper'>
                    <div className='event-filter-container'>
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
                        <hr className='event-divider'></hr>
                        <div className='event-inner-header'>
                            <div className='event-trigger'>
                                <div className='event-filter-menu-wrapper'>
                                    <button className='event-filter-menu' type='button' onClick={()=>{modalShow==="" ? dispatch({type:"SHOW"}):dispatch({type:"HIDE"});}}>
                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="https://www.w3.org/2000/svg" className="FilterMenu_FilterMenu_icon__Q0svG"><path d="M4.66699 10.51C5.55699 10.51 6.30999 11.11 6.54099 11.927H13.875C14.168 11.927 14.406 12.165 14.406 12.458C14.406 12.752 14.168 12.99 13.875 12.99H6.54099C6.30999 13.807 5.55799 14.406 4.66699 14.406C3.77499 14.406 3.02299 13.806 2.79199 12.989H1.12499C0.831994 12.989 0.593994 12.752 0.593994 12.459C0.593994 12.165 0.831994 11.927 1.12499 11.927H2.79199C3.02399 11.109 3.77599 10.51 4.66699 10.51V10.51ZM4.66699 11.573C4.17799 11.573 3.78099 11.97 3.78099 12.458C3.78099 12.947 4.17799 13.344 4.66699 13.344C5.15499 13.344 5.55199 12.947 5.55199 12.458C5.55199 11.97 5.15499 11.573 4.66699 11.573ZM10.333 5.55299C11.225 5.55299 11.977 6.15199 12.208 6.96899H13.875C14.168 6.96899 14.406 7.20699 14.406 7.49999C14.406 7.79299 14.168 8.03099 13.875 8.03099H12.208C11.976 8.84899 11.224 9.44799 10.333 9.44799C9.44299 9.44799 8.68999 8.84799 8.45899 8.03199H1.12499C0.831994 8.03199 0.593994 7.79299 0.593994 7.49999C0.593994 7.20699 0.831994 6.96899 1.12499 6.96899H8.45899C8.68999 6.15199 9.44199 5.55199 10.333 5.55199V5.55299ZM10.333 6.61499C9.84499 6.61499 9.44799 7.01099 9.44799 7.49999C9.44799 7.98899 9.84499 8.38499 10.333 8.38499C10.822 8.38499 11.219 7.98899 11.219 7.49999C11.219 7.01099 10.822 6.61499 10.333 6.61499V6.61499ZM4.66699 0.593994C5.55699 0.593994 6.30999 1.19299 6.54099 2.00999H13.875C14.168 2.00999 14.406 2.24799 14.406 2.54199C14.406 2.83499 14.168 3.07199 13.875 3.07199L6.54099 3.07399C6.30899 3.89099 5.55799 4.48999 4.66699 4.48999C3.77599 4.48999 3.02399 3.88999 2.79199 3.07399L1.12499 3.07299C0.831994 3.07299 0.593994 2.83499 0.593994 2.54199C0.593994 2.24799 0.831994 2.00999 1.12499 2.00999H2.79199C3.02399 1.19299 3.77599 0.593994 4.66699 0.593994V0.593994ZM4.66699 1.65599C4.17799 1.65599 3.78099 2.05299 3.78099 2.54199C3.78099 3.02999 4.17799 3.42699 4.66699 3.42699C5.15499 3.42699 5.55199 3.02999 5.55199 2.54199C5.55199 2.05299 5.15499 1.65599 4.66699 1.65599V1.65599Z" fill="#333"></path></svg>
                                        <span>필터 및 정렬</span>
                                    </button>
                                </div>
                            </div>
                            
                        </div>
                    </div>

                </div>
                <ul className='event-item-wrapper'>
                    {data!==null && data.map((item)=>(<EventItem thumbnail={item.thumbnail} eventType={item.eventType} title={item.title} startDate={item.startDate} endDate={item.endDate} eventTag={item.eventTag}></EventItem>))}
                </ul>
            </div>
            <button className='head-top-button' onClick={()=>window.scrollTo(0,0)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="https://www.w3.org/2000/svg" className="ScrollTopButton_ArrowToTopIcon__zhIBj"><path fillRule="evenodd" clipRule="evenodd" d="M11.2674 5.29328L5.53033 11.0303C5.23744 11.3232 4.76256 11.3232 4.46967 11.0303C4.17678 10.7374 4.17678 10.2626 4.46967 9.96967L11.4697 2.96967C11.5063 2.93306 11.5457 2.90102 11.5873 2.87356C11.8784 2.68135 12.274 2.71339 12.5303 2.96967L19.5303 9.96967C19.8232 10.2626 19.8232 10.7374 19.5303 11.0303C19.2374 11.3232 18.7626 11.3232 18.4697 11.0303L12.7326 5.29328C12.744 5.34522 12.75 5.39918 12.75 5.45455V21.4545C12.75 21.8688 12.4142 22.2045 12 22.2045C11.5858 22.2045 11.25 21.8688 11.25 21.4545V5.45455C11.25 5.39918 11.256 5.34522 11.2674 5.29328ZM11.8387 4.72193C11.8907 4.71054 11.9446 4.70455 12 4.70455C12.0554 4.70455 12.1093 4.71054 12.1613 4.72193L12 4.56066L11.8387 4.72193Z" fill="black"></path></svg>
            </button>
        </div>
    )
}
export default EventMain