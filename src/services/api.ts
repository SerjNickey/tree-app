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
        method: 'POST',
        params: {
          treeName: '{C9232B85-AD10-459C-A44F-70CA30C60E5F}'
        }
      })
    }),
    deleteNode: builder.mutation<TreeNode, {nodeId: number | string}>({
      query: ({nodeId}) => ({
        url: '/api.user.tree.node.delete',
        method: 'POST',
        params: {
          treeName: '{C9232B85-AD10-459C-A44F-70CA30C60E5F}',
          nodeId
        }
      })
    }),
    createNode: builder.mutation<TreeNode, { parentNodeId: number | string, nodeName: string }>({
      query: ({ parentNodeId, nodeName }) => ({
        url: '/api.user.tree.node.create',
        method: 'POST',
        params: {
          treeName: '{C9232B85-AD10-459C-A44F-70CA30C60E5F}',
          parentNodeId,
          nodeName
        }
      })
    }),
    renameNode: builder.mutation<TreeNode, { nodeId: number | string, newNodeName: string }>({
      query: ({ nodeId, newNodeName }) => ({
        url: '/api.user.tree.node.rename',
        method: 'POST',
        params: {
          treeName: '{C9232B85-AD10-459C-A44F-70CA30C60E5F}',
          nodeId,
          newNodeName
        }
      })
    })
  })
})

export const { 
  useGetTreeQuery, 
  useDeleteNodeMutation, 
  useCreateNodeMutation,
  useRenameNodeMutation 
} = api 