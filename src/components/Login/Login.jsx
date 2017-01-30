import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Login extends React.Component {
  constructor() {
    super();

    this.data = {
      name: '',
      pass: '',
    };
  }


  render() {

    const error = () => {
      if (this.props.error) {
        return (
          <span> Dator erróneos </span>
        );
      }
      return null;
    };

    return(
      <div style={{ marginTop: '5%', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <div>
          <MuiThemeProvider>
          <TextField
              hintText="Usuario"
              fullWidth
              onChange={(event, value) => { this.data.name = value; }}
            />
          </MuiThemeProvider><br/>
          <MuiThemeProvider>
            <TextField
              hintText="Contraseña"
              fullWidth
              onChange={(event, value) => { this.data.pass = value; }}
            />
          </MuiThemeProvider><br/>
          <MuiThemeProvider>
            <RaisedButton label="Ingresar" primary={true} onTouchTap={() => this.props.login(this.data)} />
          </MuiThemeProvider>
          <br/>
          { error() }
          </div>
      </div>
    );
  }
}

export default Login;
