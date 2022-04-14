import React, {useState} from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

// Home component
const Home = ({contacts, deleteContact}) => { 

    // Search for a name
    const [searchTerm, setSearchTerm] = useState("");
    return (
        <div className="container">
            <div className="row d-flex flex-column">
                <input type="text" placeholder="Search Student" className="mt-5 p-2 w-50 ml-auto" onChange={(event)=> {setSearchTerm(event.target.value);}} />
                <Link to="/add" className="btn btn-outline-dark w-25 my-2 ml-auto ">
                Add Contact
                </Link>
                <div className="col-md-10 mx-auto my-4">
                <table className="table table-hover">
                    <thead className="table-header bg-dark text-white">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Roll No</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Status</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {contacts.length > 0 ? (
                        // Filter data according to search
                        contacts.filter((val)=>{
                            if(searchTerm == ""){
                                return val;
                            } else if(val.name.toLowerCase().includes(searchTerm.toLowerCase())){
                                return val;
                            }
                        }).map((contact, id) => (
                        <tr key={id}>
                            <td>{id + 1}</td>
                            <td>{contact.name}</td>
                            <td>{contact.rollno}</td>
                            <td>{contact.email}</td>
                            <td>{contact.phone}</td>
                            <td>{contact.status}</td>
                            <td>
                            <Link
                                to={`/edit/${contact.id}`}
                                className="btn btn-sm btn-primary mr-1"
                            >
                                Edit
                            </Link>
                            <button
                                type="button"
                                className="btn btn-sm btn-danger"
                                onClick={() => deleteContact(contact.id)}
                            >
                                Delete
                            </button>
                            </td>
                        </tr>
                        ))
                    ) : (
                        <tr>
                        <th>No contacts found</th>
                        </tr>
                    )}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    );
};

// map current state to contacts
const mapStateToProps = (state) => ({
    contacts: state,
});

// dispatch payload to deleteContact
const mapDispatchToProps = (dispatch) => ({
    deleteContact: (id) => {
      dispatch({ type: "DELETE_CONTACT", payload: id });
    },
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Home);