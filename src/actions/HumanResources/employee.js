import api from '../../config/api.jsx'
import { URL } from '../../config/constans'
import base  from '../../config/constans/apiConfig'

export const catchError = (codigo) =>{
    return dispatch => {
        if(codigo){
            dispatch({
                type: 'ALERT_EMPLOYEES',
                value: "Ha ocurrido un error"
            })

        }
    }    
}

export const offAlertEmployees = () =>{
    return dispatch => {
            dispatch({
                type: 'OFF_ALERT_EMPLOYEES'
            })
    }    
}



export const getEmployees = () => {
    return dispatch => {
        api.get(base.urlEmployees + URL.EMPLOYEES.EmployeesGET)
            .then(response => {
                dispatch({
                    type: 'SET_EMPLOYEES',
                    value: response.data
                })
            })
            .catch(err => {
            //  let codigo = err.response.status || ''
                 dispatch(catchError(400))
            })
    }
}



export const addEmployees = (data) => {
    let dataToEdit = {
        "mandantID": 0,
        "id": 0,
        "name": data.name
    }
    return dispatch => {
        api.post(base.urlEmployees + URL.EMPLOYEES.EmployeesGET , dataToEdit)
            .then(response => {
                dispatch(getEmployees())
            })
            .catch(err => {
                let codigo = err.response.status || ''
                 dispatch(catchError(codigo))
            })
    }
}

export const updateEmployees = (data) => {
    let dataToEdit = {
        "mandantID": 0,
        "id": 0,
        "name": data.name
    }
    return dispatch => {
        api.put(base.urlEmployees + URL.EMPLOYEES.EmployeesGET  + data.id || 0, dataToEdit)
            .then(response => {
                dispatch(getEmployees())
            })
            .catch(err => {
                let codigo = err.response.status || ''
                dispatch(catchError(codigo))
            })
    }
}


export const deleteEmployees = (data) => {
    return dispatch => {
        api.delete(base.urlEmployees + URL.EMPLOYEES.EmployeesGET + data.id || 0)
            .then(response => {
                dispatch(getEmployees())
            })
            .catch(err => {
                let codigo = err.response.status || ''
                dispatch(catchError(codigo))
            })
    }
}


