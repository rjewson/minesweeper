import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

import game from './game/reducers';

const rootReducer = combineReducers({
  game
});

export default rootReducer;