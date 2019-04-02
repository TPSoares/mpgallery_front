import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { Form, FormControl, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

class Dashboard extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }

        this.removeTokenAndLogout = this.removeTokenAndLogout.bind(this);
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
    }

    removeTokenAndLogout() {
        sessionStorage.removeItem('token');
        this.props.history.push('/')
    }

    render() {

        let token = sessionStorage.getItem('token');

        { 

        console.log("TOKEN DASHBOARD", token)}
        const LogoutButton = withRouter(({ history }) => (
            <Button className="btn btn-primary signin-btn" 
                onClick={() => {
                        sessionStorage.removeItem('token');
                        history.push('/')
                    }
                }>
                Logout
            </Button>
          ))


        return (
            <div>
                {console.log("ENTROU!: ", this.state.user)}

                {this.state.user.email}
                
                <Button className="btn btn-primary signin-btn" type="submit" onClick={this.removeTokenAndLogout}>
                    Signout
                </Button>
                
            </div>
        )
    }
}

// function mapStateToProps(state) {
//     return {
//         user: state.user
//     };
// }

// export default connect(mapStateToProps, null)(Dashboard);
export default Dashboard;
