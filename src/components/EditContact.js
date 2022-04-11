import React from 'react'
import { Link, useParams  } from 'react-router-dom';

const EditContact = () => {
    const {id} = useParams();
  return (
    <div className="container">
            <div className="row">
                <h1 className="display-3 my-5 text-center">
                    Edit Student {id}
                </h1>
                <div className="col-md-6  shadow mx-auto p-5">
                    <form>
                        <div className="form-group">
                            <input type = "text" placeholder="Name" className="form-control"/>
                            
                        </div>
                        <div className="form-group my-2">
                            <input type = "email" placeholder="Email" className="form-control"/>

                        </div>
                        <div className="form-group">
                            <input type = "number" placeholder="Phone Number" className="form-control"/>

                        </div>
                        <div className="form-group my-2">
                            <input type = "submit" placeholder="Update Student" className='btn btn-dark mx-2'/>
                            <Link to = "/" placeholder="Add Student" className='btn btn-danger mx-2'>Cancel</Link>

                        </div>
                    </form>

                </div>
            </div>
        </div>
  )
}

export default EditContact;