import React, {useState} from 'react';
import { connect } from "react-redux";
import { toast } from "react-toastify";


const AddContact = ({contacts}) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const checkContactEmailExists = contacts.filter((contact) =>
          contact.email === email ? contact : null
        );
        const checkContactPhoneExists = contacts.filter((contact) =>
          contact.phone === phone ? contact : null
        );
    
        if (!email || !name || !phone) {
          return toast.warning("Please fill in all fields!!");
        };
        if (checkContactEmailExists.length > 0) {
          return toast.error("This email already exists!!");
        };
        if (checkContactPhoneExists.length > 0) {
          return toast.error("This phone number already exists!!");
        };
    }

    return (
        <div className="container">
                <div className="row">
                    <h1 className="display-3 my-5 text-center">
                        Add Student
                    </h1>
                    <div className="col-md-6  shadow mx-auto p-5">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input type = "text" placeholder="Full Name" className="form-control" value={name} onChange={(e) => setName(e.target.value)}/>    
                            </div>
                            <div className="form-group my-2">
                                <input type = "email" placeholder="Email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <input type = "number" placeholder="Phone Number" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                            </div>
                            <div className="form-group my-2">
                                <input type = "submit" placeholder="Add Student" className='btn btn-block btn-dark'/>

                            </div>
                        </form>

                    </div>
                </div>
            </div>
    )
}

export default AddContact;