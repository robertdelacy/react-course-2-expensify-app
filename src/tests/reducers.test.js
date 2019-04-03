/***********
 **FILTERS**
 **********/

import filtersReducer from '../reducers/filters';
import moment from 'moment';

 test('should setup default filter values', () => {
    const state = filtersReducer(undefined, {type: '@@INIT'})
    expect(state).toEqual({
        text:'',
        sortBy: 'description_low',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
 });

 test('should set sortBy to amount_low', () => {
    const state = filtersReducer(undefined, { type: 'SORT_BY', sortBy: 'amount_low' });
    expect(state.sortBy).toBe('amount_low');
 });

 test('should set sortBy to description_low', () => {
    const currentState = {
        text:'',
        sortBy: 'amount_low',
        startDate: undefined,
        endDate: undefined
    };
    const action = { type: 'SORT_BY', sortBy: 'description_low'};
    const state = filtersReducer(currentState, action);
    expect(state.sortBy).toBe('description_low');
 });

 test('should set text', () => {
    const text = 'test filter'
    const state = filtersReducer(undefined, { type: 'SET_TEXT_FILTER', text });
    expect(state.text).toBe(text);
 });

 test('should set startDate', () => {
    const startDate = moment(0).add(12, 'years');
    const state = filtersReducer(undefined, { type: 'SET_START_DATE', startDate });
    expect(state.startDate).toBe(startDate);
 });

 test('should set endDate', () => {
    const endDate = moment(0).add(49, 'years');
    const state = filtersReducer(undefined, { type: 'SET_END_DATE', endDate });
    expect(state.endDate).toBe(endDate);
 });

/************
 **EXPENSES**
 ***********/

 import expensesReducer from '../reducers/expenses';
 import { expenses } from './fixtures';

 test('should set default state', () => {
    const state = expensesReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual([]);
 });

 test('should remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]]);
 });

 test('should not remove expense if id not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: -1
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
 });

test('should add an expense', () => {
    const newExpense = {
    id: 3,
    description: 'Coffee',
    note: 'Capita Interview',
    amount: 310,
    createdAt: moment().subtract(2, 'months').add(11,'days').valueOf()
    };
    const action = {
        type: 'ADD_EXPENSE',
        expense: newExpense
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([...expenses, newExpense]);
});

 test('should edit an expense', () => {
    const updates = {
    description: 'Costa Coffee',
    note: 'Capita Interview \n Edited',
    amount: 290
    };
    const action = {
        type: 'EDIT_EXPENSE',
        id: 2,
        updates
    };
    const state = expensesReducer(expenses, action);

    const { description, note, amount } = state[2];

    expect(description).toEqual(updates.description);
    expect(note).toEqual(updates.note);
    expect(amount).toEqual(updates.amount);
 });

 test('should not edit an expense if id not found', () => {
    const updates = {
    description: 'Costa Coffee',
    note: 'Capita Interview \n Edited',
    amount: 290
    };
    const action = {
    type: 'EDIT_EXPENSE',
    id: -1,
    updates
    };

    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

 