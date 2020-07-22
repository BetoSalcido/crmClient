import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { route } from 'next/dist/next-server/server/router';

const GET_USER = gql`
  query getUser {
  getUser {
    _id,
    name,
    lastName,
    email
  }
}
`;

const Header = () => {
const router = useRouter();
const { data, loading, error } = useQuery(GET_USER);
if (loading) return null;
// if (!data.getUser) { return router.push('/login'); }

const handlerSession = () => {
  localStorage.removeItem('token');
  router.push('/login');
};

  return (
    <div className="flex justify-between mb-6">
      <h1 className="mr-2">Welcome: {data.getUser.name} {data.getUser.lastName} </h1>
      <button className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md" 
        type="button"
        onClick={handlerSession}>
          Log Out
      </button>
    </div>
  );
};

export default Header;