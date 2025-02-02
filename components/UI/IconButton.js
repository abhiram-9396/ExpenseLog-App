import { Pressable, View, StyleSheet } from "react-native";
import {Ionicons} from "@expo/vector-icons";

export default function IconButton({icon,size,color,onPress})
{
    return <Pressable style={({pressed})=> pressed && styles.pressed} onPress={onPress}>
        <View style={styles.buttoncontainer}>
            <Ionicons name={icon} size={size} color={color}/>
        </View>
    </Pressable>
}

const styles = StyleSheet.create({
    buttoncontainer:
    {
        borderRadius:24,
        padding:6,
        marginBottom:8,
        marginHorizontal:8,
    },
    pressed:
    {
        opacity:0.75,
    }
})