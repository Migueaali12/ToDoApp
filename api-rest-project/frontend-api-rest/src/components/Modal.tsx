import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  //useDisclosure,
} from '@chakra-ui/react'
import { Task } from '../types'
import { TaskForm } from './Form'

export function TaskModal({
  task,
  isOpen,
  onClose,
}: {
  task: Task | null
  isOpen: boolean
  onClose: () => void
}) {
  if (task === null) {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Crear Tarea</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TaskForm task={task} onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    )
  }
  if (task !== null) {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Tarea</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TaskForm task={task} onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    )
  }
}
