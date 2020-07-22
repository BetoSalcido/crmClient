import React from 'react'
import Swal from 'sweetalert2'
import { useMutation, gql } from '@apollo/client';
import Router from 'next/router';

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

const DELETE_CLIENT = gql`
  mutation deleteClient($id: ID!) {
    deleteClient(id: $id)
  }
`;

const Client = (props) => {
  const { name, lastName, company, email, _id } = props.data;
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    update(cache) {
      //Get the object from cache that we want to update
      const { getClientsFromSeller } = cache.readQuery({ query: GET_CLIENTS });

      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          getClientsFromSeller: getClientsFromSeller.filter(element => element._id !== _id)
        }
      })
    }
  });

  const handlerUpdate = (id) => {
    Router.push({
      pathname: "/editclient/[id]",
      query: { id }
    })
  };

  const handlerDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You are going to delete " + name + " " + lastName + "!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.value) {
        try {
          const { data } = await deleteClient({
            variables: {
              "id": _id
            }
          });
          Swal.fire(
            'Deleted!',
            data.deleteClient,
            'success'
          )
        } catch (error) {
          console.log(error);
        }
      }
    })
  };

  return (
    <tr key={_id}>
      <td className="border px-4 py-2">{name} {lastName}</td>
      <td className="border px-4 py-2">{company}</td>
      <td className="border px-4 py-2">{email}</td>
      <td className="border px-4 py-2">
        <button className="flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
          type="button"
          onClick={() => handlerDelete(_id)}>
          Delete
          <svg className="w-5 h-5 ml-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeLinecap="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </button>
      </td>
      <td className="border px-4 py-2">
        <button className="flex justify-center items-center bg-green-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
          type="button"
          onClick={() => handlerUpdate(_id)}>
          Editar
          <svg className="w-5 h-5 ml-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
        </button>
      </td>
    </tr>
  );
};

export default Client;