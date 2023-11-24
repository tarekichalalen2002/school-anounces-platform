import React, { useEffect, useState } from "react";
import {
  TouchableWithoutFeedback,
  Text,
  View,
  Animated,
  StyleSheet,
} from "react-native";
import { colors } from "../utils/colors";

const ActivationButton = ({ onPress, isActivated }) => {
  const value = useState(new Animated.Value(isActivated ? 31 : 2))[0];
  const setOff = () => {
    Animated.spring(value, {
      toValue: 2,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  const setOn = () => {
    Animated.spring(value, {
      toValue: 31,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    if (isActivated) {
      setOn();
    } else {
      setOff();
    }
  }, [isActivated]);
  const styles = StyleSheet.create({
    buttonContainer: {
      width: 50,
      height: 21,
      borderRadius: 50,
      borderWidth: 1,
      borderColor: isActivated ? colors.lentils_orange : colors.dark_blue,
      backgroundColor: "white",
      elevation: 3,
      position: "relative",
    },
    ball: {
      position: "absolute",
      width: 15,
      height: 15,
      backgroundColor: isActivated ? colors.lentils_orange : colors.dark_blue,
      borderRadius: 50,
      top: 2,
      left: 0,
      transform: [{ translateX: value }],
    },
  });
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.buttonContainer}>
        <Animated.View style={styles.ball}></Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ActivationButton;
