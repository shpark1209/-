import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const CareerSliderTrack=(props)=>{
    const [tag1, setTag1]=useState("");
    const [tag2, setTag2]=useState("");
    useEffect(()=>{
        switch(props.tag1){
            case "article":
                setTag1("career-label is-article");
                break;
            case "online":
                setTag1("career-label is-online");
                break;
            case "network":
                setTag1("career-labael is-network");
                break;
            default:
                setTag1("career-label");
                break;
        }
        switch(props.tag2){
            case "article":
                setTag2("career-label is-article");
                break;
            case "online":
                setTag2("career-label is-online");
                break;
            case "network":
                setTag2("career-label is-network");
                break;
            default:
                setTag2("career-label");
                break;
        }

    }, []);
    
    return(
        <div className="career-slider-item-wrapper">
            <div>
                <div className="career-slider-item">
                    <Link>
                        <div className="career-thumbnail">
                            <img src={props.src}></img>
                        </div>
                        <div className="career-content">
                            <div className="career-label-wrapper">
                                {props.label1 && 
                                    <span className= {tag1}>
                                        <span className="career-label-content">{props.label1}</span>
                                    </span>
                                }
                                {props.label2 && 
                                    <span className={tag2}>
                                        <span className="career-label-content">{props.label2}</span>
                                    </span>
                                }
                            </div>
                            <h3 className="career-content-title">{props.title}</h3>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
export default CareerSliderTrack