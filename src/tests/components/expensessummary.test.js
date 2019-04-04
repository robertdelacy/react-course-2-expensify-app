import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';
import numeral from 'numeral';

numeral.register('locale', 'gb', {
    delimiters: {
        thousands: ',',
        decimal: '.'
    },
    abbreviations: {
        thousand: 'k',
        million: 'm',
        billion: 'b',
        trillion: 't'
    },
    ordinal : function (number) {
        return number === 1 ? 'st' : 'rd';
    },
    currency: {
        symbol: '£'
    }
});

numeral.locale('gb');

test('should correctly render ExpensesSummary with no expenses', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={0}  expensesTotal={0}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should correctly render ExpensesSummary with 1 expense', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={1}  expensesTotal={256}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should correctly render ExpensesSummary with multiple expenses', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={23}  expensesTotal={3456789}/>);
    expect(wrapper).toMatchSnapshot();
});