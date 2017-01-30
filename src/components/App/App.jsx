import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import {Tabs, Tab} from 'material-ui/Tabs';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import axios from 'axios';

import Login from '../Login';
import Register from '../Register';
import Comics from '../Comics';
import Employees from '../Employees';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isloading: true,
      sectionActive: 1,
      comics: [],
      employees: [],
      searched: '',
      isLogged: false,
      error: false,
    };

    this.users = [
      {
        name: 'fernando',
        pass: 'abc123'
      },
      {
        name: 'david',
        pass: 'abc123'
      }
    ];

    this.jsxFab = null;
  }

  handleActiveSection(tab) {
    this.setState({ sectionActive: tab.props.index });
  }

  fetchComics() {
    // user init
    axios.get('http://jsonplaceholder.typicode.com/photos/1')
      .then((response) => {
        const currentComics = this.state.comics;
        currentComics.push(response.data);
        this.setState({ comics: currentComics});
      })
      .catch((error) => { console.log('Error getting comics ', error); });
  }

  componentWillMount() {
    this.fetchComics();
  }

  login(data) {
    console.log(data);
    const isCorrect = this.users.filter(item => item.name === data.name && item.pass === data.pass);
    console.log(isCorrect.length);
    if (isCorrect.length > 0) {
      this.setState({ isLogged: true });
    } else {
      this.setState({ error: true });
    }
    console.log(this.state.error);
  }

  logout() {
    this.setState({ isLogged: false, error: false });
  }

  showFAB(jsxFab) {
    this.jsxFab = jsxFab;
  }
  
  render() {
    // if (this.state.isLogged){
      return (
        <div style={{ height: 100, padding: 0, margin: 0 }}>
          <MuiThemeProvider>
            <AppBar
              showMenuIconButton={false}
              title='ComicsAdmin - Salir'
              iconElementRight={
                <TextField
                  hintText={'Buscar'}
                  hintStyle={{ color: '#FFF' }}
                  onChange={(e, v) => {
                    this.setState({ searched: v });
                  }}
                />
              }
              onTitleTouchTap={() => this.logout()}
            />
          </MuiThemeProvider>

          <MuiThemeProvider>
            <Tabs>
              <Tab label="Empleados" onActive={tab => this.handleActiveSection(tab)}>
                <Employees
                  searched={this.state.searched}
                  openModal={(state) => this.openModal(state)}
                  showFab={(jsxFab) => { this.showFAB(jsxFab) }}
                />
              </Tab>

              <Tab label="Comics" onActive={tab => this.handleActiveSection(tab)}>
                <Comics
                  data={this.state.comics}
                  searched={this.state.searched}
                  openModal={(state) => this.openModal(state)}
                />
              </Tab>
            </Tabs>
          </MuiThemeProvider>

          {this.jsxFab}
        </div>
      );
    // }

    /* return (
      <Login login={(data) => this.login(data)} error={this.state.error} />
    );*/
  }
}

export default App;
