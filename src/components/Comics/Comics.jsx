import React from 'react';

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

class Comics extends React.Component {

  constructor() {
    super();
  }

  listComics() {
    const data = [];
    this.props.data.map((comic, index) => {
      data.push(
        <span key={index}>{JSON.stringify(comic)}</span>
      );
    });
    return data;
  }

  render() {

    const iconButtonElement = (
      <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left"
      >
        <MoreVertIcon color={grey400} />
      </IconButton>
    );

    const rightIconMenu = (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem>Reply</MenuItem>
        <MenuItem>Forward</MenuItem>
        <MenuItem>Delete</MenuItem>
      </IconMenu>
    );

    return(
      <div style={{ padding: '5em' }}>
        <MuiThemeProvider>
          <List>
            <ListItem
              leftAvatar={<Avatar src="https://randomuser.me/api/portraits/thumb/men/16.jpg" />}
              rightIconButton={rightIconMenu}
              primaryText="Brendan Lim"
              secondaryText={
                <p>
                  <span style={{color: darkBlack}}>Brunch this weekend?</span><br />
                  I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
                </p>
              }
              secondaryTextLines={2}
            />
            <Divider inset={true} />
          </List>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Comics;
