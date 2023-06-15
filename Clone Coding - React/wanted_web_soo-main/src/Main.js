import React from "react";
import "./Main.css"
import Header from "./component/Header";
import MainContent from "./component/MainContent";
import Footer from "./component/Footer";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
const Main =()=>{
    console.log(useSelector(state=>state.signupReducer.isSuccess));
    const location = useLocation();
    console.log(location.state)
    return(
        <div>
            <Header></Header>
            <MainContent></MainContent>
            <Footer></Footer>
        </div>
    );
}
export default Main