import React from 'react'
import './Header.css';

const Header = () => {
    return (
        <span className='header' onClick={() => window.scroll(0, 0)}>
            🎬 CineQuest 📽️
        </span>
    )
}

export default Header