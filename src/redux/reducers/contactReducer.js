// Initialized the array to store data
const initialState=[
    {
        id:0,
        name:"Matt Leblac",
        phone:9192909912,
        email: 'matt.1@gmail.com',
        rollno: "B20MS111",
        status: "Studying",
    },
    {
        id:1,
        name:"David Jordan",
        phone:9192456721,
        email:'david.j@gmail.com',
        rollno: "B20MX123",
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
