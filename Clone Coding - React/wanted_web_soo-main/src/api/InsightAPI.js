import React, { useEffect } from "react"
import axios from "axios"
const InsightAPI=(props)=>{
    const url=`https://prod.wanted-a.online/insight/tags`;
    useEffect(()=>{
        const insight= async()=>{
            try{
                const data = await axios({
                    method:"get",
                    url:url,
                    headers:{'Content-Type' : 'application/json'},
                });
                console.log(data);
                props.setInsight(data.result);
            }catch(err){
                console.log(err)
            }
        }
        insight();
    })
}
export default InsightAPI