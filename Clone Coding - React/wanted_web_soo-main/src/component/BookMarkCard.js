import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const BookMarkCard=(props)=>{
    const dispatch=useDispatch();
    const stopAtag=(e)=>{
        e.preventDefault();
    }
    return(
        <li>
            <div className='job-card'>
                <Link to={"/detail"}>
                    <header className='job-card-header' style={{backgroundImage: `url(${props.image})`}}>
                        <button className='card-header-button' onClick={(e)=>{console.log(props.name, props.position);dispatch({type:'DELETE', name:props.name, position:props.position});stopAtag(e);}}>
                            <svg width="22" height="22" viewBox="0 0 18 18" fill="none" xmlns="https://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M3.58065 1C3.25997 1 3 1.26206 3 1.58533V16.4138C3 16.8632 3.48164 17.145 3.86873 16.922L9.00004 13.9662L14.1313 16.922C14.5184 17.145 15 16.8632 15 16.4138V1.58533C15 1.26206 14.74 1 14.4194 1H9.00004H3.58065ZM8.71195 12.7838C8.89046 12.681 9.10961 12.681 9.28812 12.7838L13.8387 15.4052V2.17067H9.00004H4.1613V15.4052L8.71195 12.7838Z" fill="white"></path><path d="M9.28812 12.7838C9.10961 12.681 8.89046 12.681 8.71195 12.7838L4.1613 15.4052V2.17067H9.00004H13.8387V15.4052L9.28812 12.7838Z" fill="#3366FF"></path></svg>
                        </button>
                    </header>
                    <div className='job-card-body'>
                        <div className='job-card-position'>{props.position}</div>
                        <div className='job-card-name'>{props.name}</div>
                        <div className='job-card-location'>
                            {props.city}
                            <span className='address-dot'>.</span>
                            <span>{props.nation}</span>
                        </div>
                        <div className='job-card-reward'>
                            {props.dummy===false ? "채용 보상금 "+props.reward+"원":props.reward}
                        </div>
                    </div>
                </Link>
            </div>
        </li>
    )
}
export default BookMarkCard