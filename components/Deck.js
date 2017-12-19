import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

class Deck extends Component {
    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params;
        return {
            title
        };
    };
    render() {
        const { deck } = this.props;
        const { questions, title } = deck;
        const noCards = questions.length;
        let cardString = '';
        if (noCards === 1) {
            cardString = `${noCards} card`;
        } else {
            cardString = `${noCards} cards`;
        }
        return (
            <View style={styles.container}>
                <View style={styles.deckInfo}>
                    <Text style={{ fontSize: 30 }}>{title}</Text>
                    <Text>{cardString}</Text>
                </View>
                <View>
                    <TouchableOpacity
                        style={styles.addCardButton}
                        onPress={() => this.props.navigation.navigate(
                            'NewQuestion',
                            { title }
                        )}
                    >
                        <Text style={{ color: 'black', fontSize: 22 }}>Add Card</Text>
                    </TouchableOpacity>
                    {noCards > 0
                        ?
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate(
                                'Quiz',
                                { title }
                            )}
                            style={styles.startQuizButton}
                        >
                            <Text style={{ color: 'white', fontSize: 22 }}>Start Quiz</Text>
                        </TouchableOpacity>
                        : <Text />
                    }
                </View>
            </View>
        );
    }
}

function mapStateToProps(state, { navigation }) {
    const { title } = navigation.state.params;
    const { decks } = state;
    return {
        deck: decks[title]
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    deckInfo: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    addCardButton: {
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5
    },
    startQuizButton: {
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        backgroundColor: 'black'
    }
});

export default connect(mapStateToProps, null)(Deck);
