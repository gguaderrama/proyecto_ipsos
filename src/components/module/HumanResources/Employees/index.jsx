import { connect } from "react-redux";
import { withTranslate, IntlActions } from "react-redux-multilingual";
import React, { Fragment, Component } from "react";
import Admin from "../../../admin";
import { useStyles } from "./stylesEmployees";
import { withStyles } from "@material-ui/core/styles";
import Header from '../../../header';
import * as actions from "../../../../actions";
import Card from '../../../commons/card'
import TableDecored from '../../../commons/TableDecored';
import Link from '@material-ui/core/Link';
class Brief extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allData: this.props.datosGenerales,
      flagPush: false,
      columns: [
        // { title: 'Clave', field: 'id', type: 'numeric'},
        { title: 'Nombre', field: 'name',
        render: rowData => <a href={`/rh/holidays/${rowData.id}`} >{rowData.name}</a>
        //  render: rowData => <Link to={`rh/holidays/ ${rowData.id}`} >{rowData.name}</Link>
        },
        { title: 'Apellido Paterno', field: 'lastName'},
        { title: 'Apellido Materno', field: 'secondLastName'},
        { title: 'RFC', field: 'fiscalkey'},
        { title: 'CURP', field: 'citizenIdentificator'},
        { title: 'Tipo Personal', field: 'employee.employeeType.name'},
        { title: 'Depto/Area', field: 'employee.area.name'},
        { title: 'Fecha Ingreso', field: 'employee.onboardingDate'},
        { title: 'Fecha Baja', field: 'employee.offboardingDate'},
      ],
      id : 0
    };
    this.handleOn = this.handleOn.bind(this)
  }
  handleOn(data, action) {
    if (action === 'add') {
      this.props.addEmployees(data, this.state.id)
    }
    if (action === 'update') {
      this.props.updateEmployees(data, this.state.id)
    }
    if (action === 'delete') {
      this.props.deleteEmployees(data, this.state.id)
    }
    // this.setState({
    //   openAdd: true
    // });
  }
  componentDidMount() { 
    this.props.getEmployees()
    const { id } = this.props.match.params
    this.setState({
      id  : id
    })
  }
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <div className="root">
          <Admin {...this.props} />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Header title="" module="RRHH" name="empleados" />
            <Card color="title">
            </Card>
            <TableDecored
            addButton={false}
            Allactions={false}
            title = "Empleados"
            apiRestFull = {false}
            tableData={this.props.employees}
            columns={this.state.columns}
            handleOnAdd={(data) => {this.handleOn(data, 'add')}}
            handleOnUpdate={(data) => {this.handleOn(data, 'update')}}
            handleOnDelete={data => this.handleOn(data, 'delete')}
          />    
          </main>
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    alertEmployees: state.state.alertEmployees,
    employees: state.employees.employees,
  };
};
const mapDispatch = (dispatch, props) => {
  return {
    getEmployees: () => dispatch(actions.getEmployees()),
    addEmployees : (data, id) => dispatch(actions.addEmployees(data, id)),
    updateEmployees : (data, id) => dispatch(actions.updateEmployees(data, id)),
    deleteEmployees : (data, id) => dispatch(actions.deleteEmployees(data, id)),
    offAlertEmployees : () => dispatch(actions.offAlertEmployees())
  };
};
// connect(mapStateToProps)
export default connect(
  // { ...actions },
  mapStateToProps,
  mapDispatch
)(withStyles(useStyles)(withTranslate(Brief)));
