import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { Button, Navbar, Form, FormControl } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import { FaUserAlt } from 'react-icons/fa';

import { getAllPhotos } from '../actions/photos';
import { getComments, createComment } from '../actions/comments';
import { setLike } from '../actions/likes';
import { signout } from '../actions/user';

import PhotoCard from './photo_card';

class Dashboard extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            offset: 0,
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
            // console.log(this.state.offset);
            // async () => {
                // console.log("offsetBEFORE", this.state.offset);
                await this.setState({offset: this.state.offset + 5})
                // console.log("offsetAFTER", this.state.offset);
                this.props.getAllPhotos(this.state.offset)
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

    // async componentDidUpdate() {
    //     if(this.props.photos.length > 0) {
    //         this.props.photos.forEach()
    //     }
    // }

    componentDidMount() {
        
        window.addEventListener('scroll', this.onScroll, false);
        if(this.props.location.state) {
            this.setState({
                user: this.props.location.state.data.user
            })
        }

        // when the user comes back, there are photos on the store state already
        if(this.props.photos.length === 0) {
            this.props.getAllPhotos(this.state.offset);

        }
        this.setState({offset: this.state.photos.length});


    }

    componentWillUnmount() {

        window.removeEventListener('scroll', this.onScroll, false);
      }

    componentWillReceiveProps(nextProps) {
        
        if(this.props.photos !== nextProps.photos && this.state.photos.length !== 0) {
            if(nextProps.photos) {

                nextProps.photos.forEach(photo => {
                    this.state.photos.push(photo);
                });
            }
        }

        if(this.props.comments.data !== nextProps.comments.data) {
            // console.log("NEXTTTTT:", nextProps.comments.data);
            let photos = [...this.state.photos];
                let index = photos.findIndex(p => p.id === this.state.current_photo_id);
                // console.log(this.state.current_photo_id);
                if(nextProps.comments.data) {

                    nextProps.comments.data.forEach(comment => {
                        
                        photos[index].comments.push(comment);
                    });
                }

                // console.log(index);
        }

        if(this.props.likes.data !== nextProps.likes.data) {
            let photos = [...this.state.photos];
                let index = photos.findIndex(p => p.id === this.state.current_photo_id);
                console.log(nextProps.likes.message);
                if(nextProps.likes.data) {

                    if(nextProps.likes.message == 'Like criado!') {
                        
                        // nextProps.likes.data.data.forEach(like => {
                            
                            photos[index].likes.push(nextProps.likes.data);
                            // });
                    } else {
                        photos[index].likes.pop(nextProps.likes.data);
                    }
                }
        }
    }

    async removeTokenAndLogout() {
        // await this.setState({photos: []});
        // await this.setState({user: {}});
        sessionStorage.removeItem('token');
        this.props.history.push('/')
    }

    render() {

        const CommentSchema = Yup.object().shape({
            comment: Yup.string()
                .required('Comment is required'),
        })

        if(this.props.photos.length > 0 && this.state.photos.length === 0) {
            // this.setState({ photos: [...this.state.photos, this.props.photos.data.data] })
            // this.props.photos
            this.props.photos.forEach(photo => {
                this.state.photos.push(photo);
            });
            // console.log("AGORAVAI", this.state.photos)
        }

        // console.log("NEWCOMMENTS: ", this.props.comments)
        console.log("NEW DATA: ", this.state.photos)

        return (
            
            <div className="dashboard-bg">

                <Navbar className="navbar navbar-light dashboard-nav d-flex">
                <div className="p2" style={{color: "#FFF"}}>
                    Hello {this.state.user.name}
                </div>
                <div className="ml-auto p-2">
                    <Link className="btn btn-primary my-auto signout-btn" to={{
                        pathname: 'newphoto',
                        state: this.props.location.state
                    }}>
                        + photo
                    </Link>
                    <Button className="btn btn-primary my-auto signout-btn" type="submit" onClick={async () => {
                            await this.props.signout();
                            this.props.history.push("/");
                        }}>
                        Signout
                    </Button>
                </div>
                </Navbar>
                {/* {console.log("ENTROU!: ", this.props.photos.data)} */}

                <div className="container image-container">
                
                    {
                        this.props.photos &&
                        this.state.photos.map(photo => {

                            return (
                                <div key={photo.id} className="card images">
                                    {/* <div><PhotoCard photo={photo} /></div> */}

                                    <div className="card-header">{photo.user.profile_picture ? <img className="user-icon" src={photo.user.profile_picture}></img> : <FaUserAlt size="2.5em" color="#CCC" className="user-icon" />}  <b>{photo.user.name}</b></div>
                                    <img className="card-img-top" src={photo.path} alt={photo.description}></img>
                                    <hr></hr>
                                    <div className="card-body">
                                        <Button className="btn btn-primary btn-comment"  onClick={async () => {
                                            await this.setState({current_photo_id: photo.id});
                                            await this.props.setLike(photo.id);
                                        }}>{
                                            //GG!
                                            photo.likes.findIndex(like => like.user_id === this.state.user.id) === -1 ? "Like" : "Liked"
                                        }</Button>
                                        {/* <h3 className="card-title">{photo.title}</h3> */}
                                        <p>{photo.likes.length} likes</p>
                                        <p className="card-text"><b>{photo.user.name}</b> {photo.description}</p>
                                        <hr></hr>
                                        <div className="button-more-images">
                                        <p className="btn-more-images" onClick={async () => {
                                            await this.setState({current_photo_id: photo.id})
                                            await this.props.getComments(photo.id, photo.comments.length, 3);
                                            
                                            // photo.comments.current_offset++;
                                            
                                            
                                        }}>Load more comments</p>
                                        </div>
                                        {photo.comments.map(comment => {
                                            return (
                                                <p key={comment.id}><b>{comment.user.name}</b> {comment.comment}</p>
                                            )
                                        })}
                                        <hr></hr>
                                        <Formik
                                        initialValues={{
                                            comment: ''
                                        }}
                                        
                                        onSubmit={async (values, {resetForm}) => {
                                            try {
                                                resetForm();
                                                await this.props.createComment(photo.id, values.comment);
                                                await this.setState({current_photo_id: photo.id})
                                                photo.comments = [];
                                                await this.props.getComments(photo.id, 0, 3);
                                            } catch (err) {
                                                console.log("Error: ", err);
                                            }
                                        }}
                                        validationSchema={CommentSchema}
                                        >
            
                                        { props => {
                                        const {
                                            values,
                                            handleChange,
                                            handleSubmit,
                                            handleBlur,
                                            handleReset,
                                            resetForm,
                                            errors,
                                            touched,
                                        } = props;
                                        return (
                                            <div>
                                                 <Form onSubmit={handleSubmit} className="comment-form">
                                                    <FormControl className="comment-field"
                                                        type="text"
                                                        name="comment" 
                                                        placeholder="Add a comment..."
                                                        value={values.comment || ''}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />

                                                    <Button className="btn btn-primary btn-comment" type="submit">
                                                        Send
                                                    </Button>
                                                </Form>
                                            </div>
                                        )
                                           
                                    }}
                                        </Formik>
                                    </div>

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
        photos: state.photos,
        comments: state.comments,
        likes: state.likes,
        user: state.user
    };
}

function mapDispatchToProps (dispatch) {
    return bindActionCreators({ getAllPhotos, getComments, createComment, setLike, signout }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
