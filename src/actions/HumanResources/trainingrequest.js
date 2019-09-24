import api from '../../config/api.jsx'
import { URL } from '../../config/constans'
import base  from '../../config/constans/apiConfig'

export const catchError = (codigo) =>{
    return dispatch => {
        if(codigo){
            dispatch({
                type: 'ALERT_TRAININGREQUEST',
                value: "Ha ocurrido un error"
            })

        }
    }    
}

export const offAlertTrainingRequest = () =>{
    return dispatch => {
            dispatch({
                type: 'OFF_ALERT_TRAININGREQUEST'
            })
    }    
}



export const getTrainingRequest = () => {
    return dispatch => {
        api.get(base.urlTrainingRequest + URL.TRAININGREQUEST.TrainingRequestGET)
            .then(response => {
                dispatch({
                    type: 'SET_TRAININGREQUEST',
                    value: response.data
                })
            })
            .catch(err => {
            //  let codigo = err.response.status || ''
                 dispatch(catchError(400))
            })
    }
}



export const addTrainingRequest = (data) => {
    let dataToEdit = {
        "mandantID": 0,
        "id": 0,
        "name": data.name
    }
    return dispatch => {
        api.post(base.urlTrainingRequest + URL.TRAININGREQUEST.TrainingRequestGET , dataToEdit)
            .then(response => {
                dispatch(getTrainingRequest())
            })
            .catch(err => {
                let codigo = err.response.status || ''
                 dispatch(catchError(codigo))
            })
    }
}

export const addTrainingRequestSave = (data) => {
    let dataToEdit = {
        "RequesterID": data.solicita,
        "RequestDate": data.comentario_cap,
        "TrainningID": data.curso,
        "Notes": data.comentario_cap
    }
    return dispatch => {
        api.post(base.urlTrainingRequest + URL.TRAININGREQUEST.TrainingRequestGET , dataToEdit)
            .then(response => {
                dispatch(getTrainingRequest())
            })
            .catch(err => {
                let codigo = err.response.status || ''
                 dispatch(catchError(codigo))
            })
    }
}

export const updateTrainingRequest = (data) => {
    let dataToEdit = {
        "mandantID": 0,
        "id": 0,
        "name": data.name
    }
    return dispatch => {
        api.put(base.urlTrainingRequest + URL.TRAININGREQUEST.TrainingRequestGET  + data.id || 0, dataToEdit)
            .then(response => {
                dispatch(getTrainingRequest())
            })
            .catch(err => {
                let codigo = err.response.status || ''
                dispatch(catchError(codigo))
            })
    }
}


export const deleteTrainingRequest = (data) => {
    return dispatch => {
        api.delete(base.urlTrainingRequest + URL.TRAININGREQUEST.TrainingRequestGET + data.id || 0)
            .then(response => {
                dispatch(getTrainingRequest())
            })
            .catch(err => {
                let codigo = err.response.status || ''
                dispatch(catchError(codigo))
            })
    }
}


