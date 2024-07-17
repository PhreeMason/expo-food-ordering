import "react-native-url-polyfill/auto";
import * as SecureStore from "expo-secure-store";
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/database.types";

const ExpoSecureStoreAdapter = {
    getItem: (key: string) => {
        return SecureStore.getItemAsync(key);
    },
    setItem: (key: string, value: string) => {
        SecureStore.setItemAsync(key, value);
    },
    removeItem: (key: string) => {
        SecureStore.deleteItemAsync(key);
    },
};

const {
    NODE_ENV,
    EXPO_PUBLIC_API_URL_DEV,
    EXPO_PUBLIC_SUPABASE_ANON_DEV,
    EXPO_PUBLIC_SUPABASE_URL,
    EXPO_PUBLIC_SUPABASE_ANON,
} = process.env;

const isDevEnv = NODE_ENV === "development";

const supabaseUrl =
    (isDevEnv ? EXPO_PUBLIC_API_URL_DEV : EXPO_PUBLIC_SUPABASE_URL) || "";

const supabaseAnonKey =
    (isDevEnv ? EXPO_PUBLIC_SUPABASE_ANON_DEV : EXPO_PUBLIC_SUPABASE_ANON) ||
    "";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: ExpoSecureStoreAdapter as any,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});
