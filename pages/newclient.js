import React, { useState } from 'react'
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';

const NEW_CLIENT = gql`
mutation newClient($data: ClientInput) {
  newClient(data: $data) {
    _id
    name
    lastName
    email
    company
    cellphone
  }
}
`;

const GET_CLIENTS = gql`
query getClientsFromSeller {
  getClientsFromSeller {
    _id,
    name,
    lastName,
    email,
    company
  }
}
`;


const NewClient = () => {
  const router = useRouter();
  const [response, saveResponse] = useState(null);

  const [newClient] = useMutation(NEW_CLIENT, {
    update(cache, { data: { newClient } }) {
      //Get the object from cache that we want to update
      const { getClientsFromSeller } = cache.readQuery({ query: GET_CLIENTS});


      //Rewrite the chache, the cache should never be updated.
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          getClientsFromSeller: [...getClientsFromSeller, newClient]
        }
      })
    }
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      lastName: '',
      email: "",
      company: "",
      cellphone: ""
    },
    validationSchema: Yup.object({
      name: Yup.string().required('The name is required'),
      lastName: Yup.string().required('The lastName is required'),
      email: Yup.string().email('The e-mail is not valid').required('The e-mail is required'),
      company: Yup.string().required('The company is required')
    }),
    onSubmit: async values => {
      console.log(values);
      const { name, lastName, company, email, cellphone } = values;
      try {
        const { data } = await newClient({
          variables: {
            data: {
              name: name,
              lastName: lastName,
              company: company,
              email: email,
              cellphone: cellphone
            }
          }
        });

        router.push('/');
      } catch (error) {
        saveResponse(error.message.replace('GraphQL error: ', ''));
        cleanState()
      }
    }
  });

  const cleanState = () => {
    setTimeout(() => {
      saveResponse(null);
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
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">New Client</h1>
        {response && showMessage()}
        <div className="flex justify-center mt-5">
          <div className="w-full max-w-lg">
            <form className="bg-white shadow-md px-8 pt-6 pb-8 mb-4" onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Client name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">{formik.errors.name}</p>
                  </div>
                ) : null}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">LastName</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="lastName"
                  type="text"
                  placeholder="Client lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">{formik.errors.lastName}</p>
                  </div>
                ) : null}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company">Company</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="company"
                  type="text"
                  placeholder="Company"
                  value={formik.values.company}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.company && formik.errors.company ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">{formik.errors.company}</p>
                  </div>
                ) : null}
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
                ) : null}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cellphone">Phone</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="cellphone"
                  type="tel"
                  placeholder="Phone"
                  value={formik.values.cellphone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.phone && formik.errors.phone ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">{formik.errors.phone}</p>
                  </div>
                ) : null}
              </div>

              <input type="submit" value="Save" className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900" />

            </form>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default NewClient;