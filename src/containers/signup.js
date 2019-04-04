import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "../styles/style.css";

import { signup } from '../actions/user';

class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }
    }

    componentDidUpdate() {
        if(this.props.user) {
            this.props.history.push('/dashboard', this.props.user);
        }
    }

    render() {
        const SignupSchema = Yup.object().shape({
            email: Yup.string()
                .email('E-mail is not valid')
                .required('E-mail is required'),
            password: Yup.string()
                .required('Password is required'),
            name: Yup.string()
                .required('Name is required'),
            age: Yup.number('Invalid field, must be a number')
        })

        return (
            
            <div className="login-background">
            {/* {            
                console.log("TOKEN", token)
} */}
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                        name: '',
                        age: '',
                        gender: ''
                    }}
                    onSubmit={(values) => {

                        try {
                            this.props.signup(values)
                        } catch (err) {
                            console.log("Error: ", err);
                        }
                    }}
                    validationSchema={SignupSchema}
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
                    } = props;
                    return (
                        <div className="form-div-signup">
                            <Form className="form-div-inside-signup" onSubmit={handleSubmit}>
                            
                                <FormControl className="form-control-signup" 
                                type="text" 
                                name="email" 
                                placeholder="Email address"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                />
                                {errors.email && touched.email && <div className="input-feedback">{errors.email}</div>}

                                <FormControl className="form-control"
                                type="name" 
                                name="name" 
                                placeholder="Name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                /> 
                                {errors.name && touched.name && <div className="input-feedback" >{errors.name}</div>}
                                
                                <FormControl className="form-control"
                                type="password" 
                                name="password" 
                                placeholder="Password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                /> 
                                {errors.password && touched.password && <div className="input-feedback" >{errors.password}</div>}
                               
                                <FormControl className="form-control"
                                type="age" 
                                name="age" 
                                placeholder="Age"
                                value={values.age}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                /> 
                                {errors.age && touched.age && <div className="input-feedback" >{errors.age}</div>}
                                
                                <FormControl className="form-control"
                                type="gender" 
                                name="gender" 
                                placeholder="Gender"
                                value={values.gender}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                /> 
                                {errors.gender && touched.gender && <div className="input-feedback" >{errors.gender}</div>}

                                <Button className="btn btn-primary signin-btn" type="submit" disabled={isSubmitting}>
                                    Signup
                                </Button>
                                
                                <Link className="btn btn-danger cancel-btn" to="/">
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
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ signup }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

