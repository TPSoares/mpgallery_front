import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {



    render() {

        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        dota
                        {/* <Header />
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/surveys" component={Dashboard} />
                        <Route path="/surveys/new" component={SurveyNew} /> */}
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};

export default App;