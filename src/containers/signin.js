import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';


import { signin } from '../actions/user';

class Signin extends Component {
    render() {
        return (
            <Formik
                initialValues={{
                     email: '',
                     password: ''
                }}
                onSubmit={(values) => {
                    // setTimeout(() => {
                    //   alert(JSON.stringify(values, null, 2));
                    //   setSubmitting(false);
                    // }, 500);
                    signin(values.email, values.password);
                }}
                const validationSchema={Yup.object().shape({
                    email: Yup.string().email('E-mail is not valid').required('E-mail is required'),
                    password: Yup.string().required('Password is required')
                })}
            >
            { props => {
                const {
                    values,
                    handleChange,
                    isSubmitting,
                    errors,
                    touched,
                } = props;
                return(
                    <Form>
                        <Field 
                        type="text" 
                        name="email" 
                        placeholder="Email address"
                        value={values.email}
                        onChange={handleChange}
                        />
                        {errors.email && touched.email && <div>{errors.email}</div>}

                        <Field 
                        type="password" 
                        name="password" 
                        placeholder="Password"
                        value={values.password}
                        onChange={handleChange} 
                        /> 
                        {errors.password && touched.password && <div>{errors.password}</div>}

                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>       
                )
            }}
            </Formik>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ signin }, dispatch)
}

export default connect(null, mapDispatchToProps)(Signin);

