import { useState } from 'react';
import { Button, ButtonContainer, Container, NodeContainer, Title } from './App.styled';
import { StyledModal } from './components/StyledModal/StyledModal';
import { StyledInput } from './components/StyledInput/StyledInput';
import { testTree } from './mocks/test';

interface TreeNode {
  id: string | number;
  name: string;
  children: TreeNode[];
}

export const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [nodeName, setNodeName] = useState('')
  const [selectedNodeId, setSelectedNodeId] = useState<string | number | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [expandedNodes, setExpandedNodes] = useState<Set<string | number>>(new Set())
  const [tree, setTree] = useState<TreeNode>(testTree)

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

  const deleteNode = (currentNode: TreeNode, nodeId: string | number): TreeNode => {
    return {
      ...currentNode,
      children: currentNode.children
        .filter(child => child.id !== nodeId)
        .map(child => deleteNode(child, nodeId))
    }
  }

  const handleSave = () => {
    if (!nodeName.trim() || !selectedNodeId) return;

    if (isEditing) {
      setTree(prevTree => updateNodeName(prevTree, selectedNodeId, nodeName))
    } else {
      const newNode: TreeNode = {
        id: Date.now().toString(),
        name: nodeName,
        children: []
      }
      setTree(prevTree => addNodeToTree(prevTree, selectedNodeId, newNode))
      setExpandedNodes(prev => new Set([...prev, selectedNodeId]))
    }
    handleCloseModal()
  }

  const handleDelete = () => {
    if (!selectedNodeId) return;
    setTree(prevTree => deleteNode(prevTree, selectedNodeId))
    handleCloseDeleteModal()
  }

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
          {node.id === 1 ? 'Root' : node.name}
        </Title>
        <ButtonContainer>
          <Button onClick={() => handleOpenModal(node.id)}>AddChildren</Button>
          {node.id !== 1 && node.id !== 'root' && (
            <>
              <Button onClick={() => handleOpenModal(node.id, true)}>EditName</Button>
              <Button onClick={() => handleOpenDeleteModal(node.id)}>DeleteChildren</Button>
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
    <>
      {renderNode(tree)}

      <StyledModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={isEditing ? 'Редактировать элемент' : 'Добавить дочерний элемент'}
        actions={[
          {
            label: 'Cancel',
            onClick: handleCloseModal,
            variant: 'cancel'
          },
          {
            label: isEditing ? 'Save' : 'Add',
            onClick: handleSave,
            variant: 'add'
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
        title="Вы уверены, что хотите удалить этот элемент?"
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
    </>
  )
}

export default App