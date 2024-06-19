import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { TablesInsert } from "@/types";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const useInsertOrderItems = () => {
    const queryClient = useQueryClient();
    const { profile } = useAuth();
    const userId = profile?.id;
    return useMutation({
        async mutationFn(data: TablesInsert<'order_items'>) {
            if (!userId) throw new Error('User not found');
            const { data: newOrderItems, error } = await supabase
                .from('order_items')
                .insert({ ...data, user_id: userId })
                .select('*')
                .single()

            if (error) {
                throw new Error(error.message)
            }
            return newOrderItems;
        },
        async onSuccess() {
            await queryClient.invalidateQueries({ queryKey: ['order_items', { userId }] })
        }
    })
}
