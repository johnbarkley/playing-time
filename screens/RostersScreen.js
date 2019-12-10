import React, { useState, useEffect } from 'react';
import { 
  ScrollView,
  StyleSheet,
  FlatList,
  Text
} from 'react-native';

export default function RostersScreen() {
  const [rosters, setRosters] = useState([
    {
      number: '41',
      name: 'Chad Blount',
      timePlayed: 40,
      playing: false,
    },
    {
      number: '45',
      name: 'Landon Whyte',
      timePlayed: 60,
      playing: false,
    },
    {
      number: '50',
      name: 'Collier Easton',
      timePlayed: 22,
      playing: true,
    },
  ])

  const renderPlayer = item => {
    const number = item.number, name = item.name
    return (
      <Text style={styles.number}>{number} {name}</Text>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={rosters}
        renderItem={(item) => renderPlayer(item.item)}
        keyExtractor={(item, index) => index.toString()}
        style={styles.list}
      />
    </ScrollView>
  );
}

RostersScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  list: {
    width: '100%',
    height: '100%',
  },
  number: {
    fontFamily: 'inter-ui-regular',
    fontSize: 18,
    color: '#040405',
  }
});
