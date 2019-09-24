import { connect } from "react-redux";
import { withTranslate, IntlActions } from "react-redux-multilingual";
import React, { Fragment, Component } from "react";
import Admin from "../../../admin";
import { useStyles } from "./estilos/stylesTrainingRequest";
import { withStyles } from "@material-ui/core/styles";
import Header from '../../../header';
import Card from '../../../commons/card'
import DatePickerDecored from "../../../commons/DatePickerDecored";
import * as actions from "../../../../actions";
import Button from '../../../commons/ButtonGlobal'
import Paper from '@material-ui/core/Paper';
import ButtonInfo from '../../../commons/ButtonInfo';
import TextFieldDecored from '../../../commons/TextFieldDecored'
import TextAreaDecored from '../../../commons/TextAreaDecored'
import SelectDecored from '../../..//commons/SelectDecored';

class TrainningRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      value: 0,
      allData: this.props.trainingrequest,
      flagPush: false,
      activeTabIndex: 0,
      openSideBar: false
      ,
      id: 0
    };
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOn = this.handleOn.bind(this)
  }
  handleOn(data, action) {
    if (action === 'add') {
      this.props.addTrainingRequest(data, this.state.id)
    }
    if (action === 'update') {
      this.props.updateTrainingRequest(data, this.state.id)
    }
    if (action === 'delete') {
      this.props.deleteTrainingRequest(data, this.state.id)
    }
  }
  componentDidMount() {
    this.props.getTrainningCatalog()
    this.props.getEmployees()
  }
  handleOnChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;
    let fillValue = value;
    if (typeof fillValue === "string") {
      fillValue = fillValue.toUpperCase();
    }
    this.setState(prevState => ({
      allData: {
        ...prevState.allData, // keep all other key-value pairs
        [name]: fillValue // update the value of specific key
      }
    }));
  }
  saveData(data) {
    console.log(data, '*********************')

  }

  render() {
    const { classes } = this.props;
    const { allData } = this.state;
    return (
      <Fragment>
        <div className="root">
          <Admin {...this.props} />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Header title="Solicitud de capacitación" module="RRHH" name="capacitación" />
            <Card color="title">
            </Card>
            <Paper className={classes.root}>
              <div style={{ width: "100%" }}>
                <div style={{ display: 'flex', width: "100%", float: "left" }}>
                  <SelectDecored name="curso"
                    label='Curso'
                    value={allData && allData.curso || ''}
                    itemList={this.props.trainingCatalog}
                    keySelect='id'
                    valueSelect='name'
                    handleOnChange={event => {
                      this.handleOnChange(event);
                    }}
                    style={{ height: '50%', width: "25%", marginRight: "5%" }} />
                  <SelectDecored name="solicita"
                    label='Solicita'
                    value={allData && allData.solicita || ''}
                    itemList={this.props.employees}
                    keySelect='id'
                    valueSelect='name'
                    handleOnChange={event => {
                      this.handleOnChange(event);
                    }}
                    style={{ height: '50%', width: "25%", marginRight: "5%" }} />
                     <DatePickerDecored
            style={{ width: "47%", marginRight: "3%" }}
            label="Fecha"
            name="fecha_brief"
            value={ this.props.training_sch && this.props.training_sch.trainning && this.props.training_sch.startDate || ''}
            handleOnChange={event => {
              this.handleOnChangeDate(event );
            }}
          />
                  <TextAreaDecored
                    style={{ width: "100%" }}
                    name="comentario_cap"
                    value={allData && allData.comentario_cap || ''}
                    handleOnChange={(event) => { this.handleOnChange(event, 'comentario_cap') }}
                    label="Comentarios"
                    rows={1}
                  />
                </div>
              </div>
              <div style={{ width: "10%", float: "right" }}>
                <Button icon="save" color="primary" title="Guardar" onClick={() => {this.saveData(allData)}} />
              </div>
            </Paper>
          </main>
        </div>
        <div>
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    alertTrainingRequest: state.state.alertTrainingRequest,
    employees: state.employees.employees,
    trainingCatalog: state.trainingCatalog.training_catalog // get valor Cursos
  };
};
const mapDispatch = (dispatch, props) => {
  return {
    getTrainningCatalog: () => dispatch(actions.getTrainningCatalog()),
    getEmployees: () => dispatch(actions.getEmployees()),
    getTrainingRequest: () => dispatch(actions.getTrainingRequest()),
    addTrainingRequest: (data, id) => dispatch(actions.addTrainingRequest(data, id)),
    updateTrainingRequest: (data, id) => dispatch(actions.updateTrainingRequest(data, id)),
    deleteTrainingRequest: (data, id) => dispatch(actions.deleteTrainingRequest(data, id)),
    offAlertTrainingRequest: () => dispatch(actions.offAlertTrainingRequest())
  };
};
// connect(mapStateToProps)
export default connect(
  // { ...actions },
  mapStateToProps,
  mapDispatch
)(withStyles(useStyles)(withTranslate(TrainningRequest)));