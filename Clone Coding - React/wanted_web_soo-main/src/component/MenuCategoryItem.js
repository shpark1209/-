import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const MenuCategoryItem=(props)=>{
    return(
        <li className="menu-category-item"  onMouseOver={()=>props.setMouseOver("open")} onMouseOut={()=>{props.setMouseOver("close")}} onClick={()=>props.setMenuTag(props.title)} >
                                        <Link to="/company" state={props.title}>
                                            <em>{props.title}</em>
                                        </Link>
                                    </li>
    )
}
export default MenuCategoryItem