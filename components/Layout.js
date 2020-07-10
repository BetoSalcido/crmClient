import React, {Fragment} from 'react';
import Head from 'next/head';
import SideBar from '../components/Sidebar';
import { useRouter } from 'next/router';

const Layout = (props) => {
  const route = useRouter();

  return (
    <Fragment>
      <Head>
      <title>CRM - ADMIN</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossOrigin="anonymous" />
        <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet"/>
      </Head>

      {route.pathname === "/login" || route.pathname === "/logup" ? (
        <div className="bg-gray-800 min-h-screen flex flex-col justify-center">
          <div>
            {props.children}
          </div>
        </div>
        ) : (
        <div className="bg-gray-200 min-h-screen">
          <div className="flex min-h-screen">
            <SideBar />
            <main className="sm:w-2/3 xl:w-4/5 sm:min-h-screen p-5">
              { props.children }
            </main>
          </div>
        </div>
      )}

    </Fragment>
  );
};

export default Layout;