import * as Types from './ActionTypes';
import callapi from '../callapi/callapi';

export const getJobSchedule = () => {  
    return (dispatch) => {
        return callapi('schedule_jobs', 'GET', null).then(res => {
            dispatch(getJobScheduleRD(res.data))
        })
    }
}
export const getJobScheduleRD = (products) => {
    return {
        type: Types.GET_SCHEDULE,
        payload: products
    }

}
export function addJobSchedule(product){
    console.log(product)
    return (dispatch) => {
        return callapi('schedule_jobs', 'POST', product).then(res => {
            dispatch(addJobScheduleRD(product)); 
        })
    }
}
export function addJobScheduleRD(product){
    return {
        type: Types.ADD_SCHEDULE,
        payload: product
    }
}

export function PostEditJobSchedule(product){
    return (dispatch) => {
        return callapi(`schedule_jobs/${product.id}`, 'PUT', product).then(res => {
            dispatch(PostEditJobScheduleRD(product))
        })     
    }
}
export function PostEditJobScheduleRD(product){
    return{
        type: Types.UPDATE_SCHEDULE,
        payload: product,
    }
}
