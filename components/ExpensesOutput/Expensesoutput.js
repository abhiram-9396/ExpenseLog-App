import {View,StyleSheet, Text} from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import {GlobalStyles} from "../../constants/styles";

export default function ExpensesOutput({ expenses, expensesPeriod, fallbackText })
{
    let content = <Text style={styles.infotext}>{fallbackText}</Text>;
    
    if(expenses.length > 0)
    {
        content = <ExpensesList expenses={expenses}/>
    }
    return (
    <View style={styles.container}>
    <ExpensesSummary expenses={expenses} PeriodName={expensesPeriod}/>
    {content}
    </View> 
    );
}

const styles = StyleSheet.create({
    container:
    {
        paddingHorizontal:24,
        paddingTop:24,
        backgroundColor: GlobalStyles.colors.primary700,
        flex:1,
    },
    infotext:
    {
        color:'white',
        fontSize:16,
        textAlign:'center',
        marginTop: 32,
    }
});