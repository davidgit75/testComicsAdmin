import React from 'react';

import axios from 'axios';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';

class Employees extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      openModal: false,
      cid : null,
      typeAction: null,
    };

    this.dataForm = {
      title: '',
      first: '',
      last: '',
      email: '',
      password: ''
    };

    this.dataToShow = [];
  }

  fetchEmployees() {
    // user init
    axios.get('https://randomuser.me/api')
      .then((response) => {
        const currentEmployees = this.state.data;
        const data = response.data;
        const obj = {
          id: 0,
          title: data.results[0].name.title,
          first: data.results[0].name.first,
          last: data.results[0].name.last,
          email: data.results[0].email,
          password: data.results[0].login.password,
        };
        currentEmployees.push(obj);
        this.setState({ data: currentEmployees});
      })
      .catch((error) => { console.log('Error getting employees ', error); });
  }

  componentWillMount() {
    this.props.showFab(
      <MuiThemeProvider>
          <FloatingActionButton 
            style={{ position: 'absolute', right: 24, bottom: 45 }}
            onTouchTap={() => {
              this.setState({ typeAction: 'add' });
              this.openModal(true);
            }}
          >
            <ContentAdd />
          </FloatingActionButton>
        </MuiThemeProvider>
    );
    this.fetchEmployees();
  }

  openModal(state) {
    this.setState({ openModal: state });
  }

  resetDataForm() {
    this.dataForm = {
      title: '',
      first: '',
      last: '',
      email: '',
      password: ''
    };
  }

  filterData() {
    if (this.props.searched.length > 0) {
      this.dataToShow = this.state.data.filter(item => item.first.search(this.props.searched) >= 0 || item.last.search(this.props.searched) >= 0 );
    } else {
      this.dataToShow = this.state.data;
    }
  }
  
  getActionsForModal(type) {
    const actionsUpdate = [
      <FlatButton
        label="Cancelar"
        primary={true}
        onTouchTap={() => {
          this.openModal(false);
          this.resetDataForm();
        }}
      />,
      <FlatButton
        label="Editar"
        primary={true}
        onTouchTap={() => {
          this.editItem();
          this.openModal(false);
          console.log(`cid :: ${this.state.cid}`);
          this.resetDataForm();
        }}
      />,
    ];

    const actionsDelete = [
      <FlatButton
        label="Cancelar"
        primary={true}
        onTouchTap={() => {
          this.openModal(false);
          this.resetDataForm();
        }}
      />,
      <FlatButton
        label="Eliminar"
        primary={true}
        onTouchTap={() => {
          this.removeItem();
          this.openModal(false);
          this.resetDataForm();
        }}
      />,
    ];

    const actionsAdd = [
      <FlatButton
        label="Cancelar"
        primary={true}
        onTouchTap={() => {this.openModal(false); this.resetDataForm();}}
      />,
      <FlatButton
        label="Agregar"
        primary={true}
        onTouchTap={() => {this.addItem(); this.resetDataForm();}}
      />,
    ];

    let actions = null;
    if (type === 'delete') {
      actions = actionsDelete;
    } else if (type === 'add') {
      actions = actionsAdd;
    }  else if (type === 'update') {
      actions = actionsUpdate;
    }

    return actions;
  }

  iterateData() {
    const iconButtonElement = (
      <IconButton
        touch={true}
      >
        <MoreVertIcon color={grey400} />
      </IconButton>
    );

    const rightIconMenu = (id) => {
      return(
        <IconMenu iconButtonElement={iconButtonElement}>
          <MenuItem onTouchTap={() => {
            this.openModal(true);
            this.findItem(id);
            this.setState({ typeAction: 'update' });
          }}>
            Editar
          </MenuItem>

          <MenuItem onTouchTap={() => {
            this.openModal(true);
            this.findItem(id);
            this.resetDataForm();
            this.setState({ typeAction: 'delete' });
          }}>Eliminar</MenuItem>
        </IconMenu>
      );
    };

    const dataToShow = [];

    this.dataToShow.map((employee, index) => {
      if (employee !== null){
        dataToShow.push(
            <div key={index}>
              <ListItem
                  leftAvatar={<Avatar src="https://randomuser.me/api/portraits/thumb/men/16.jpg" />}
                  rightIconButton={rightIconMenu(index)}
                  primaryText={`${employee.title} ${employee.first} ${employee.last}`}
                  secondaryText={
                    <p>
                      <emph>Email: </emph> {employee.email}
                    </p>
                  }
                  secondaryTextLines={2}
                />
              <Divider inset={true} />
            </div>
        );
      }
    });

    return dataToShow;
  }

  addItem() {
    const cData = this.state.data;
    const newDataWithId = this.dataForm;
    newDataWithId.id = newDataWithId.length;
    cData.push(newDataWithId);
    this.setState({ data: cData, cid: null });
    this.openModal(false);
  }

  removeItem() {
    if (this.state.cid != null) {
      const cData = this.state.data;
      const objToDelete = this.state.data.map((item, idx) => item.id == this.state.cid ? idx : null);
      const indexToDelete = objToDelete.filter(item => item != null);
      if (indexToDelete.length > 0) {
        cData.splice(indexToDelete[0], 1);
      }
      this.setState({ data: cData, cid: null });
      this.openModal(false);
    }
  }

  editItem() {

  }

  findItem(id) {
    this.dataForm = this.state.data[id];
    this.setState({ cid: id });
  }

  render() {
    const modalEmployee = () => {
      let title = null;
      let content = null;
      if(this.state.typeAction === 'add' || this.state.typeAction === 'update') {
        if (this.state.typeAction === 'add') { title = 'Agregar empleado' }
        else if (this.state.typeAction === 'update') { title = 'Actualizar empleado' }
        content = formEmployee(this.dataForm);
      } else if (this.state.typeAction === 'delete') {
        title = 'Eliminar empleado';
        content = <span> ¿Desea eliminar este empleado? </span>;
      }
      return (
        <Dialog
          title={title}
          actions={this.getActionsForModal(this.state.typeAction)}
          modal
          open={this.state.openModal}
        >
          { content }
        </Dialog>
      );
    };

    const formEmployee = (props) => {
      return (
        <div>
          <TextField
            hintText="Trato (Sr., Sra)"
            fullWidth
            defaultValue={props.title}
            onChange={(event, value) => { this.dataForm.title = value; console.log(this.editEmployee); }}
          /> <br/>
          <TextField
            hintText="Nombre"
            fullWidth
            defaultValue={props.first}
            onChange={(event, value) => { this.dataForm.first = value }}
          /> <br/>
          <TextField
            hintText="Apellido"
            fullWidth
            defaultValue={props.last}
            onChange={(event, value) => { this.dataForm.last = value }}
          /> <br/>
          <TextField
            hintText="Correo electrónico"
            fullWidth
            defaultValue={props.email}
            onChange={(event, value) => { this.dataForm.email = value }}
          /> <br/>
          <TextField
            hintText="Contraseña"
            fullWidth
            defaultValue={props.password}
            onChange={(event, value) => { this.dataForm.password = value }}
          /> <br/>
        </div>
      );
    };

    this.filterData();

    return(
      <div style={{ padding: '5em' }}>
        <MuiThemeProvider>
          <List>
            { this.iterateData() }
          </List>
        </MuiThemeProvider>

        

        <MuiThemeProvider>
          { modalEmployee()}
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Employees;
