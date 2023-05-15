import React from 'react'
import LoginForm from '../components/users/LoginForm'
import LoginRegisterLayout from '../components/users/LoginRegisterLayout'

export default function Login() {
  return (
    <div>
      <LoginRegisterLayout>
        <LoginForm />
      </LoginRegisterLayout>
    </div>
  )
}
