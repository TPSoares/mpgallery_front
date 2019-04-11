import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Signin from '../containers/signin';
import Signup from '../containers/signup';
import Dashboard from '../containers/dashboard';
import PhotoForm from '../containers/photoform';
class App extends Component {


    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        {/* <Header /> */}
                        <Route exact path="/" component={Signin} />
                        <Route path="/dashboard" component={Dashboard} />
                        <Route path="/signup" component={Signup} />
                        <Route path="/newphoto" component={PhotoForm} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};

export default App;