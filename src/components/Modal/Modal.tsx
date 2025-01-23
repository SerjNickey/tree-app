import React, { ReactNode } from 'react';
import { ButtonGroup, CloseButton, ModalButton, ModalContent, Modal as ModalWrapper, Text } from '../../App.styled';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children?: ReactNode;
    actions?: {
        label: string;
        onClick: () => void;
        variant?: 'cancel' | 'add';
    }[];
}

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    actions = []
}) => {
    if (!isOpen) return null;

    return (
        <ModalWrapper>
            <ModalContent>
                <CloseButton onClick={onClose}>×</CloseButton>
                <Text>{title}</Text>
                {children}
                {actions.length > 0 && (
                    <ButtonGroup>
                        {actions.map((action, index) => (
                            <ModalButton
                                key={index}
                                className={action.variant || 'add'}
                                onClick={action.onClick}
                            >
                                {action.label}
                            </ModalButton>
                        ))}
                    </ButtonGroup>
                )}
            </ModalContent>
        </ModalWrapper>
    );
}; 