import React, { Component } from 'react';
import { 
  Navigation, 
  IconButton,
  Header,
} from 'react-mdl';
// import logo from '../logo.svg';

class AppHeader extends Component {
  render() {
    return (
      <Header title={this.props.title} >
        <Navigation>
          <span></span>
          <IconButton name="refresh" onClick={this.props.refresh} ripple/>
        </Navigation>
      </Header>
    );
  }
}

export default AppHeader;
