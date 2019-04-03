import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { Form, FormControl, Button, Navbar } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import { getAllPhotos } from '../actions/photos';

class Dashboard extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            page: 1,
            photos: []
        }

        this.removeTokenAndLogout = this.removeTokenAndLogout.bind(this);
    }

    componentWillMount() {

        let token = sessionStorage.getItem('token');
        if(!token || token === null) {
            this.props.history.push("/");
        }

        // getAllPhotos();
    }

    componentDidMount() {
        if(this.props.location.state) {
            this.setState({
                user: this.props.location.state.data.user
            })
        }

        this.props.getAllPhotos(this.state.page);
    }

   componentWillReceiveProps(nextProps) {
       if(this.props.photos.data !== nextProps.photos.data && this.state.photos.length != 0) {
            nextProps.photos.data.data.forEach(photo => {
                this.state.photos.push(photo);
            });
       }
   }

    removeTokenAndLogout() {
        sessionStorage.removeItem('token');
        this.props.history.push('/')
    }

    render() {

        let token = sessionStorage.getItem('token');

        { 

        // console.log("TOKEN DASHBOARD", token)
        console.log("PHOTOS: ", this.state.photos)
         }
        // const LogoutButton = withRouter(({ history }) => (
        //     <Button className="btn btn-primary signin-btn" 
        //         onClick={() => {
        //                 sessionStorage.removeItem('token');
        //                 history.push('/')
        //             }
        //         }>
        //         Logout
        //     </Button>
        //   ))

        if(this.props.photos.data && this.state.photos.length == 0) {
            // this.setState({ photos: [...this.state.photos, this.props.photos.data.data] })
            // this.props.photos
            this.props.photos.data.data.forEach(photo => {
                this.state.photos.push(photo);
            });
            console.log("AGORAVAI", this.state.photos)
        }

        return (
            <div className="dashboard-bg">

                <Navbar className="navbar navbar-light dashboard-nav d-flex">
                <div className="p2" style={{color: "#FFF"}}>
                    Hello {this.state.user.name}
                </div>
                <div className="ml-auto p-2">
                    <Button className="btn btn-primary my-auto signout-btn" type="submit">
                        Edit
                    </Button>
                    <Button className="btn btn-primary my-auto signout-btn" type="submit" onClick={this.removeTokenAndLogout}>
                        Signout
                    </Button>
                </div>
                </Navbar>
                {/* {console.log("ENTROU!: ", this.props.photos.data)} */}

                <div className="container image-container">
                
                    {
                        this.props.photos.sucess &&
                        this.state.photos.map(photo => {
                            return (
                                <div key={photo.id} className="card images">
                                    <div className="card-header"><b>{photo.user.name}</b></div>
                                    <img className="card-img-top" src={photo.path}></img>
                                    <hr></hr>
                                    <div className="card-body">
                                        <h3 className="card-title">{photo.title}</h3>
                                        <hr></hr>
                                        <p className="card-text">{photo.description}</p>
                                        {/* <p className="card-text">By: {photo.user.name}</p> */}
                                    </div>
                                </div>
                            )
                        })
                    }
                    {/* {this.props.photos.data[0].id} */}
                </div>

                <Button className="btn btn-primary my-auto signout-btn" type="submit" 
                    onClick={async () => {
                        // console.log("PAGEBEFORE", this.state.page);
                        await this.setState({page: this.state.page + 1})
                        // console.log("PAGEAFTER", this.state.page);
                        this.props.getAllPhotos(this.state.page)
                    }
                    }>
                        +
                </Button>
                
            </div>
            
        )
    }
}

function mapStateToProps(state) {
    return {
        photos: state.photos
    };
}

function mapDispatchToProps (dispatch) {
    return bindActionCreators({ getAllPhotos }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
// export default Dashboard;
