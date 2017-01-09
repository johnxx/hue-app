import React, { Component } from 'react';
import {
  ListItem,
  Switch
} from 'react-mdl';

class ToggleGroup extends Component {

  constructor(props) {
    super(props);
    this._flip = this._flip.bind(this);
    this._turnedOff = this._turnedOff.bind(this);
    this._turnedOn = this._turnedOn.bind(this);
    this.state = {
      groupOn: false
    }
  }

  componentWillUpdate(nextProps, nextState) {
    console.log("Will re-render toggle");
  }

  componentDidMount() {
    var group = this.props.group;
    if(group.state) {
      this.setState({
        groupOn: this.props.group.state.all_on
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      groupOn: nextProps.group.state.all_on
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
          "Updating " + this.props.group.name + " status to " + bulbStatus);
      this.setState({
        groupOn: on
      });
      this.props.refresh(this.props.conn);
    }
  }

  _flip(event) {
    var conn = this.props.conn,
        modes = this.props.modes;
    if(this.state.groupOn) {
      console.log("Switching " + this.props.group.name + " off.");
      conn.setGroupLightState(this.props.group.id, modes.off)
        .then(this._turnedOff)
        .done();
    } else {                                                                
      console.log("Switching " + this.props.group.name + " on.");
      conn.setGroupLightState(this.props.group.id, modes.on)
        .then(this._turnedOn)
        .done();
    }
  }

  render() {
    return(
      <ListItem className="ToggleGroup" >
        <Switch 
          checked={this.state.groupOn} 
          onChange={this._flip} 
          id={this.props.group.id} 
          ripple>{this.props.group.name}</Switch>
      </ListItem>
    );
  }
}

export default ToggleGroup;
