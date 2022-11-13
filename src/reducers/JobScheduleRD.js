import * as Types from '../actions/ActionTypes';

var initialState = [];

const JobScheduleRD = (state = initialState, action) => {
    let newJobScheduleList;
    switch (action.type) {
        case Types.GET_SCHEDULE:
            state = action.payload;
            return [...state];
        case Types.ADD_SCHEDULE:
            newJobScheduleList = [...state];
            let idMax = 0;
            for (let i = 0; i < newJobScheduleList.length; i++) {
                    idMax = newJobScheduleList[i].id;
            }
            action.payload.id=parseInt(1*idMax+1);
            newJobScheduleList.push(action.payload);
            console.log(action.payload.id);
            return newJobScheduleList;
        case Types.UPDATE_SCHEDULE:
            newJobScheduleList = [...state];
            let index = -1;
            for (let i = 0; i < newJobScheduleList.length; i++) {
                index++;
                if (newJobScheduleList[i].id === action.payload.id) {
                    break;
                }
            }
            if (index !== -1) {
                newJobScheduleList[index] = action.payload;
                console.log(newJobScheduleList);
                return newJobScheduleList;
            }
            break;
        
        default: return [...state];
    }
}
export default JobScheduleRD;