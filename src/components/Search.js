import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';


import Loader from './Loader';
import Result from './Result';

export default class Search extends Component<{}> {

  state = { 
      user: '', 
      data: '', 
      loaded: false 
    }
 
  fetchData= () =>{
    this.setState({ loaded: true });
    const username = this.state.user;
    fetch(`https://api.github.com/users/${username}`)
      .then(response => response.json())
      .then(data => {
        this.setState({ data, loaded: false });
      });
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.titleContainer}>
          <Image
            style={styles.logo}
            source={require('./images/logo.png')}
          />
          <Text style={styles.title}>Search Github User</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Enter Github username"
          placeholderTextColor="rgba(255,255,255,0.6)"
          underlineColorAndroid="rgba(255,255,255,0)"
          value={this.props.user}
          onChangeText={(user) => this.setState({ user })}
        />
        <TouchableOpacity style={styles.searchBtn} onPress={this.fetchData}>
          <Text style={styles.btnText}>SEARCH</Text>
        </TouchableOpacity>
        {this.state.loaded ?  <Loader />: 
          <Result 
          parent={this}
          username={this.state.data.name}
          image={this.state.data.avatar_url}
          data={this.state.data}
          />
        } 
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#34495e',
    padding: 20
  },
  titleContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 5
  },
  title:{
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    margin: 5
  },
  input: {
    backgroundColor: 'rgba(236, 240, 241,0.5)',
    color: '#fff',
    height: 45,
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 40
  },
  searchBtn:{
    backgroundColor: '#154cc4',
    height: 45,
    paddingVertical: 15
  },
  btnText:{
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 16
  },
  logo: {
    width: 90,
    height: 90,
  }
});
