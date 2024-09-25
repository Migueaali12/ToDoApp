import {
  Card,
  CardBody,
  Stack,
  Heading,
  Flex,
  Button,
  Icon,
  Divider,
  CardFooter,
  ButtonGroup,
  Select,
  Text,
  useDisclosure,
  //useDisclosure,
} from '@chakra-ui/react'
import { MdDelete, MdEditSquare } from 'react-icons/md'
import { Task, TaskState } from '../types'
import { useTasks } from '../hooks/useTask'
import { TaskModal } from './Modal'
import { useState } from 'react'

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

export function TaskElement({ task }: { task: Task }) {
  const { deleteTask, updateTaskState } = useTasks()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <Card
        key={task.id}
        maxW="sm"
        style={{ backgroundColor: getTaskColor(task.state) }}
        shadow={'md'}
      >
        <CardBody>
          <Stack mt="6" spacing="3">
            <Heading size="md">
              <Flex fontWeight={'semibold'} justifyContent={'space-between'}>
                <h3 className="mr-5">{task.title}</h3>
                <div>
                  <Button
                    bg="#3182ce"
                    size={'xs'}
                    _hover={{ background: 'darkblue' }}
                    marginRight={'5px'}
                    onClick={() => deleteTask(task.id)}
                  >
                    <Icon as={MdDelete} color={'white'} />
                  </Button>
                  <Button
                    bg="#3182ce"
                    size={'xs'}
                    _hover={{ background: 'darkblue' }}
                    onClick={openModal}
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
              rounded={'xl'}
              value={task.state}
              onChange={event =>
                updateTaskState(task.id, event.target.value as TaskState)
              }
            >
              <option value="in_progress">En progreso</option>
              <option value="pending">Pendiente</option>
              <option value="completed">Completada</option>
            </Select>
          </ButtonGroup>
        </CardFooter>
      </Card>

      {isModalOpen && <TaskModal isOpen={isModalOpen} onClose={closeModal} />}
    </>
  )
}
