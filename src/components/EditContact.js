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
    }, [currentContact]);

    // States to store details of contact
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

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
    
        const data = {
          id: currentContact.id,
          email,
          name,
          phone,
        };
         
        // Update contact in db
        updateContact(data);
        toast.success("Contact updated successfully!!");
        navigate("/")
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