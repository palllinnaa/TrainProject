import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from "yup";
import Input from './Input';
import Select from './Select';
import Link from 'next/link';
import Toast from './Toast';
import { connect } from 'react-redux';
import { registerUserRequest } from '../../redux/actions/auth';
import { IRegisterFormPageProps } from '../../server/interfaces/common';
import { clearIdentityError } from '../../redux/actions/auth';

const validationSchema = Yup.object({
    firstName: Yup
        .string()
        .matches(/^[aA-zZ\s]+$/, "Name must contain only letters!")
        .test('len', 'Name is too short!', val => val.length > 2)
        .required("Name can't be blank!"),
    lastName: Yup
        .string()
        .matches(/^[aA-zZ\s]+$/, "Surname must contain only letters!")
        .test('len', 'Surname is too short!', val => val.length > 2)
        .required("Surname can't be blank!"),
    email: Yup
        .string()
        .email("Invalid email")
        .required("Email can't be blank!"),
    password: Yup
        .string()
        .test('len', 'Password is too short!', val => val.length > 3)
        .required("Password can't be blank!"),
    role: Yup
        .string<'user' | 'seller'>()
        .required("Role can't be blank!")
});

function RegisterForm(props: IRegisterFormPageProps) {
    const { registerUserRequest, clearReducerError, identity, error } = props;
    const [toast, setToast] = useState({ showToast: false, text: '' });
    const router = useRouter();
    const initialValues = useMemo(() => ({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: ""
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
                registerUserRequest({ ...values })
            } catch (error) {
                console.log('Error in RegisterForm: ', error);
            }
        },
        validationSchema,
    });

    useEffect(() => {
        if (error) {
            setToast({ showToast: true, text: /*error ||*/ 'This email is already taken!' })
        } else (
            setToast({ showToast: false, text: '' })
        )
    }, [error])

    const options = [
        {
            label: "User",
            value: "user"
        },
        {
            label: "Seller",
            value: "seller"
        }
    ]

    return (
        <div className='flex items-center justify-center min-h-screen px-4 font-serif lg:h-full lg:relative'>
            <div>
                <div className='lg:w-80 '>
                    <h1 className='items-center mt-6 font-bold lg:text-2xl sm:text-lg'>Sign Up</h1>
                    <h4 className='mt-1 font-semibold text-gray-500 lg:text-lg'>Enter your details to create your account</h4>
                </div>
                <Toast show={toast.showToast} text={toast.text} />
                <form onSubmit={handleSubmit} method="post" className='mt-8 lg:flex-grow'>
                    <Input
                        name="firstName"
                        type="text"
                        placeholder="Name"
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.firstName && errors.firstName}
                    />
                    <Input
                        name="lastName"
                        type="text"
                        placeholder="Surname"
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.lastName && errors.lastName}
                    />
                    <Input
                        name="email"
                        type="text"
                        placeholder="Email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.email && errors.email}
                    />
                    <Input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.password && errors.password}
                    />
                    <div>
                        <Select
                            name="role"
                            value={values.role}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.role && errors.role}
                            options={options}
                        />
                    </div>
                    <div className='my-4'>
                        <button
                            type="submit"
                            className='px-5 py-2 font-serif font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600'>
                            Submit
                        </button>
                        <button onClick={clearReducerError}>
                            <Link
                                href='/login'
                                className='px-5 py-3 mx-3 font-serif font-medium text-blue-500 bg-blue-100 rounded-md hover:bg-blue-500 hover:text-white hover:no-underline'>
                                Cancel
                            </Link>
                        </button>
                    </div>
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
    return {
        registerUserRequest: (data) => dispatch(registerUserRequest(data)),
        clearReducerError: () => dispatch(clearIdentityError())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RegisterForm)