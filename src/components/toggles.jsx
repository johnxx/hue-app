import React, { Component } from 'react';
import {
  List
} from 'react-mdl';
import Toggle from './toggle';

class Toggles extends Component {

  render() {
    var comp = this;
    return(
      <div className="Toggles">
        <List>
          {this.props.groups.map(function(group) {
            return(
              <Toggle 
                toggler={comp.props.toggler} 
                group={group} 
                key={group.key}
                conn={comp.props.conn}
                modes={comp.props.modes}
              />
            );
          })}
        </List>
      </div>
    );
  }
}

export default Toggles;
