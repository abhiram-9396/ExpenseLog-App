import { Text, TextInput, View, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

export default function Input({label, invalid, style, textInputConfig})
{
    const inputstyles = [styles.input];

    if(textInputConfig && textInputConfig.multiline)
    {
        inputstyles.push(styles.multiinput);
    }

    if(invalid)
    {
        inputstyles.push(styles.invalidInput);
    }
    
    return <View style={[styles.inputContainer, style]}>
        <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
        <TextInput style={inputstyles} {...textInputConfig} />
    </View>
}

const styles = StyleSheet.create({
    inputContainer:
    {
        marginHorizontal:4,
        marginVertical:8,
    },
    label:{
        fontSize:12,
        color: GlobalStyles.colors.primary100,
        marginBottom:4,
    },
    input:
    {
        backgroundColor: GlobalStyles.colors.primary100,
        padding:6,
        borderRadius:6,
        fontSize:18,
        color: GlobalStyles.colors.primary700,
    },
    multiinput:
    {
        minHeight:100,
        textAlignVertical:'top',
    },
    invalidLabel:
    {
        color: GlobalStyles.colors.error500,
    },
    invalidInput:
    {
        backgroundColor: GlobalStyles.colors.error50,
    }
})