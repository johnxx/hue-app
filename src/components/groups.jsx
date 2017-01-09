import React, { Component } from 'react';
import {
  List
} from 'react-mdl';
import ToggleGroup from './togglegroup';

class Groups extends Component {

  constructor(props) {
    super(props);
    this.refreshGroups = this.refreshGroups.bind(this);
    this.state = {
      groups: []
    };
  }

  componentWillUpdate(nextProps, nextState) {
    console.log("Will re-render groups");
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.currentPage === 'groups' && nextProps.conn) {
      this.refreshGroups(nextProps.conn);
    }
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

  render() {
    var comp = this;
    if(comp.props.currentPage === 'groups') {
      return (
        <div className="Groups">
          <List>
            {this.state.groups.map(function(group) {
              return(
                <ToggleGroup
                  conn={comp.props.conn}
                  modes={comp.props.modes}
                  refresh={comp.refreshGroups}
                  group={group} 
                  key={group.key}
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

export default Groups;
