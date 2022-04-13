// import { getDefaultNormalizer } from "@testing-library/react";

const initialState=[
    {
        id:0,
        name:"Ram",
        number:8976543330,
        email: 'ram@ramayana.com',
    },
    {
        id:1,
        name:"Laxman",
        number:8976543300,
        email:'laxman@ramayana.com',
    },
];

const contactReducer = (state =initialState,action)=>{
    switch(action.type){
        case "ADD_CONTACT":
            state = [...state,action.payload];
            return state;
        default:
            return state;
    }
};
export default contactReducer;