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
} from '@chakra-ui/react'
import { MdDelete, MdEditSquare } from 'react-icons/md'
import { Task, TaskState } from '../types'
import { useTasks } from '../hooks/useTask'
import { TaskModal } from './Modal'
import { useState } from 'react'

function getTaskColor(state: string, styleProp: string) {
  if (styleProp === 'bg') {
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
  if (styleProp === 'border') {
    switch (state) {
      case 'completed':
        return 'green'
      case 'in_progress':
        return 'orange'
      case 'pending':
        return 'grey'
      default:
        return 'inherit'
    }
  }
}

export function TaskElement({ task }: { task: Task }) {
  const { deleteTask, updateTaskState } = useTasks()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleClick = () => {
    setLoading(true)
    deleteTask(task.id)
  }

  return (
    <>
      <Card
        key={task.id}
        maxW="sm"
        style={{
          backgroundColor: getTaskColor(task.state, 'bg'),
          borderColor: getTaskColor(task.state, 'border'),
        }}
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
                    _hover={{ background: '#225d94' }}
                    marginRight={'5px'}
                    isLoading={loading}
                    onClick={handleClick}
                  >
                    <Icon as={MdDelete} color={'white'} />
                  </Button>
                  <Button
                    bg="#3182ce"
                    size={'xs'}
                    _hover={{ background: '#225d94' }}
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

      {isModalOpen && (
        <TaskModal isOpen={isModalOpen} onClose={closeModal} task={task} />
      )}
    </>
  )
}
