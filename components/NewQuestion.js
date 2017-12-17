import React, { Component } from 'react';
import {
    Text,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Keyboard
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import * as actions from '../actions';

class NewQuestion extends Component {
    static navigationOptions = () => ({
        title: 'Add Card'
    });
    state = {
        question: '',
        answer: ''
    };
    saveQuestion = () => {
        const { question, answer } = this.state;
        const { title } = this.props;

        if (question.trim() === '' || answer.trim() === '') {
            return;
        }

        this.props.addCardToDeck(title, {
            question,
            answer
        });

        this.setState({
            question: '',
            answer: ''
        });

        Keyboard.dismiss();

        this.props.navigation.dispatch(NavigationActions.back({
            key: null
        }));
    };
    render() {
        const { question, answer } = this.state;
        return (
            <KeyboardAvoidingView
                behavior='padding'
                keyboardVerticalOffset={0}
                style={styles.container}
            >
                <TextInput
                    style={styles.textInput}
                    placeholder='Question'
                    value={question}
                    onChangeText={q => this.setState({ question: q })}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder='Answer'
                    value={answer}
                    onChangeText={ans => this.setState({ answer: ans })}
                />
                <TouchableOpacity style={styles.submitButton} onPress={() => this.saveQuestion()}>
                    <Text style={{ color: 'white', fontSize: 22 }}>Submit</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    }
}

function mapStateToProps(state, { navigation }) {
    const { title } = navigation.state.params;
    return {
        title
    };
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

export default connect(mapStateToProps, actions)(NewQuestion);
