import { useLocalSearchParams } from 'expo-router';
import {View, Text} from 'react-native';

const Room = () => {
    const { slug } = useLocalSearchParams();
    return (
        <View>
            <Text>Room {slug}</Text>
        </View>
    )
}

export default Room;