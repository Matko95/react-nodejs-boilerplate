import React from 'react';

const Header = ({children}) => (
    <header className="dashboard-header">
        <h1 className="logo">Title</h1>
        {children}
    </header>
);

export default Header;