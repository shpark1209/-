import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const SubMenuItem=(props)=>{
    const [hover, setHover]=useState(false);
    return(
        <li className='sub-menu-item' onMouseOver={()=>setHover(true)} onMouseOut={()=>setHover(false)}>
                                        <Link>
                                            {props.content}
                                        </Link>
                                        {hover && <svg width="10" height="10" className="Explore_CategoryItem_Icon__TUrh4" viewBox="0 0 12 12"><path fill="#3366FF" d="M3.345 9.72a.75.75 0 0 0 1.06 1.06l4.25-4.25a.75.75 0 0 0 0-1.06l-4.25-4.25a.75.75 0 0 0-1.06 1.06L7.065 6l-3.72 3.72z"></path></svg>}
                                    </li>
    )
}
export default SubMenuItem