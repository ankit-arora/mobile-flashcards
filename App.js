import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { createStore, applyMiddleware } from 'redux';
import { Ionicons } from '@expo/vector-icons';
import { Constants } from 'expo';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import DeckList from './components/DeckList';
import NewDeck from './components/NewDeck';
import Deck from './components/Deck';
import NewQuestion from './components/NewQuestion';
import reducer from './reducers';

const store = createStore(
    reducer,
    applyMiddleware(thunk)
);

function FlashCardsStatusBar({ backgroundColor, ...props }) {
    return (
        <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    );
}

const Tabs = TabNavigator({
    DeckList: {
        screen: DeckList,
        navigationOptions: {
            tabBarLabel: 'Decks',
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name='ios-list' size={30} color={tintColor} />
            )
        }
    },
    NewDeck: {
        screen: NewDeck,
        navigationOptions: {
            tabBarLabel: 'Add Deck',
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name='ios-add' size={30} color={tintColor} />
            )
        }
    }
}, {
    navigationOptions: {
        header: null
    },
    tabBarOptions: {
        activeTintColor: 'black',
        style: {
            height: 56,
            backgroundColor: 'white',
            shadowColor: 'rgba(0, 0, 0, 0.24)',
            shadowOffset: {
                width: 0,
                height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1
        }
    }
});

const MainNavigator = StackNavigator({
    Home: {
        screen: Tabs
    },
    NewDeck: {
        screen: NewDeck,
        navigationOptions: {
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: 'black'
            }
        }
    },
    Deck: {
        screen: Deck,
        navigationOptions: {
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: 'black'
            }
        }
    },
    NewQuestion: {
        screen: NewQuestion,
        navigationOptions: {
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: 'black'
            }
        }
    }
});

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <View style={{ flex: 1 }}>
                    <FlashCardsStatusBar backgroundColor='black' barStyle='light-content' />
                    <MainNavigator />
                </View>
            </Provider>
        );
    }
}

