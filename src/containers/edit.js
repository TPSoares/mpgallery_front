import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../styles/style.css";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { Button, Navbar, Form, FormControl } from 'react-bootstrap';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import { edit } from '../actions/user';


class PhotoForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            // file: undefined,
        }

        // this.handleImageChange = this.handleImageChange.bind(this);

    }

    // handleImageChange(e) {
    //     e.preventDefault();
    //     let reader = new FileReader();
    //     let file = e.target.files[0];
    //     if (file) {
    //         console.log(file);
    //       reader.onloadend = (e) => {
    //         this.setState({
    //           file: e.target.result

            
    //         //    {
    //         //       name: file.name,
    //         //       size: file.size,
    //         //       type: file.type
    //         //   },
    //         //   imagePreviewUrl: reader.result
    //         });
    //         console.log(this.state.file);
    //       };
    //       reader.readAsDataURL(file);
    //     //   this.props.setFieldValue(this.props.field.name, file);
    //     }
    //   }
    
    componentWillMount() {
        
        let token = sessionStorage.getItem('token');
        if(!token || token === null) {
            this.props.history.push("/");
        }
        // if(this.props.location.state) {
        //     this.setState({
        //         user: this.props.location.state.data.user
        //     })
        // }

        if(this.props.user) {
            this.setState({
                user: this.props.user.data
            })
        } else {}
        
        console.log("EDITPROPS",this.props);
        // console.log("USER: ", this.state.user);
    }

    render() {
        const NewPhotoSchema = Yup.object().shape({
            name: Yup.string()
                .required('Name is required'),
            email: Yup.string()
                .email()
                .required('Email is required'),
            gender: Yup.string()
                .required('Gender is required'),
            age: Yup.string()
                .required('Age is required'),
        })

        return (

            
            <div className="login-background">
           
            <Formik
                    initialValues={{
                        name: this.state.user.name,
                        email: this.state.user.email,
                        gender: this.state.user.gender,
                        age: this.state.user.age
                    }}
                    onSubmit={async (values) => {
                        // let formData = new FormData();
                        // formData.append("file", this.state.file);
                        // console.log("IMAGE", formData);
                        await this.setState({
                            user: {
                                name: values.name,
                                email: values.email,
                                gender: values.gender,
                                age: values.age
                            }
                        })  
                        
                        try {
                            await this.props.edit(values);
                            // console.log(this.props.user);
                            this.props.history.push('/profile', this.props.location.state);
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
                                name="name" 
                                placeholder="Name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                />
                                {errors.name && touched.name && <div className="input-feedback">{errors.name}</div>}

                                <FormControl className="form-control"
                                type="email" 
                                name="email" 
                                placeholder="Email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                /> 
                                {errors.email && touched.email && <div className="input-feedback" >{errors.email}</div>}
                                
                                <FormControl className="form-control"
                                type="text" 
                                name="gender" 
                                placeholder="Gender"
                                value={values.gender}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                /> 
                                {errors.gender && touched.gender && <div className="input-feedback" >{errors.gender}</div>}
                                
                                <FormControl className="form-control"
                                type="text" 
                                name="age" 
                                placeholder="Age"
                                value={values.age}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                /> 
                                {errors.age && touched.age && <div className="input-feedback" >{errors.age}</div>}
                                
                                {/* <input className="form-control"
                                type="file" 
                                name="image" 
                                placeholder="Image"
                                onChange={this.handleImageChange}
                                
                                // setFieldValue={setFieldValue}
                                // onBlur={handleBlur}
                                />  */}
                                {/* {errors.image && touched.image && <div className="input-feedback" >{errors.image}</div>} */}
                               
                                <Button className="btn btn-primary signin-btn" type="submit" disabled={isSubmitting}>
                                    Update Profile
                                </Button>
                                
                                <Link className="btn btn-danger cancel-btn" to={{
                                    pathname: 'profile',
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
        // photos: state.photos,
        // comments: state.comments,
        // likes: state.likes,
        user: state.user
    };
}

function mapDispatchToProps (dispatch) {
    return bindActionCreators({ edit }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoForm);

