import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from "react-router-dom";

import {ReactComponent as Logo} from 'assets/images/logo.svg';
import { ExternalLink } from 'components/external-link';
import { defaultPage, isEntryType, navEntries } from 'data/urls';
import { EntryType } from 'data/urls/types';


export function NavBar() {
  const [ responsive, setResponsive ] = useState(false);
  const navBarRef = useRef(null);

  useEffect(() => {
    function documentClickHandler(event: MouseEvent) {
      if (responsive && navBarRef.current && event.target !== navBarRef.current) {
        setResponsive(false);
      }
    }
    document.addEventListener("click", documentClickHandler);
    return () => {
      document.removeEventListener("click", documentClickHandler);
    }
  }, [responsive]);

  return (
    <nav ref={navBarRef} className="flex items-center justify-between flex-wrap bg-cyan-500 p-3 z-50">
      <Link to={`/${defaultPage.aliases[defaultPage.mainAliasIndex]}`} className="flex items-center flex-shrink-0 text-white hover:text-green-400 mr-6 text-white hover:text-black">
        <Logo className="fill-current h-12 mr-2" width="60" height="60" title="Mudit Gupta" />
        {/* <span className="font-semibold text-xl tracking-tight">Mudit</span> */}
      </Link>
      <div className="block md:hidden">
        <button onClick={() => setResponsive(!responsive)} className="flex items-center z-50 px-3 py-2 border rounded text-white border-white hover:text-green-400 hover:border-green-400 outline-none">
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
        </button>
      </div>
      <div className={`w-full ${responsive ? "block z-50" : "hidden"} flex-grow md:flex md:items-center md:w-auto bg-cyan-500 absolute md:relative top-full md:top-0 -ml-3 md:ml-0 p-3 md:p-0 pt-0`}>
        <div className="text-sm md:flex-grow">
          {/* <ExternalLink to="https://muditgupta.appspot.com/game-lounge" title="Games" className="block mt-4 mb-4 md:mb-0 md:inline-block md:mt-0 text-white font-semibold text-xl hover:text-green-400 mr-4">
            Games
          </ExternalLink> */}
          {navEntries.map(navEntry => {
            const props = {
              key: navEntry.title,
              title: navEntry.title,
              // to: isEntryType(navEntry, EntryType.Page) ? navEntry.aliases[navEntry.mainAliasIndex] : isEntryType(navEntry, EntryType.Redirect) ? navEntry.target.href : '',
              className: "block mt-4 mb-4 md:mb-0 md:inline-block md:mt-0 text-white font-semibold text-xl hover:text-green-400 mr-4",
              children: <>{navEntry.title}</>,
            } as const;
            // const LinkType = isEntryType(navEntry, EntryType.Page) ? Link : isEntryType(navEntry, EntryType.Redirect) ? ExternalLink : null;
            return (isEntryType(navEntry, EntryType.Page)
              ? <NavLink {...props} to={navEntry.aliases[navEntry.mainAliasIndex]}>
            </NavLink> : isEntryType(navEntry, EntryType.Redirect)
              ? <ExternalLink {...props} to={navEntry.target.href}>
            </ExternalLink> : null)!;
          })}
        </div>
        <div>
          <button className="ml-3 bg-transparent hover:bg-green-400 text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded">
            Click me!
          </button>
        </div>
      </div>
    </nav>
  );
}
