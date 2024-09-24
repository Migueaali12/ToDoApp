import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
} from '@chakra-ui/react'
import { Field, FieldProps, Form, Formik, FormikProps } from 'formik'

export function FormikTask(title: string, content : string) {
  
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
  
    return (
      <Formik
        initialValues={{ title: title, text: content }}
        onSubmit={(values, actions) => {
          alert(`Formulario enviado: ${JSON.stringify(values, null, 2)}`)
          actions.setSubmitting(false)
        }}
      >
        {(props: FormikProps<{ title: string, text: string }>) => (
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