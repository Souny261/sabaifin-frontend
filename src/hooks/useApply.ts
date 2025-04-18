import { API_ENDPOINTS } from "@/core/config/constants";
import { ApiResponse } from "@/core/types/api.type";
import { PartnerApplyType, UserApplyType } from "@/core/types/loan.type";
import { ApplySVC } from "@/data/services/apply.svc";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useApplyUser = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation<ApiResponse<string>, Error, UserApplyType>({
        mutationFn: async (payload: UserApplyType): Promise<ApiResponse<string>> => ApplySVC.User(payload),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: [API_ENDPOINTS.APPLY],
            });
        },
    });
    return mutation;
};


export const useApplyPartner = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation<ApiResponse<string>, Error, PartnerApplyType>({
        mutationFn: async (payload: PartnerApplyType): Promise<ApiResponse<string>> => ApplySVC.Partner(payload),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: [API_ENDPOINTS.APPLY],
            });
        },
    });
    return mutation;
};