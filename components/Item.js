import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    Dimensions
} from 'react-native'

const width = Dimensions.get("window").width - 60

const Item = (props) => {
    const { amount, createdAt, updatedAt } = props
    return (
        <View style={styles.card}>
            <View>
                <Text style={styles.cardContent}>Amount: {amount}</Text>
                <Text style={styles.cardContent}>Created At: {new Date(createdAt).toLocaleDateString()}</Text>
                <Text style={styles.cardContent}>Updated At: {new Date(updatedAt).toLocaleDateString()}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        alignItems: 'center',
        elevation: 3,
        backgroundColor: '#fff',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        margin: 5,
        padding: 10,
        width
    },
    cardContent: {
        fontWeight: 'bold'
    }

})

export default Item