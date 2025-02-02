import { useState } from "react";
import { Text,StyleSheet, View, Alert } from "react-native";
import Input from "./Input";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";

export default function ExpenseForm({ submitButtonLabel, onCancel, onSubmit, defaultValues })
{
    const [inputs, setinputs] = useState({
        amount: {
            value: defaultValues ? defaultValues.amount.toString() : '', 
            isValid: true,
        },
        date: {
            value: defaultValues ? getFormattedDate(defaultValues.date) : '', 
            isValid: true,
        },
        description: {
            value: defaultValues ? defaultValues.description : '', 
            isValid: true,
        },
    });

    function inputChangedHandler(inputIdentifier, enteredValue)
    {
        setinputs((curinps) => {
            return {
                ...curinps,
                [inputIdentifier]: { value: enteredValue, isValid: true }, //by default the isValid is true because after checking then the isValid will be change to the true or false.
            };
        });
    }

    function submitHandler()
    {
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value,
        };

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== "Invalid Date";
        const descriptionIsValid = expenseData.description.trim().length > 0; //trim removes all the white spaces

        if(!amountIsValid || !dateIsValid || !descriptionIsValid)
        {
            // Alert.alert("Invalid Input", "please check your input values");
            setinputs((curinps)=>{
                return {
                    amount: { value: curinps.amount.value, isValid: amountIsValid },
                    date: { value: curinps.date.value, isValid: dateIsValid },
                    description: { value: curinps.description.value, isValid: descriptionIsValid }
                };
            });
            return;
        }

        onSubmit(expenseData);
    }

    const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;

    return <View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
        <View style={styles.inputRows}>
            <Input 
            style={styles.Rowinput}
            label="Amount"
            invalid={!inputs.amount.isValid} 
            textInputConfig={{
                keyboardType: "decimal-pad",
                onChangeText: inputChangedHandler.bind(this,'amount'),
                value: inputs.amount.value,
            }}
            />
            <Input 
            style={styles.Rowinput}
            label="Date" 
            invalid={!inputs.date.isValid}
            textInputConfig={{
                placeholder: "YYYY-MM-DD",
                maxLength: 10,
                onChangeText: inputChangedHandler.bind(this,'date'),
                value: inputs.date.value,
            }}/>
        </View>
         
        <Input 
            label="Description"
            invalid={!inputs.description.isValid} 
            textInputConfig={{
            multiline: true,
            autoCorrect: false,
            // autoCapitalize: "words", //default is sentences
            onChangeText: inputChangedHandler.bind(this,'description'),
            value: inputs.description.value,
        }}/>
        {formIsInvalid && <Text style={styles.errorText}>Invalid input values - please check your data!</Text>}
        <View style={styles.buttons}>
            <Button style={styles.button} mode="flat" onPress={onCancel}>Cancel</Button>
            <Button style={styles.button} onPress={submitHandler}>{submitButtonLabel}</Button>
        </View>
    </View>
}

const styles = StyleSheet.create({
    form:{
        marginTop:60,
    },
    title:
    {
        fontSize:24,
        fontWeight:'bold',
        color:'white',
        marginVertical:24,
        textAlign:'center'
    },
    inputRows:
    {
        flexDirection:'row',
        justifyContent:'space-between',
    },
    Rowinput:{
        flex:1,
    },
    buttons:
    {
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    button:
    {
        minWidth:120,
        marginHorizontal:8,
    },
    errorText:
    {
        textAlign:'center',
        color: GlobalStyles.colors.error500,
        marginVertical: 10,

    }
})