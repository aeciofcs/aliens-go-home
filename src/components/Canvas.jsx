import React from 'react';
import PropTypes from 'prop-types';
import Sky from './Sky';
import Ground from './Ground'
import CannonBase from './CannonBase'
import CannonPipe from './CannonPipe';
import CannonBall from './CannonBall';
import CurrentScore from './CurrentScore';
import FlyingObject from './FlyingObject';
import Heart from './Heart';
import StartGame from './StartGame';
import Title from './Title';
import Login from './Login';
import { signIn } from 'auth0-web';
import Leaderboard from './Leaderboard';

const Canvas = (props) => {
    const gameHeight = 1200;
    const viewBox = [window.innerWidth / -2, 
                     100 - gameHeight, 
                     window.innerWidth, 
                     gameHeight];
    
    const leaderboard = [
        { id: 'd4', maxScore: 82, name: 'Ado Kukic', picture: 'https://twitter.com/KukicAdo/photo', },
        { id: 'a1', maxScore: 235, name: 'Bruno Krebs', picture: 'https://twitter.com/brunoskrebs/photo', },                                                                  
        { id: 'c3', maxScore: 99, name: 'Diego Poza', picture: 'https://twitter.com/diegopoza/photo', },
        { id: 'b2', maxScore: 129, name: 'Jeana Tahnk', picture: 'https://twitter.com/jeanatahnk/photo', },
        { id: 'e5', maxScore: 34, name: 'Jenny Obrien', picture: 'https://twitter.com/jenny_obrien/photo', },
        { id: 'f6', maxScore: 153, name: 'Kim Maida', picture: 'https://twitter.com/KimMaida/photo', },
        { id: 'g7', maxScore: 55, name: 'Luke Oliff', picture: 'https://twitter.com/mroliff/photo', },
        { id: 'h8', maxScore: 146, name: 'Sebastian Peyrott', picture: 'https://twitter.com/speyrott/photo', },
    ];

    return (
        <svg 
            id="aliens-go-home-canvas"            
            preserveAspectRatio="xMaxYMax none"
            onMouseMove={props.trackMouse}
            viewBox={viewBox}
        >
            <defs>
                <filter id="shadow">
                    <feDropShadow dx="1" dy="1" stdDeviation="2" />
                </filter>
            </defs>
            <Sky />
            <Ground />
            <CannonPipe rotation={props.angle} />
            <CannonBase />
            <CannonBall position={{x: 0, y: -100}}/>
            <CurrentScore score={15} />
            
            {!props.gameState.started &&
                <g>
                    <StartGame onClick={() => props.startGame() } />
                    <Title />
                    <Leaderboard currentPlayer={leaderboard[6]} authenticate={signIn} leaderboard={leaderboard} />                    
                </g>
            }
            {props.gameState.started &&
                <g>
                    {props.gameState.flyingObjects.map(flyingObject => (
                        <FlyingObject
                            key={flyingObject.id}
                            position={flyingObject.position}
                        />
                    ))}
                </g>
            }
            
            <Heart position={{x: -300, y: 35}} />
            
        </svg>
    );
};

Canvas.propTypes = {
    angle: PropTypes.number.isRequired,

    gameState: PropTypes.shape({
        started: PropTypes.bool.isRequired,
        kills: PropTypes.number.isRequired,
        lives: PropTypes.number.isRequired,
        flyingObjects: PropTypes.arrayOf(PropTypes.shape({
            position: PropTypes.shape({
                x: PropTypes.number.isRequired,
                y: PropTypes.number.isRequired
            }).isRequired,
            id: PropTypes.number.isRequired,
        })).isRequired,
    }).isRequired,

    trackMouse: PropTypes.func.isRequired,
    
    startGame: PropTypes.func.isRequired,
};

export default Canvas;