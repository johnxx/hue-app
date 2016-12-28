import React, { Component } from 'react';
import {
  ListItem,
  Switch
} from 'react-mdl';

class ToggleLight extends Component {

  constructor(props) {
    super(props);
    this._flip = this._flip.bind(this);
    this._turnedOff = this._turnedOff.bind(this);
    this._turnedOn = this._turnedOn.bind(this);
    this.state = {
      lightOn: false
    }
  }

  componentDidMount() {
    var light = this.props.light;
    if(light.state) {
      this.setState({
        lightOn: this.props.light.state.on
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      lightOn: nextProps.light.state.on
    });
  }


  _turnedOn(result) {
    this._updateStatus(true, result)
  }

  _turnedOff(result) {
    this._updateStatus(false, result)
  }

  _updateStatus(on, success) {
    if(success) {
      var bulbStatus = on ? "on" : "off";
      console.log(
          "Updating " + this.props.light.name + " status to " + bulbStatus);
      this.setState({
        lightOn: on
      });
      this.props.refresh(this.props.conn);
    }
  }

  _flip(event) {
    var conn = this.props.conn,
        modes = this.props.modes;
    if(this.state.lightOn) {
      console.log("Switching " + this.props.light.name + " off.");
      conn.setLightState(this.props.light.id, modes.off)
        .then(this._turnedOff)
        .done();
    } else {                                                                
      console.log("Switching " + this.props.light.name + " on.");
      conn.setLightState(this.props.light.id, modes.on)
        .then(this._turnedOn)
        .done();
    }
  }

  render() {
    return(
      <ListItem className="ToggleLight" >
        <Switch 
          checked={this.state.lightOn} 
          onChange={this._flip} 
          id={this.props.light.id} 
          ripple>{this.props.light.name}</Switch>
      </ListItem>
    );
  }
}

export default ToggleLight;
