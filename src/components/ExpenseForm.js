import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
//import 'react-dates/lib/css/_datepicker.css';

export default class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            description: props.expense? props.expense.description : '',
            note: props.expense? props.expense.note : '',
            amount:props.expense? (props.expense.amount / 100).toString() : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(props.time),
            calenderFocused: false,
            error:''
        };

        //console.log(this.state)
    }

    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState((prevState) => {
            return ({...prevState, description });
        });
    };

    onNoteChange = (e) => {
        const note = e.target.value;
        if(note === this.state.note+'\n'){
            console.log('hit');
            e.stopPropagation();
        }
        this.setState(() => {
            return ({ note });
        });
    };

    onDateChanged = (createdAt) => {
        if(createdAt) {
            this.setState(() => ({ createdAt }));
        }
    };

    onAmountChange = (e) => {
        const value = e.target.value;
        if(value.split('£').length > 1){
            const amount = value.split('£')[1];
            if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
                this.setState(() => ({ amount: amount }));
            }
        } else if (!value || !isNaN(parseFloat(value))) {
            this.setState(() => ({ amount: value }));
        }
    };

    onFocusChange = ({ focused }) => {
        this.setState(() => ({calenderFocused: focused}))
    };

    onSubmit = (e) => {
        e.preventDefault();

        if(!this.state.description || !this.state.amount) {
            this.setState(() => ({ error: 'Please provide description and amount' }));
        }
        else{
            this.setState(() => ({ error: '' }));
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100,
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            })
        }
    };

    render() {
        return(
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
                    <input type="text" placeholder="Description" autoFocus value={this.state.description} onChange={this.onDescriptionChange}/>
                    <input type="text" placeholder="£" value={ this.state.amount && `£${this.state.amount}`} onChange={this.onAmountChange}/>
                    <SingleDatePicker date={this.state.createdAt}
                    onDateChange={this.onDateChanged}
                    focused={this.state.calenderFocused}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                    displayFormat = 'DD/MM/YYYY'/>
                    <textarea placeholder="Add a note for your expense(optional)" value = {this.state.note} onChange={this.onNoteChange}/>
                    <button>Add Expense</button>
                </form>
            </div>
        )
    }
}