import React, { useEffect, useMemo, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup";
import Input from './Input';
import Link from 'next/link';
import Toast from './Toast';
import { connect } from 'react-redux';
import { ILoginFormPageProps } from '../../server/interfaces/common';
import { clearIdentityError } from '../../redux/actions/auth';
import clientContainer from '../../redux/container';

const validationSchema = Yup.object({
  email: Yup
    .string()
    .email("Invalid email")
    .required("Email can't be blank!"),
  password: Yup
    .string()
    .test('len', 'Password is too short!', val => val.length > 3)
    .required("Password can't be blank!"),
});

function LoginForm(props: ILoginFormPageProps) {
  const { fetchLoginUser, clearReducerError, error } = props;
  const [toast, setToast] = useState({ showToast: false, text: '' });
  const initialValues = useMemo(() => ({
    email: "",
    password: "",
  }), [])

  const {
    touched,
    errors,
    values,
    handleChange,
    handleSubmit,
    handleBlur
  } = useFormik({
    initialValues,

    onSubmit: async () => {
      try {
        fetchLoginUser({ ...values });
      } catch (error) {
        console.log('Error in LoginForm', error);
      }
    },
    validationSchema,
  });

  useEffect(() => {
    if (error) {
      //TODO for text:error need to send custom message in passport
      setToast({ showToast: true, text: /*error ||*/ 'Email or password is incorrect!' })
    } else (
      setToast({ showToast: false, text: '' })
    )
  }, [error])

  return (
    <div className='flex items-center justify-center min-h-screen px-4 font-serif lg:h-full lg:relative'>
      <div>
        <div className='lg:w-80 '>
          <h1 className='items-center mt-6 font-bold lg:text-2xl sm:text-lg'>Welcome to FoodStore</h1>
          <div className='flex'>
            <h4 className='pr-2 mt-1 font-semibold text-gray-400 lg:text-lg'>New Here?</h4>
            <button onClick={clearReducerError}>
              <Link href='/register' className='mt-1 font-semibold text-blue-500 lg:text-lg hover:no-underline hover:text-blue-600'>Create an Account</Link>
            </button>
          </div>
        </div>
        <Toast show={toast.showToast} text={toast.text} />
        <form onSubmit={handleSubmit} method="post" className='mt-6'>
          <Input
            name="email"
            type="text"
            label="Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && errors.email}
          />
          <Input
            name="password"
            type="password"
            label="Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && errors.password}
          />
          <button
            type="submit"
            className='px-5 py-2 font-serif font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600'>
            Submit
          </button>
        </form>
        <div className='inset-x-0 bottom-0 flex justify-center my-4 text-sm font-semibold lg:absolute'>
          <p className='text-gray-400'>2023©</p>
          <Link
            href='/'
            className='text-gray-700 hover:text-blue-500 hover:no-underline'>
            FoodStore
          </Link>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  identity: state.authReducer.identity,
  error: state.authReducer.error
});

const mapDispatchToProps = (dispatch) => {
  const actionToDispatch = (data) => clientContainer.resolve('AuthSaga').action('fetchLoginUser', data);
  return {
    fetchLoginUser: (data) => dispatch(actionToDispatch(data)),
    clearReducerError: () => dispatch(clearIdentityError())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)