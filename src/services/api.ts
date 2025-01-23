import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface Item {
    id: number
    title: string
    // добавьте другие поля в соответствии с вашим API
}

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.example.com' }), // замените на ваш URL
    endpoints: (builder) => ({
        getItems: builder.query<Item[], void>({
            query: () => 'items', // замените на ваш endpoint
        }),
    }),
})

export const { useGetItemsQuery } = api