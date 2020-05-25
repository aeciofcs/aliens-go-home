import { MOVE_OBJECTS } from '../actions/index'
import moveObjects from './moveObjects'


const initalState = {
    //message: `It's easy to integrate React and Redux, isn't it?`,
    angule: 45,
};

function reducer(state = initalState, action){
    switch (action.type) {
        case MOVE_OBJECTS:
            return moveObjects(state, action);

        default:
            return state;
    }
    
}

export default reducer;