import { Children, createContext, useReducer } from "react";

export const ExpenseContext = createContext({
    expenses: [], //initially there are no expenses.
    addExpense: ({description, amount, date}) => {}, //we expect a date,amount and desc to add a new expense.
    setExpenses: (expenses) => {}, //used to set the order of expenses.
    deleteExpense: (id) => {}, //we expect an id for an expense to delete
    updateExpense: (id,{description, amount, date}) => {}, //we expect an id and the edited details of an expense to edit the expense.
}); //here context is like a model which we use across all the project.

function expenseReducer(state, action) //since we link this to useReducer function below..we automatically get the state and action parameters by default.
{
    switch(action.type)
    {
        case 'ADD':
            // const id = new Date().toString() + Math.random().toString();
            return [action.payload, ...state]; //here we are copying all the previous expenses using spread operator and we are adding the new expense before them in an array.
        case 'SET':
            const inverted = action.payload.reverse();
            return inverted;
        case 'UPDATE':
            const updatableExpenseID = state.findIndex(
                (expense) => expense.id === action.payload.id
            );
            const updatableExpense = state[updatableExpenseID]; //here we get the item which we want to update
            const updatedItem = { ...updatableExpense, ...action.payload.data }; //here we are copieng the edited data to the initial data
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseID] = updatedItem;
            return updatedExpenses;
        case 'DELETE':
            return state.filter((expense)=> expense.id !== action.payload);
        default:
            return state;
    }
}

function ExpensesContextProvider({children})
{
    const [expensesState, dispatch] = useReducer(expenseReducer, []); //here the 2nd parameter dummyexpenses is used as the initial state to the reducer later we updated to empty array after using the backend api. 
    //useReducer always provides two components same as useState the 1st one is the current state and the 2nd one is the dispatch function.
    function addExpense(expenseData)
    {
        dispatch({type: 'ADD' , payload: expenseData});
        //here we are passing the expensedata to the reducer function
        //here type and payload are not the default names...we can call whatever names we want to.
    }

    function setExpenses(expenses)
    {
        dispatch({type:'SET', payload: expenses});
    }

    function deleteExpense(id)
    {
        dispatch({type: 'DELETE' , payload: id});
    }

    function updateExpense(id, expenseData)
    {
        dispatch({type: 'UPDATE' , payload: { id: id, data: expenseData }});
    }

    //here above we are dispatching different actions according to which the reducer will switch the action.

    const value = {
        expenses: expensesState,
        setExpenses: setExpenses,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense,
    };

    return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
}

export default ExpensesContextProvider;