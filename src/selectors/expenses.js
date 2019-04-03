import moment from "moment";

export default (expenses, { text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        const createdAtMoment = moment(expense.createdAt)
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
        
        return startDateMatch && endDateMatch && textMatch;
    }).sort((a,b) => {
        switch (sortBy) {
            case 'date_high':
                return a.createdAt < b.createdAt ? 1 : -1
            case 'date_low':
                return a.createdAt > b.createdAt ? 1 : -1
            case 'amount_high': 
                return a.amount < b.amount ? 1 : -1;
            case 'amount_low': 
                return a.amount > b.amount ? 1 : -1;
            case 'description_high':
                return a.description < b.description ? 1 : -1;
            case 'description_low':
                return a.description > b.description ? 1 : -1;
            default:
                return 1;
        }
    });
}