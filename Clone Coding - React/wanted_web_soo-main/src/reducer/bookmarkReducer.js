const initialState={
    cart:[],
    count:0
}
const bookmarkReducer =(state=initialState, action)=>{
    switch(action.type){
        case 'ADD':
            const doesExist=state.cart.find((item)=>item.name===action.name&&item.position===action.position);
            console.log("ADD");
            if(doesExist){
                return{
                    ...state
                }
            }else{
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
        }
        case 'DELETE':
            
            return{
                ...state,
                cart: state.cart.filter((item) => item.position!==action.position),
                count:state.count-1
            }
            
        default:
            return{...state,}
    }
}
export default bookmarkReducer