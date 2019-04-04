import React from 'react';
import { shallow } from 'enzyme';
import ExpenseListItem from '../../components/ExpenseListItem';
import { expenses } from '../fixtures';
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

let wrapper;

beforeEach(() => {
    wrapper =  shallow(<ExpenseListItem {...expenses[0]}/>);
});

test('should render ExpenseListItem with expenses', () => {
    expect(wrapper).toMatchSnapshot();
});