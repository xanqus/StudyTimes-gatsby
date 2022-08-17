import { Link } from "gatsby";
import React from "react";

function Layout({ pageTitle, children }) {
  return (
    <div className="m-auto max-w-lg">
      <title>{pageTitle}</title>
      <nav>
        <ul className="flex pl-0">
          <li className="pr-8" key={1}>
            <Link className="text-black" to="/">
              Home
            </Link>
          </li>
          <li className="pr-8" key={2}>
            <Link className="text-black" to="/about">
              About
            </Link>
          </li>
        </ul>
      </nav>

      <main>
        <h1 className="text-indigo-500">{pageTitle}</h1>
        {children}
      </main>

      <div>Copyright All Rights</div>
    </div>
  );
}

export default Layout;
