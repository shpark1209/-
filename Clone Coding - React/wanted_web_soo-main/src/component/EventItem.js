import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const EventItem=(props)=>{
    const [type, setType]=useState("");
    const hashtagReg=/"([^"]*)"/g;
    let tag=props.eventTag.match(hashtagReg);
    tag=tag.map((item)=>item.replace(/"/g, ''))
    useEffect(()=>{
        switch(props.eventType){
            case 'VOD':
                setType("VOD");
                break;
            case '프로모션':
                setType("promotion");
                break;
            case '캠페인':
                setType("campaign");
                break;
            case '이벤트':
                setType('event');
                break;
            case '아티클':
                setType('article');
                break;
            case '교육':
                setType('education');
                break;
            case '네트워킹':
                setType('networking');
                break;
            default:
                break;    
        }
    },[])
    return(
        <li className='event-list-item'>
            <Link>
                <div className='event-item-thumbnail'>
                    <img className='event-item-img' src={props.thumbnail}></img>
                </div>
                <div className='event-section'>
                    <div className='event-type-wrapper'>
                        <span className={`event-type ${type}`}>
                            <span className='event-type-label'>{props.eventType}</span>
                        </span>
                    </div>
                    <p className='event-tag-title'>{props.title}</p>
                </div>
                <div className='event-plus'>
                    <span className='event-time'>{props.startDate!==null && props.startDate+"~"+props.endDate}</span>
                    <div className='event-tag-wrapper'>
                        {tag!==null && tag.map((item)=>(<span>{item}</span>))}
                    </div>
                </div>
            </Link>
        </li>
    )
}
export default EventItem