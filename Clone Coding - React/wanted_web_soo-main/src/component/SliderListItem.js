import React from "react";
import { Link } from "react-router-dom";
const SliderListItem =()=>{
    return(
        <div className="slider-list-item">
                                <div>
                                    <div>
                                        <div className="slider-item-image">
                                            <Link>
                                                <img src="https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fbanners%2F1967%2F85bf6622.jpg&w=1060&q=100"></img>
                                            </Link>
                                        </div>
                                        <div className="slider-item-desc">
                                            <h2>채용설명회, '쿡앱스(CookApps)'</h2>
                                            <h3>성장과 성과를 모두 잡는 쿡앱스의 성장공식 노하우</h3>
                                            <hr></hr>
                                            <Link>
                                                <span className="button-label">
                                                    바로가기
                                                    <span className="button-arrow">
                                                        <svg className="SvgIcon_SvgIcon__root__svg__DKYBi" viewBox="0 0 18 18"><path d="m11.955 9-5.978 5.977a.563.563 0 0 0 .796.796l6.375-6.375a.563.563 0 0 0 0-.796L6.773 2.227a.562.562 0 1 0-.796.796L11.955 9z"></path></svg>
                                                    </span>
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
    );
}
export default SliderListItem