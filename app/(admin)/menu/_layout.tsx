import { FontAwesome } from '@expo/vector-icons';
import { Link, Stack } from 'expo-router';
import { Pressable } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';


export default function MenuStackLayout() {
    const colorScheme = useColorScheme();

    return (
        <Stack
            screenOptions={{
                headerRight: () => (
                    <Link href="/cart" asChild>
                        <Pressable>
                            {({ pressed }) => (
                                <FontAwesome
                                    name="shopping-cart"
                                    size={25}
                                    color={Colors[colorScheme ?? 'light'].text}
                                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                                />
                            )}
                        </Pressable>
                    </Link>
                ),
            }}
        >
            <Stack.Screen name="index" />
        </Stack>
    )
}