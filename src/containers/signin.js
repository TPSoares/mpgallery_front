import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { Form, FormControl, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "../styles/style.css";

import { signin } from '../actions/user';

class Signin extends Component {

    componentDidUpdate() {
        if(this.props.user.sucess) {
            this.props.history.push('/dashboard', this.props.user);
        }
    }

    render() {
        const SigninSchema = Yup.object().shape({
            email: Yup.string()
                .email('E-mail is not valid')
                .required('E-mail is required'),
            password: Yup.string()
                .required('Password is required')
        })

        let token = sessionStorage.getItem('token');
        return (
            <div className="login-background">
            {/* Case we get invalid credentials */}
            {this.props.user.sucess === false && <Alert className="alert alert-danger">{this.props.user.message}</Alert>}
                <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    onSubmit={(values) => {
                        try {
                            this.props.signin(values.email, values.password)
                        } catch (err) {
                            console.log("Error: ", err);
                        }
                    }}
                    validationSchema={SigninSchema}
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
                        <div className="form-div">
                            <Form className="form-div-inside" onSubmit={handleSubmit}>
                            
                                <FormControl className="form-control" 
                                type="text" 
                                name="email" 
                                placeholder="Email address"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                />
                                {errors.email && touched.email && <div className="input-feedback">{errors.email}</div>}

                                <FormControl className="form-control"
                                type="password" 
                                name="password" 
                                placeholder="Password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                /> 
                                {errors.password && touched.password && <div className="input-feedback" >{errors.password}</div>}

                                <Button className="btn btn-primary signin-btn" type="submit">
                                    Signin
                                </Button>
                                
                                <Link className="signin-redirect" to="/signup">Not registered? Signup here</Link>
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
    return bindActionCreators({ signin }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);

