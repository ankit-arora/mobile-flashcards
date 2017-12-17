import { AsyncStorage } from 'react-native';

export const STORAGE_KEY = 'mobileFlashCards:storageKey';

export function getDecksAsync() {
    return AsyncStorage.getItem(STORAGE_KEY)
        .then((dataString) => {
            let decks = {};
            if (typeof dataString !== 'undefined' && dataString) {
                decks = JSON.parse(dataString);
            }
            return decks;
        });
}

export function saveDeckTitleAsync(newTitle, oldTitle) {
    return AsyncStorage.getItem(STORAGE_KEY)
        .then((dataString) => {
            let decks = {};

            if (typeof dataString !== 'undefined' && dataString) {
                decks = JSON.parse(dataString);
            }

            if (typeof decks[newTitle] !== 'undefined') {
                return decks;
            }

            //append case
            if (typeof oldTitle === 'undefined' || !oldTitle) {
                return {
                    ...decks,
                    [newTitle]: {
                        title: newTitle,
                        questions: []
                    }
                };
            }

            //edit case
            return Object.keys(decks).reduce((obj, oT) => {
                const newObj = obj;
                if (oT === oldTitle) {
                    newObj[newTitle] = decks[oT];
                    newObj[newTitle].title = newTitle;
                    return newObj;
                }
                newObj[oT] = decks[oT];
                return newObj;
            }, {});
        })
        .then((newDecks) => {
            AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newDecks))
                .catch((error) => {
                    console.error('Error persisting deck to Async storage ', error);
                });

            return newDecks;
        });
}

export function addCardToDeckAsync(oldTitle, newQuestion) {
    return AsyncStorage.getItem(STORAGE_KEY)
        .then(JSON.parse)
        .then((decks) => {
            const newDecks = {
                ...decks,
                [oldTitle]: {
                    title: oldTitle,
                    questions: [
                        ...decks[oldTitle].questions,
                        newQuestion
                    ]
                }
            };

            AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newDecks))
                .catch((error) => {
                    console.error('Error persisting new deck to Async storage ', error);
                });

            return newDecks;
        });
}
