import expensesTotal from '../selectors/expenses-total';
import { expenses } from './fixtures';

test('should sum expenses correctly with multiple expenses', () => {
    const total = expensesTotal(expenses);
    expect(total).toBe(114195);
});

test('should sum correctly with single expense', () => {
    const total = expensesTotal([expenses[1]]);
    expect(total).toBe(expenses[1].amount);
});

test('should return 0 if no expenses', () => {
    const total = expensesTotal([]);
    expect(total).toBe(0);
});