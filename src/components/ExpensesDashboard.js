import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters';
//import 'react-dates/lib/css/_datepicker.css';

const ExpenseDashboardPage = (props) => (
    <div>
        <ExpenseListFilters/>
        <ExpenseList />
    </div>
);

export default ExpenseDashboardPage;