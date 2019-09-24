import React from 'react';
import MaterialTable from 'material-table';
import Search from '@material-ui/icons/Search'
import Sort from '@material-ui/icons/ArrowUpward'
import SaveAlt from '@material-ui/icons/SaveAlt'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Clear from '@material-ui/icons/CancelOutlined'
import Check from '@material-ui/icons/Check'
import FilterList from '@material-ui/icons/FilterList'
import Add from '@material-ui/icons/Add'
import Edit from '@material-ui/icons/Edit'
import Remove from '@material-ui/icons/Delete'
export default function MaterialTableDemo() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Clave', field: 'clave', type: 'numeric' },
      { title: 'Nombre', field: 'nombre' },
      { title: 'Apellido Paterno', field: 'apellidopaterno' },
      { title: 'Apellido Materno', field: 'apellidomaterno' },
      { title: 'Tipo Personal', field: 'tipopersonal' },
      { title: 'Depto/Area', field: 'deptoarea' },
      { title: 'Fecha Ingreso', field: 'fechaingreso' },
      { title: 'Fecha Baja', field: 'fechabaja' },
    ],
    data: [
      {
        clave: '1', nombre: 'Christian',
        apellidopaterno: 'Cadena', apellidomaterno: 'Mendez',
        tipopersonal: 'externo', deptoarea: 'Finanzas', fechaingreso: '18/12/1994',
        fechabaja: '20/12/1994'
      },
      {
        clave: '2', nombre: 'Ozram',
        apellidopaterno: '', apellidomaterno: '',
        tipopersonal: 'interno', deptoarea: 'Ipsos', fechaingreso: '15/08/2016',
        fechabaja: ''
      },
      {
        clave: '3', nombre: 'Mario',
        apellidopaterno: 'Olvera', apellidomaterno: '',
        tipopersonal: 'interno', deptoarea: 'Ipsos', fechaingreso: '10/10/2009',
        fechabaja: ''
      },
      {
        clave: '4', nombre: 'Gloria',
        apellidopaterno: '', apellidomaterno: '',
        tipopersonal: 'interno', deptoarea: 'Ipsos', fechaingreso: '08/12/2019',
        fechabaja: ''
      },
      {
        clave: '5', nombre: 'Luis',
        apellidopaterno: 'Perez', apellidomaterno: '',
        tipopersonal: 'Interno', deptoarea: 'RRHH', fechaingreso: '10/11/2010',
        fechabaja: ''
      },
      {
        clave: '6', nombre: 'Juan',
        apellidopaterno: 'García', apellidomaterno: '',
        tipopersonal: 'interno', deptoarea: 'Ventas', fechaingreso: '25/11/2017',
        fechabaja: ''
      },
    ],
  });
  return (
    <MaterialTable
      title="Editable Example"
      icons={{
        Check: Check,
        DetailPanel: ChevronRight,
        Clear: Clear,
        Export: SaveAlt,
        Filter: FilterList,
        FirstPage: FirstPage,
        LastPage: LastPage,
        NextPage: ChevronRight,
        PreviousPage: ChevronLeft,
        Search: Search,
        SortArrow: Sort,
        Add: Add,
        Edit: Edit,
        Delete: Remove
      }}
      options={{
        filtering: true,
        actionsColumnIndex: -1
      }}
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.push(newData);
              setState({ ...state, data });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data[data.indexOf(oldData)] = newData;
              setState({ ...state, data });
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.splice(data.indexOf(oldData), 1);
              setState({ ...state, data });
            }, 600);
          }),
      }}
    />
  );
}