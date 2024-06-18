import { StyleSheet, Text, View } from 'react-native'
import { Redirect } from 'expo-router'

const AuthIndex = () => {
    return <Redirect href="(auth)/sign-in/" />
}

export default AuthIndex

const styles = StyleSheet.create({})