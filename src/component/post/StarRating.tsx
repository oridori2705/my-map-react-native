import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import {colors} from '@/constant/colors';
import {Text} from 'react-native-gesture-handler';

interface StarRatingProps {
  maxStars?: number;
  score?: number;
  starSize?: number;
  starColor?: string;
  emptyStarColor?: string;
  onChangeScore: (value: number) => void;
  disabled?: boolean;
}

const StarRating = ({
  maxStars = 5,
  score = 0,
  starSize = 32,
  starColor = '#FCD34D',
  emptyStarColor = '#D1D5DB',
  onChangeScore,
  disabled = false,
}: StarRatingProps) => {
  const [rating, setRating] = useState<number>(score);
  const [hoverRating, setHoverRating] = useState<number>(0);

  const handleStarPress = (starIndex: number) => {
    if (disabled) {
      return;
    }

    const newRating = starIndex + 1;
    setRating(newRating);
    onChangeScore(newRating);
  };

  const handleStarPressIn = (starIndex: number) => {
    if (disabled) {
      return;
    }
    setHoverRating(starIndex + 1);
  };

  const handleStarPressOut = () => {
    if (disabled) {
      return;
    }
    setHoverRating(0);
  };

  const renderStar = (index: number) => {
    const starValue = index + 1;
    const displayRating = hoverRating || rating;
    const isFilled = starValue <= displayRating;

    return (
      <TouchableOpacity
        key={index}
        onPress={() => handleStarPress(index)}
        onPressIn={() => handleStarPressIn(index)}
        onPressOut={handleStarPressOut}
        disabled={disabled}
        activeOpacity={0.7}
        style={styles.starButton}>
        <Ionicons
          name={isFilled ? 'star' : 'star-outline'}
          size={starSize}
          color={isFilled ? starColor : emptyStarColor}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>평점</Text>
        <Text style={styles.labelText}>{score}점</Text>
      </View>
      <View style={styles.starContainer}>
        {Array.from({length: maxStars}, (_, index) => renderStar(index))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    borderWidth: 1,
    borderColor: colors.GRAY_200,
  },
  starContainer: {
    gap: 8,
    marginHorizontal: 'auto',
    flexDirection: 'row',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelText: {
    color: colors.GRAY_700,
  },
  starButton: {
    padding: 4,
  },
});

export default StarRating;
