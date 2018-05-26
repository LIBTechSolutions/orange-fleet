import { combineReducers } from 'redux';
import vehicleDetails from './vehicleDetails';
import syncState from './syncState'

export default combineReducers({
    vehicleDetails,
    syncState
});