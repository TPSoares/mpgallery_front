import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Nav from '../components/Navbar';
import ProfilePictureModal from './profilePictureModal';
import ImageModal from './imageModal';

import { userPhotos, setProfilePicture } from '../actions/user';

import { FaUserAlt, FaComment } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';

import "../styles/style.css";


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_photos: [],
            user: {},
            modalIsOpen: false,
            ImageModalIsOpen: false,
            currentOpenPhoto: {},
            file: undefined,

        }

        this.openModal = this.openModal.bind(this);
        this.openImageModal = this.openImageModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);   
        this.closeImageModal = this.closeImageModal.bind(this);   
        this.handleImageChange = this.handleImageChange.bind(this);

    }

    handleImageChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        if (file) {
            console.log(file);
          reader.onloadend = async (e) => {
            await this.setState({
              file: e.target.result

            
            //    {
            //       name: file.name,
            //       size: file.size,
            //       type: file.type
            //   },
            //   imagePreviewUrl: reader.result
            });
            // console.log(this.state.file);
            this.props.setProfilePicture(this.state.file);
          };
          reader.readAsDataURL(file);
        //   this.props.setFieldValue(this.props.field.name, file);
        }
        console.log(this.state.file);
        this.closeModal();

      }

    openModal() {
        this.setState({modalIsOpen: true});
    }
    openImageModal() {
        this.setState({ImageModalIsOpen: true});
        
    }
    
    afterOpenModal() {
    // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#f00';
    }
    
    closeModal() {
        this.setState({modalIsOpen: false});
    }

    closeImageModal() {
        this.setState({ImageModalIsOpen: false});
    }

    

    componentWillMount() {

        let token = sessionStorage.getItem('token');
        if(!token || token === null) {
            this.props.history.push("/");
        }
    }


    componentDidMount() {
        // console.log("USERSTATE: ", this.state.user);
        // if(this.props.location.state) {
        //     console.log("NEW STATE: ", this.props.location.state.data.user);
        //     this.setState({
        //         user: this.props.location.state.data.user
        //     })
        // }

        if(this.props.user) {
            this.setState({
                user: this.props.user.data
            })
        }
        
        
        
        this.props.userPhotos();

    }

    componentWillReceiveProps(nextProps) {

        // console.log("NEXTPROPS", nextProps);
        
        if(this.props.user.photos !== nextProps.user.photos) {
            if(nextProps.user.photos) {
                // console.log(nextProps.user.photos);

                nextProps.user.photos.data.forEach(photo => {
                    // console.log(photo);
                    this.state.user_photos.push(photo);
                });
            }
        }

        if(nextProps.user) {
            this.setState({user: nextProps.user.data })
        }

    }


    render() {

        console.log("USEEEERRR: ", this.state.user);


        return(
            <div className="dashboard-bg">
                <Nav {...this.props} />

                {console.log("USER: ", this.state.user)}
                <div className="profile-picture-upload">
                    <ProfilePictureModal modalIsOpen={this.state.modalIsOpen} openModal={this.openModal} closeModal={this.closeModal} handleImageChange={this.handleImageChange} />
                </div>
                <div className="container user-info">
                    <div className="user-photo col-4" title="Change image">
                            {this.state.user.profile_picture ? <img src={this.state.user.profile_picture} onClick={this.openModal}></img> : <FaUserAlt style={{width: "100px", height: "100px", borderRadius: "100%"}} onClick={this.openModal} />}
                    </div>
                    <div className="user-data col-8">
                        <div className="user-info"><h4>{this.state.user.name}</h4> 
                            <Link className="my-auto btn-edit-info" to={{
                                pathname: 'edit',
                                state: this.props.location.state
                            }}>
                                Edit profile
                            </Link>
                        </div>
                    </div>
                </div>
                <ImageModal ImageModalIsOpen={this.state.ImageModalIsOpen} openImageModal={this.openImageModal} closeImageModal={this.closeImageModal} image={this.state.currentOpenPhoto} />


                <div className="container col-10 user_images">

                {
                    this.state.user_photos.map(photo => {
                        return (
                                <div key={photo.id}  className="image">
                                    <div className="user-images-profile-info" onClick={() => {
                                        this.openImageModal();
                                        this.setState({currentOpenPhoto: photo})
                                    }}>
                                        <div className="user-images-likes" ><FiHeart size="2em" /> {photo.likes.length} </div>
                                        <div className="user-images-likes" ><FaComment size="2em" /> {photo.comments.length} </div>
                                    </div>
                                    <img className="user-images-profile" src={photo.path}></img>

                                </div>
                        )   
                    })
                }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        // photos: state.photos,
        // comments: state.comments,
        // likes: state.likes,
        user: state.user
    };
}

function mapDispatchToProps (dispatch) {
    return bindActionCreators({userPhotos, setProfilePicture}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);