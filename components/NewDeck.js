import React, { Component } from 'react';
import {
    KeyboardAvoidingView,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Keyboard
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';

class NewDeck extends Component {
    state = {
        deckTitle: ''
    };

    saveDeck = () => {
        const { deckTitle } = this.state;

        if (deckTitle.trim() === '') {
            return;
        }

        this.props.saveDeckTitle(deckTitle);

        this.setState({
            deckTitle: ''
        });

        Keyboard.dismiss();

        this.props.navigation.navigate(
            'Deck',
            { title: deckTitle }
        );

        // this.props.navigation.dispatch(NavigationActions.back({
        //     key: 'NewDeck'
        // }));
    };

    render() {
        const { deckTitle } = this.state;
        return (
            <KeyboardAvoidingView
                behavior='padding'
                keyboardVerticalOffset={0}
                style={styles.container}
            >
                <Text style={styles.text}>What is the title of your new deck?</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder='Deck Title'
                    value={deckTitle}
                    onChangeText={text => this.setState({ deckTitle: text })}
                />
                <TouchableOpacity style={styles.submitButton} onPress={() => this.saveDeck()}>
                    <Text style={{ color: 'white', fontSize: 22 }}>Create Deck</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        margin: 10,
        fontSize: 22
    },
    textInput: {
        margin: 10,
        padding: 10,
        width: 300,
        fontSize: 22,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5
    },
    submitButton: {
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        backgroundColor: 'black'
    }
});

export default connect(null, actions)(NewDeck);
