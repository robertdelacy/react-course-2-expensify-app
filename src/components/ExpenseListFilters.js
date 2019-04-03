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
            <option value = "description_low">Description (Low to High)</option>
            <option value = "description_high">Description (High to Low)</option>
            <option value = "amount_low">Amount (Low to High)</option>
            <option value = "amount_high">Amount (High to Low)</option>
            <option value = "date_low">Date (Low to High)</option>
            <option value = "date_high">Date (High to Low)</option>
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
    sortBy: (sortBy) => dispatch(sortBy(sortBy)),
    setStartDate: (startDate) => dispatch(setEndDate(startDate)),
    setStartDate: (endDate) => dispatch(setEndDate(endDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);