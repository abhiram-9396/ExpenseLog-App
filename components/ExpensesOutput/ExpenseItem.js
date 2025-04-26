import { Pressable, Text, View, StyleSheet } from "react-native";
import {GlobalStyles} from "../../constants/styles";
import {getFormattedDate} from "../../util/date";
import { useNavigation } from "@react-navigation/native";

export default function ExpenseItem({id, description, amount, date}){

    const navigation = useNavigation();

    function expensePresshandler()
    {
        navigation.navigate('Manage Expenses',{
            expenseId: id, 
<<<<<<< HEAD
            //for expense item we are passing the id of the item because we want to know the id of the item which we are editing.
=======
            //for expense item we are passing the id of the item because we want to know the id pf the item which we are editing.
>>>>>>> 1c917c8 (Working)
        });
    }

    return <Pressable onPress={expensePresshandler} style={({pressed})=> pressed && styles.pressed}>
        <View style={styles.expenseItem}>
            <View>
                <Text style={[styles.textbase, styles.description]}>{description}</Text>
                <Text style={styles.textbase}>{getFormattedDate(date)}</Text>
            </View>
            <View style={styles.amountContainer}>
                <Text style={styles.amount}>{amount.toFixed(2)}</Text>
            </View>
        </View>
    </Pressable>
}

const styles = StyleSheet.create({
    expenseItem:
    {
        padding:12,
        marginVertical:8,
        backgroundColor: GlobalStyles.colors.primary500,
        flexDirection:'row',
        justifyContent:'space-between',
        borderRadius:6,
        elevation:3,
        shadowColor: GlobalStyles.colors.gray500,
        shadowRadius:4,
        shadowOffset:{width:1,height:1},
        shadowOpacity:0.4,
    },
    textbase:
    {
        color: GlobalStyles.colors.primary50,
    },
    description:
    {
        fontSize:16,
        marginBottom:4,
        fontWeight:'bold',
<<<<<<< HEAD
        maxWidth: '78%',
=======
>>>>>>> 1c917c8 (Working)
    },
    amountContainer:
    {
         paddingHorizontal:12,
         paddingVertical:4,
         backgroundColor:'white',
         justifyContent:'center',
         alignItems:'center',
         borderRadius:4,
         minWidth:80,
    },
    amount:
    {
        color: GlobalStyles.colors.primary500,
        fontWeight:'bold',
    },
    pressed:
    {
        opacity:0.75,
    }
});