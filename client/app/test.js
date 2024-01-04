import { OrdinaryLoading } from "../components";
import React from "react";
import { View, Text, StyleSheet,TouchableOpacity } from "react-native";
import { colors } from "../utils/colors";
import { useEffect, useState } from "react";
import { getUserData } from "../asyncStorage/user";
const Test = () => {
  const [userData, setUserData] = useState();
  const getUser = async () => {
    const user = await getUserData();
    setUserData(user);
    console.log("the use data",user);
  }
  useEffect(() => {
    getUser();
  }, []);
  return (
    <View style={{width:"100%", height:"100%",}}>
      <TouchableOpacity 
      onPress={() => console.log(userData)}
      >
        <Text>Test</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Test