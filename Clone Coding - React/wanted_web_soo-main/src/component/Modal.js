import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalButton from './ModalButton';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Modal =()=>{
    const show = useSelector(state=>state.modalReducer.show);
    const dispatch=useDispatch();
    const navigate=useNavigate("");
    return(
        <div id="modal" className={`${show}`}>
            <div className='modal-root'>
                <div className='modal-container'>
                    <div className='modal-filter'>
                        <div className='modal-header'>
                            <button className='modal-filter-reset'>
                                <span className="SvgIcon_SvgIcon__root__8vwon"><svg className="SvgIcon_SvgIcon__root__svg__DKYBi" viewBox="0 0 24 24"><path d="M7.37374 2.7578C7.62384 2.29823 8.19915 2.12841 8.65872 2.37851L12.453 4.44332L12.5682 4.51706C12.8266 4.70995 12.962 5.0165 12.9465 5.3242C12.9472 5.33886 12.9475 5.35361 12.9475 5.36843C12.9475 5.67552 12.8014 5.94849 12.5749 6.1216L10.2985 9.54035L10.2123 9.65118C9.90279 9.99393 9.38074 10.0674 8.98483 9.80382L8.874 9.71768C8.53125 9.40817 8.45772 8.88612 8.72135 8.49021L9.9678 6.61778C7.12241 7.48689 5.05275 10.1333 5.05275 13.2632C5.05275 17.1001 8.1632 20.2105 12.0001 20.2105C13.869 20.2105 15.6179 19.471 16.913 18.176C18.2081 16.8809 18.9475 15.132 18.9475 13.2632C18.9475 11.3954 18.208 9.64641 16.9127 8.35009C16.5429 7.97997 16.5431 7.38013 16.9132 7.01031C17.2834 6.64048 17.8832 6.64072 18.253 7.01084C19.8998 8.65888 20.8423 10.8879 20.8423 13.2632C20.8423 15.6396 19.8997 17.8688 18.2528 19.5158C16.6058 21.1627 14.3766 22.1053 12.0001 22.1053C7.11676 22.1053 3.15801 18.1465 3.15801 13.2632C3.15801 9.34005 5.71295 6.01369 9.2497 4.8572L7.75303 4.04277L7.64425 3.97373C7.26808 3.69759 7.14449 3.17907 7.37374 2.7578Z"></path></svg></span>
                                초기화
                            </button>
                            <span className='modal-title'>필터 및 정렬</span>
                            <button type="button" onClick={()=>dispatch({type:"HIDE"})}>
                                <span className="SvgIcon_SvgIcon__root__8vwon"><svg className="SvgIcon_SvgIcon__root__svg__DKYBi" viewBox="0 0 24 24"><path d="M5.93289 4.6068C5.56201 4.33162 5.03569 4.36219 4.69935 4.69853C4.32938 5.0685 4.32938 5.66834 4.69935 6.03831L10.6611 12L4.69935 17.9617L4.60763 18.0679C4.33244 18.4388 4.36302 18.9651 4.69935 19.3015L4.80561 19.3932C5.17649 19.6684 5.7028 19.6378 6.03914 19.3015L12.0009 13.3402L17.9626 19.3015L18.0688 19.3932C18.4397 19.6684 18.966 19.6378 19.3023 19.3015C19.6723 18.9315 19.6723 18.3317 19.3023 17.9617L13.3406 12L19.3023 6.03831L19.3941 5.93206C19.6693 5.56118 19.6387 5.03487 19.3023 4.69853L19.1961 4.6068C18.8252 4.33162 18.2989 4.36219 17.9626 4.69853L12.0009 10.6598L6.03914 4.69853L5.93289 4.6068Z" fill="#999"></path></svg></span>
                            </button>
                        </div>
                        <div className='modal-body'>
                            <div className='filter-body'>
                                <div className='filter-field'>
                                    <div className='filter-field-label'>유형</div>
                                    <div className='filter-field-body'>
                                        <div className='filter-button-group'>
                                            <ModalButton title="전체" ></ModalButton>
                                            <ModalButton title="이벤트" ></ModalButton>
                                            <ModalButton title="교육" ></ModalButton>
                                            <ModalButton title="프로모션" ></ModalButton>
                                            <ModalButton title="네트워킹" ></ModalButton>
                                            <ModalButton title="캠페인" ></ModalButton>
                                            <ModalButton title="아티클" ></ModalButton>
                                            <ModalButton title="VOD" ></ModalButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <button className='modal-confirm' type='button' onClick={()=>{dispatch({type:"HIDE"});dispatch({type:"CONFIRM"});}}>설정하기</button>
                        </div>
                    </div>
                </div>
                <div className='modal-background'></div>
            </div>
        </div>
    )
}
export default Modal