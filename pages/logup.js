import React, {useState, Fragment } from 'react';
import Layout from '../components/Layout';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';

const NEW_USER = gql`
  mutation newUser($data: UserInput) {
    newUser(data: $data) {
      _id
      name
      lastName
      email
    }
  }
`;

const Logup = () => {
  const [response, saveResponse] = useState(null);
  const[newUser] = useMutation(NEW_USER);
  const route = useRouter();

  //Form validation
  const formik = useFormik({
    initialValues: {
      name: '',
      lastname: '',
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      lastname: Yup.string().required('Lastname is required'),
      email: Yup.string().email('The e-mail is not valid').required('The e-mail is required'),
      password: Yup.string().required('Password is required').min(6,'Must be at least of 6 characteres')
    }),
    onSubmit: async values => {
      const { name, lastname, email, password } = values;
      try {
        const {data} = await newUser({
          variables: {
            data: {
              name: name,
              lastName: lastname,
              email: email,
              password: password
            }
          }
        });
        saveResponse('User created successfully');
        cleanState(true);

      } catch (error) {
        saveResponse(error.message.replace('GraphQL erro: ', ''));
        cleanState(false);
      }
    }
  });

  const cleanState = (redirect) => {
    setTimeout(() => {
      saveResponse(null);
      if (redirect) {
        route.push('/login');
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

        <h1 className="text-center text-2xl text-white font-light">Registration</h1>
        <div className="flex justify-center mt-5">
          <div className="w-full max-w-sm">
            <form className="bg-white rounded shadow-md px-8 pt-8 pb-8 mb-4" onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">{formik.errors.name}</p>
                  </div>
                ): null }
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastname">Lastname</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="lastname"
                  type="text"
                  placeholder="Lastname"
                  value={formik.values.lastname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.lastname && formik.errors.lastname ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">{formik.errors.lastname}</p>
                  </div>
                ): null }
              </div>
              
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

              <input type="submit" value="Create account" className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900" />
            </form>
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};


export default Logup;