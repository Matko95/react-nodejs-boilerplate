import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../Header/';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/register';

class Register extends Component{
    constructor(props){
        super(props);

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }
    handleFormSubmit(e){
        e.preventDefault();
        let username = this.refs.username.value;
        let password = this.refs.password.value;

        this.props.register(username, password);
    }
    render(){

        if(this.props.isAuthenticated){
            return (
                <Redirect to="/" push/>
            )
        }

        return(
            <div className="login">
                <Header/>
                <form className="login-form" onSubmit={this.handleFormSubmit}>
                    <label htmlFor="username" className="username">
                        <input type="text" ref="username" placeholder="Username"/>
                    </label>
                    <label htmlFor="password" className="password">
                        <input type="password" autoComplete="new-password" ref="password" placeholder="Password"/>
                    </label>
                    <input onSubmit={this.handleFormSubmit} type="submit" value="Register"/>
                    <p className="error">{this.props.registerError}</p>
                </form>
            </div>
        )
    }
}


const mapStateToProps = (state) => state.user;
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actions, dispatch)
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);