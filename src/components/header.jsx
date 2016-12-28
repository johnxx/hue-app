import React, { Component } from 'react';
import { 
  Navigation, 
  Header,
} from 'react-mdl';
// import logo from '../logo.svg';

class AppHeader extends Component {
  render() {
    return (
      <Header title={this.props.title} >
        <Navigation>
          <span></span>
        </Navigation>
      </Header>
    );
  }
}

export default AppHeader;
