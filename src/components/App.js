import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Signin from '../containers/signin';
import Signup from '../containers/signup';
import Dashboard from '../containers/dashboard';
import PhotoForm from '../containers/photoform';
import Profile from '../containers/profile';
import Edit from '../containers/edit';
import ReactGA from 'react-ga';
import withTracker from './analytics';

class App extends Component {

    

    render() {

        return (
            <div>
                <BrowserRouter>
                    <div>
                        {/* <Header /> */}
                        <Route exact path="/" component={withTracker(Signin)} />
                        <Route path="/dashboard" component={withTracker(Dashboard)} />
                        <Route path="/signup" component={withTracker(Signup)} />
                        <Route path="/newphoto" component={withTracker(PhotoForm)} />
                        <Route path="/profile" component={withTracker(Profile)} />
                        <Route path="/edit" component={withTracker(Edit)} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};

export default App;