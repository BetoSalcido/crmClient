import React from 'react';
import { gql, useQuery } from '@apollo/client'
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Client from '../components/Client';

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

  if (loading ) return "";
  if (!data.getClientsFromSeller) { return router.push('/login'); }

  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Clients</h1>
        <Link href="/newclient">
          <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold">
            New Client
          </a>
        </Link>
        <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/5 py-2">Name</th>
              <th className="w-1/5 py-2">Empresa</th>
              <th className="w-1/5 py-2">Email</th>
              <th className="w-1/5 py-2">Delete</th>
              <th className="w-1/5 py-2">Update</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.getClientsFromSeller.map(element => (
              <Client key={element._id} data={element} />
            ))}
          </tbody>
        </table>
      </Layout>
    </div>
  );
};


export default Home;