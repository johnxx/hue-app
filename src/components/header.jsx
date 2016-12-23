import React, { Component } from 'react';
import { 
  Navigation, 
  Header,
} from 'react-mdl';
import logo from '../logo.svg';

class AppHeader extends Component {
  render() {
    return (
      <div className="App-header">
        <Header transparent title={this.props.title} >
          <Navigation>
            <a href="">Link</a>
          </Navigation>
        </Header>
        <img src={logo} className="App-logo" alt="logo" />
      </div>
    );
  }
}

export default AppHeader;
