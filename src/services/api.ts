import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface TreeNode {
  id: string | number;
  name: string;
  children: TreeNode[];
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://test.vmarmysh.com' 
  }),
  endpoints: (builder) => ({
    getTree: builder.query<TreeNode, void>({
      query: () => ({
        url: '/api.user.tree.get',
        params: {
          treeName: '{C9232B85-AD10-459C-A44F-70CA30C60E5F}'
        }
      })
    })
  })
})

export const { useGetTreeQuery } = api 