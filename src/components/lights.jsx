import React, { Component } from 'react';
import {
  List
} from 'react-mdl';
import ToggleLight from './togglelight';

class Lights extends Component {

  constructor(props) {
    super(props);
    this.refreshLights = this.refreshLights.bind(this);
    this.state = {
      lights: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.currentPage === 'lights' && nextProps.conn) {
      this.refreshLights(nextProps.conn);
    }
  }

  refreshLights(conn) {
    console.log("About to update lights");
    var comp = this;
    if(!conn.lights) {
      console.log("Loading conn from local state");
      conn = this.state.conn;
    }
    console.log("Updating lights");
    conn.lights()
      .then(function(lights) {
        lights.lights.forEach(function(v, k, a) {
          a[k].key = k;
        });
        comp.setState({
          lights: lights.lights
        });
        console.log("Updated lights");
      })
      .done();
  }

  render() {
    var comp = this;
    if(comp.props.currentPage === 'lights') {
      return (
        <div className="Lights">
          <List>
            {this.state.lights.map(function(light) {
              return(
                <ToggleLight
                  conn={comp.props.conn}
                  modes={comp.props.modes}
                  refresh={comp.refreshLights}
                  light={light} 
                  key={light.key}
                />
              );
            })}
          </List>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Lights
