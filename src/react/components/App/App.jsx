import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getData } from '../../actions/getData';
import { checkLogin } from '../../actions/login';

import Header from '../Header/';

class App extends Component{
    constructor(props){
        super(props);

        this.state = {
        }
    }
    componentWillMount(){
        this.props.checkLogin();
    }
    render(){

        if(localStorage.getItem("jwt") === null){
            return (
                <Redirect to="/login"/>
            )
        }
        return(
            <div className="app">
                <Header>
                </Header>
            </div>
        );
    }
}

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => bindActionCreators({
    getData,
    checkLogin
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);