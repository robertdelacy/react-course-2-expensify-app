import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { expenses, filters, filledFilters } from '../fixtures';
import { writeHeapSnapshot } from 'v8';

let setTextFilter, sortBy, setStartDate, setEndDate, wrapper;

beforeEach(() => {
    setTextFilter = jest.fn();
    sortBy = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    wrapper = shallow (<ExpenseListFilters 
        filters={filters}
        setTextFilter={setTextFilter}
        sortBy={sortBy}
        setStartDate={setStartDate}
        setEndDate={setEndDate}/>)
});

test('should render ExpenseListFilters correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters with filledFilters correctly', () => {
    wrapper.setProps({
        filters: filledFilters
    });
    expect(wrapper).toMatchSnapshot();
});

test('should handle text change', () => {
    wrapper.setProps({
        filters: filledFilters
    });
    const text = filledFilters.text + 'e';
    wrapper.find('input').simulate('change', {
        target: { value: text }
    });
    expect(setTextFilter).toHaveBeenLastCalledWith(text);
});

test('should sort correctly', () => {
    wrapper.find('select').simulate('change', {
        target: { value: filledFilters.sortBy }
    });
    expect(sortBy).toHaveBeenLastCalledWith(filledFilters.sortBy);
});

test('should handle date changes', () => {
    wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')({ startDate: filledFilters.startDate, endDate: filledFilters.endDate });
    expect(setStartDate).toHaveBeenLastCalledWith(filledFilters.startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(filledFilters.endDate);
});

test('should handle date focus changes', () => {
    const calenderFocused = 'endDate';
    wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')( calenderFocused );
    expect(wrapper.state('calendarFocused')).toBe(calenderFocused);
});