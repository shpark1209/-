import React, { useState } from "react";
import { Link } from "react-router-dom";
const CareerCard =(props)=>{
    const [opacity, setOpacity]=useState("");
    return(
        <li className="career-card">
            <Link target={"_blank"} to={props.url} > 
                <div className="career-card-thumbnail" onMouseOver={()=>setOpacity("opacity")} onMouseOut={()=>setOpacity("")}>
                    {props.ChannelType==="YOUTUBE" && <div className={`career-card-small-link ${opacity}`}>
                        <span className="svg-icon">
                            <svg className="SvgIcon_SvgIcon__root__svg__DKYBi" viewBox="0 0 12 13" fill="none"><path d="M9.41701 6.83601C9.41701 6.42201 9.75301 6.08601 10.167 6.08601C10.581 6.08601 10.917 6.42201 10.917 6.83601V10.417C10.917 10.831 10.581 11.167 10.167 11.167H1.83301C1.41901 11.167 1.08301 10.831 1.08301 10.417V2.08301C1.08301 1.66901 1.41901 1.33301 1.83301 1.33301H5.18601C5.60001 1.33301 5.93601 1.66901 5.93601 2.08301C5.93601 2.49701 5.60001 2.83301 5.18601 2.83301H2.58301V9.66701H9.41701V6.83601Z" fill="currentColor"></path><path d="M7.83301 1.33311H10.167C10.581 1.33311 10.917 1.66911 10.917 2.08311V4.41711C10.917 4.83111 10.581 5.16711 10.167 5.16711C9.75301 5.16711 9.41701 4.83111 9.41701 4.41711V3.92311L5.02901 8.28211C4.88201 8.42811 4.69101 8.50011 4.50001 8.50011C4.30701 8.50011 4.11501 8.42611 3.96801 8.27811C3.67601 7.98411 3.67801 7.51011 3.97101 7.21811L8.38501 2.83311H7.83301C7.41901 2.83311 7.08301 2.49711 7.08301 2.08311C7.08301 1.66911 7.41901 1.33311 7.83301 1.33311Z" fill="currentColor"></path></svg>
                        </span>
                        <span>LINK</span>
                    </div>}
                    <img className="thumbnail-image" src={props.ThumbSrc}></img>
                </div>
                <div className="career-card-desc">
                    <p className="career-card-title">{props.title}</p>
                </div>
                <div className="career-card-channel">
                    <img className="channel-image" src={props.ChannelSrc}></img>
                    <span className="channel-name">{props.name}</span>
                </div>
            </Link>
        </li>
    );
}
export default CareerCard