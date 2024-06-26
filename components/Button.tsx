import React, { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/Colors';
import { forwardRef } from 'react';

type ButtonProps = {
    text: string;
} & React.ComponentPropsWithoutRef<typeof TouchableOpacity>;

const Button = forwardRef<View | null, ButtonProps>(
    ({ text, ...touchableTouchableOpacityProps }, ref) => {
        return (
            <TouchableOpacity ref={ref} {...touchableTouchableOpacityProps} style={styles.container}>
                <Text style={styles.text}>{text}</Text>
            </TouchableOpacity>
        );
    }
);

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light.tint,
        padding: 15,
        alignItems: 'center',
        borderRadius: 100,
        marginVertical: 10,
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
    },
});

export default Button;