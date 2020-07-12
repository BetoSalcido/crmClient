import React, { useState, Fragment } from 'react';
import Head from 'next/head'
import Layout from '../components/Layout';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';

const AUTH_USER = gql`
  mutation authenticateUser($data: AuthenticateInput) {
    authenticateUser(data: $data) {
      token
    }
  }
`;

const Login = () => {
  const [response, saveResponse] = useState(null);
  const[auth] = useMutation(AUTH_USER);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('The e-mail is not valid').required('The e-mail is required'),
      password: Yup.string().required('The password is required')
    }),
    onSubmit: async values => {

      const { email, password } = values;
      try {
        const {data} = await auth({
          variables: {
            data: {
              email: email,
              password: password
            }
          }
        });
        const { token } = data.authenticateUser;
        localStorage.setItem('token', token);
        cleanState(true);

      } catch (error) {
        saveResponse(error.message.replace('GraphQL error: ', ''));
        cleanState(false);
      }
    }
  });

  const cleanState = (redirect) => {
    saveResponse(null);
    setTimeout(() => {
      if (redirect) {
        router.push('/');
      }
    }, 3000);
  };

  const showMessage = () => {
    return (
      <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
        <p>{response}</p>
      </div>
    );
  };

  return (
    <Fragment>
      <Layout>
        {response && showMessage()}

        <h1 className="text-center text-2xl text-white font-light">Login</h1>
        <div className="flex justify-center mt-5">
          <div className="w-full max-w-sm">
            <form className="bg-white rounded shadow-md px-8 pt-8 pb-8 mb-4" onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="E-mail"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">{formik.errors.email}</p>
                  </div>
                ): null }
              </div>

              <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">{formik.errors.password}</p>
                </div>
              ): null }
            </div>

            <input type="submit" value="Log In" className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"/>
            </form>
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};


export default Login;