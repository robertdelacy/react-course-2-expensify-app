import selectExpenses from '../selectors/expenses';
import moment from 'moment';
import { expenses } from './fixtures'

test('should filter by text value', () => {
    const filters = {
        text: 'e',
        sortBy: 'date_high',
        startDate: undefined,
        endDate: undefined
    };

    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([expenses[2], expenses[1]]);
});

test('should filter by startDate', () => {
    const filters = {
        text: '',
        sortBy: 'date_high',
        startDate: moment(0),
        endDate: undefined
    };

    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([expenses[2], expenses[0]]);
});

test('should filter by endDate', () => {
    const filters = {
        text: '',
        sortBy: 'date_high',
        startDate: undefined,
        endDate: moment(0)
    };

    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([expenses[0], expenses[1]]);
});

test('should sort by date (low to high)', () => {
    const filters = {
        text: '',
        sortBy: 'date_low',
        startDate: undefined,
        endDate: undefined
    };

    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([expenses[1], expenses[0], expenses[2]]);
});

test('should sort by amount (low to high)', () => {
    const filters = {
        text: '',
        sortBy: 'amount_low',
        startDate: undefined,
        endDate: undefined
    };

    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([expenses[0], expenses[2], expenses[1]]);
});

test('should sort by description (low to high)', () => {
    const filters = {
        text: '',
        sortBy: 'description_low',
        startDate: undefined,
        endDate: undefined
    };

    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([expenses[2], expenses[0], expenses[1]]);
});