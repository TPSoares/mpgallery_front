import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import Nav from '../components/Navbar';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photo: {},
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


    }

    render() {
        return(
            <div>
                <Nav {...this.props} />

                {console.log("USER: ", this.state.user)}
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
    return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);