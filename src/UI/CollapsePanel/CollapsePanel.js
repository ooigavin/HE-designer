import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class Panel extends Component {
  constructor(props) {
    super(props);

    this.icons = {
      'up': <Icon size={27} name="md-arrow-dropup-circle" color="#99E0E7" style={styles.toggleIcon} />,
      'down': <Icon size={27} name="md-arrow-dropdown-circle" color="#99E0E7" style={styles.toggleIcon} />
    };

    this.state = {
      expanded: false
    };
  }

  toggle = () => {
    this.setState(prevState => (
      {expanded: !prevState.expanded}
    ))
  }

  render() {
    return (
      <View style={styles.panelContainer}>
        <TouchableOpacity onPress={this.toggle}>
          <View style={styles.panelItem}>
            {this.state.expanded ? this.icons['up'] : this.icons['down']}
            <Text>{this.props.panelName}</Text>
          </View>
        </TouchableOpacity>
        <View style={this.state.expanded ? styles.toggleContent : null}>
          {this.state.expanded ? this.props.children : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  panelContainer: {
    width: '100%'
  },
  panelItem: {
    width: "100%",
    padding: 10,
    backgroundColor: "#eee",
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center"
  },
  toggleIcon: {
    marginRight: 8,
    height: 30,
    width: 30
  },
  toggleContent: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding:5,
    marginRight:7,
    marginLeft:7
  }
});

export default Panel;