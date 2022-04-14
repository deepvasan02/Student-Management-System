import React, {useState} from 'react';
import { connect } from "react-redux";
import {useNavigate} from "react-router";
import { toast } from "react-toastify";

// AddContact component
const AddContact = ({contacts, addContact}) => {

    // States to store details of contact
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [rollno, setRollNo] = useState("");
    const [status, setStatus] = useState("");
    let navigate = useNavigate();

    // submit handler function
    const handleSubmit = (e) => {
        e.preventDefault();

        // validate if email address already in use
        const checkContactEmailExists = contacts.filter((contact) =>
          contact.email === email ? contact : null
        );

        // validate if phone number already in use
        const checkContactPhoneExists = contacts.filter((contact) =>
          contact.phone === phone ? contact : null
        );
     
        // validate if any of the input fields are empty
        if (!email || !name || !phone || !status || !rollno) {
          return toast.warning("Please fill in all fields!!");
        };
        if (checkContactEmailExists.length > 0) {
          return toast.error("This email already exists!!");
        };
        if (checkContactPhoneExists.length > 0) {
          return toast.error("This phone number already exists!!");
        };

        

        const data = {
            id: contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 0,
            email,
            name,
            phone,
            rollno,
            status,
        };
 
        // Add contact to db
        addContact(data);
        toast.success("Contact added successfully!!");
        navigate("/");
    }

    return (
        <div className="container-fluid">
            <h1 className="text-center text-dark py-3 display-2">Add Student</h1>
                <div className="row">      
                    <div className="col-md-6  shadow mx-auto p-5">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input type = "text" placeholder="Full Name" className="form-control" value={name} onChange={(e) => setName(e.target.value)}/>    
                            </div>
                            <div className="form-group">
                                <input type = "email" placeholder="Email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <input type = "number" placeholder="Phone Number" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <input type = "text" placeholder="Roll No" className="form-control" value={rollno} onChange={(e) => setRollNo(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <input type = "text" placeholder="Studying/Passout" className="form-control" value={status} onChange={(e) => setStatus(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <input
                                    className="btn btn-block btn-dark"
                                    type="submit"
                                    value="Add Student"
                                />
                                </div>
                        </form>
                    </div>
                </div>
            </div>
    );
};

// map current state to contacts
const mapStateToProps = (state) => ({
    contacts: state,
});

// dispatch payload to addContact
const mapDispatchToProps = (dispatch) => ({
    addContact: (data) => {
      dispatch({ type: "ADD_CONTACT", payload: data });
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddContact);