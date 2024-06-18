import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Image, ScrollView, Alert } from "react-native";
import Button from "@/components/Button";
import { defaultPizzaImage } from "@/constants/Images";
import Colors from "@/constants/Colors";
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams } from "expo-router";

const CreateProductScreen = () => {
    const [image, setImage] = useState<string | null>(null);
    const [errors, setErrors] = useState('')
    const [form, setForm] = useState({
        name: "",
        price: "",
    });

    const { id } = useLocalSearchParams()
    const isUpdating = !!id

    const resetForm = () => {
        setForm({ name: "", price: "" });
        setImage(null);
        setErrors('')
    }

    const validateForm = () => {
        if (!form.name) {
            setErrors('Name is required')
            return false
        }

        if (!form.price) {
            setErrors('Price is required')
            return false
        }

        if (isNaN(parseFloat(form.price))) {
            setErrors('Price must be a number')
            return false
        }
        setErrors('')
        return true
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const onCreate = () => {
        if (!validateForm()) {
            return
        }
        console.log(form)
        // save to database

        resetForm()
    };

    const onUpdateCreate = () => {
        if (!validateForm()) {
            return
        }
        console.warn('updating product', form)
        // save to database

        resetForm()
    };

    const onSubmit = () => {
        if (isUpdating) {
            onUpdateCreate()
            return
        }
        onCreate()
    }

    const onDelete = () => {
        console.warn('DELETING PRODUCT', form)
    }

    const confirmDelete = () => {
        Alert.alert('Confirm', 'Are you sure you want to delete this product?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
            },
            {
                text: 'Delete',
                onPress: () => onDelete(),
                style: 'destructive'
            },
        ]

        )
    }
    return (
        <ScrollView style={styles.container}>
            <Stack.Screen options={{ title: isUpdating ? "Update Product" : "Create Product" }} />
            <Image
                source={{ uri: image || defaultPizzaImage }}
                style={styles.image}
                resizeMode="contain"
            />
            <Text
                style={styles.textButton}
                onPress={pickImage}>
                Select Image
            </Text>

            <Text style={styles.label}>Name</Text>
            <TextInput
                onChange={(e) =>
                    setForm({ ...form, name: e.nativeEvent.text })
                }
                placeholder="Name"
                style={styles.input}
                value={form.name}
            />

            <Text style={styles.label}>Price ($)</Text>
            <TextInput
                onChange={(e) =>
                    setForm({ ...form, price: e.nativeEvent.text })
                }
                placeholder="9.67"
                style={styles.input}
                keyboardType="numeric"
                value={form.price}
            />
            <Text style={{ color: 'red' }}>{errors}</Text>
            <Button onPress={onSubmit} text={isUpdating ? "Update" : "Create"} />
            <Button onPress={confirmDelete} text="Delete" styles={styles.textButton} />
        </ScrollView>
    );
};

export default CreateProductScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        padding: 10,
    },
    input: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20,
        borderStyle: "solid",
        borderWidth: 1,
    },
    image: {
        width: "100%",
        aspectRatio: 1,
    },
    label: {
        color: "gray",
        fontSize: 16,
    },
    textButton: {
        alignSelf: "center",
        fontWeight: "bold",
        color: Colors.light.tint,
        marginVertical: 10,
    }
});
