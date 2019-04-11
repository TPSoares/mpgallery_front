// import React, { Component } from 'react';
// import { bindActionCreators } from "redux";
// import { connect } from 'react-redux';

// import { getUser } from '../actions/photos';
// import photos from '../reducers/photos';

// class PhotoCard extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             photo: {},
//             user: {}
//         }
//     }

//     componentDidMount() {
        
//         this.props.getUser(this.props.photo.user_id);
//         // if(this.props.location.state) {

//         // }
//         // console.log(this.props.match.params);
//         console.log(this.props);
//         this.setState({photo: this.props.photo});
//     }

//     componentWillReceiveProps() {
//         console.log(this.props);
//         this.setState({user: this.props.user});
//     }


//     render() {
//         return(
//             <div>
//                 {this.state.user.name}
//                 {/* {console.log("USER: ", this.state.user)} */}
//             </div>
//         )
//     }
// }

// function mapStateToProps(state) {
//     return {
//         // photos: state.photos,
//         // comments: state.comments,
//         // likes: state.likes,
//         user: state.user.user_photo
//     };
// }

// function mapDispatchToProps (dispatch) {
//     return bindActionCreators({getUser}, dispatch)
// }

// export default connect(mapStateToProps, mapDispatchToProps)(PhotoCard);