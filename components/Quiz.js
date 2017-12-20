import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';

class Quiz extends Component {
    static navigationOptions = () => ({
        title: 'Quiz'
    });
    state = {
        cardIndex: 0,
        clickToView: 'Show Answer',
        correct: 0,
        showScore: false
    };
    getNextCard = (questions) => {
        this.setState((oldState) => {
            const oldCardIndex = oldState.cardIndex;
            if (oldCardIndex === (questions.length - 1)) {
                //completed quiz so reset notification
                clearLocalNotification()
                    .then(setLocalNotification);
                return {
                    showScore: true
                };
            }
            const cardIndex = oldCardIndex + 1;
            return {
                cardIndex,
                clickToView: 'Show Answer'
            };
        });
    };
    restartQuiz = () => {
        this.setState({
            cardIndex: 0,
            clickToView: 'Show Answer',
            correct: 0,
            showScore: false
        });
    };
    view = (clickToView) => {
        this.setState({
            clickToView
        });
    };
    render() {
        const { cardIndex, clickToView, showScore } = this.state;
        const { deck } = this.props;
        const { questions } = deck;
        const totalQuestions = questions.length;
        const question = questions[cardIndex].question;
        const answer = questions[cardIndex].answer;
        if (showScore) {
            const { correct } = this.state;
            const scorePercentage = (correct / totalQuestions).toFixed(2) * 100;
            return (
                <View style={styles.container}>
                    <Text style={{ fontSize: 22 }}>Score</Text>
                    <Text style={{ fontSize: 60 }}>{`${scorePercentage}%`}</Text>
                    <View>
                        <TouchableOpacity
                            style={styles.restartQuizButton}
                            onPress={() => this.restartQuiz()}
                        >
                            <Text style={{ color: 'black', fontSize: 22 }}>Restart Quiz</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.backToDeckButton}
                            onPress={() => {
                                this.props.navigation.dispatch(NavigationActions.back({
                                    key: null
                                }));
                            }}

                        >
                            <Text style={{ color: 'white', fontSize: 22 }}>Back To Deck</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <View style={{ padding: 10, alignSelf: 'flex-end' }}>
                    <Text style={{ fontSize: 20 }}>{`${cardIndex + 1}/${totalQuestions}`}</Text>
                </View>
                {clickToView === 'Show Answer' ?
                    <View style={styles.cardInfo}>
                        <Text style={{ fontSize: 30, marginBottom: 20 }}>{question}</Text>
                        <TouchableOpacity onPress={() => this.view('Show Question')}>
                            <Text style={{ fontSize: 23, color: 'green' }}>{clickToView}</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={styles.cardInfo}>
                        <Text style={{ fontSize: 30, marginBottom: 20 }}>{answer}</Text>
                        <TouchableOpacity onPress={() => this.view('Show Answer')}>
                            <Text style={{ fontSize: 23, color: 'green' }}>{clickToView}</Text>
                        </TouchableOpacity>
                    </View>
                }
                <View>
                    <TouchableOpacity
                        style={styles.correctButton}
                        onPress={() => {
                            this.setState((oldState) => {
                                const correct = oldState.correct + 1;
                                return {
                                    correct
                                };
                            });
                            this.getNextCard(questions);
                        }}
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
        justifyContent: 'space-between',
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
    },
    restartQuizButton: {
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5
    },
    backToDeckButton: {
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        backgroundColor: 'black'
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
