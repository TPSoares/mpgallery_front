import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

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

                {console.log("USER: ", this.state.user_photos)}

                <div className="container user_images">
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