import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, PanResponder, StyleSheet, Dimensions, Image } from 'react-native';
import { format, addDays, startOfWeek, eachDayOfInterval, startOfMonth, endOfMonth, format as formatMonth } from 'date-fns';

const { width } = Dimensions.get('window');

const SwipeableCalendar: React.FC = () => {
  const weeklyArrow = 'https://cdn-icons-png.flaticon.com/512/61/61932.png';
  const monthlyArrow = 'https://cdn-icons-png.flaticon.com/512/2/2486.png';
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('weekly'); // 'weekly' or ' monthly '
  const translateX = new Animated.Value(0);
  const pan = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx > 50) {
        handleSwipeRight();
      } else if (gestureState.dx < -50) {
        handleSwipeLeft();
      }
    },
  });

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  }, [currentDate]);

  const handleSwipeLeft = () => {
    translateX.setValue(300);
    const nextStartDate =
      viewMode === 'weekly'
        ? addDays(startOfWeek(currentDate), 7)
        : addDays(startOfMonth(currentDate), 30);
    setCurrentDate(nextStartDate);
  };

  const handleSwipeRight = () => {
    translateX.setValue(-300);
    const prevStartDate =
      viewMode === 'weekly'
        ? addDays(startOfWeek(currentDate), -7)
        : addDays(startOfMonth(currentDate), -30);
    setCurrentDate(prevStartDate);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === 'weekly' ? 'monthly' : 'weekly');
  };

  const daysOfWeek =
    viewMode === 'weekly'
      ? eachDayOfInterval({
          start: startOfWeek(currentDate),
          end: addDays(startOfWeek(currentDate), 6),
        })
      : eachDayOfInterval({
          start: startOfMonth(currentDate),
          end: endOfMonth(currentDate),
        });

  return (
    <View style={styles.container}>
      {viewMode === 'monthly' && (
        <Text style={styles.monthName}>{formatMonth(currentDate, 'MMMM yyyy')}</Text>
      )}
      <Animated.View {...pan.panHandlers} style={[styles.calendarContainer, { transform: [{ translateX }] }]}>
        {daysOfWeek.map((day, index) => (
          <View key={index} style={styles.dayContainer}>
            {/* Format the day to display only the first letter */}
            <Text style={styles.dateText}>{format(day, 'E')[0]}</Text>
            <Text style={styles.dateText}>{format(day, 'd')}</Text>
          </View>
        ))}
      </Animated.View>
      <TouchableOpacity onPress={toggleViewMode} style={styles.toggleButton}>
        <Image source={{ uri: viewMode === 'weekly' ? weeklyArrow : monthlyArrow }} style={styles.arrowImage} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  toggleButton: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#ececec',
    alignItems: 'center',
  },
  // Style for the arrow image
  arrowImage: {
    width: 20,
    height: 20,
  },
  calendarContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: width, // Make the calendar take up the full width
  },
  dayContainer: {
    width: width / 7,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  dateText: {
    fontSize: 16,
  },
  monthName: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default SwipeableCalendar;
