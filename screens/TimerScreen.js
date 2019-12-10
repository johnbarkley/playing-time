import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import PlayerList from '../components/PlayerList';

export default function TimerScreen() {
  const [time, setTime] = useState(0);
  const [active, setActive] = useState(false);
  const [roster, setRoster] = useState([
    {
      number: '41',
      name: 'Chad Blount',
      timePlayed: 0,
      playing: false,
    },
    {
      number: '45',
      name: 'Landon Whyte',
      timePlayed: 0,
      playing: false,
    },
    {
      number: '50',
      name: 'Collier Easton',
      timePlayed: 0,
      playing: true,
    },
  ])

  useEffect(() => {
    let interval = null;

    if(active) {
      interval = setInterval(() => {
        setTime(time + 1);
      }, 1000);
    }
    else if(!active && time !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [time, active]);

  const getFormattedTime = (sec) => {
    sec %= 3600;
    minutes = Math.floor(sec / 60);
    seconds = sec % 60;
    if(seconds < 10) {
      seconds = '0' + seconds
    }
    return `${minutes}:${seconds}`
  }

  const toggle = () => {
    setActive(!active)
  }

  const reset = () => {
    setTime(0)
    setActive(false)
  }

  const clickRow = index => {
    let newRoster = JSON.parse(JSON.stringify(roster))
    let valToUpdate = newRoster[index]
    valToUpdate['playing'] = !valToUpdate['playing']
    newRoster[index] = valToUpdate
    setRoster(newRoster)
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.timerContainer}>
          <Text style={styles.timer}>{getFormattedTime(time)}</Text>
        </View>
      </View>
      <PlayerList
        roster={roster}
        time={time}
        click={clickRow}
      />
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.button, {width: '62%'}, active ? {backgroundColor: '#DC0000'} : {backgroundColor: '#00BB13'}]}
          activeOpacity={0.8}
          onPress={toggle}>
          {
            active ?
            <Text style={styles.buttonText}>Stop</Text>
            :
            <Text style={styles.buttonText}>Start</Text>
          }
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {width: '32%'}, active ? {backgroundColor: '#878787'} : {backgroundColor: '#040405'}]}
          activeOpacity={0.8}
          disabled={active}
          onPress={reset}>
            <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

TimerScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F7F7F9',
  },
  topContainer: {
    width: '100%',
    height: 100,
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerContainer: {
    width: '45%',
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#040405',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 1,
    borderRadius: 5,
  },
  timer: {
    fontFamily: 'inter-ui-bold',
    fontSize: 36,
    color: '#040405',
  },
  bottomContainer: {
    width: '100%',
    height: 90,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  button: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#040405',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 1,
    borderRadius: 5,
  },
  buttonText: {
    fontFamily: 'inter-ui-bold',
    fontSize: 22,
    color: '#fff',
  },
});
