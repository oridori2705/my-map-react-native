import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../constant/colors';

const deviceWidth = Dimensions.get('window').width;

const DayOfWeeks = () => {
  return (
    <View style={styles.container}>
      {['일', '월', '화', '수', '목', '금', '토'].map((dayOfWeek, index) => {
        return (
          <View key={index} style={styles.item}>
            <Text
              style={[
                styles.text,
                dayOfWeek === '토' && styles.saturdayText,
                dayOfWeek === '일' && styles.sundayText,
              ]}>
              {dayOfWeek}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  item: {
    width: deviceWidth / 7,
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    color: colors.BLACK,
  },
  saturdayText: {
    color: colors.BLUE_500,
  },
  sundayText: {
    color: colors.RED_500,
  },
});

export default DayOfWeeks;
