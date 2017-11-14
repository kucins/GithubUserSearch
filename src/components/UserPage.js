import React, { Component } from 'react';
import { 
  Image, 
  Text, 
  TouchableOpacity, 
  View,
  StyleSheet
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import Followers from './Followers';
import Following from './Following';

class UserPage extends Component {

  state={
    data:'',
    username:''
  }

  componentDidMount(){
    this.state.username= this.props.navigation.state.params.user;
    this.fetchData();  
  }

  fetchData=()=>{
    const username = this.state.username;
    fetch(`https://api.github.com/users/${username}`)
      .then(response => response.json())
      .then(data => {
        this.setState({ data });
      });
  }

  render() {
    return (
      <View style={styles.container}>
      {console.log('------->',this.state.username)}
        <View style={styles.title}>
          <Image 
            style={styles.userImg}
            source={{uri: this.state.data.avatar_url }}
          />
          <Text style={styles.name}> {this.state.data.name} </Text>
          <Text style={styles.about}>{this.state.data.login}</Text>
          <Text style={styles.about}>{this.state.data.bio}</Text>
          <Text style={styles.about}>{this.state.data.location}</Text>
        </View>
        <TouchableOpacity 
          style={styles.menu}
          onPress={()=>this.props.navigation.navigate('Followers',{ user: this.state.data.login})}>
          <Text style={styles.text}>
          Followers 
          </Text>
          <View style={styles.numbers}>
            <Text style= {{fontWeight: 'bold'}}>{this.state.data.followers}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.menu}
          onPress={()=>this.props.navigation.navigate('Following',{user: this.state.data.login})} >
          <Text style={styles.text}> Following </Text>
          <View style={styles.numbers}>
            <Text style= {{fontWeight: 'bold'}}>{this.state.data.following}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.menu} 
          onPress={()=>this.props.navigation.navigate('Repos',{user: this.state.data.login})}>
          <Text style={styles.text}>Repositories</Text>
          <View style={styles.numbers}>
            <Text style= {{fontWeight: 'bold'}}>{this.state.data.public_repos}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#B0C4DE',
  },
  title: {
    backgroundColor: '#34495e',
    alignItems: 'center',
    paddingBottom: 30
  },
  userImg:{
    width: 120,
    height: 120,
    borderRadius: 100,
    borderColor: '#3498db',
    borderWidth: 3,
    margin: 20
  },
  name:{
    fontSize: 30,
    color: '#fff'
  },
  about:{
    color: '#fff'
  },
  text:{
    fontSize: 17,
    fontWeight: 'bold',
  },
  menu: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3498db',
    borderWidth: 5,
    borderColor:'#B0C4DE',
    paddingVertical: 5,
    justifyContent: 'center',
  },
  numbers:{
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    backgroundColor: '#ecf0f1',
    width:40,
    height:40,   
  }
});
  
export default UserPage;