import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, Image, ScrollView, Alert, ActivityIndicator } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import * as FileSystem from 'expo-file-system';
import { randomUUID } from 'expo-crypto';
import { decode } from 'base64-arraybuffer';
import { supabase } from "@/lib/supabase";
import { defaultPizzaImage } from "@/constants/Images";
import Button from "@/components/Button";
import Colors from "@/constants/Colors";
import { useInsertProduct, useUpdateProduct, useDeleteProduct, useProduct } from '@/api/products'

const CreateProductScreen = () => {
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState<string | null>(null);
    const [errors, setErrors] = useState('')
    const [form, setForm] = useState({
        name: "",
        price: "",
    });

    const { id: idString } = useLocalSearchParams()
    const id = idString && parseFloat(typeof idString === 'string' ? idString : idString[0]);

    const isUpdating = !!id

    const { mutate: insertProduct } = useInsertProduct();
    const { mutate: updateProduct } = useUpdateProduct();
    const { mutate: deleteProduct } = useDeleteProduct();
    const { data: upDatingProduct, isLoading, error } = useProduct(id || 0)

    useEffect(() => {
        if (upDatingProduct) {
            setForm({
                name: upDatingProduct.name,
                price: ` ${upDatingProduct.price}`,
            })
            setImage(upDatingProduct.image)
        }
    }, [upDatingProduct])

    const uploadImage = async () => {
        if (!image?.startsWith('file://')) {
            return;
        }

        const base64 = await FileSystem.readAsStringAsync(image, {
            encoding: 'base64',
        });
        const filePath = `${randomUUID()}.png`;
        const contentType = 'image/png';
        const { data, error } = await supabase.storage
            .from('product-images')
            .upload(filePath, decode(base64), { contentType });

        if (data) {
            return data.path;
        }
    };

    const router = useRouter();

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

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const onCreate = async () => {
        if (!validateForm()) {
            return
        }
        const { price, name } = form;
        const imagePath = await uploadImage();
        insertProduct({ price: parseFloat(price), name, image: imagePath }, {
            onSuccess: () => {
                resetForm();
                setLoading(false)
                router.back();
            }
        })
    };

    const onUpdateCreate = async () => {
        if (!validateForm()) {
            return
        }
        const { price, name } = form;
        const imagePath = upDatingProduct?.image === image ? image : await uploadImage();

        updateProduct({ price: parseFloat(price), name, image: imagePath, id }, {
            onSuccess: () => {
                resetForm();
                setLoading(false)
                router.back();
            }
        })
    };

    const onSubmit = () => {
        if (isLoading || loading) {
            return
        }
        setLoading(true)
        if (isUpdating) {
            onUpdateCreate()
            return
        }
        onCreate()
    }

    const onDelete = () => {
        if (isLoading || loading) {
            return
        }
        setLoading(true)
        id && deleteProduct(id, {
            onSuccess: () => {
                setLoading(false)
                router.replace('/(admin)');
            }
        })
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

    if (isLoading || loading) {
        return <ActivityIndicator />
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
            <Button
                onPress={onSubmit}
                text={isUpdating ? "Update" : "Create"}
            />
            {isUpdating && <Button
                onPress={confirmDelete}
                text="Delete" styles={styles.textButton}
            />}
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
