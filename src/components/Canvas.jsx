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
        { id: 'd4', maxScore: 82, name: 'Ado Kukic', picture: 'https://pbs.twimg.com/profile_images/1228501915991863296/29iVDHX5_400x400.jpg', },
        { id: 'a1', maxScore: 235, name: 'Bruno Krebs', picture: 'https://pbs.twimg.com/profile_images/1243511797610688512/Ubtxm_Q3_400x400.jpg', },                                                                  
        { id: 'c3', maxScore: 99, name: 'Diego Poza', picture: 'https://pbs.twimg.com/profile_images/478612888866009088/ySRi3jxT_400x400.jpeg', },
        { id: 'b2', maxScore: 129, name: 'Jeana Tahnk', picture: 'https://pbs.twimg.com/profile_images/1891692507/JeanaTahnk2_crop_400x400.jpg', },
        { id: 'e5', maxScore: 34, name: 'Jenny Obrien', picture: 'https://pbs.twimg.com/profile_images/558163656500715520/88sTtRBT_400x400.png', },
        { id: 'f6', maxScore: 153, name: 'Kim Maida', picture: 'https://pbs.twimg.com/profile_images/1202690224440168465/-uOewZUp_400x400.jpg', },
        { id: 'g7', maxScore: 55, name: 'Luke Oliff', picture: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png', },
        { id: 'h8', maxScore: 146, name: 'Sebastian Peyrott', picture: 'https://pbs.twimg.com/profile_images/631528500042825729/9giF9-bh_400x400.png', },
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