import { Text , View, StyleSheet,TouchableOpacity } from 'react-native';
import { colors } from '../utils/colors';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import state from '../state';

const Header = ({currentTitle,isNotified}) => {
    return (
        <View style={styles.header}>
            <View style={styles.headerSubContainer}>
                <TouchableOpacity
                onPress={() => state.isSidebarShown = true}
                >
                    <Icon name="menu" size={35} color={colors.dark_blue} />
                </TouchableOpacity>
                <Text style={styles.title}>{currentTitle}</Text>
            </View>
            <View
            style={{
                position: "relative",
            }}
            >
                <Icon2 name="bell" size={28} color={colors.dark_blue} />
                {isNotified && (<View style={styles.notifIndicator} />)}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    header: {
        flex:1,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: colors.light_blue,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    title:{
        fontSize: 18,
        fontWeight:"bold",
        color: colors.dark_blue,
    },
    headerSubContainer:{
        flexDirection: "row",
        alignItems: "center",
        gap: 30,
    },
    notifIndicator:{
        position: "absolute",
        width: 10,
        height: 10,
        borderRadius: 10,
        backgroundColor: colors.lentils_orange,
        right:0,
        top:3
    }
})

export default Header;