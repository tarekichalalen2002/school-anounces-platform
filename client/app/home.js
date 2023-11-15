import React,{useRef} from 'react';
import { Text,View,StyleSheet,FlatList } from 'react-native';
import {Header,Message,SendMesssageButton} from "../components"
import {messages} from "../utils/lost_objects_messages"
import state from '../state';

function Home(){
    const handleScroll = (e)=>{
        state.scollMessagesList = e.nativeEvent.contentOffset.y;
    }
    const flatListRef = useRef(null);
    return (
        <View
        style={styles.container}
        >
            <View style={styles.headerContainer}>
                <Header currentTitle="Lost objects" isNotified={true}/>
            </View>
            <View style={styles.messagesFeed} >
                <FlatList
                    ref={flatListRef}
                    style={{flex:1,Bottom:100}}
                    data={messages}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    onLayout={(e)=>{
                        state.messagesListHeight = e.nativeEvent.layout.height;
                        flatListRef.current.scrollToOffset({ offset:e.nativeEvent.layout.height+100, animated: false });
                    }}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                    renderItem={({item})=>(
                        <Message 
                        {...item}
                        />
                    )}
                />
                <SendMesssageButton/>
            </View>
        </View>
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
    },
    messagesFeed: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
        paddingHorizontal: 10,
    }
})

export default Home;