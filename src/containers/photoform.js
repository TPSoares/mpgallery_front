import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../styles/style.css";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { Button, Navbar, Form, FormControl } from 'react-bootstrap';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import { postImage } from '../actions/photos';


class PhotoForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            file: undefined,
        }

        this.handleImageChange = this.handleImageChange.bind(this);

    }

    handleImageChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        if (file) {
            console.log(file);
          reader.onloadend = (e) => {
            this.setState({
              file: e.target.result

            
            //    {
            //       name: file.name,
            //       size: file.size,
            //       type: file.type
            //   },
            //   imagePreviewUrl: reader.result
            });
            console.log(this.state.file);
          };
          reader.readAsDataURL(file);
        //   this.props.setFieldValue(this.props.field.name, file);
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
        // console.log(this.props.match.params);
        console.log(this.props);
    }

    render() {
        const NewPhotoSchema = Yup.object().shape({
            title: Yup.string()
                .required('Title is required'),
            description: Yup.string()
                .required('Description is required'),
            // image: Yup.mixed()
            //     .required('Image is required'),
        })

        return (
            
            <div className="login-background">
           
            <Formik
                    initialValues={{
                        title: '',
                        description: '',
                        image: undefined,
                    }}
                    onSubmit={async (values) => {
                        // let formData = new FormData();
                        // formData.append("file", this.state.file);
                        // console.log("IMAGE", formData);
                        values.image = this.state.file
                        try {
                            await this.props.postImage(values);
                            this.props.history.push('/dashboard', this.props.location.state);
                        } catch (err) {
                            console.log("Error: ", err);
                        }
                    }}
                    validationSchema={NewPhotoSchema}
                >
                { props => {
                    const {
                        values,
                        handleChange,
                        handleSubmit,
                        handleBlur,
                        isSubmitting,
                        errors,
                        touched,
                        setFieldValue
                    } = props;
                    return (
                        <div className="form-div-signup">
                            <Form className="form-div-inside-signup" onSubmit={handleSubmit}>
                            
                                <FormControl className="form-control-signup" 
                                type="text" 
                                name="title" 
                                placeholder="Title"
                                value={values.title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                />
                                {errors.title && touched.title && <div className="input-feedback">{errors.title}</div>}

                                <FormControl className="form-control"
                                type="name" 
                                name="description" 
                                placeholder="Description"
                                value={values.description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                /> 
                                {errors.description && touched.description && <div className="input-feedback" >{errors.description}</div>}
                                
                                <input className="form-control"
                                type="file" 
                                name="image" 
                                placeholder="Image"
                                onChange={this.handleImageChange}
                                
                                // setFieldValue={setFieldValue}
                                // onBlur={handleBlur}
                                /> 
                                {/* {errors.image && touched.image && <div className="input-feedback" >{errors.image}</div>} */}
                               
                                <Button className="btn btn-primary signin-btn" type="submit" disabled={isSubmitting}>
                                    Post photo
                                </Button>
                                
                                <Link className="btn btn-danger cancel-btn" to={{
                                    pathname: 'dashboard',
                                    state: this.props.location.state
                                }}>
                                    Cancel
                                </Link>
                            </Form> 
                        </div>      
                    )
                }}
                </Formik>
            
            
           
                          
            </div>
        );
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
    return bindActionCreators({ postImage }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoForm);

