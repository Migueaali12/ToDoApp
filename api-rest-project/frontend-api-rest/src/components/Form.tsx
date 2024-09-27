import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
} from '@chakra-ui/react'
import { Field, FieldProps, Form, Formik, FormikProps } from 'formik'
import { Task } from '../types'
import { useTasks } from '../hooks/useTask'

export function TaskForm({
  task,
  onClose,
}: {
  task: Task | null
  onClose: () => void
}) {
  const { addTask, updateTask } = useTasks()

  // Validación para el campo 'title'
  const validateTitle = (value: string) => {
    let error
    if (!value) {
      error = 'El título es requerido'
    } else if (value.length < 3) {
      error = 'El título debe tener al menos 3 caracteres'
    }
    return error
  }

  // Validación para el campo 'text'
  const validateText = (value: string) => {
    let error
    if (!value) {
      error = 'El contenido es requerido'
    } else if (value.length < 10) {
      error = 'El contenido debe tener al menos 10 caracteres'
    }
    return error
  }

  if (task === null) {
    return (
      <Formik
        initialValues={{ title: '', text: '' }}
        onSubmit={(values, actions) => {
          //debugger;
          addTask(values.title, values.text)
          actions.setSubmitting(false)
          onClose()
        }}
      >
        {(props: FormikProps<{ title: string; text: string }>) => (
          <Form>
            {/* Campo Título */}
            <Field name="title" validate={validateTitle}>
              {({ field, form }: FieldProps) => (
                <FormControl
                  isInvalid={!!form.errors.title && !!form.touched.title}
                >
                  <FormLabel>Título de la Tarea</FormLabel>
                  <Input {...field} placeholder="Título" />
                  <FormErrorMessage>
                    {form.errors.title?.toString()}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>

            {/* Campo Contenido */}
            <Field name="text" validate={validateText}>
              {({ field, form }: FieldProps) => (
                <FormControl
                  isInvalid={!!form.errors.text && !!form.touched.text}
                  mt={4}
                >
                  <FormLabel>Contenido de la Tarea</FormLabel>
                  <Input {...field} placeholder="Contenido" />
                  <FormErrorMessage>
                    {form.errors.text?.toString()}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Button
              mt={4}
              bg="#3182ce"
              textColor={'#fff'}
              _hover={{ background: '#225d94' }}
              isLoading={props.isSubmitting}
              type="submit"
            >
              Enviar
            </Button>
          </Form>
        )}
      </Formik>
    )
  }
  if (task !== null) {
    return (
      <Formik
        initialValues={{ title: task.title, text: task.text }}
        onSubmit={(values, actions) => {
          task.title = values.title
          task.text = values.text
          updateTask(task.id, task)
          actions.setSubmitting(false)
          onClose()
        }}
      >
        {(props: FormikProps<{ title: string; text: string }>) => (
          <Form>
            {/* Campo Título */}
            <Field name="title" validate={validateTitle}>
              {({ field, form }: FieldProps) => (
                <FormControl
                  isInvalid={!!form.errors.title && !!form.touched.title}
                >
                  <FormLabel>Título de la Tarea</FormLabel>
                  <Input {...field} placeholder="Título" />
                  <FormErrorMessage>
                    {form.errors.title?.toString()}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>

            {/* Campo Contenido */}
            <Field name="text" validate={validateText}>
              {({ field, form }: FieldProps) => (
                <FormControl
                  isInvalid={!!form.errors.text && !!form.touched.text}
                  mt={4}
                >
                  <FormLabel>Contenido de la Tarea</FormLabel>
                  <Input {...field} placeholder="Contenido" />
                  <FormErrorMessage>
                    {form.errors.text?.toString()}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Button
              mt={4}
              colorScheme="teal"
              isLoading={props.isSubmitting}
              type="submit"
            >
              Enviar
            </Button>
          </Form>
        )}
      </Formik>
    )
  }
}
