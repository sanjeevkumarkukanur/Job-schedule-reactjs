import { combineReducers } from 'redux';
import JobScheduleRD from './JobScheduleRD';


const appReducers = combineReducers({
    ProductRD: JobScheduleRD
})
export default appReducers;