import { useContext, useLayoutEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import IconButton from "../components/UI/IconButton";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import {GlobalStyles} from "../constants/styles";
import { ExpenseContext } from "../store/expenses-context";
import { storeExpense, updateExpenses, deleteExpense } from "../util/http";
import ErrorOverlay from "../components/UI/ErrorOverlay";

import * as Notifications from 'expo-notifications';
import { insertExpense } from "../util/database";

export default function ManageExpenses({route,navigation})
{
    const [isSubmitting, setIsSubmitting] = useState(false);
    const expensesCtx =  useContext( ExpenseContext );
    const editedExpenseId = route.params?.expenseId;
    const [error,setError] = useState();

    // console.log(editedExpenseId);
    const isEditing = !!editedExpenseId;

    const selectedExpense = expensesCtx.expenses.find(
        (expense) => expense.id === editedExpenseId
    );

    useLayoutEffect(()=>{
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        });
    },[navigation, isEditing]);

    async function deleteExpenseHandler()
    {
        setIsSubmitting(true);
        try{
            await deleteExpense(editedExpenseId);
            expensesCtx.deleteExpense(editedExpenseId);
            navigation.goBack();
        }
        catch(eror) {
            setError('Could not delete expense - try again later.');
            setIsSubmitting(false);
        }
        
        
    }

    function cancelHandler()
    {
        navigation.goBack();
    }

    async function confirmHandler(expenseData) {
        setIsSubmitting(true);
        try{
            if(isEditing) {
                expensesCtx.updateExpense(editedExpenseId, expenseData);
                await updateExpenses(editedExpenseId, expenseData);
                Notifications.scheduleNotificationAsync({
                    content:{
                        title: 'Edited',
                        body: 'Your Expense is Edited successfylly!',
                    },
                    trigger: {
                        seconds: 1
                    }
                });
            } 
            else 
            {
                insertExpense(expenseData);
                const id = await storeExpense(expenseData);
                expensesCtx.addExpense({...expenseData, id:id});
                
                Notifications.scheduleNotificationAsync({
                    content:{
                        title: 'Added',
                        body: 'Your new Expense is added successfylly!',
                    },
                    trigger: {
                        seconds: 1
                    }
                });
            }
            navigation.goBack();
        }
        catch(error)
        {
            setError('Could not submit the data - please try again later.');
            setIsSubmitting(false);
        }
    }

    if(error && !isSubmitting)
    {
        return <ErrorOverlay message={error}/>
    }

    if(isSubmitting)
    {
        return <LoadingOverlay/>
    }
    
    return (
    <View style={styles.container}>
        <ExpenseForm 
        submitButtonLabel={isEditing ? 'Update' : 'Add'} 
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
        />
        
        {isEditing && (
        <View style={styles.deleteContainer}>
            <IconButton 
                icon="trash" 
                color={GlobalStyles.colors.error500} 
                size={36} 
                onPress={deleteExpenseHandler}
            />
        </View>
        )}
    </View>
    );
}

const styles = StyleSheet.create({
    container:
    {
        flex:1,
        padding:24,
        backgroundColor: GlobalStyles.colors.primary800,
    },
    deleteContainer:
    {
        marginTop:16,
        paddingTop:8,
        borderTopWidth:2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center',
    }
})