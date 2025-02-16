import { useState } from 'react';
import { RootContainer, Button, ButtonContainer, Container, NodeContainer, Title } from './App.styled';
import { StyledModal } from './components/StyledModal/StyledModal';
import { StyledInput } from './components/StyledInput/StyledInput';
import { useGetTreeQuery, useDeleteNodeMutation, useCreateNodeMutation, useRenameNodeMutation } from './services/api';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface TreeNode {
  id: string | number;
  name: string;
  children: TreeNode[];
}

export const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [nodeName, setNodeName] = useState('')
  const [selectedNodeId, setSelectedNodeId] = useState<string | number | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [expandedNodes, setExpandedNodes] = useState<Set<string | number>>(new Set())

  const { data: tree, isLoading, refetch } = useGetTreeQuery()
  const [deleteNodeMutation] = useDeleteNodeMutation()
  const [createNode] = useCreateNodeMutation()
  const [renameNode] = useRenameNodeMutation()

  if (!tree) {
    return <div>Loading...</div>
  }

  const handleOpenModal = (nodeId: string | number, isEdit: boolean = false) => {
    setSelectedNodeId(nodeId)
    setIsEditing(isEdit)
    if (isEdit) {
      const node = findNode(tree, nodeId)
      if (node) setNodeName(node.name)
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setNodeName('')
    setSelectedNodeId(null)
    setIsEditing(false)
  }

  const handleOpenDeleteModal = (nodeId: string | number) => {
    setSelectedNodeId(nodeId)
    setIsDeleteModalOpen(true)
  }

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setSelectedNodeId(null)
  }

  const findNode = (node: TreeNode, id: string | number): TreeNode | null => {
    if (node.id === id) return node
    for (const child of node.children) {
      const found = findNode(child, id)
      if (found) return found
    }
    return null
  }

  const updateNodeName = (currentNode: TreeNode, nodeId: string | number, newName: string): TreeNode => {
    if (currentNode.id === nodeId) {
      return {
        ...currentNode,
        name: newName
      }
    }

    return {
      ...currentNode,
      children: currentNode.children.map(child => updateNodeName(child, nodeId, newName))
    }
  }

  const addNodeToTree = (currentNode: TreeNode, parentId: string | number, newNode: TreeNode): TreeNode => {
    if (currentNode.id === parentId) {
      return {
        ...currentNode,
        children: [...currentNode.children, newNode]
      }
    }

    return {
      ...currentNode,
      children: currentNode.children.map(child => addNodeToTree(child, parentId, newNode))
    }
  }

  const removeNodeFromTree = (currentNode: TreeNode, nodeId: string | number): TreeNode => {
    return {
      ...currentNode,
      children: currentNode.children
        .filter(child => child.id !== nodeId)
        .map(child => removeNodeFromTree(child, nodeId))
    }
  }

  const handleError = (error: any) => {
    setErrorMessage(error?.data?.data?.message || 'You have an error. Try again later.')
    setIsErrorModalOpen(true)
    setIsModalOpen(false)
    setIsDeleteModalOpen(false)
  }

  const handleSave = async () => {
    if (!nodeName.trim() || !selectedNodeId) return;

    try {
      if (isEditing) {
        await handleRename(selectedNodeId, nodeName)
      } else {
        await handleCreate(nodeName)
      }
      handleCloseModal()
    } catch (error) {
      handleError(error)
    }
  }

  const handleDelete = async () => {
    if (!selectedNodeId) return;
    try {
      await deleteNodeMutation({ nodeId: selectedNodeId }).unwrap()
      await refetch()
      handleCloseDeleteModal()
    } catch (error) {
      handleError(error)
    }
  }

  const handleCreate = async (name: string) => {
    if (!selectedNodeId) return;
    try {
      await createNode({
        parentNodeId: selectedNodeId,
        nodeName: name
      }).unwrap()
      await refetch()
    } catch (error) {
      handleError(error)
    }
  }

  const handleRename = async (nodeId: string | number, newNodeName: string) => {
    try {
      await renameNode({ nodeId, newNodeName }).unwrap();
      await refetch();
    } catch (error) {
      handleError(error);
    }
  };

  const toggleNode = (nodeId: string | number) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev)
      if (newSet.has(nodeId)) {
        const nodeToClose = findNode(tree, nodeId)
        if (nodeToClose) {
          const removeChildrenIds = (node: TreeNode) => {
            newSet.delete(node.id)
            node.children.forEach(child => removeChildrenIds(child))
          }
          removeChildrenIds(nodeToClose)
        }
      } else {
        newSet.add(nodeId)
      }
      return newSet
    })
  }

  const renderNode = (node: TreeNode) => (
    <div key={node.id}>
      <Container>
        <Title onClick={() => toggleNode(node.id)} style={{ cursor: 'pointer' }}>
          {node.children.length > 0 && (expandedNodes.has(node.id) ? '▼ ' : '▶ ')}
          {node.id === 736 ? 'Root' : node.name}
        </Title>
        <ButtonContainer>
          <Button onClick={() => handleOpenModal(node.id)}>
            <AddIcon fontSize="small" />
          </Button>
          {node.id !== 736 && node.id !== 'root' && (
            <>
              <Button onClick={() => handleOpenModal(node.id, true)}>
                <EditIcon fontSize="small" />
              </Button>
              <Button onClick={() => handleOpenDeleteModal(node.id)}>
                <DeleteIcon fontSize="small" />
              </Button>
            </>
          )}
        </ButtonContainer>
      </Container>
      {expandedNodes.has(node.id) && node.children.length > 0 && (
        <NodeContainer style={{ marginLeft: '20px' }}>
          {node.children.map(child => renderNode(child))}
        </NodeContainer>
      )}
    </div>
  )

  return (
    <RootContainer>
      {isLoading ? (
        <div>Загрузка...</div>
      ) : (
        renderNode(tree)
      )}

      <StyledModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={isEditing ? 'Rename' : 'Add'}
        actions={[
          {
            label: 'Cancel',
            onClick: handleCloseModal,
            variant: 'cancel'
          },
          {
            label: isEditing ? 'Save' : 'Add',
            onClick: handleSave,
            variant: 'add',
            disabled: !nodeName.trim()
          }
        ]}
      >
        <StyledInput
          type="text"
          placeholder="Node Name"
          value={nodeName}
          onChange={(e) => setNodeName(e.target.value)}
          style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}
        />
      </StyledModal>

      <StyledModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        title="Are you sure you want to delete this node?"
        actions={[
          {
            label: 'Cancel',
            onClick: handleCloseDeleteModal,
            variant: 'cancel'
          },
          {
            label: 'Delete',
            onClick: handleDelete,
            variant: 'add'
          }
        ]}
      />

      <StyledModal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        title={errorMessage}
        actions={[
          {
            label: 'OK',
            onClick: () => setIsErrorModalOpen(false),
            variant: 'cancel'
          }
        ]}
      >
        {errorMessage}
      </StyledModal>
    </RootContainer>
  )
}

export default App