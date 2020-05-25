import { connect } from 'react-redux';
import App from '../App'
import { moveObjects, startGame } from '../actions/index';

const mapStateToProps = state => ({
    //message: state.message,
    angle: state.angle,
    gameState: state.gameState,
});

const mapDispatchToProps = dispatch => ({
    
    moveObjects: (mousePosition) => {
        dispatch(moveObjects(mousePosition));
    },

    startGame: () => {
        dispatch(startGame());
    },
});

const Game = connect(
    mapStateToProps,
    mapDispatchToProps,     
)(App);

export default Game;