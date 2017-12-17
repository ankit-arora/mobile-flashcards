import {
    GET_DECKS
} from '../actions';

const initDecks = {
    isFetching: true,
    decks: {}
};

export default function decks(state = initDecks, action) {
    const { payload, type } = action;

    if (typeof payload === 'undefined' || typeof type === 'undefined') {
        return state;
    }

    switch (type) {
        case GET_DECKS:
            return {
                isFetching: false,
                decks: payload
            };
        default:
            return state;
    }
}
