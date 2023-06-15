import React from "react";
const CareerCategory=(props)=>{
    return(
        <button className="career-category-item" onClick={()=>props.setTag(props.desc)}>
            <span className="career-category-desc">{props.desc}</span>
        </button>
    );
}
export default CareerCategory