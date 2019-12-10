import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  FlatList,
  Text
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function PlayerList(props) {
  const getFormattedTime = (sec) => {
    sec %= 3600;
    minutes = Math.floor(sec / 60);
    seconds = sec % 60;
    if(seconds < 10) {
      seconds = '0' + seconds
    }
    return `${minutes}:${seconds}`
  }

  const getPercent = sec => {
    if(props.time === 0) return '0%'

    let val = sec/props.time*100
    return Math.round(val) + '%'
  }

  const renderPlayer = item => {
    const number = item.item.number, name = item.item.name, playing = item.item.playing, index = item.index

    const timePlayed = getFormattedTime(item.item.timePlayed), percent = getPercent(item.item.timePlayed)

    return (
      <TouchableOpacity
        style={[styles.row, playing ? {backgroundColor: 'rgba(0, 187, 19, 0.1)'} : {}]}
        onPress={() => props.click(index)}>
        <View style={styles.containerLeft}>
          <Text style={styles.number}>{number}</Text>
          <Text style={styles.name}>{name}</Text>
        </View>
        <View style={styles.containerRight}>
          <Text style={styles.timePlayed}>{timePlayed}</Text>
          <Text style={styles.percent}>{percent}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={props.roster}
        extraData={props.time}
        renderItem={(item) => renderPlayer(item)}
        keyExtractor={(item, index) => index.toString()}
        style={styles.list}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingTop: 15,
  },
  list: {
    width: '100%',
    height: '100%',
  },
  row: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(99, 110, 133, 0.3)',
  },
  containerLeft: {
    width: '65%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  containerRight: {
    width: '35%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  number: {
    fontFamily: 'inter-ui-medium',
    fontSize: 18,
    color: '#040405',
    marginLeft: 20,
  },
  name: {
    fontFamily: 'inter-ui-regular',
    fontSize: 18,
    color: '#040405',
    marginLeft: 20,
  },
  timePlayed: {
    fontFamily: 'inter-ui-bold',
    fontSize: 18,
    color: '#040405',
    marginRight: 'auto',
  },
  percent: {
    fontFamily: 'inter-ui-regular',
    fontSize: 14,
    color: '#040405',
    marginRight: 20,
  }
});
