import {View,TouchableOpacity} from "react-native";
import state from "../state";
import { Animated } from "react-native";



const DarknessLayer = () => {
    return(
        <TouchableOpacity
            onPress={() => state.isSidebarShown = false}
            style={{
                position:"absolute",
                top:0,
                left:0,
                right:0,
                bottom:0,
                zIndex:40,
                backgroundColor:"black",
                opacity:0.5,
            }}
            >
        </TouchableOpacity>
    )
}

export default DarknessLayer