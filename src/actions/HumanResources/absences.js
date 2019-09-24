import api from '../../config/api.jsx'
import { URL } from '../../config/constans'




const URL_dinamic = 'http://192.168.0.68:5083'
export const catchError = (codigo) =>{
    return dispatch => {
        if(codigo){
            dispatch({
                type: 'ALERT_ABSENCES',
                value: "Ha ocurrido un error"
            })

        }
    }    
}

export const offAlertAbsences = () =>{
    return dispatch => {
            dispatch({
                type: 'OFF_ALERT_ABSENCES'
            })
    }    
}



export const getAbsences = (id) => {
    return dispatch => {
        api.get(URL_dinamic + URL.ABSENCES.AbsencesGET + '1/' +id)
            .then(response => {
                dispatch({
                    type: 'SET_ABSENCES',
                    value: response.data
                })
            })
            .catch(err => {
            //  let codigo = err.response.status || ''
                 dispatch(catchError(400))
            })
    }
}


export const getAbsencesTable = (EmployeeID, Period) => {
    return dispatch => {
        api.get(URL_dinamic + URL.ABSENCES.AbsencesGET + '1/' +EmployeeID +'/' + Period)
            .then(response => {
                dispatch({
                    type: 'SET_ABSENCES_TABLE',
                    value: response.data
                })
            })
            .catch(err => {
            //  let codigo = err.response.status || ''
                 dispatch(catchError(400))
            })
    }
}




export const addAbsences = (data) => {
    let dataToEdit = {
        "mandantID": 0,
        "id": 0,
        "name": data.name
    }
    return dispatch => {
        api.post('http://192.168.0.68:5083'.ABSENCES.AbsencesGET , dataToEdit)
            .then(response => {
                dispatch(getAbsences())
            })
            .catch(err => {
                let codigo = err.response.status || ''
                 dispatch(catchError(codigo))
            })
    }
}

export const updateAbsences = (data, period) => {
    console.log(data, 'esta es la data que recibe abscense')
    let dataToEdit = {
        "startDate": data.startDate,
        "endDate":data.endDate,
        "status": data.status,
        "period": period      
    }
    return dispatch => {
        api.put(URL.ABSENCES.AbsencesGET  + data.absenceRequestID || 0, dataToEdit)
            .then(response => {
                dispatch(getAbsences(this.props.match.params))
            })
            .catch(err => {
                let codigo = err.response.status || ''
                dispatch(catchError(codigo))
            })
    }
}


export const deleteAbsences = (data) => {
    return dispatch => {
        api.delete('http://192.168.0.68:5083'.ABSENCES.AbsencesGET + data.id || 0)
            .then(response => {
                dispatch(getAbsences())
            })
            .catch(err => {
                let codigo = err.response.status || ''
                dispatch(catchError(codigo))
            })
    }
}


