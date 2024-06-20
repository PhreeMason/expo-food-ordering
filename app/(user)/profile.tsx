import Button from '@/components/Button';
import { supabase } from '@/lib/supabase';

const Profile = () => {
    return <Button onPress={() => supabase.auth.signOut()} text="Sign out" />
}

export default Profile
