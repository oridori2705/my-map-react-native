import Ionicons from '@react-native-vector-icons/ionicons';
import {createContext, PropsWithChildren, ReactNode, useContext} from 'react';
import {
  GestureResponderEvent,
  Modal,
  ModalProps,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '@/constant/colors';

interface ActionMainProps extends ModalProps {
  children: ReactNode;
  isVisible: boolean;
  hideAction: () => void;
  animationType?: ModalProps['animationType'];
}

const ActionMain = ({
  children,
  isVisible,
  animationType = 'slide',
  hideAction,
  ...props
}: ActionMainProps) => {
  const onPressOutSide = (event: GestureResponderEvent) => {
    if (event.target === event.currentTarget) {
      hideAction();
    }
  };

  return (
    <>
      <Modal
        visible={isVisible}
        transparent
        animationType={animationType}
        onRequestClose={hideAction}
        {...props}>
        <View style={styles.modalContainer}>{children}</View>
      </Modal>
      {isVisible && (
        <SafeAreaView
          style={styles.actionBackground}
          onTouchEnd={onPressOutSide}
        />
      )}
    </>
  );
};

const Container = ({children}: PropsWithChildren) => {
  return <View style={styles.actionContainer}>{children}</View>;
};

interface ButtonProps extends PressableProps {
  children: ReactNode;
  isDanger?: boolean;
  isChecked?: boolean;
}

const Button = ({
  children,
  isDanger = false,
  isChecked = false,
  ...props
}: ButtonProps) => {
  return (
    <Pressable
      style={({pressed}) => [
        pressed && styles.actionButtonPressed,
        styles.actionButton,
      ]}
      {...props}>
      <Text style={[styles.actionText, isDanger && styles.dangerText]}>
        {children}
      </Text>

      {isChecked && (
        <Ionicons name="checkmark" size={20} color={colors.BLUE_500} />
      )}
    </Pressable>
  );
};

const Title = ({children}: PropsWithChildren) => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}>{children}</Text>
    </View>
  );
};

const Divider = () => {
  return <View style={styles.border} />;
};

export const ActionSheet = Object.assign(ActionMain, {
  Container,
  Button,
  Title,
  Divider,
});

const styles = StyleSheet.create({
  actionBackground: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0 0 0 / 0.5)',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  actionContainer: {
    backgroundColor: colors.GRAY_100,
    overflow: 'hidden',
    borderRadius: 15,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  actionButtonPressed: {
    backgroundColor: colors.GRAY_200,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    gap: 5,
  },
  actionText: {
    fontSize: 17,
    color: colors.BLUE_500,
    fontWeight: '500',
  },
  dangerText: {
    color: colors.RED_500,
  },
  titleContainer: {
    padding: 15,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.BLACK,
  },
  border: {
    borderBottomColor: colors.GRAY_200,
    borderBottomWidth: 1,
  },
});
