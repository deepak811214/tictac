import React from 'react'
import "../Game.css"
import { NavLink } from 'react-router-dom';

function Welcome() {
    return (
        <div className="container">
            <header style={{opacity:"0.8"}}>Tic Tac Toe</header>
            <div className="board">
                <div className="item-container">
                    <div className="items">
                        <NavLink to="/detail/1"><i className="fa fa-user"></i>One Player</NavLink>
                        <NavLink to="/detail/2"><i className="fas fa-user-friends"></i>Two Player</NavLink>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Welcome
