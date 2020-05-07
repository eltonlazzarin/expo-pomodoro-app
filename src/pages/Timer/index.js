import React, { useState, useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Audio } from 'expo-av';

import { styles } from './styles';

function formatSeconds(seconds) {
  if (seconds < 60) {
    return `${seconds} seg`;
  }

  return `${Math.floor(seconds / 60)} min`;
}

export default function Timer() {
  const timerRef = useRef();

  const [timerEnabled, setTimerEnabled] = useState(false);
  const [secondsEllapsed, setSecondsEllapsed] = useState(0);
  const [counterStep, setCounterStep] = useState(0);
  let [tasksTime, setTasksTime] = useState(1500);

  async function toggleTimer() {
    const soundObject = new Audio.Sound();

    if (timerEnabled) {
      clearInterval(timerRef.current);

      setTimerEnabled(false);
    } else {
      await soundObject.loadAsync(require('../../assets/start.mp3'));
      await soundObject.playAsync();

      timerRef.current = setInterval(() => {
        setSecondsEllapsed((state) => state + 1);
      }, 1000);

      setTimerEnabled(true);
    }
  }

  function stopTimer() {
    clearInterval(timerRef.current);

    setTimerEnabled(false);
    setSecondsEllapsed(0);
    setCounterStep(0);
    setTasksTime(1500);
  }

  if (secondsEllapsed === tasksTime) {
    async function resetTimer() {
      const soundObject = new Audio.Sound();

      await soundObject.loadAsync(require('../../assets/alarmclock.mp3'));
      await soundObject.playAsync();

      setSecondsEllapsed(0);
      setCounterStep(counterStep + 1);

      if (counterStep === 3) {
        async function takeRest() {
          const soundObject = new Audio.Sound();

          await soundObject.loadAsync(require('../../assets/takearest.mp3'));
          await soundObject.playAsync();

          setTasksTime(1200);
        }

        takeRest();
      }

      if (counterStep > 3) {
        setTasksTime(1500);
        setCounterStep(0);
      }
    }

    resetTimer();
  }

  return (
    <LinearGradient colors={['#E7F3FE', '#9ABEE0']} style={styles.container}>
      <Text style={styles.title}>Pomodora</Text>

      <AnimatedCircularProgress
        size={300}
        width={12}
        fill={(secondsEllapsed * 100) / tasksTime}
        tintColor="#75A1DE"
        rotation={0}
        backgroundColor="#fff"
      >
        {() => (
          <Text style={styles.progress}>{formatSeconds(secondsEllapsed)}</Text>
        )}
      </AnimatedCircularProgress>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={toggleTimer}>
          <MaterialIcons
            name={timerEnabled ? 'pause' : 'play-arrow'}
            size={32}
            color="#FFF"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={stopTimer}>
          <MaterialIcons name="stop" size={32} color="#FFF" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
