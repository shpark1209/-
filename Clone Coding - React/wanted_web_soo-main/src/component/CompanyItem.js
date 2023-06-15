import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
const CompanyList =(props)=>{
    const [hover, setHover]=useState("");
    const [color, setColor]=useState("");
    return(
        <div className="featured-company-item">
            <div>
                <Link className="featured-company-link" onMouseOver={()=>{setHover("hover");setColor("#258bf7");}} onMouseOut={()=>{setHover("");setColor("#333");}}>
                    <header>
                        <div className={`company-image ${hover}`} style={{backgroundImage:`url(${props.image})`}}></div>
                    </header>
                    <footer>
                        <div className="company-thumbnail" style={{backgroundImage:`url(${props.thumbnail})`}}></div>
                        <h4 style={{color: `${color}`}}>{props.title}</h4>
                        <h5>{props.position}</h5>
                    </footer>
                </Link>
            </div>
        </div>
    )
}
export default CompanyList