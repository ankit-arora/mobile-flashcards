import {
    getDecksAsync,
    saveDeckTitleAsync,
    addCardToDeckAsync
} from '../utils/api';

export const GET_DECKS = 'getDecks';

export function getDecks() {
    return dispatch => {
        getDecksAsync()
            .then((decks) => {
                dispatch({
                    type: GET_DECKS,
                    payload: decks
                });
            })
            .catch(error => console.error(error));
    };
}

export function saveDeckTitle(newTitle, oldTitle) {
    return dispatch => {
        saveDeckTitleAsync(newTitle, oldTitle)
            .then((decks) => {
                dispatch({
                    type: GET_DECKS,
                    payload: decks
                });
            })
            .catch(error => console.error(error));
    };
}

export function addCardToDeck(oldTitle, newQuestion) {
    return dispatch => {
        addCardToDeckAsync(oldTitle, newQuestion)
            .then((decks) => {
                dispatch({
                    type: GET_DECKS,
                    payload: decks
                });
            })
            .catch(error => console.error(error));
    };
}
