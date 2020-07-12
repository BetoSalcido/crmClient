import React from 'react';
import { gql, useQuery } from '@apollo/client'
import Layout from '../components/Layout';
import { useRouter } from 'next/router';

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


const Home = () => {
  const { data, loading, error } = useQuery(GET_CLIENTS);
  const router = useRouter();

  if (loading) return "Cargando ...";
  // if (!data.getClientsFromSeller)  { return router.push('/login'); }

  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Clients</h1>

        <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/5 py-2">Name</th>
              <th className="w-1/5 py-2">Empresa</th>
              <th className="w-1/5 py-2">Email</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.getClientsFromSeller.map(element => (
              <tr key={element._id}>
                <td className="border px-4 py-2">{element.name} {element.lastName}</td>
                <td className="border px-4 py-2">{element.company}</td>
                <td className="border px-4 py-2">{element.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Layout>
    </div>
  );
};


export default Home;