import React from "react";
import { StyleSheet, Text, View, FlatList  } from "react-native";
import { DarknessLayer, Header, Sidebar} from "../components";
import state from "../state";
import { useSnapshot } from "valtio";
import { colors } from "../utils/colors";

const newNotifs = [
  {
    id: 1,
    title: "New message",
    body: "You have a new message from John Doe",
    date: "5h",
  },
  {
    id: 2,
    title: "New message",
    body: "You have a new message from John Doe",
    date: "8h",
  },
  {
    id: 3,
    title: "New message",
    body: "You have a new message from John Doe",
    date: "14h",
  },
  {
    id: 4,
    title: "New message",
    body: "You have a new message from John Doe",
    date: "1d",
  },
]

const oldNotifs = [
  {
    id: 5,
    title: "New message",
    body: "You have a new message from John Doe",
    date: "3d",
  },
  {
    id: 6,
    title: "New message",
    body: "You have a new message from John Doe",
    date: "1w",
  },
  {
    id: 7,
    title: "New message",
    body: "You have a new message from John Doe",
    date: "1w",
  },
  {
    id: 8,
    title: "New message",
    body: "You have a new message from John Doe",
    date: "2w",
  },
]

const Notifications = () => {
    const snap = useSnapshot(state);
  return (
    <View style={styles.container}>
        <View style={{height:75,}}>
            <Header currentTitle="Notifications" isNotified={false} />
        </View>
        <View style={styles.notifContainer}>
          <Text style={styles.h1}>New</Text> 
          <FlatList 
          data={newNotifs}
          renderItem={({item}) => (
            <View style={styles.notifContainer}>
              <Text style={styles.notifTitle}>{item.title}</Text>
              <Text>{item.body}</Text>
            </View>
          )}
          />
          <Text style={styles.h1}>30 last days</Text>   
          <FlatList 
            data={oldNotifs}
            renderItem={({item}) => (
              <View style={styles.notifContainer}>
                <Text style={styles.notifTitle}>{item.title}</Text>
                <Text>{item.body}</Text>
              </View>
            )}
          />  
        </View>
        
        
        



      
      {snap.isSidebarShown && <DarknessLayer/>}
      <Sidebar />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  notifContainer:{
    padding: 20,
  },
  h1:{
    fontSize: 16,
    fontWeight: "600",
    color: colors.dark_blue,
    marginTop: 10,
    marginBottom: 10,
  },
  notifTitle:{
    fontSize: 14,
    fontWeight: "700",
    overflow:"scroll"
  }
});

export default Notifications;
