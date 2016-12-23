import React, { Component } from 'react';
import {
  Layout,
  Drawer,
  Navigation,
} from 'react-mdl';
import AppHeader from './components/header';
import Toggles from './components/toggles';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.refreshGroups = this.refreshGroups.bind(this);
    this.state = {
      hostname: 'philips-hue',
      username: 'f2phc-1MJ6a0C2lAej7VxoUndaFPaPl9nhrgcK3v',
      description: "Hue App",
      groups: [],
    };
  }

  refreshGroups(conn) {
    console.log("About to update groups");
    var comp = this;
    if(!conn.groups) {
      console.log("Loading conn from local state");
      conn = this.state.conn;
    }
    console.log("Updating groups");
    conn.groups()
      .then(function(groups) {
        groups.shift();
        groups.forEach(function(v, k, a) {
          a[k].key = k;
        });
        comp.setState({
          groups: groups
        });
        console.log("Updated groups");
      })
      .done();
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
      modes: modes
    });
    this.refreshGroups(hue);
  }

  render() {
    return (
      <div className="App">
        <Layout>
          <AppHeader title={this.state.description} refresh={this.refreshGroups} />
          <Drawer title="Hue App">
            <Navigation>
              <a href="">Link</a>
            </Navigation>
          </Drawer>
          <Toggles 
            groups={this.state.groups} 
            modes={this.state.modes}
            conn={this.state.conn}
            refresh={this.refreshGroups}
          />
        </Layout>
      </div>
    );
  }
}

export default App;
