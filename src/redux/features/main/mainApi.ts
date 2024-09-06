"use client"
import { apiClientBaseQuery, getTokenAuth } from '@/lib/apiClient';
import { Todos } from '@/types/main/todos';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const mainApi = createApi({
    reducerPath: 'UserAPI',
    baseQuery: apiClientBaseQuery,
    endpoints: (builder) => ({
        fetchLottoResult: builder.query<Todos[], any>({
            query: () => ({
                url: `todos`,
                method: "GET"
            })
        }),
    })
})
export const {
    useFetchLottoResultQuery
} = mainApi;