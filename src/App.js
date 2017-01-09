import React, { Component } from 'react';
import {
  Layout,
  Drawer,
  Navigation,
} from 'react-mdl';
import AppHeader from './components/header';
import Groups from './components/groups';
import Lights from './components/lights';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hostname: 'philips-hue.lan',
      username: 'DJZSSKqOD6aLGEHKM2KR2D1Zm6E5xQoPQvAodOlC',
      // username: 'f2phc-1MJ6a0C2lAej7VxoUndaFPaPl9nhrgcK3v',
      description: "Hue App"
    };
  }

  _kToMirek(kelvin) {
    return 1000000 / kelvin;
  }

  componentDidMount() {
    var hue = 
      new window.Hue.HueApi(this.state.hostname, this.state.username);
    var lightState = window.Hue.lightState;
    var temp = this._kToMirek(3000);
    var modes = {
      on: lightState.create().on().white(temp).bri(255),
      off: lightState.create().off()
    }
    this.setState({
      conn: hue,
      modes: modes,
      currentPage: "groups"
    });
  }

  setPage(page, proxy, event) {
    var layout = document.querySelector('.mdl-layout');
    this.setState({
      currentPage: page
    });
    layout.MaterialLayout.toggleDrawer();
  }

  render() {
    var comp = this;
    return (
      <div className="App">
        <Layout fixedHeader>
          <AppHeader title={this.state.description} />
          <Drawer title="Hue App">
            <Navigation>
              <a onClick={this.setPage.bind(comp, 'groups')} >Groups</a>
              <a onClick={this.setPage.bind(comp, 'lights')} >Lights</a>
            </Navigation>
          </Drawer>
          <Groups 
            conn={this.state.conn}
            modes={this.state.modes}
            currentPage={this.state.currentPage}
          />
          <Lights
            conn={this.state.conn}
            modes={this.state.modes}
            currentPage={this.state.currentPage}
          />
        </Layout>
      </div>
    );
  }
}

export default App;
