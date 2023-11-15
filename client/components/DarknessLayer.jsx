import {View} from "react-native";


const DarknessLayer = () => {
    return(
        <View
            style={{
                position:"absolute",
                top:0,
                left:0,
                right:0,
                bottom:0,
                zIndex:40,
                backgroundColor:"black",
                opacity:0.5
            }}
            >
        </View>
    )
}

export default DarknessLayer