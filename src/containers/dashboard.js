import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { Button, Navbar } from 'react-bootstrap';

import { getAllPhotos } from '../actions/photos';
import { getComments } from '../actions/comments';

class Dashboard extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            page: 1,
            photos: [],
            comment_limit: 3,
            current_photo_id: null
        }

        this.removeTokenAndLogout = this.removeTokenAndLogout.bind(this);   
        this.onScroll = this.onScroll.bind(this);   
    }

    onScroll = async () => {
        if (
            //check
          (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 1)
        ) {
            console.log(this.state.page);
            // async () => {
                // console.log("PAGEBEFORE", this.state.page);
                await this.setState({page: this.state.page + 1})
                // console.log("PAGEAFTER", this.state.page);
                this.props.getAllPhotos(this.state.page)
            // }
        }
      }

    componentWillMount() {

        let token = sessionStorage.getItem('token');
        if(!token || token === null) {
            this.props.history.push("/");
        }

        // getAllPhotos();
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onScroll, false);

        if(this.props.location.state) {
            this.setState({
                user: this.props.location.state.data.user
            })
        }

        this.props.getAllPhotos(this.state.page);

    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll, false);
      }

    componentWillReceiveProps(nextProps) {
        if(this.props.photos.data !== nextProps.photos.data && this.state.photos.length !== 0) {
                nextProps.photos.data.data.forEach(photo => {
                    this.state.photos.push(photo);
                });
        }

        if(this.props.comments.data !== nextProps.comments.data) {
            let photos = [...this.state.photos];
                let index = photos.findIndex(p => p.id === this.state.current_photo_id);
                // console.log(this.state.current_photo_id);
                nextProps.comments.data.forEach(comment => {

                    photos[index].comments.push(comment);
                });

                // console.log(index);

        }
    }

    removeTokenAndLogout() {
        sessionStorage.removeItem('token');
        this.props.history.push('/')
    }

    render() {

        if(this.props.photos.data && this.state.photos.length === 0) {
            // this.setState({ photos: [...this.state.photos, this.props.photos.data.data] })
            // this.props.photos
            this.props.photos.data.data.forEach(photo => {
                this.state.photos.push(photo);
            });
            console.log("AGORAVAI", this.state.photos)
        }

        console.log("NEWCOMMENTS: ", this.props.comments)
        console.log("NEW DATA: ", this.state.photos)

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
                                    <img className="card-img-top" src={photo.path} alt={photo.description}></img>
                                    <hr></hr>
                                    <div className="card-body">
                                        {/* <h3 className="card-title">{photo.title}</h3> */}
                                        <p>{photo.likes.length} likes</p>
                                        <p className="card-text"><b>{photo.user.name}</b> {photo.description}</p>
                                        <hr></hr>
                                        {photo.comments.map(comment => {
                                            return (
                                                <p key={comment.id}><b>{comment.user.name}</b> {comment.comment}</p>
                                            )
                                        })}
                                        <div className="button-more-images">
                                        <Button className="btn btn-primary btn-more-images" onClick={async () => {
                                            await this.setState({current_photo_id: photo.id})
                                            await this.props.getComments(photo.id, photo.comments.length, 3);
                                            
                                            // photo.comments.current_page++;
                                            
                                            
                                        }}>more comments</Button>
                                        </div>
                                        {/* <p className="card-text">By: {photo.user.name}</p> */}
                                    </div>
                                </div>
                            )
                        })
                    }
                    {/* {this.props.photos.data[0].id} */}
                </div>

                {/* <Button className="btn btn-primary my-auto signout-btn" type="submit" 
                    onClick={async () => {
                        // console.log("PAGEBEFORE", this.state.page);
                        await this.setState({page: this.state.page + 1})
                        // console.log("PAGEAFTER", this.state.page);
                        this.props.getAllPhotos(this.state.page)
                    }
                    }>
                        +
                </Button> */}
                
            </div>
            
        )
    }
}

function mapStateToProps(state) {
    return {
        photos: state.photos,
        comments: state.comments
    };
}

function mapDispatchToProps (dispatch) {
    return bindActionCreators({ getAllPhotos, getComments }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
