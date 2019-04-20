import React, { Component } from 'react';
import "../styles/style.css";
import Modal from 'react-modal';

class ProfilePictureModal extends Component {

    constructor(props) {
        super(props);
    }
  
    
    render() {

        console.log(this.props)
        return (
            
        <div>    
            
                <Modal className="profile-picture-upload-button" style={{
                overlay: {
                backgroundColor: 'rgba(128, 128, 128, 0.75)'
                }}}
                isOpen={this.props.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.props.closeModal}
                // style={customStyles}
                contentLabel="Example Modal"
                >

                <h5>Change profile picture</h5>

                <label className="image-upload">
                    <input 
                    // encType="multipart/form-data"
                    className="form-control"
                    type="file" 
                    name="image" 
                    placeholder="Image"
                    onChange={this.props.handleImageChange}
                    
                    // setFieldValue={setFieldValue}
                    // onBlur={handleBlur}
                    /> 
                    {/* {errors.image && touched.image && <div className="input-feedback" >{errors.image}</div>} */}
                Choose image

                </label>

                <button className="profile-picture-cancel" onClick={this.props.closeModal}>Cancel</button>
                </Modal>
        </div>
        )
    }
}


export default ProfilePictureModal;

