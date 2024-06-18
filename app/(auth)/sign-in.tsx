import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import Button from '@/components/Button'
import { Stack, Link } from 'expo-router'
import Colors from '@/constants/Colors';

const SignIn = () => {
    const [errors, setErrors] = useState('')
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const onSubmit = () => {
        if (!form.email || !form.password) {
            setErrors('All fields are required')
            return
        }
        setErrors('')
        console.log(form)
        setForm({
            email: '',
            password: ''
        })
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: 'Sign In' }} />

            <Text style={styles.label}>Email</Text>
            <TextInput
                value={form.email}
                onChangeText={email => setForm({ ...form, email: email })}
                style={styles.input}
                placeholder='example@gmail.com'
                keyboardType='email-address'
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
                value={form.password}
                onChangeText={password => setForm({ ...form, password: password })}
                style={styles.input}
                secureTextEntry
            />

            <Text>{errors}</Text>
            <Button text="Sign in" onPress={onSubmit} />
            <Link href="./sign-up" style={styles.textButton}>Create an account</Link>
        </View>
    )
}

export default SignIn

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
    input: {
        borderWidth: 1,
        padding: 10,
        marginTop: 5,
        marginBottom: 15,
        backgroundColor: "white",
    },
    label: {
        color: 'gray',

    },
    textButton: {
        alignSelf: "center",
        fontWeight: "bold",
        color: Colors.light.tint,
        marginVertical: 10,
    }
})