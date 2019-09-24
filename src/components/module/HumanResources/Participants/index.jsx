import { connect } from "react-redux";
import { withTranslate, IntlActions } from "react-redux-multilingual";
import React, { Fragment, Component } from "react";
import Admin from "../../../admin";
import { useStyles } from "./estilos/stylesParticipants";
import { withStyles } from "@material-ui/core/styles";
import Header from '../../../header';
import Card from '../../../commons/card'
import Button from '../../../commons/ButtonGlobal'
import Paper from '@material-ui/core/Paper';
import ButtonInfo from '../../../commons/ButtonInfo';
import Typography from '@material-ui/core/Typography';
import TextFieldDecored from '../../../commons/TextFieldDecored'
import TextAreaDecored from '../../../commons/TextAreaDecored'
import TableDecored from '../../../commons/TableDecored'
import DatePickerDecored from "../../../commons/DatePickerDecored";
import * as actions from "../../../../actions";
class Brief extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allData: this.props.capacitacion,
      allData2:this.props.cap,
      flagPush: false,
      columns: [
        { title: 'Nombre', field: 'person.name'},
        { title: 'Apellido', field: 'person.lastName' },
      ],
    };
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
        // object that we want to update
        ...prevState.allData, // keep all other key-value pairs
        [name]: fillValue // update the value of specific key
      },
      
      
    }));
     
  }
  componentDidMount() { 
    const { id } = this.props.match.params
    this.props.getTraining_schedules(id)
    this.props.getTraining_sch(id)
    this.setState({
      id  : id
    })
    
  }
  handleOnDelete(data) {
    if (data.id >= 1) {
      this.setState({
        tableData: this.state.tableData.filter(function (t) {
          return t.id !== data.id;
        })
      });
    }
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
            <Header title="Capacitación" module="RRHH" name="capacitación" />
            <Card color="title">
            </Card>
            <Paper className={classes.root}>
              <div style={{ width: "3%", float: "right" }}>
                <ButtonInfo></ButtonInfo>
              </div>
              <div style={{ width: "100%", marginTop: "1%" }}>
                <div style={{ display: 'flex', width: "100%", float: "left" }}>
                  <TextFieldDecored
                    style={{ width: "30%", marginRight: "5%" }}
                    name="curso_taller"
                    value={ this.props.training_sch && this.props.training_sch.trainning && this.props.training_sch.trainning.name || ''}
                    label="Curso taller"
                    readOnly={true}
                    maxLength="40"
                    handleOnChange={event => {
                      this.handleOnChange(event);
                    }}
                  />
                  <TextFieldDecored
                    style={{ width: "30%", marginRight: "5%" }}
                    // variant= "filled"
                    name="solicita"
                    value={ this.props.training_sch && this.props.training_sch.trainning && this.props.training_sch.request.name || ''}
                    readOnly={true}
                    maxLength="40"
                    handleOnChange={event => {
                      this.handleOnChange(event);
                    }}
                    label="Solicita"
                  />  
                  <TextFieldDecored
                    style={{ width: "30%" }}
                    // variant= "filled"
                    name="capacitador"
                    value={ this.props.training_sch && this.props.training_sch.trainning && this.props.training_sch.trainer.name || ''}
                    readOnly={false}
                    maxLength="40"
                    handleOnChange={event => {
                      this.handleOnChange(event);
                    }}
                    label="Capacitador"
                  />
                </div>
                <div style={{ display: 'flex', width: "100%", float: "left" }}>
                  <TextFieldDecored
                    style={{ width: "30%", marginRight: "5%" }}
                    name="lugar"
                    value={ this.props.training_sch && this.props.training_sch.trainning && this.props.training_sch.location || ''}
                    label="Lugar"
                    readOnly={false}
                    maxLength="40"
                    handleOnChange={event => {
                      this.handleOnChange(event);
                    }}
                  />
                  <DatePickerDecored
            style={{ width: "30%", marginRight: "5%" }}
            label="Fecha"
            name="fecha_brief"
            value={ this.props.training_sch && this.props.training_sch.trainning && this.props.training_sch.startDate || ''}
            handleOnChange={event => {
              this.handleOnChangeDate(event );
            }}
            />
              <DatePickerDecored
            style={{ width: "30%" }}
            label="Fecha"
            name="fecha_brief"
            value={ this.props.training_sch && this.props.training_sch.trainning && this.props.training_sch.endDate || ''}
            handleOnChange={event => {
              this.handleOnChangeDate(event );
            }}
            />
                </div>
                <TextAreaDecored
                  style={{ width: "100%" }}
                  name="comentario_cap"
                  value={allData && allData.comentario_cap || ''}
                  handleOnChange={(event) => { this.handleOnChange(event, 'comentario_cap') }}
                  label="Comentarios"
                  rows={1}
                />
              </div>
              <div style={{ display: 'flex', width: "100%" }}>
                {/* <Typography color="textPrimary">Lista de Participantes</Typography> */}
              </div>
              <TableDecored
                addButton={true}
                Allactions={true}
                title = "Lista de Participantes"
                apiRestFull={true}
                tableData={this.props.training_schedules}
                columns={this.state.columns}
                handleOnAdd={(data) => { this.handleOn(data, 'add') }}
                handleOnUpdate={(data) => { this.handleOn(data, 'update') }}
                handleOnDelete={data => this.handleOn(data, 'delete')}
              />
              <div style={{marginTop:'1%', display: 'flex', width: "22%", float: "right" }}>
                <Button style={{ display: 'flex', width: "40%", float: "right" }} title="Guardar" icon="save" color="primary" />
                <Button style={{ display: 'flex', width: "40%",marginLeft:'2%', float: "right" }} title="Descargar" icon="download" color="secondary" />
              </div>
            </Paper>
          </main>
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  console.log(state,'holaaa')
  return {
    // menu_admin: state.MenuAdmin.menu,
    training_schedules: state.training_schedules.training_schedules,
    training_sch: state.training_schedules.training_sch,
    alertTraining_schedules : state.training_schedules.alertTraining_schedules
  };
};
const mapDispatch = (dispatch, props) => {
  return {
    getTraining_schedules: (id) => dispatch(actions.getTraining_schedules(id)),
    addTraining_schedules : (data, period) => dispatch(actions.addTraining_schedules (data, period)),
    updateTraining_schedules: () => dispatch(actions.updateTraining_schedules()),
    getAbsencesTable: (EmployeeID, Period) =>  dispatch(actions.getAbsencesTable(EmployeeID, Period)),
    getTraining_sch:(id) => dispatch(actions.getTraining_sch(id))
  };
};
// connect(mapStateToProps)
export default connect(
  // { ...actions },
  mapStateToProps,
  mapDispatch
)(withStyles(useStyles)(withTranslate(Brief)));