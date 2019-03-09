import React from 'react';
import { StyleSheet, View } from 'react-native';

import CalcInput from '../../../UI/CalcInput/CalcInput';

const shellSideSizingInput = (props) => {

  return (
    <View>
      <CalcInput label='Pressure Drop' placeholder='Pressure Drop' />
      <CalcInput label='Mass Flow Rate' placeholder='Mass Flow Rate' />
      <CalcInput label='Inlet Temp' placeholder='Inlet Temp' />
      <CalcInput label='Outlet Temp' placeholder='Outlet Temp' />
      <CalcInput label='Fluid Type' placeholder='Fluid Type' />
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


export default shellSideSizingInput;