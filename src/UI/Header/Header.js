import React from 'react';
import { Text, StyleSheet} from 'react-native';

const header = (props) => {

  return (
    <Text {...props} style={[styles.header,props.style]}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 28,
    fontWeight: 'bold'
  }
});

export default header;