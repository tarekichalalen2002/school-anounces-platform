import { View, Text, StyleSheet, Animated } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useState, useEffect } from "react";

const MessagesLoading = () => {
  const value = useState(new Animated.Value(0.8))[0];
  const fadeDown = Animated.timing(value, {
    toValue:0.2,
    duration:1500,
    useNativeDriver:true
  })
  const fadeUp = Animated.timing(value,{
    toValue:0.8,
    duration:1000,
    useNativeDriver:true
  })
  const animate = () => {
    Animated.loop(Animated.sequence([fadeDown, fadeUp]),{iterations:-1}).start();
  };
  useEffect(() => {
    animate()
  },[])
  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          opacity: value,
        }}
      >
        <Icon name="chatbubble-ellipses-outline" size={40} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MessagesLoading;
