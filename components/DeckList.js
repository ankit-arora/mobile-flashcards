import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { AppLoading } from 'expo';
import { connect } from 'react-redux';
import * as actions from '../actions';

class DeckList extends Component {
    componentDidMount() {
        const { decks } = this.props;
        if (typeof decks === 'undefined' || !decks || Object.keys(decks).length === 0) {
            this.props.getDecks();
        }
    }
    renderItem = ({ item }) => {
        const { decks } = this.props;
        const { questions, title } = decks[item];
        const noCards = questions.length;
        let cardString = '';
        if (noCards === 1) {
            cardString = `${noCards} card`;
        } else {
            cardString = `${noCards} cards`;
        }
        return (
            <TouchableOpacity
                style={styles.deckCard}
                onPress={() => this.props.navigation.navigate(
                    'Deck',
                    { title }
                )}
            >
                <Text style={{ fontSize: 22 }}>{title}</Text>
                <Text>{cardString}</Text>
            </TouchableOpacity>
        );
    };
    render() {
        const { decks, isFetching } = this.props;
        if (isFetching) {
            return <AppLoading />;
        }
        if (Object.keys(decks).length === 0) {
            return (
                <View style={styles.container}>
                    <Text style={{ fontSize: 22 }}>You haven't added any deck</Text>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => this.props.navigation.navigate(
                            'NewDeck',
                            {}
                        )}
                    >
                        <Text style={{ color: 'white', fontSize: 22 }}>Add</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        return (
            <View>
                <FlatList
                    data={Object.keys(decks)}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index}
                />
            </View>
        );
    }
}

function mapStateToProps(state) {
    const { decks, isFetching } = state;
    return {
        decks,
        isFetching
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addButton: {
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        backgroundColor: 'black'
    },
    deckCard: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 100,
        borderBottomWidth: 1
    }
});

export default connect(mapStateToProps, actions)(DeckList);
