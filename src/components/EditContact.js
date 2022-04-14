import React, {useState, useEffect} from 'react';
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

const EditContact = ({ contacts, updateContact }) => {
    // use params id
    const {id} = useParams();
    let navigate = useNavigate();

    // find current contact by id
    const currentContact = contacts.find(
      (contact) => contact.id === parseInt(id)
    );
    
    // set contact info
    useEffect(() => {
        setName(currentContact.name);
        setEmail(currentContact.email);
        setPhone(currentContact.phone);
        setRollNo(currentContact.rollno);
        setStatus(currentContact.status);
    }, [currentContact]);

    // States to store details of contact
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [rollno, setRollNo] = useState("");
    const [status, setStatus] = useState("");

    // submit handler function
    const handleSubmit = (e) => {
        // prevent screen from reloading while change happens in input field
        e.preventDefault();

        // validate if email address already in use
        const checkContactEmailExists = contacts.filter((contact) =>
          contact.email === email && contact.id !== currentContact.id
            ? contact
            : null
        );

        // validate if phone number already in use
        const checkContactPhoneExists = contacts.filter((contact) =>
          contact.phone === phone && contact.id !== currentContact.id
            ? contact
            : null
        );

         // Validation for type of name
         const checkTypeofName = (name) => {
            for(let i = 0; i < name.length; i++){   
             if(!(name.charCodeAt(i) > 96 && name.charCodeAt(i) < 123) && !(name.charCodeAt(i) > 64 && name.charCodeAt(i) < 91) && !(name.charCodeAt(i) == 32)){
                return toast.error("TypeError: Name must be a string.");
              };
            };
            return 0;
        };

        // Validation for max length of name
        const checkMaxLengthOfName = (name, maxLengthOfName) => {
            if(name.length > maxLengthOfName){
                return toast.error(`LengthError: Length of Name should be less than ’, ${maxLengthOfName}`);
            };
            return 0;
         };
         
        // Validation for length of phone number
        function checkLengthOfPhoneNumber(phone){
            if(phone.length!==null && phone.length != 10){
                return toast.error("TypeError: Entered Phone Number is Invalid.");
            };
            return 0;
        };
    
        const data = {
          id: currentContact.id,
          email,
          name,
          phone,
          rollno,
          status,
        };

        // Update contact in db if it passes all validations
        if(!checkTypeofName(name) && !checkMaxLengthOfName(name, 30) && !checkLengthOfPhoneNumber(phone) ){
            updateContact(data);
            toast.success("Contact updated successfully!!");
            navigate("/");
        }
    };

  return (
    <div className="container">
            <div className="row d-flex flex-column">
                <button
                className="btn btn-dark ml-auto my-5"
                onClick={() => navigate("/")}
                >
                Go back
                </button>
                
                <div className="col-md-6 mx-auto shadow p-5">
                {currentContact ? (
                    <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                        className="form-control"
                        value={name}
                        placeholder={"Name"}
                        onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                        className="form-control"
                        value={email}
                        placeholder={"Email"}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                        className="form-control"
                        value={phone}
                        placeholder={"Phone"}
                        onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                        className="form-control"
                        value={rollno}
                        placeholder={"Roll No"}
                        onChange={(e) => setRollNo(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                        className="form-control"
                        value={status}
                        placeholder={"Studying/Passout"}
                        onChange={(e) => setStatus(e.target.value)}
                        />
                    </div>
                    <div className="form-group d-flex align-items-center justify-content-between my-2">
                        <button type="submit" className="btn btn-primary">
                        Update Contact
                        </button>
                        <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => navigate("/")}
                        >
                        cancel
                        </button>
                    </div>
                    </form>
                ) : (
                    <h1 className="text-center">No Contact Found</h1>
                )}
                </div>
            </div>
        </div>
  );
};

// map current state to contacts
const mapStateToProps = (state) => ({
    contacts: state,
});

// dispatch payload to updateContact
const mapDispatchToProps = (dispatch) => ({
    updateContact: (data) => {
    dispatch({ type: "UPDATE_CONTACT", payload: data });
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditContact);