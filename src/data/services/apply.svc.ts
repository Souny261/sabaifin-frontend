import { axiosPublicInstance } from "@/core/config/axios";
import { API_ENDPOINTS } from "@/core/config/constants";
import { ApiResponse } from "@/core/types/api.type";
import { PartnerApplyType, UserApplyType } from "@/core/types/loan.type";

export const ApplySVC = {
    User: async (payload: UserApplyType): Promise<ApiResponse<string>> => {
        const { data } = await axiosPublicInstance.post<ApiResponse<string>>(API_ENDPOINTS.APPLY, payload);
        return data;
    },
    Partner: async (payload: PartnerApplyType): Promise<ApiResponse<string>> => {
        const { data } = await axiosPublicInstance.post<ApiResponse<string>>(API_ENDPOINTS.APPLY, payload);
        return data;
    },
}