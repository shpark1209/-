import React from 'react';
const TagListItem=(props)=>{
    return(
        <div className="slick-slide">
            <button className="tag-list-item" style={{backgroundColor:props.backColor}}>
                {props.title}
                <img src={props.src}></img>
            </button>
        </div>
    );
}
export default TagListItem