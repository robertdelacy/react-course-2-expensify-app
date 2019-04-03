import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AddExpensePage from '../components/AddExpenses';
import EditExpensePage from '../components/EditExpenses';
import ExpenseDashboardPage from '../components/ExpensesDashboard';
import Header from '../components/Header';
import HelpPage from '../components/Help';
import NotFoundPage from '../components/NotFound';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path="/" component={ExpenseDashboardPage} exact={true}/>
                <Route path="/create" component={AddExpensePage}/>
                <Route path="/edit/:id" component={EditExpensePage}/>
                <Route path="/help" component={HelpPage}/>
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;