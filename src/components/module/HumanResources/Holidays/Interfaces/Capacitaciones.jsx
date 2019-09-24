import { connect } from "react-redux";
import { withTranslate, IntlActions } from "react-redux-multilingual";
import React, { Component } from "react";
import { useStyles } from "../estilos/styleHolidays";
import { withStyles } from "@material-ui/core/styles";
import TextFieldDecored from "../../../../commons/TextFieldDecored";
import ListDecored from '../../../../../components/commons/ListDecored'
class Holidays extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allData: [],
      flagPush: false
    };
    this.handleOnChange = this.handleOnChange.bind(this);
  };
  componentWillUnmount() {
    if (this.state.allData !== '') {
    }
  }
  componentDidMount() {
  }
  handleOnChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;
    let fillValue = value
    if (typeof (fillValue) === 'string') {
      fillValue = fillValue.toUpperCase();
    }
    this.setState(prevState => ({
      allData: {
        // object that we want to update
        ...prevState.allData, // keep all other key-value pairs
        [name]: fillValue // update the value of specific key
      }
    }));
  }
  handleOnChangeDate(date, name) {

    this.setState(prevState => ({
      allData: {
        // object that we want to update
        ...prevState.allData, // keep all other key-value pairs
        [name]: date // update the value of specific key
      }
    }));
  }
  render() {
    const { allData } = this.state;
    return (
      <div style={{ width: "100%" }}>
        <div style={{ width: "38%", float: "left" }}>
          <TextFieldDecored
            style={{ width: "100%", marginRight: "3%" }}
            name="empleado"
            value={'Christian Cadena Mendez'}
            label="Empleado"
            readOnly={true}
            maxLength="40"
            handleOnChange={event => {
              this.handleOnChange(event);
            }}
          />
        </div>
        <ListDecored></ListDecored>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    datosHolidays: state.datosHolidays.datos_holidays
  };
};
const mapDispatch = (dispatch, props) => {
  return {
    // setDatosGenerales: value => dispatch(actions.datosHolidays(value)),
    // menuAdminFuncion: value => dispatch(actions.menu_admin(value))
  };
};
// connect(mapStateToProps)
export default connect(
  // { ...actions },
  mapStateToProps,
  mapDispatch
)(withStyles(useStyles)(withTranslate(Holidays)));
