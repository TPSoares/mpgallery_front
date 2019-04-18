import React, { Component } from 'react';
import "../styles/style.css";
import { Button, Navbar, Form, FormControl } from 'react-bootstrap';

class ProfilePictureModal extends Component {

    
    render() {

        const showHideClassName = this.props.show ? "modal display-block" : "modal display-none";
       
        return (
            
            <div className={showHideClassName}>
      <section className="modal-main">
            asd
        <button onClick={this.props.handleClose}>close</button>
      </section>
    </div>
            // <div className={showHideClassName}>

            // <div className="modal" id="myModal">
            //     <div className="modal-dialog">
            //         <div className="modal-content">

            //         <div className="modal-header">
            //             <h4 className="modal-title">Modal Heading</h4>
            //             <button type="button" className="close" data-dismiss="modal">&times;</button>
            //         </div>

            //         <div className="modal-body">
            //             Modal body..
            //         </div>

            //         <div className="modal-footer">
            //             <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
            //         </div>

            //         </div>
            //     </div>
            // </div>
            // </div>
        )
    }
}


export default (ProfilePictureModal);

