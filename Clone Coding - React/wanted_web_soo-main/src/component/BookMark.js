import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import target from "../Data/JobData.json"
import BookMarkCard from './BookMarkCard';
import Header from './Header';
import Footer from './Footer';
import { useEffect } from 'react';
import axios from 'axios';
const year1=0;
const year2=10;
const BookMark =()=>{
    const card = useSelector(state=>state.bookmarkReducer.cart);
    const [companyList, setCompanyList]=useState(null);
    console.log(card);
    let cartData;
    useEffect(()=>{
        let url=`https://prod.wanted-a.online/employment?countries=한국&cities=서울&year1=${year1}&year2=${year2}`;
        const SetCompanyList= async()=>{
            try{
                    const data = await axios({
                        method:"get",
                        url:url,
                        headers:{'Content-Type' : 'application/json'},
                    });
                    setCompanyList(data.data.result);
                    console.log(data)
                }catch(err){
                    console.log(err)
                }
            }
            SetCompanyList();
    },[])
    console.log(card);
    if(companyList===null)return null;
    return(
        <div>
            <Header></Header>
            <div className='bookmark-container'>
                <nav className='bookmark-nav'>
                    <h2 className='bookmark-header'>
                        북마크
                    </h2>
                </nav>
                <div className='list-container'>
                    <ul style={{margin:"-10px"}}>
                        {
                            card!==undefined && 
                            card.map(carts=>(
                                cartData=target.jobCard.find((item)=>item.name===carts.name && item.position===carts.position),
                                cartData!==undefined && <BookMarkCard image={cartData.image} name={cartData.name} position={cartData.position} city={cartData.city} nation={cartData.nation} response={cartData.response} reward={cartData.reward} dummy={true}></BookMarkCard>
                            ))
                        }
                        {
                            card!==undefined &&
                            card.map(carts=>(
                                cartData=companyList.find((item)=>item.name.split(" ")[0]===carts.name && item.name.substring(item.name.split(" ")[0].length)===carts.position),
                                cartData!==undefined && <BookMarkCard image={cartData.imageUrl} name={cartData.name.split(" ")[0]} position={cartData.name.substring(cartData.name.split(" ")[0].length)} city={cartData.city} nation={cartData.country} response={true} reward={cartData.compensation} dummy={false}></BookMarkCard>
                            ))
                        }

                    </ul>
                    
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}
export default BookMark