import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router';

const ProductDetailWithId = () => {
    const { id } = useLocalSearchParams()
    return (
        <View>
            <Stack.Screen options={{ title: "Details" }} />
            <Text>ProductDetailWithId id {id}</Text>
        </View>
    )
}

export default ProductDetailWithId

const styles = StyleSheet.create({})
