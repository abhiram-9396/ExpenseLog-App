import axios from 'axios';

const Backend_Url = 'https://expense-tracker-ab0db-default-rtdb.firebaseio.com';

export async function storeExpense(expenseData)
{
    const response = await axios.post(
        Backend_Url + '/expenses.json',
        expenseData
    );
    const id = response.data.name;
    return id;
}

export async function fetchExpense()
{
    const response = await axios.get( Backend_Url + '/expenses.json');

    const expenses =[];

    for (const key in response.data)
    {
        const expenseobj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description,
        };
        expenses.push(expenseobj);
    }
    return expenses;
}

export function updateExpenses(id, expenseData)
{
    return axios.put( Backend_Url + `/expenses/${id}.json` , expenseData);
}

export function deleteExpense(id)
{
    return axios.delete(Backend_Url + `/expenses/${id}.json`);
}