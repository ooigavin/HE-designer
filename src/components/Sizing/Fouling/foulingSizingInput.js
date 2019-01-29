import React from 'react';
import { StyleSheet, View } from 'react-native';

import CalcInput from '../../../UI/CalcInput/CalcInput';

const foulingSizingInput = (props) => {

  return (
    <View>
      <CalcInput label='Acceptable Fouling' placeholder='Acceptable Fouling' />
      <CalcInput label='Hrs of Use (Daily)' placeholder='Hrs of Use (Daily)' />
      <CalcInput label='Acceptable Lifespan' placeholder='Acceptable Lifespan' />
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


export default foulingSizingInput;