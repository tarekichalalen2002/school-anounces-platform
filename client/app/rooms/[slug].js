import { useLocalSearchParams } from 'expo-router';
import React,{useEffect,useState, useRef} from 'react';
import { View,StyleSheet,FlatList,KeyboardAvoidingView,Text } from 'react-native';
import {
    Header,
    Message,
    SendMesssageButton,
    SendMessageInput,
    Sidebar,
    DarknessLayer,
    ResponseInput
} from "../../components"
import state from '../../state';
import { useSnapshot } from 'valtio';
import { getUserRooms } from '../../asyncStorage/rooms';
import { MessagesLoading } from '../../components';
import { colors } from '../../utils/colors';
import socket from '../../socketio';

const Room = () => {

    const joinRoom = () => {
        socket.emit("joinRoom",slug)
    }
    useEffect(()=>{
        joinRoom()
    },[slug])

    useEffect(()=>{
        socket.on("receiveMessage",(message)=>{
            console.log("new message received: ",message)
            setMessages([...messages,message])
        })
    },[socket])

    const [newMessage,setNewMessage] = useState()
    const { slug } = useLocalSearchParams();
    const [index,setIndex] = useState(1)
    const [messages,setMessages] = useState([])
    const [scrollMessagesList,setSrollMessagesList] = useState(0)
    const [messagesListHeight,setMessagesListHeight] = useState(0)
    const [room,setRoom] = useState(null)
    const [messagesLoading,setMessgesLoading] = useState(true)

    const snap = useSnapshot(state)

    const handleScroll = (e)=>{
        setSrollMessagesList(e.nativeEvent.contentOffset.y)
    }
    const flatListRef = useRef(null);
    useEffect(()=>{
        flatListRef?.current?.scrollToOffset({ offset: messagesListHeight + 100, animated: false });
    },[])



    const getRoom = async () => {
        try {
            const localRooms = await getUserRooms();
            setRoom(localRooms.find(room => room._id === slug))
        } catch (error) {
            console.log(error)
        }
    }
    const getRoomMessages = async () => {
        try {
            const response = await fetch(`http://192.168.1.71:3000/api/room/get-room-messages/${slug}/${index}`,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${snap.token}`
                }
            })
            const data = await response.json()
            if (response.ok) {
                console.log('the messages we got: ',data.messages)
                setMessages(data.messages)
                setMessgesLoading(false)
            } else {
                console.log(data.error)
            }
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getRoom()
        setMessgesLoading(true)
        getRoomMessages()
    },[])

    return (
        <KeyboardAvoidingView
        style={styles.container}
        >
            <View style={styles.headerContainer}>
                <Header currentTitle={room?.name} isNotified={true}/>
            </View>
            <View style={styles.messagesFeed} >
                {
                    messagesLoading ? (
                        <View
                        style={{
                            flex:1,
                            justifyContent:'center',
                            alignItems:'center'
                        }}
                        >
                            <MessagesLoading color={colors.dark_blue} size={30}/>
                        </View> 
                    )
                    : <FlatList
                    ref={flatListRef}
                    style={{flex:1,Bottom:100}}
                    data={messages}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    onLayout={(e) => {
                        flatListRef.current.scrollToOffset({ offset: messagesListHeight + 100, animated: false });
                    }}
                    onContentSizeChange={(contentWidth, contentHeight) => {
                        setMessagesListHeight(contentHeight)
                    }}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                    keyExtractor={(item,index) => index.toString()}
                    ListEmptyComponent={() => (
                        <View style={{
                            flex:1,
                            position:"relative",
                        }}>
                            <Text
                            style={{
                                position:'absolute',
                                left:"50%",
                                textAlign:'center',
                                transform:[{translateX:-50},{translateY:50}],
                            }}
                            >No messages yet</Text>
                        </View>
                    )}
                    renderItem={({item})=>(
                        <Message 
                        message={item}
                        />
                    )}
                />
                }
                {
                    !messagesLoading && <SendMesssageButton 
                    scrollMessagesList={scrollMessagesList} 
                    messagesListHeight={messagesListHeight} 
                    onPress={() => state.isInputShown=true}
                    slug={slug}
                />
                }
                <SendMessageInput/>
                <ResponseInput roomId={slug}/>
            </View>
            {snap.isSidebarShown && <DarknessLayer/>}
            <Sidebar />
        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#fff',
        padding: 0,
        margin: 0,
        position: 'relative',
    },
    headerContainer: {
        height: 75,
        zIndex: 1,
    },
    messagesFeed: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
        paddingHorizontal: 10,
    }
})

export default Room;