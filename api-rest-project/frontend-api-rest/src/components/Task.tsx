/* eslint-disable react/prop-types */
import { Task, TaskState } from '../types'
import {
  SimpleGrid,
  Card,
  CardBody,
  CardFooter,
  ButtonGroup,
  Button,
  Select,
  Stack,
  Heading,
  Text,
  Divider,
  Flex,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import { MdEditSquare, MdDelete } from 'react-icons/md'

interface TasksProps {
  tasks: Task[]
  onDeleteTask: (id: number) => void
  onUpdateTask: (id: number, task: Task) => void
  onUpdateTaskState: (id: number, state: TaskState) => void
}

export function Tasks({ tasks, onDeleteTask, onUpdateTask, onUpdateTaskState }: TasksProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <SimpleGrid columns={[1, null, 3]} spacing="40px" justifyItems={'center'}>
        {tasks.map(task => (
          <Card
            key={task.id}
            maxW="sm"
            style={{ backgroundColor: getTaskColor(task.state) }}
          >
            <CardBody>
              <Stack mt="6" spacing="3">
                <Heading size="md">
                  <Flex fontWeight={'semibold'} justifyContent={'space-between'}>
                    {task.title}
                    <div>
                      <Button
                        bg="#3182ce"
                        size={'xs'}
                        _hover={{ background: 'darkblue' }}
                        marginRight={'5px'}
                        onClick={() => onDeleteTask(task.id)}
                      >
                        <Icon as={MdDelete} color={'white'} />
                      </Button>
                      <Button
                        bg="#3182ce"
                        size={'xs'}
                        _hover={{ background: 'darkblue' }}
                        onClick={onOpen}
                      >
                        <Icon as={MdEditSquare} color={'white'} />
                      </Button>
                    </div>
                  </Flex>
                </Heading>
                <Text>{task.text}</Text>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
              <ButtonGroup spacing="2">
                <Select
                  bg={'white'}
                  size="sm"
                  rounded={'sm'}
                  value={task.state}
                  onChange={(event) =>
                    onUpdateTaskState(task.id, event.target.value as TaskState)
                  }
                >
                  <option value="in_progress">En progreso</option>
                  <option value="pending">Pendiente</option>
                  <option value="completed">Completada</option>
                </Select>
              </ButtonGroup>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Tarea</ModalHeader>
          <ModalCloseButton />

          <ModalBody>{}</ModalBody>

        </ModalContent>
      </Modal>
    </>
  )
}

function getTaskColor(state: string) {
  switch (state) {
    case 'completed':
      return '#bfffc3'
    case 'in_progress':
      return '#feffbf'
    case 'pending':
      return '#f0f0f0'
    default:
      return 'inherit'
  }
}
