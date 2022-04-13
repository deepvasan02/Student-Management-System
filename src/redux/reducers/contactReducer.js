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

export const contactReducer = (state =initialState,action)=>{
    switch(action.type){
        case "ADD_CONTACT":
            state = [...state,action.payload];
            return state;
        case "DELETE_CONTACT":
            const contactFilter = state.filter((contact) =>
                contact.id === action.payload ? null : contact
            );
            state = contactFilter;
            return state;
        case "UPDATE_CONTACT":
            const contactUpdate = state.filter((contact) =>
                contact.id === action.payload.id
                ? Object.assign(contact, action.payload)
                : contact
            );
            state = contactUpdate;
            return state;
        default:
            return state;
    }
};
