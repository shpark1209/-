const initialState={
    email:"",
    password:"",
    phone:"",
    name:"",
    phoneNational:"",
    marketAgreement:0,
    isSuccess:false
}
const signupReducer =(state=initialState, action)=>{
    switch(action.type){
        case 'SET':
            return{...state,email:action.email,}
        case 'SETREST':
            return{
                ...state,
                password:action.password,
                phone:action.phone,
                name:action.name,
                phoneNational:action.phoneNational,
                marketAgreement:action.marketAgreement
            }
        case 'SIGNUP':
            return{
                ...state,
                isSuccess:true
            }
        case 'PATCH':
            return{
                ...state,
                password: action.password
            }
        case 'DELETE':
            return{
                email:"",
                password:"",
                phone:"",
                name:"",
                phoneNational:"",
                marketAgreement:0,
                isSuccess:false
            }
        default:
            return{...state,}
    }
}
export default signupReducer