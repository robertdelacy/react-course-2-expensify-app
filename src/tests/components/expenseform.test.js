import React from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import { expenses } from '../fixtures';
import moment from 'moment';

let wrapper, expensesWrapper, onSubmitSpy;

beforeEach(() => {
    onSubmitSpy = jest.fn();
    wrapper = shallow(<ExpenseForm time={0} type="Add"/>);
    expensesWrapper = shallow(<ExpenseForm expense={expenses[1]} onSubmit={onSubmitSpy} type="Edit"/>);
});

test('should render ExpenseForm correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseForm with expense data', () => {
    expect(expensesWrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
    expect(wrapper).toMatchSnapshot();
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
});

test('should set description on input change', () => {
    const value = 'New Description';
    expect(wrapper).toMatchSnapshot();
    wrapper.find('input').at(0).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('description')).toBe(value);
    expect(wrapper).toMatchSnapshot();
});

test('should set note on input change without new line', () => {
    const value = 'This is my note';
    expect(wrapper).toMatchSnapshot();
    wrapper.find('textarea').simulate('change', {
        target: { value }
    });
    expect(wrapper.state('note')).toBe(value);
    expect(wrapper).toMatchSnapshot();
});

test('should set note on input change with new line and tab', () => {
    const value = 'This is my note \n with a new line \t and tab';
    expect(wrapper).toMatchSnapshot();
    wrapper.find('textarea').simulate('change', {
        target: { value }
    });
    expect(wrapper.state('note')).toBe(value);
    expect(wrapper).toMatchSnapshot();
});

test('should set amount if valid input', () => {
    const value = '23.50';
    expect(wrapper).toMatchSnapshot();
    wrapper.find('input').at(1).simulate('change', {
        target: { value: `£${value}` }
    });
    expect(wrapper.state('amount')).toBe(value);
    expect(wrapper).toMatchSnapshot();
});

test('should set amount, ignoring last digit, if invalid input', () => {
    const value = '12.123';
    expect(wrapper).toMatchSnapshot();
    wrapper.find('input').at(1).simulate('change', {
        target: { value: `£${value}` }
    });
    expect(wrapper.state('amount')).toBe('12.12');
    expect(wrapper).toMatchSnapshot();
});

test('should not amount if invalid input', () => {
    const value = '12.1232';
    expect(wrapper).toMatchSnapshot();
    wrapper.find('input').at(1).simulate('change', {
        target: { value: `£${value}` }
    });
    expect(wrapper.state('amount')).toBe('');
    expect(wrapper).toMatchSnapshot();
});

test('should replace with full formatted amount upon input field losing focus', () => {
    const value = '3';
    const formatted = '3.00'
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('amount')).toBe(value);
    expect(wrapper).toMatchSnapshot();
    wrapper.find('input').at(1).simulate('Blur');
    expect(wrapper.state('amount')).toBe(formatted);
    expect(wrapper).toMatchSnapshot();
});

test('should remove delimiters when set or pasted in', () => {
    const value = '1000000.99';
    const delimiters = '1,000,000.99'
    expect(wrapper).toMatchSnapshot();
    wrapper.find('input').at(1).simulate('change', {
        target: { value: delimiters }
    });
    expect(wrapper.state('amount')).toBe(value);
    expect(wrapper).toMatchSnapshot();
});

test('should call onSubmit prop for valid form submission', () => {
    expensesWrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
    expect(wrapper.state('error')).toBe('');
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[1].description,
        amount: expenses[1].amount,
        note: expenses[1].note,
        createdAt: expenses[1].createdAt
    })
});

test('should set new date on date change', () => {
    const now = moment();
    wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now);
});

test('should set calender focus on change', () => {
    const focused = true;
    wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')( { focused } );
    expect(wrapper.state('calenderFocused')).toBe(focused);
});