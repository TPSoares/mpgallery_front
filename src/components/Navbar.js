import React, { Component } from 'react';
import { Button, Navbar, Form, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import { FaUserAlt } from 'react-icons/fa';
import { FiHeart, FiUser } from 'react-icons/fi';
import { IoMdSend, IoIosLogOut } from 'react-icons/io';
import { MdAddAPhoto } from 'react-icons/md';

import { signout } from '../actions/user';



class Nav extends Component {

    constructor(props) {
        super(props);
        this.state={
            user: {}
        }
    }

    componentDidMount() {

        console.log("NAV:",this.props);

        if(this.props.location.state) {
            this.setState({
                user: this.props.location.state.data.user
            })
        }

        // console.log(this.props)
    }

    render() {
        return (
            <Navbar className="navbar navbar-light dashboard-nav d-flex">
                <div className="p2" style={{color: "#FFF"}}>
                {/* {this.state.user.profile_picture ? <img className="user-icon" src={this.state.user.profile_picture}></img> : <FaUserAlt size="2.5em" color="#CCC" className="user-icon" />}  <b>{this.state.user.name}</b> */}
                <Link className="my-auto nav-items-logo" to={{
                        pathname: 'dashboard',
                        state: this.props.location.state
                    }}>
                        MPGALLERY
                    </Link>
                </div>
                <div className="ml-auto p-2">

                    <Link className="my-auto nav-items" to={{
                        pathname: 'profile',
                        state: this.props.location.state
                    }}>
                        <FiUser size="2em" color="#FFF"/>
                    </Link>
                    
                    <Link className="my-auto nav-items" to={{
                        pathname: 'newphoto',
                        state: this.props.location.state
                    }}>
                        <MdAddAPhoto size="2em" color="#FFF"/>
                    </Link>
                    <Button className="my-auto nav-items" style={{padding: 0}} type="submit" onClick={async () => {
                        this.props.history.push("/");
                        await this.props.signout();
                        }}>
                        <IoIosLogOut size="2em" color="#FFF"/>
                    </Button>
                </div>
                </Navbar>
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
    return bindActionCreators({ signout }, dispatch)
}



export default connect(mapStateToProps, mapDispatchToProps)(Nav);