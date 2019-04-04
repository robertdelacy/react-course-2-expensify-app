import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setTextFilter, sortBy, setStartDate, setEndDate } from '../actions/filters';
import 'react-dates/initialize';

export class ExpenseListFilters extends React.Component {
    state = {
        calendarFocused: null
    };

    onDatesChange = ({startDate, endDate}) => {
        
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    };

    onFocusChange = (calendarFocused) => {
        this.setState(() => ({ calendarFocused }));
    }

    onTextChange = (e) => {
        this.props.setTextFilter(e.target.value);
    };

    onSortChange = (e) => {
        this.props.sortBy(e.target.value);
    };

    render() {
        return (
            <div>
        <input type="text" value={this.props.filters.text} onChange={this.onTextChange}/>
        <select
        value={this.props.filters.sortBy}
        onChange={this.onSortChange}>
            <option value = "description_low">Description (A-Z)</option>
            <option value = "description_high">Description (Z-A)</option>
            <option value = "amount_low">Amount (Small to Large)</option>
            <option value = "amount_high">Amount (Large to Small)</option>
            <option value = "date_low">Date (Old to New)</option>
            <option value = "date_high">Date (New to Old)</option>
        </select>
        <DateRangePicker
        startDate={this.props.filters.startDate}
        startDateId=""
        endDate={this.props.filters.endDate}
        endDateId=""
        onDatesChange={this.onDatesChange}
        focusedInput={this.state.calendarFocused}
        onFocusChange={this.onFocusChange}
        numberOfMonths={1}
        showClearDates={true}
        isOutsideRange={() => false}
        displayFormat = 'DD/MM/YYYY'/>
    </div>
        )
    }
};

const mapStateToProps = (state) => ({
        filters: state.filters
    });

const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    sortBy: (sortByValue) => dispatch(sortBy(sortByValue)),
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);