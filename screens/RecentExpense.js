import { useContext, useEffect, useState } from "react"
import { Text } from "react-native"
import ExpensesOutput from "../components/ExpensesOutput/Expensesoutput"
import ErrorOverlay from "../components/UI/ErrorOverlay";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { ExpenseContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpense } from "../util/http";

export default function RecentExpenses() {

    const [Isfetching, setIsFetching] = useState(true);
    const expensesCtx = useContext( ExpenseContext );
    const [error,setError] = useState();

    useEffect(() => {
        async function getExpenses() {
            setIsFetching(true);
            try {
                const expenses = await fetchExpense();
                expensesCtx.setExpenses(expenses);
                console.log(expenses);
            }
            catch(error) { 
                setError('Could not fetch the expenses...Check your internet connection and restart the app.')
            }
            setIsFetching(false);
        }
        getExpenses();
    }, []);

    if(error && !Isfetching)// if error appears and the data is not fetching.
    {
        return <ErrorOverlay message={error}/>
    }

    if(Isfetching)//if its fetching the data we have to show the spinner(loading screen).
    {
        return <LoadingOverlay/>
    }

    

    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today,7);

        return (expense.date >= date7DaysAgo) && (expense.date <= today); //returning the expenses that are more than the date that is 7days ago and less than or equal to the date that is today
    });

    return <ExpensesOutput 
    expenses={recentExpenses} 
    expensesPeriod="Last 7 days" 
    fallbackText="No expenses registered for last 7 days.."
    />
}
