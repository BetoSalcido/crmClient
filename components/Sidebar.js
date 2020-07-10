import React, { Fragment } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar = (props) => {

  const route = useRouter();

  return (
    <Fragment>
      <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
        <div>
          <p className="text-white text-2xl font-black"> CRM - Clients</p>
        </div>

        <nav className="mt-5 list-none">
          <li className={route.pathname === "/" ? "bg-blue-800 p-3" : "p-2"}>
            <Link href="/">
              <a className="text-white block">Clients</a>
            </Link>
          </li>
          <li className={route.pathname === "/products" ? "bg-blue-800 p-3" : "p-2"}>
            <Link href="/products">
              <a className="text-white block">Products</a>
            </Link>
          </li>
          <li className={route.pathname === "/orders" ? "bg-blue-800 p-3" : "p-2"}>
            <Link href="/orders">
            <a className="text-white block">Orders</a>
            </Link>
          </li>
        </nav>
      </aside>
    </Fragment>
  );
};

export default Sidebar;