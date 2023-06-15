import React from "react";
import SliderListItem from "./SliderListItem";
const TopBanner =()=>{
    /*
    <SliderListItem></SliderListItem>
                            <SliderListItem></SliderListItem>
                            <SliderListItem></SliderListItem>
                            <SliderListItem></SliderListItem>
                            <SliderListItem></SliderListItem>
                            <SliderListItem></SliderListItem>
                            <SliderListItem></SliderListItem>
                            <SliderListItem></SliderListItem>
                            <SliderListItem></SliderListItem>
    
    
    */
    return(
        <div className="top-banner">
                <div className="slider-wrapper">
                    <button className="previous-button">
                        <span className="SvgIcon-span">
                            <svg className="SvgIcon_SvgIcon__root__svg__DKYBi" viewBox="0 0 18 18"><path d="m6.045 9 5.978-5.977a.563.563 0 1 0-.796-.796L4.852 8.602a.562.562 0 0 0 0 .796l6.375 6.375a.563.563 0 0 0 .796-.796L6.045 9z"></path></svg>
                        </span>
                    </button>
                    <div className="slider-content">
                        <div className="slider-track">
                            <SliderListItem></SliderListItem>
                            
                        </div>
                    </div>
                    <button className="next-button">
                        <span>
                            <svg className="SvgIcon_SvgIcon__root__svg__DKYBi" viewBox="0 0 18 18"><path d="m11.955 9-5.978 5.977a.563.563 0 0 0 .796.796l6.375-6.375a.563.563 0 0 0 0-.796L6.773 2.227a.562.562 0 1 0-.796.796L11.955 9z"></path></svg>
                        </span>
                    </button>
                </div>
            </div>
    );
}
export default TopBanner