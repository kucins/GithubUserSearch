import React, { Component } from 'react';
import { 
  Image, 
  Text, 
  TouchableOpacity,  
  StyleSheet
} from 'react-native';

import UserPage from './UserPage';
class Result extends Component {

  render() {
    return (
      <TouchableOpacity
       style={styles.container} 
       onPress={()=>this.props.parent.props.navigation.navigate('UserPage',{user: this.props.data.login})}>
        <Text style={styles.text}>{this.props.username}</Text>
        <Image 
          source={{ uri: this.props.image }} 
          style={styles.image}
        />
      </TouchableOpacity>
    );
  }
}
  
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#e2e2e2',
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 15,
    color: '#fff'
  },
  image: {
    width: 100,
    height: 100,
    margin: 15
  }
});

export default Result;