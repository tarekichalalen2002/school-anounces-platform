import { useLocalSearchParams } from 'expo-router';
import React,{useEffect,useState, useRef} from 'react';
import { View,StyleSheet,FlatList,KeyboardAvoidingView } from 'react-native';
import {
    Header,
    Message,
    SendMesssageButton,
    SendMessageInput,
    Sidebar,
    DarknessLayer,
    ResponseInput
} from "../../components"
import {messages} from "../../utils/messages"
import state from '../../state';
import { useSnapshot } from 'valtio';

const roomsTitles = [
    "Lost objects",
    "Found objects",
    "Shop"
]

const Room = () => {
    const { slug } = useLocalSearchParams();
    const [scrollMessagesList,setSrollMessagesList] = useState(0)
    const [messagesListHeight,setMessagesListHeight] = useState(0)
    const roomIndex = Number(slug);
    const roomTitle = roomsTitles[roomIndex];
    const snap = useSnapshot(state)
    const handleScroll = (e)=>{
        setSrollMessagesList(e.nativeEvent.contentOffset.y)
    }
    const flatListRef = useRef(null);
    useEffect(()=>{
        flatListRef.current.scrollToOffset({ offset: messagesListHeight + 100, animated: false });
    },[])
    return (
        <KeyboardAvoidingView
        style={styles.container}
        >
            <View style={styles.headerContainer}>
                <Header currentTitle={roomTitle} isNotified={true}/>
            </View>
            <View style={styles.messagesFeed} >
                <FlatList
                    ref={flatListRef}
                    style={{flex:1,Bottom:100}}
                    data={messages[roomIndex]}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    onLayout={(e) => {
                        flatListRef.current.scrollToOffset({ offset: messagesListHeight + 100, animated: false });
                    }}
                    onContentSizeChange={(contentWidth, contentHeight) => {
                        setMessagesListHeight(contentHeight)
                    }}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                    renderItem={({item})=>(
                        <Message 
                        {...item}
                        />
                    )}
                />
                <SendMesssageButton 
                    scrollMessagesList={scrollMessagesList} 
                    messagesListHeight={messagesListHeight} 
                    onPress={() => state.isInputShown=true}
                    slug={slug}
                />
                <SendMessageInput/>
                <ResponseInput/>
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