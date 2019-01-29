import React from 'react';
import { StyleSheet, View } from 'react-native';

import CalcInput from '../../../UI/CalcInput/CalcInput';

const materialsSizingInput = (props) => {

  return (
    <View>
      <CalcInput label='Shell-Side Material' placeholder='Shell-Side Material' />
      <CalcInput label='Tube-Side Material' placeholder='Tube-Side Material' />
    </View>
  );
};

const styles = StyleSheet.create({
  sizingContainer: {
    width: '90%',
    marginLeft: 10,
    marginTop: 10
  }
});


export default materialsSizingInput;