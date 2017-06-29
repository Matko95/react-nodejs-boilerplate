import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../../actions/login';

const Header = ({children, logout, isAuthenticated}) => (
    <header className="dashboard-header">
        <h1 className="logo">Title</h1>
        {children}
        {
            isAuthenticated &&
            <div className="logout" onClick={logout}>
                <span>Logout</span>
            </div>
        }
    </header>
);

const mapStateToProps = (state) => state.user;
const mapDispatchToProps = (dispatch) => bindActionCreators({ logout }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);