const initialState={
    jwt:"",
    userIdx:0
}
const tokenReducer =(state=initialState, action)=>{
    switch(action.type){
        case 'FETCH':
            return{
                ...state,
                jwt:action.jwt,
                userIdx:action.index
            }
        case 'RESET':
            return{
                jwt:"",
                userIdx:0
            }
        default:
            return{...state,}
    }
}
export default tokenReducer