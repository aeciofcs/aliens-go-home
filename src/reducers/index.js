import { MOVE_OBJECTS, START_GAME } from '../actions/index'
import moveObjects from './moveObjects'
import startGame from './startGame';

const initialGameState = {
    started: false,
    kills: 0,
    lives: 3,
};

const initalState = {
    //message: `It's easy to integrate React and Redux, isn't it?`,
    angule: 45,
    gameState: initialGameState,
};

function reducer(state = initalState, action){
    switch (action.type) {
        case MOVE_OBJECTS:
            return moveObjects(state, action);
        case START_GAME:
            return startGame(state, initialGameState);
        default:
            return state;
    }
    
}

export default reducer;