import { connect } from "react-redux";
import { withTranslate, IntlActions } from "react-redux-multilingual";
import React, { Fragment, Component } from "react";
import Admin from "../../../admin";
import { useStyles } from "./estilos/stylesHolidayCatalog";
import { withStyles } from "@material-ui/core/styles";
import Header from '../../../header';
import Card from '../../../commons/card'
import * as actions from "../../../../actions";
import Paper from '@material-ui/core/Paper';
import TableDecored from '../../../commons/TableDecored';
import Button from '@material-ui/core/Button';
import InfoIcon from '@material-ui/icons/Info';
import clsx from 'clsx';
class HolidayCatalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allData: this.props.hcatalog,
      flagPush: false,
      columns: [
       // { title: 'Clave', field: 'vacationDaysID', type: 'numeric' },
        { title: 'Personal', field: 'employeeType.name'   },
        { title: 'Antiguedad', field: 'period' },
        { title: 'Días de Vacaciones', field: 'count' },
      ],
      id : 0
    
    };
        this.handleOn = this.handleOn.bind(this)
  }
  handleOn(data, action) {
    if (action === 'add') {
      this.props.addHcatalog(data, this.state.id)
    }
    if (action === 'update') {
      this.props.updateHcatalog(data, this.state.id)
    }
    if (action === 'delete') {
      this.props.deleteHcatalog(data, this.state.id)
    }
    // this.setState({
    //   openAdd: true
    // });
  }
  componentDidMount() { 
    this.props.getHcatalog()
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
            <Header title="Catalogo de vacaciones" module="RRHH" name="catalogos" />
            <Card color="title">
            </Card>
            <Paper className={classes.root}>
            
            <TableDecored
            addButton={true}
            Allactions={true}
            title = "Catalogo de Vacaciones"
            apiRestFull = {true}
            tableData={this.props.hcatalog}
            columns={this.state.columns}
            handleOnAdd={(data) => {this.handleOn(data, 'add')}}
            handleOnUpdate={(data) => {this.handleOn(data, 'update')}}
            handleOnDelete={data => this.handleOn(data, 'delete')}
          />  
        
            </Paper>
          </main>
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    alertHcatalog: state.state.alertHcatalog,
    hcatalog: state.hcatalog.hcatalog,
  };
};
const mapDispatch = (dispatch, props) => {
  return {
    getHcatalog: () => dispatch(actions.getHcatalog()),
    addHcatalog : (data, id) => dispatch(actions.addHcatalog(data, id)),
    updateHcatalog : (data, id) => dispatch(actions.updateHcatalog(data, id)),
    deleteHcatalog : (data, id) => dispatch(actions.deleteHcatalog(data, id)),
    offAlertHcatalog : () => dispatch(actions.offAlertHcatalog())
  };
};
// connect(mapStateToProps)
export default connect(
  // { ...actions },
  mapStateToProps,
  mapDispatch
)(withStyles(useStyles)(withTranslate(HolidayCatalog)));