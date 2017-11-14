import React, { Component } from 'react';
import {  
    ActivityIndicator,
    StyleSheet
} from 'react-native';

const Loader = (props) => {
  return (
      <ActivityIndicator 
        size='large'
        color="#000"
        style={styles.activity}
      />
  );
};

const styles =StyleSheet.create({
  activity: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 120,
    flex: 1,
    marginTop: 120
  }
});

export default Loader;