/******************************
 **TABLE HISTORY SUCCESSFUL!!**
 ******************************/


import { createStore, bindActionCreators } from 'redux';

const incrementUndos = () => ({
    type: 'INCREMENT'
});
const decrementUndos = () => ({
    type: 'DECREMENT'
});
const removeUndo = (undoUndo) => ({
    type: 'REMOVE',
    undoUndo
});
const updateUndos = () => ({
    type: 'UPDATE'
});
const resetUndos = () => ({
    type: 'RESET'
});

const updateTable = (play = [Object.create(card), Object.create(card)], discards = [Object.create(card), Object.create(card)]) => ({
    type: 'UPDATE',
    newPlay: play,
    newDiscards: discards
});

const replaceTable = ({play, discards} = {
    play: [Object.create(card), Object.create(card)],
    discards: [Object.create(card), Object.create(card)],}) => ({
        type: 'UPDATE',
        newPlay: play,
        newDiscards: discards
});

const card = {
    face: '',
    value: ''
}

const table = createStore((state = {
    play: [Object.create(card), Object.create(card)],
    discards: [Object.create(card), Object.create(card)],
}, action) => {
    switch(action.type) {
        case 'UPDATE':
            return {
                play: action.newPlay,
                discards: action.newDiscards
            }

        default:
            return state
    }
});

const undo = createStore((state = {
    count: 0,
    history: [],
    undoUndo: ''
}, action) => {
    const undoUndo = action.undoUndo ? action.undoUndo : ''
    switch(action.type) {
        case 'INCREMENT':
            return {
                count: state.count + 1,
                history: state.history.concat(JSON.stringify(table.getState())),
                undoUndo
            };
        case 'DECREMENT':
            return{
                count: state.count - 1,
                history: state.history.slice(1, state.history.length),
                undoUndo
            }
        case 'REMOVE':
            return{
                count: state.count - 1,
                history: state.history.slice(0, state.history.length - 1),
                undoUndo
            }
        case 'UPDATE':
            const concatTable = state.count > 0 ? JSON.stringify(table.getState()) : []
                return{
                    count: state.count,
                    history: (state.history.slice(1, state.history.length)).concat(concatTable),
                    undoUndo
                }
        case 'RESET':
            return{
                count: 0,
                history: [],
                undoUndo
            }
        default:
            return state;
    }
});

const newPlay = (face, value, currentPlay = table.getState().play) => {

    currentPlay[0].face = currentPlay[1].face;
    currentPlay[0].value = currentPlay[1].value;
    currentPlay[1].face = face;
    currentPlay[1].value = value;

    return currentPlay;

};

const useUndo = ({count, history} = undo.getState()) => {

//replace the current table with one stored in undo history
const replacement = count > 0 ? JSON.parse(history[history.length - 1]) : table.getState();
const undoUndo = JSON.stringify(table.getState());
table.dispatch(replaceTable(replacement));
undo.dispatch(removeUndo(undoUndo));
//decrement undos
};

const doundoUndo = ({undoUndo} = undo.getState()) => {
    
    undo.dispatch(incrementUndos());
    table.dispatch(replaceTable(JSON.parse(undoUndo)));
}

const unsubsribeUndo = undo.subscribe(() => {
    console.log(undo.getState());
})

const unsubsribeTable = table.subscribe(() => {
    //console.log('Table Changed');
    console.log(JSON.stringify(table.getState()));
})

//Setup
table.dispatch(updateTable(newPlay('clubs', 3, newPlay('hearts', 5))));

//Table about to change so save the table before updating
undo.dispatch(incrementUndos());
table.dispatch(updateTable(newPlay('diamonds', 6)));
//Table about to change so save the table before updating
undo.dispatch(incrementUndos());
table.dispatch(updateTable(newPlay('spades', 1)));
//Table about to change so save the table before updating
undo.dispatch(updateUndos());
table.dispatch(updateTable(newPlay('clubs', 4)));
//Table to be replaced(undone) so saved separately
useUndo();
//A reverse of the undo
doundoUndo();
//Another undo
useUndo();
//Table about to change so save the table before updating
//Table "continues" so undoUndo is cleared (no longer able to undo the und0) and back to normal (with reduced undo count)
undo.dispatch(updateUndos());
table.dispatch(updateTable(newPlay('hearts', 4)));
//Reset the history
undo.dispatch(resetUndos());