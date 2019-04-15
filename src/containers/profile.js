import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Nav from '../components/Navbar';

import { userPhotos } from '../actions/user';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_photos: [],
            user: {}
        }
    }

    componentWillMount() {

        let token = sessionStorage.getItem('token');
        if(!token || token === null) {
            this.props.history.push("/");
        }

    }


    componentDidMount() {
        if(this.props.location.state) {
            this.setState({
                user: this.props.location.state.data.user
            })
        }

        this.props.userPhotos();

    }

    componentWillReceiveProps(nextProps) {
        
        if(this.props.user.photos !== nextProps.user.photos) {
            if(nextProps.user.photos) {
                // console.log(nextProps.user.photos);

                nextProps.user.photos.data.forEach(photo => {
                    // console.log(photo);
                    this.state.user_photos.push(photo);
                });
            }
        }
    }

    render() {
        return(
            <div className="dashboard-bg">
                <Nav {...this.props} />

                {console.log("USER: ", this.state.user)}

                <div className="container user-info">
                    <div className="user-photo col-4">
                    
                        <img src={this.state.user.profile_picture}></img>
                    </div>
                    <div className="user-data col-8">
                        <div className="user-info"><h4>{this.state.user.name}</h4> 
                            <Link className="my-auto btn-edit-info" to={{
                                pathname: 'edit',
                                state: this.props.location.state
                            }}>
                                Editar perfil
                            </Link>
                        </div>
                        <div></div>
                        <div></div>
                    </div>
                </div>

                <div className="container col-10 user_images">
                {
                    this.state.user_photos.map(photo => {
                        return (
                                <div key={photo.id}  className="image">
                                    <img src={photo.path}></img>
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
    return bindActionCreators({userPhotos}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);