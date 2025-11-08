import React, {useEffect, useState} from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text} from 'react-native';

import Calendar from '@/component/calendar/Calendar';
import {colors} from '@/constant/colors';
import {getMonthYearDetails, getNewMonthYear} from '@/utils/date';
import {useNavigation} from '@react-navigation/native';

function CalendarScreen() {
  const navigation = useNavigation();
  const currentMonthYear = getMonthYearDetails(new Date());
  const [monthYear, setMonthYear] = useState(currentMonthYear);
  const [selectedDate, setSelectedDate] = useState(0);

  const handleUpdateMonth = (increment: number) => {
    setSelectedDate(0);
    setMonthYear(prev => getNewMonthYear(prev, increment));
  };

  useEffect(() => {
    const moveToToday = () => {
      setSelectedDate(new Date().getDate());
      setMonthYear(getMonthYearDetails(new Date()));
    };
    const todayComponent = () => (
      <Pressable onPress={moveToToday} style={{paddingHorizontal: 10}}>
        <Text style={{color: colors.PINK_700, fontWeight: 'bold'}}>오늘</Text>
      </Pressable>
    );
    navigation.setOptions({
      headerRight: todayComponent,
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        monthYear={monthYear}
        onChangeMonth={handleUpdateMonth}
        selectedDate={selectedDate}
        onPressDate={(date: number) => setSelectedDate(date)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});

export default CalendarScreen;
