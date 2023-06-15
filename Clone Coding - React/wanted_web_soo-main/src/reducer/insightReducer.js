const initialState={
    cart:[],
    count:0
}
const insightReducer =(state=initialState, action)=>{
    switch(action.type){
        case 'ADD':
                const newCart={
                    name:action.name,
                    position:action.position,
                };
                state.cart.push(newCart);
            return{
                ...state,
                cart:[...state.cart],
                count:state.count+1,
            } 
        default:
            return{...state,}
    }
}
export default insightReducer