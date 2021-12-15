import React from 'react';
import './Header.css';

function Header({ toggleTheme, setToggleTheme }) {
    const theme = toggleTheme;
    
    return (
        <div className='header'>
            <div className='header__left'>Todo</div>
            <div className='header__right'><button onClick={setToggleTheme(true)}>Click</button></div>
        </div>
    )
}

export default Header;
