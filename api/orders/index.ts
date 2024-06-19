import { supabase } from "@/lib/supabase"
import { useAuth } from "@/providers/AuthProvider";
import { Order, OrderStatus, OrderStatusList, TablesInsert } from "@/types";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const ARCHIVED = ['Delivered'] as OrderStatus[];
const ACTIVE = OrderStatusList.filter((status: string) => status !== 'Delivered') as OrderStatus[];

export const useMyOrderList = () => {
    const { profile } = useAuth();

    return useQuery<Order[]>({
        queryKey: ['orders', { userId: profile?.id }],
        queryFn: async () => {
            if (!profile) return [];

            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .eq('user_id', profile.id)
                .order('created_at', { ascending: false });
            if (error) {
                throw new Error(error.message);
            }
            return data;
        },
    });
};


export const useAdminOrderList = (archived = false) => {
    const statuses = archived ? ARCHIVED : ACTIVE;
    return useQuery<Order[]>({
        queryKey: ['orders', { archived }],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .in('status', statuses);
            if (error) {
                throw new Error(error.message);
            }
            return data;
        }
    })
}

export const useOrderDetails = (id: number) => {
    return useQuery({
        queryKey: ['orders', id],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .eq('id', id)
                .single();
            if (error) {
                throw new Error(error.message)
            }
            return data;
        }
    })
}

export const useInsertOrder = () => {
    const queryClient = useQueryClient();
    const { profile } = useAuth();
    const userId = profile?.id;
    return useMutation({
        async mutationFn(data: TablesInsert<'orders'>) {
            if (!userId) throw new Error('User not found');
            const { data: newOrder, error } = await supabase
                .from('orders')
                .insert({ ...data, user_id: userId })
                .select('*')
                .single()

            if (error) {
                throw new Error(error.message)
            }
            return newOrder;
        },
        async onSuccess() {
            await queryClient.invalidateQueries({ queryKey: ['orders', { userId }] })
        }
    })
}
