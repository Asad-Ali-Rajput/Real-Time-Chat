import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useUser } from '@/contexts/UserContext';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ClipLoader } from 'react-spinners';

const SignupForm = () => {
  const { setUsername } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
  };

  const validationSchema = Yup.object({
    firstname: Yup.string().required('First name is required'),
    lastname: Yup.string().required('Last name is required'),
    username: Yup.string().required('User name is required'),
    email: Yup.string().required('Email address is required').min(3).max(20),
    password: Yup.string().required('Password is required').min(3).max(20),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true);
    console.log(values)
    try {
      const response = await fetch('http://localhost:8080/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setUsername(values.firstname);
        router.push('/chat');
      } else {
        // Handle error cases, e.g., show an error message
      }
    } catch (error) {
      // Handle error cases, e.g., show an error message
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnBlur validateOnChange>
        {({ isSubmitting }) => (
          <Form className="bg-gradient-to-br p-0.5 rounded-lg overflow-hidden from-green-400 to-blue-600">
            <div className="bg-slate-900 rounded-lg p-2">
              <div className="mb-2">
                <label htmlFor="firstname" className="block mb-2 text-sm font-medium text-slate-50 dark:text-white">
                  First Name
                </label>
                <Field
                  type="text"
                  id="firstname"
                  name="firstname"
                  className="w-[400px] bg-gray-50 border border-gray-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="John"
                />
                <ErrorMessage name="firstname" component="div" className="text-red-500 mt-1" />
              </div>
              <div className="mb-2">
                <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-slate-50 dark:text-white">
                  Last Name
                </label>
                <Field
                  type="text"
                  id="lastname"
                  name="lastname"
                  className="bg-gray-50 border border-gray-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  w-[400px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Doe"
                />
                <ErrorMessage name="lastname" component="div" className="text-red-500 mt-1" />
              </div>
              <div className="mb-2">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-slate-50 dark:text-white">
                  Email address
                </label>
                <Field
                  type="text"
                  id="email"
                  name="email"
                  className="bg-gray-50 border border-gray-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="john.doe@company.com"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 mt-1" />
              </div>
              <div className="mb-2">
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-slate-50 dark:text-white">
                  username
                </label>
                <Field
                  type="text"
                  id="username"
                  name="username"
                  className="bg-gray-50 border border-gray-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="john.do"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 mt-1" />
              </div>
              <div className="mb-2">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-slate-50 dark:text-white">
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="bg-gray-50 border border-gray-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[400px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="•••••••••"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 mt-1" />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="text-white  w-[400px] bg-gradient-to-br my-4 from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                {isLoading ? <ClipLoader color="white" size={20} /> : 'REGISTER'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignupForm;
