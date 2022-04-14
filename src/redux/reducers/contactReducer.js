// Initialized the array to store data
const initialState=[
    {
        id:0,
        name:"Ram",
        phone:8976543330,
        email: 'ram@ramayana.com',
        rollno: "B20Ms111",
        status: "Studying",
    },
    {
        id:1,
        name:"Laxman",
        phone:8976543300,
        email:'laxman@ramayana.com',
        rollno: "B20MX111",
        status: "Passout",
    },
];

// Reducer component to perform the necessary actions
export const contactReducer = (state =initialState,action)=>{

    switch(action.type){

        // If action is Add contact
        case "ADD_CONTACT":
            state = [...state,action.payload];
            return state;

        // If action is Delete contact
        case "DELETE_CONTACT":
            const contactFilter = state.filter((contact) =>
                contact.id === action.payload ? null : contact
            );
            state = contactFilter;
            return state;

        // If action is Update contact
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
