import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const ExpenseListItem = ({ id, description, amount, createdAt }) => (
    <div>
        <Link to={`/edit/${id}`}>
            <h3>{description}</h3>
        </Link>
        <p>{amount} - {moment(createdAt).format('Do MMMM, YYYY')}</p>
    </div>
);

export const Test = () => (
    <div>
        <Link to={`/edit/10`}>
            <h3>Coffee</h3>
        </Link>
        <p>£3.10 12th February, 2019</p>
    </div>
);

export default ExpenseListItem;