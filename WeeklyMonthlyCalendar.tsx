import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import SwipeCalendar from 'react-native-swipe-calendar';

const WeeklyMonthlyCalendar = () => {
  const [viewMode, setViewMode] = useState('weekly'); // 'weekly' or 'monthly'

  const toggleViewMode = () => {
    setViewMode(viewMode === 'weekly' ? 'monthly' : 'weekly');
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16 }}>
        <TouchableOpacity onPress={toggleViewMode}>
          <Text>{viewMode === 'weekly' ? 'Show Monthly' : 'Show Weekly'}</Text>
        </TouchableOpacity>
        <Text>{viewMode === 'weekly' ? 'Weekly View' : 'Monthly View'}</Text>
      </View>
      {viewMode === 'weekly' ? (
        <View style={{ flex: 1 }}>
          {/* Render your weekly calendar here */}
          <SwipeCalendar />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          {/* Render your monthly calendar here */}
          <SwipeCalendar  />
        </View>
      )}
    </View>
  );
};

export default WeeklyMonthlyCalendar;