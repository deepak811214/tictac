import React,{useState} from 'react'
import "../Game.css"
import { NavLink } from 'react-router-dom';

function Detail(props) {
    const [name, setName] = useState({user:'',opponent:''});
    const mode = props.match.params.mode;
    return (
        <div className="container">
            <header style={{opacity:"0.8"}}>
                <NavLink to="/home" className="start-game" style={{fontSize: "1.4rem"}}><i className="fas fa-chevron-left"></i>Back</NavLink>
                <div className="game-name game-title">Tic Tac Toe</div>
            </header>
            <div className="board">
                <div className="item-container">
                    <div className="items">
                        <div className="input-container">
                            <div className = "name">
                                <span className="option-user">X</span>
                                <label>Name</label>
                            </div>
                            <input type="input" onChange={(e)=>setName({...name, user: e.target.value})} value={name.user} className="name-input"/>
                        </div>
                        <div className="input-container">
                            <div className = "name">
                                <span className="option-user">0</span>
                                <label>Opponent</label>
                            </div>
                            <input type="input" onChange={(e)=>setName({...name, opponent: e.target.value})} value={name.opponent} className="name-input"/>
                        </div>
                        <div className = "button-container">
                            <NavLink to={{pathname:'/game',state: {name,mode}}} className="start"><i className="fas fa-play"></i>Start</NavLink>  
                        </div>                       
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Detail
