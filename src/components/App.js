import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Signin from '../containers/signin';
class App extends Component {



    render() {

        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        {/* <Header /> */}
                        <Route exact path="/" component={Signin} />
                        {/* <Route exact path="/surveys" component={Dashboard} /> */}
                        {/* <Route path="/surveys/new" component={SurveyNew} /> */}
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};

export default App;