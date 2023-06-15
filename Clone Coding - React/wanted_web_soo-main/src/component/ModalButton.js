import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
const ModalButton=(props)=>{
    const dispatch=useDispatch();
    return(
        <button type='button' className={`modal-button`} onClick={()=>dispatch({type:"TAG", tag:props.title})}>
            <span className='modal-button-label'>{props.title}</span>
        </button>
    )
}
export default ModalButton