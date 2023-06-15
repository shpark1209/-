const initialState={
    show:"",
    tag:"",
    confirm:false,
}
const modalReducer =(state=initialState, action)=>{
    switch(action.type){
        case 'SHOW':
            return{
                ...state,
                show: "modalShow",
                confirm:false
            }
        case 'HIDE':
            return{
                ...state,
                show : "",
                confirm:false,
            }
        case 'TAG':
            return{
                ...state,
                tag:action.tag
            }
        case 'CONFIRM':
            return{
                ...state,
                confirm:true
            }
        default:
            return{...state,}
    }
}
export default modalReducer