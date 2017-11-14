import React, { Component } from 'react';
import {  
  Text, 
  View,
  StyleSheet,
  ListView
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Repos extends Component {
  state={
    dataSource: ds ,
  }
  fetchRepos= () =>{
    const user = this.props.navigation.state.params.user;
    fetch(`https://api.github.com/users/${user}/repos`)
      .then(response => response.json())
      .then(data => {
        this.setState({dataSource: ds.cloneWithRows(data)});
      });     
  }

  componentDidMount(){
    this.fetchRepos();
  }
      
  render() {
    return (
      <View style={{marginBottom: 50}}>
       <View style={{backgroundColor: '#34495e'}}>
         <Text style={styles.title}> Repositories </Text>
        </View>
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRepos}
      />
      </View>
    );
  }

  renderRepos=(rowData)=>{
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.name}>{rowData.name}</Text>
          <Text>{rowData.full_name}</Text>
         
        </View>
        <View style={styles.bottomContainer}>
          <Text>{rowData.language}</Text>
          <View style={{flexDirection : 'row'}}>
          <View style={styles.icons}>
            <Icon
              name='md-star'
              size={20}
              style={styles.icon}
            />
            <Text> {rowData.stargazers_count} </Text>
          </View>
          <View style={styles.icons}>
            <Icon
              name='md-git-network'
              size={20}
              style={styles.icon}
            />
            <Text>{rowData.forks_count} </Text>
          </View>
          <View style={styles.icons}>
            <Icon
              name='md-eye'
              size={20}
              style={styles.icon}
            />
            <Text>{rowData.watchers_count}</Text>
          </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 15,
    borderWidth: 1,
    borderColor: '#727272'
  },
  topContainer: {
    flexDirection: 'column'
  },
  bottomContainer:{
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  title:{
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    margin: 10,
    color: '#fff'
  },
  name: {
    fontWeight: '600',
    fontSize: 20,
    color: '#000'
  },
  icons: {
    flexDirection: 'row', 
    marginRight: 13,
  },
  icon: {
   marginRight:3
  }

});
  
export default Repos;