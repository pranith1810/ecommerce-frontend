import { combineReducers } from 'redux';
import accessoriesReducer from './accessoriesReducer';
import appReducer from './appReducer';
import clothingReducer from './clothingReducer';
import homeReducer from './homeReducer';

export default combineReducers({
  app: appReducer,
  home: homeReducer,
  clothing: clothingReducer,
  accessories: accessoriesReducer,
});