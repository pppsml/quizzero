import { isEmail, useForm } from '@mantine/form'
import { Button } from '@mantine/core'

import { IForms } from '../model'

interface Props {
  setForm: (form: keyof IForms) => void
}

export const LoginForm = ({ setForm }: Props) => {
  const {} = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: isEmail(),
      password: () => '',
    },
    validateInputOnBlur: true,
  })

  const onSubmit = () => {

  }

  return (
    <form onSubmit={onSubmit}>
      <Button type="button" onClick={() => setForm('Registration')}>
        switch to registration from
      </Button>
    </form>
  )
}