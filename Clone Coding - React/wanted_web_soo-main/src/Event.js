import React from 'react';
import Footer from './component/Footer';
import Header from './component/Header';
import EventMain from './component/EventMain';
import "./Event.css"
import Modal from './component/Modal';
const Event=()=>{
    return(
        <div>
            <Header></Header>
            <EventMain></EventMain>
            <Modal></Modal>
            <Footer></Footer>
        </div>
    )
}
export default Event