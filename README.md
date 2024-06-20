## Add supabase to project

```bash
    bun install @supabase/supabase-js
    bun install react-native-elements @react-native-async-storage/async-storage react-native-url-polyfill
    bunx expo install expo-secure-store
    bunx supabase login
    bunx supabase gen types typescript --project-id your_project_id > types/database.types.ts
```

1. Configure Supabase inside a new `lib/supabase.ts` and Supply the types to our client
```ts
import { Database } from '../database.types'
import 'react-native-url-polyfill/auto';
import * as SecureStore from 'expo-secure-store';
import { createClient } from '@supabase/supabase-js';

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

const supabaseUrl = 'YOUR_REACT_NATIVE_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_REACT_NATIVE_SUPABASE_ANON_KEY';


export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
    storage: ExpoSecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
```

2. Define type helpers inside types/index.ts

```ts
import { Database } from './database.types';

export type Tables<T extends keyof Database["public"]["Tables"]> =
    Database["public"]["Tables"][T]["Row"];

export type TablesInsert<T extends keyof Database["public"]["Tables"]> =
    Database["public"]["Tables"][T]["Insert"];

export type TablesUpdate<T extends keyof Database["public"]["Tables"]> =
    Database["public"]["Tables"][T]["Update"];

export type Enums<T extends keyof Database["public"]["Enums"]> =
    Database["public"]["Enums"][T];


  // Use the Table types instead of our hand written ones. For example:
  type Product = Tables<'products'>;
```

## Setup local supabase

```bash
    bunx supabase init
    bunx supabase link project-ref
    bunx supabase db pull
    bunx supabase db pull --schema auth,storage
    bunx supabase start
# tunnel from ngrok
    ngrok http 54321
```
