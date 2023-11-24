import React,{useState,useEffect} from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, Animated,TextInput } from "react-native";
import { colors } from "../utils/colors";
import Icon from "react-native-vector-icons/Ionicons";
import DateSeparator from "./DateSeparator";
import state from "../state";
// import { ResponseInput } from "./ResponseInput";
// import state from "../state";
// import { useSnapshot } from "valtio";

const Message = ({ message, isFirstOfDay, isNew, title, date, isImageJoined, time }) => {
  // const snap = useSnapshot(state)
  const [isResponseinputToggled, setIsResponseinputToggled] = useState(false);
  const responseInputHeight = 100
    const value = useState(new Animated.Value(0))[0]
    const toggleResponseInput = () => {
      Animated.timing(value,{
        toValue:responseInputHeight,
        duration:200,
        useNativeDriver:false,
      }).start()
    }
    const untoggleResponseInput = () => {
      Animated.timing(value,{
        toValue:0,
        duration:200,
        useNativeDriver:false,
      }).start()
    }
    useEffect(() => {
      if(isResponseinputToggled){
        toggleResponseInput()
      } else {
        untoggleResponseInput()
      }
    },[isResponseinputToggled])
  return (
    <View 
    style={{
      width:"100%",
      alignItems:"center",
      flexDirection:"column",
      gap:10,
      marginTop:10,
    }}
    >
      {isFirstOfDay && <DateSeparator date={date} />}
    <View
      style={{
        ...styles.container,
        backgroundColor: isNew ? colors.light_blue : "white",
      }}
    >
      
      <View style={styles.imageContainer}>
        <Image source={require("../assets/john.jpg")} style={styles.image} />
      </View>
      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>{date} </Text>
          <Text style={styles.time}>{time}</Text>
        </View>
        <View>
          <Text style={styles.message}>{message}</Text>
        </View>
        
          {isImageJoined && (
            <View style={styles.imagesList}>
              <View style={styles.objectImageContainer}>
                <Image 
                resizeMode="cover" 
                source={require("../assets/lost_phone.jpeg")} 
                style={styles.objectImage}
                />
              </View>
            </View>
          )}
          <View
          style={styles.respondButtonWrapper}
          >
            <TouchableOpacity style={styles.respondButton}
            onPress={() => {
              state.isResponseInputShown = true
              state.messageResponseData = {
                title,sender:"John"
              }
            }}
            >
              <Text style={styles.buttonText}>Respond</Text>
              <Icon name="send" color="white"/>
            </TouchableOpacity>
          </View>
      </View>
      
    </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors.light_blue,
    borderRadius: 10,
    flexDirection: "row",
    elevation: 1,
    marginBottom: 20,
    paddingHorizontal:10
  },
  imageContainer: {
    width: 70,
    height: "full",
    padding: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  messageContent: {
    width: "80%",
    paddingTop: 12,
    paddingBottom: 10,
    paddingHorizontal: 5,
    flexDirection: "column",
    gap: 5,
  },
  messageHeader: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 14,  
    fontWeight: "bold",
    color: colors.lentils_orange,
  },
  date: {
    fontSize: 10,
    fontWeight:"bold",
    color: colors.dark_blue,
  },
  time: {
    fontSize: 10,
    fontWeight:"bold",
    color: colors.dark_blue,
  },
  message: {
    fontSize: 14,
    maxWidth: 300,
    flexWrap: "wrap",
    alignSelf: "flex-start",
  },
  respondButtonWrapper: {
    marginTop:20,
    width:"100%",
    alignItems:"flex-end"
  },
  respondButton:{
    backgroundColor:colors.lentils_orange,
    flexDirection:"row",
    alignItems:"center",
    paddingHorizontal:15,
    paddingVertical:5,
    borderRadius:50,
    gap:8,
  },
  buttonText:{
    color:"white",
    textAlign:"center",
    fontWeight:"bold",
  },
  imagesList:{
    marginTop:20,
    width:220,
    flexDirection:"row",
    flexWrap:"wrap",
    gap:5,
  },
  objectImage:{
    width:75,
    height:75,
    borderRadius:5,
  },
  objectImageContainer:{
    borderWidth:0.5,
    borderColor: colors.medium_blue,
    borderRadius:5,
  },
  responseOptions:{
    position:"absolute",
    right:10,
    top:5,
    flexDirection:"row",
    gap:10,
    alignItems:"center",
  }


});

export default Message;


