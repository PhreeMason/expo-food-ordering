import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native'
import Button from '@/components/Button'
import { Stack, Link } from 'expo-router'
import Colors from '@/constants/Colors';
import { supabase } from '@/lib/supabase';

const SignIn = () => {
    const [errors, setErrors] = useState('')
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const signInWithEmail = async () => {
        setLoading(true)
        const { error, } = await supabase.auth.signInWithPassword(form)
        if (error) {
            Alert.alert(error.message)
        }
        setLoading(false)
    }

    const onSubmit = () => {
        if (!form.email || !form.password) {
            setErrors('All fields are required')
            return
        }
        setErrors('')
        signInWithEmail().then(() => {
            setForm({
                email: '',
                password: ''
            })
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
            <Button
                disabled={loading}
                text={loading ? "Logging in" : "Sign in"}
                onPress={onSubmit}
            />
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