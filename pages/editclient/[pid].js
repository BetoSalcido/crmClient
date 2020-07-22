import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout';
import * as Yup from 'yup';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Formik } from 'formik';
import Swal from 'sweetalert2'

const EditClient = () => {
  const [response, saveResponse] = useState(null);
  const router = useRouter();
  const { query: { id } } = router;

  const UPDATE_CLIENT = gql`
    mutation updateClient($id: ID!, $data: ClientInput) {
      updateClient(id: $id, data: $data) {
        name
        lastName
        email
        company
        cellphone
      }
    }
  `;

  const GET_CLIENT = gql`
    query getClient($id: ID!) {
      getClient(id:$id) {
        name
        lastName
        email
        company
        cellphone
      }
    }
  `;

  const { data, loading, error } = useQuery(GET_CLIENT, {
    variables: {
      id: id
    }
  });

  const [updateClient] = useMutation(UPDATE_CLIENT);

  if (loading) return "";

  const schemaValidation = Yup.object({
    name: Yup.string().required('The name is required'),
    lastName: Yup.string().required('The lastName is required'),
    email: Yup.string().email('The e-mail is not valid').required('The e-mail is required'),
    company: Yup.string().required('The company is required')
  });

  const { getClient } = data;

  const cleanState = () => {
    setTimeout(() => {
      saveResponse(null);
    }, 3000);
  };

  const handlerRequest = async (data) => {
    const  { name, lastName, email, company, cellphone} = data;
    try {
      const { data } = await updateClient({
        variables: {
          id: id,
          data: {
            name, lastName, email, company, cellphone
          }
        }
      });

      Swal.fire(
        "Updated",
        "The client was updated successfully",
        "success"
      );
      router.push('/');
    } catch (error) {
      console.log(error);
    }
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
            <Formik
              validationSchema={schemaValidation}
              enableReinitialize
              initialValues={getClient}
              onSubmit={(data) => {
                handlerRequest(data);
              }}
            >
              {props => {
                return (
                  <form className="bg-white shadow-md px-8 pt-6 pb-8 mb-4" onSubmit={props.handleSubmit}>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder="Client name"
                        value={props.values.name}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                      {props.touched.name && props.errors.name ? (
                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                          <p className="font-bold">{props.errors.name}</p>
                        </div>
                      ) : null}
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">LastName</label>
                      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="lastName"
                        type="text"
                        placeholder="Client lastName"
                        value={props.values.lastName}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                      {props.touched.lastName && props.errors.lastName ? (
                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                          <p className="font-bold">{props.errors.lastName}</p>
                        </div>
                      ) : null}
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company">Company</label>
                      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="company"
                        type="text"
                        placeholder="Company"
                        value={props.values.company}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                      {props.touched.company && props.errors.company ? (
                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                          <p className="font-bold">{props.errors.company}</p>
                        </div>
                      ) : null}
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="E-mail"
                        value={props.values.email}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                      {props.touched.email && props.errors.email ? (
                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                          <p className="font-bold">{props.errors.email}</p>
                        </div>
                      ) : null}
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cellphone">Phone</label>
                      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="cellphone"
                        type="tel"
                        placeholder="Phone"
                        value={props.values.cellphone}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                      {props.touched.cellphone && props.errors.cellphone ? (
                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                          <p className="font-bold">{props.errors.cellphone}</p>
                        </div>
                      ) : null}
                    </div>

                    <input type="submit" value="Save" className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900" />
                  </form>
                );
              }}
            </Formik>
          </div>
        </div>
      </Layout>
    </div>
  );
};


export default EditClient;