import React, { Component } from 'react';
import { 
  Image, 
  Text, 
  TouchableOpacity, 
  View,
  StyleSheet,
  ListView
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import UserPage from './UserPage'

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Following extends Component {
  state={
    dataSource: ds 
  }
  fetchFollowing= () =>{
    const user = this.props.navigation.state.params.user;
    fetch(`https://api.github.com/users/${user}/following`)
      .then(response => response.json())
      .then(data => {
        this.setState({dataSource: ds.cloneWithRows(data)});
      });     
  }

  componentDidMount(){
    this.fetchFollowing();
  }
      
  render() {
    return (
      <View style={{marginBottom: 50}}>
       <View style={{backgroundColor: '#34495e'}}>
         <Text style={styles.title}> Following </Text>
        </View>
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderFollowing}
      />
      </View>
    );
  }

  renderFollowing=(rowData)=>{
    return (
      <View style={styles.container}>
        <Image
          source={{uri: rowData.avatar_url}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <TouchableOpacity 
          onPress={()=>this.props.navigation.navigate('UserPageNew',{user: rowData.login})}>
            <Text style={styles.username}>{rowData.login}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 5,
    padding: 5
  },
  title:{
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    margin: 10,
    color: '#fff'
  },
  thumbnail: {
    borderRadius: 100,
    width: 60,
    height: 60,
  },
  rightContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
  },
  username:{
    fontWeight: 'bold',
    fontSize: 17
  }
});
  
export default Following;