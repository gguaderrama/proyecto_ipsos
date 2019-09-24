import api from '../../config/api.jsx'
import { URL } from '../../config/constans'
import base  from '../../config/constans/apiConfig'

export const catchError = (codigo) =>{
    return dispatch => {
        if(codigo){
            dispatch({
                type: 'ALERT_TRAINNINGS_SCHEDULES',
                value: "Ha ocurrido un error"
            })

        }
    }    
}

export const offAlertTraining_schedules = () =>{
    return dispatch => {
            dispatch({
                type: 'OFF_ALERT_TRAINNINGS_SCHEDULES'
            })
    }    
}



export const getTraining_schedules= (id) => {
    return dispatch => {
        api.get(base.urlTrainnings + URL.TRAINNINGS_SCHEDULES.TrainersSchedule  + id)
            .then(response => {
                dispatch({
                    type: 'SET_TRAINNINGS_SCHEDULES',
                    value: response.data
                })
            })
            .catch(err => {
            //  let codigo = err.response.status || ''
                 dispatch(catchError(400))
            })
    }
}

export const getTraining_sch= (id) => {
    return dispatch => {
        api.get(base.urlTrainnings + URL.TRAINNINGS_SCHEDULES.TrainersSch  + id)
            .then(response => {
                dispatch({
                    type: 'SET_TRAINNINGS_SCH',
                    value: response.data
                    
                })
                console.log(response,'haaaa')
            })
            .catch(err => {
            //  let codigo = err.response.status || ''
                 dispatch(catchError(400))
            })
    }
}



export const addTraining_schedules = (data, id) => {
    let dataToEdit = {
        "provinceID": id, // valor de la provincia
        "mandantID": 0,
        "name": data.name
    }
    return dispatch => {
        api.post(URL.TRAINNINGS_SCHEDULES.TrainersSchedule, dataToEdit)
            .then(response => {
                dispatch(getTraining_schedules())
            })
            .catch(err => {
                let codigo = err.response.status || ''
                 dispatch(catchError(codigo))
            })
    }
}

export const updateTraining_schedules = (data, id) => {
    let dataToEdit = {
        "mandantID": 0,
        "id": 0,
        "name": data.name
    }
    return dispatch => {
        api.put(URL.TRAINNINGS_SCHEDULES.TrainersSchedule  + data.id || 0, dataToEdit)
            .then(response => {
                dispatch(getTraining_schedules())
            })
            .catch(err => {
                let codigo = err.response.status || ''
                dispatch(catchError(codigo))
            })
    }
}

export const deleteTraining_schedules = (data, id) => {
    return dispatch => {
        api.delete(URL.TRAINNINGS_SCHEDULES.TrainersSchedule  + data.id || 0, dataToEdit)
            .then(response => {
                dispatch(getTraining_schedules())
            })
            .catch(err => {
                let codigo = err.response.status || ''
                dispatch(catchError(codigo))
            })
    }
}


