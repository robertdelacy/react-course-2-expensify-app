const expensesTotal = (expenses) => (
    expenses.map((expense) => expense.amount).reduce((sum, value) => sum + value, 0)
);

export default expensesTotal