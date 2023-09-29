import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { format, addDays, startOfWeek, eachDayOfInterval } from 'date-fns';
import GestureRecognizer from 'react-native-swipe-gestures';

const WeekView: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleSwipeLeft = () => {
    const nextWeekStartDate = addDays(startOfWeek(currentDate), 7);
    setCurrentDate(nextWeekStartDate);
  };

  const handleSwipeRight = () => {
    const prevWeekStartDate = addDays(startOfWeek(currentDate), -7);
    setCurrentDate(prevWeekStartDate);
  };

  const daysOfWeek = eachDayOfInterval({
    start: startOfWeek(currentDate),
    end: addDays(startOfWeek(currentDate), 6),
  });

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  return (
    <GestureRecognizer
      onSwipeLeft={handleSwipeLeft}
      onSwipeRight={handleSwipeRight}
      config={config}
      style={styles.container}
    >
      {daysOfWeek.map((day, index) => (
        <View key={index} style={styles.dayContainer}>
          <Text style={styles.dateText}>{format(day, 'EEEE, do')}</Text>
        </View>
      ))}
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  dayContainer: {
    flex: 1,
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
  },
});

export default WeekView;
