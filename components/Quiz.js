import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

class Quiz extends Component {
    static navigationOptions = () => ({
        title: 'Quiz'
    });
    state = {
        cardIndex: 0,
        clickToView: 'Answer',
        incorrect: 0,
        correct: 0
    };
    getNextCard = (questions) => {
        this.setState((oldState) => {
            const oldCardIndex = oldState.cardIndex;
            if (oldCardIndex === (questions.length - 1)) {
                return {
                    cardIndex: oldCardIndex
                };
            }
            const cardIndex = oldCardIndex + 1;
            return {
                cardIndex,
                clickToView: 'Answer'
            };
        });
    };
    view = (clickToView) => {
        this.setState({
            clickToView
        });
    };
    render() {
        const { cardIndex, clickToView } = this.state;
        const { deck } = this.props;
        const { questions } = deck;
        const question = questions[cardIndex].question;
        const answer = questions[cardIndex].answer;
        return (
            <View style={styles.container}>
                {clickToView === 'Answer' ?
                    <View style={styles.cardInfo}>
                        <Text style={{ fontSize: 30, marginBottom: 20 }}>{question}</Text>
                        <TouchableOpacity onPress={() => this.view('Question')}>
                            <Text>{clickToView}</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={styles.cardInfo}>
                        <Text style={{ fontSize: 30, marginBottom: 20 }}>{answer}</Text>
                        <TouchableOpacity onPress={() => this.view('Answer')}>
                            <Text>{clickToView}</Text>
                        </TouchableOpacity>
                    </View>
                }
                <View>
                    <TouchableOpacity
                        style={styles.correctButton}
                        onPress={() => this.getNextCard(questions)}
                    >
                        <Text style={{ color: 'white', fontSize: 22 }}>Correct</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.incorrectButton}
                        onPress={() => this.getNextCard(questions)}
                    >
                        <Text style={{ color: 'white', fontSize: 22 }}>Incorrect</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    cardInfo: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    correctButton: {
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: 'green',
        backgroundColor: 'green',
        borderRadius: 5
    },
    incorrectButton: {
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 5,
        backgroundColor: 'red'
    }
});

function mapStateToProps(state, { navigation }) {
    const { title } = navigation.state.params;
    const { decks } = state;
    return {
        deck: decks[title]
    };
}

export default connect(mapStateToProps, null)(Quiz);
