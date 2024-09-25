import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  //useDisclosure,
} from '@chakra-ui/react'

export function TaskModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Tarea</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{'cuerpo del modal'}</ModalBody>
      </ModalContent>
    </Modal>
  )
}
