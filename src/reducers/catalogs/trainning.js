
const initialState = {
    training_catalog: [],
    alertTraining: false
}

const State = (state = initialState, action) => {
    switch (action.type) {
        case "SET_TRAINNING_CATALOG":
            return {
                ...state,
                training_catalog: action.value
            }
        case "ALERT_TRAINNING_CATALOG":
            return {
                ...state,
                alertTraining: {
                    status : !state.alertTraining,
                    message : action.value
                }
            } 
        case "OFF_ALERT_TRAINNING_CATALOG":
            return {
                ...state,
                alertTraining: {
                    status :  false,
                    message : ''
                }
            }         



        default:
            return state
    }

}

export default State
