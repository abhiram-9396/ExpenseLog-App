// import { useContext, useEffect, useState } from "react"
// import ExpensesOutput from "../components/ExpensesOutput/Expensesoutput"
// import { ExpenseContext } from "../store/expenses-context";
// import { fetchExpenses } from "../util/database";

// export default async function AllExpenses()
// {
//     const [Isfetching, setIsFetching] = useState(true);
//     const expensesCtx = useContext( ExpenseContext );
//     const [error,setError] = useState();

//     useEffect(() => {
//         async function getExpenses() {
//             setIsFetching(true);
//             try {
//                 const expenses = await fetchExpenses();
//                 expensesCtx.setExpenses(expenses);
//                 console.log('Fetched expenses are',expenses)
//             }
//             catch(error) { 
//                 setError('Could not fetch the expenses...Check your internet connection and restart the app.')
//             }
//             setIsFetching(false);
//         }
//         getExpenses();
//         console.log('expensesCtx',expensesCtx.expenses);
//     }, []);

//     // console.log(Dbexpenses);
//     console.log(expensesCtx.expenses);

//     return <ExpensesOutput 
//     expenses = {expensesCtx.expenses}
//     expensesPeriod="Total"
//     fallbackText="No registered expenses found.."
//     />
    
// } //I tried this by using SQL and the below code is by using the firebase


import { useContext } from "react"
import { Text } from "react-native"
import ExpensesOutput from "../components/ExpensesOutput/Expensesoutput"
import { ExpenseContext } from "../store/expenses-context";

export default function AllExpenses()
{
    const expensesCtx = useContext( ExpenseContext );
    return <ExpensesOutput 
    expenses={expensesCtx.expenses} 
    expensesPeriod="Total"
    fallbackText="No registered expenses found.."
    />
}
