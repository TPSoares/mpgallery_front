import React, { Component } from 'react';
import "../styles/style.css";
import Modal from 'react-modal';

class ImageModal extends Component {

    constructor(props) {
        super(props);
    }
  
    
    render() {

        console.log(this.props)
        return (
            
        <div>    
            
                <Modal className="" style={{
                overlay: {
                zIndex: '20',
                backgroundColor: 'rgba(128, 128, 128, 0.75)'
                }}}
                isOpen={this.props.ImageModalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.props.closeImageModal}
                // style={customStyles}
                contentLabel="Example Modal"
                >

                <h5>Change profile picture</h5>
                <img src={this.props.image.path}></img>
               
                </Modal>
        </div>
        )
    }
}


export default ImageModal;

