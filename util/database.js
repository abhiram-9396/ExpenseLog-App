import * as SQLite from 'expo-sqlite';
import { useState } from 'react';
import { Expense } from '../models/expense';
import { getFormattedDate } from './date';

const database = SQLite.openDatabase('expenses.db'); //creates a database called expenses

export function init() {
    const promise  = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(`CREATE TABLE IF NOT EXISTS expenses (
                id INTEGER PRIMARY KEY NOT NULL,
                amount REAL NOT NULL,
                description TEXT NOT NULL,
                date VARCHAR(10)
            )`,
            [],
            () => {
                resolve();
            },
            (_,error) => {
                reject(error);
            }
            );
        });  
    });   
    return promise;
}

export function insertExpense(expense) {
    console.log(expense.date);
    date = getFormattedDate(expense.date);
    const promise  = new Promise((resolve,reject) => {
        database.transaction((tx) => {
            tx.executeSql(`INSERT INTO expenses (amount, description, date) VALUES ( ?, ?, ? )`, 
            [
                expense.amount, 
                expense.description, 
                date,
            ],
            (_,result) => {
                console.log(result);
                resolve(result);
            },
            (_,error) => {
                reject(error);
            }
            );
        });
    });
}


export function fetchExpenses() {
  
    const promise = new Promise((resolve, reject) => {
      database.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM expenses',
          [],
          (_, result) => {
            
            let expenses = [];
            let myobj = {};

            for (const dp of result.rows._array) {
                myobj.amount = dp.amount,
                myobj.description = dp.description,
                myobj.date = dp.date,
                myobj.id = dp.id

              expenses.push(myobj);
            }
            resolve(expenses);
            // console.log(expenses);
           
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });

  
    // console.log(promise);
    return promise;
    
  }

  export function deleteTable()
  {
    const promise  = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(`DROP TABLE IF EXISTS expenses`,
            [],
            () => {
                resolve();
            },
            (_,error) => {
                reject(error);
            }
            );
        });  
    });   
    return promise;
  }