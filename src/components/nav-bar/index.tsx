import { useState, useEffect, useRef, useMemo } from 'react';

import { ExternalLink } from 'components/external-link';
import { defaultPage, isEntryType, navEntries, navPages, navRedirects, filtered } from 'data/urls';
import { EntryType } from 'data/urls/types';
import { PageLink } from './page-link';
import { ElementOf } from 'utils/types';


export function NavBar() {
  const [ responsive, setResponsive ] = useState(false);
  const navBarRef = useRef<HTMLElement>(null);

  const [ clickedInRedirectBox, setClickedInRedirectBox ] = useState(false);
  const redirectBoxLabelRef = useRef<HTMLButtonElement>(null);

  const showRedirectBox = useMemo(() => responsive || clickedInRedirectBox, [responsive, clickedInRedirectBox]);

  useEffect(() => {
    function documentClickHandler(event: MouseEvent) {
      if (navBarRef.current && !navBarRef.current.contains(event.target as Node)) {
        console.log('documentClickHandler', event.target);
        setResponsive(false);
      }
      if (redirectBoxLabelRef.current && !redirectBoxLabelRef.current.contains(event.target as Node)) {
        setClickedInRedirectBox(false);
      }
    }
    document.addEventListener("click", documentClickHandler);
    return () => {
      document.removeEventListener("click", documentClickHandler);
    }
  }, []);

  useEffect(() => {
    function windowResizeHandler() {
      if (window.innerWidth >= 768) {
        setResponsive(false);
      }
    }
    window.addEventListener("resize", windowResizeHandler);
    return () => {
      window.removeEventListener("resize", windowResizeHandler);
    }
  }, []);

  console.log('responsive', responsive);

  return (
    <nav ref={navBarRef} className="flex items-center justify-between flex-wrap bg-cyan-500 p-3 z-50">
      <PageLink page={defaultPage} />
      {/* <NavLink to={`/${defaultPage.aliases[defaultPage.mainAliasIndex]}`} className="flex items-center flex-shrink-0 text-white hover:text-green-400 mr-4 transition-transform"  activeClassName="transform scale-125" isActive={(match, location) => (defaultPage.aliases as readonly string[]).includes(location.pathname.substring(1))}>
        <Logo className="fill-current h-12 mr-2" width="60" height="60" title="Mudit Gupta" />
      </NavLink> */}
      <div className="block md:hidden">
        <button onClick={(e) => [console.log("hi"),setResponsive(r => !![console.log("r",r),5] && !r)]} className="flex items-center z-50 px-3 py-2 border rounded text-white border-white hover:text-green-400 hover:border-green-400 outline-none">
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
        </button>
      </div>
      <div className={`w-full ${responsive ? "block z-50" : "hidden"} flex-grow md:flex md:items-center md:w-auto bg-cyan-500 absolute md:relative top-full md:top-0 -ml-3 md:ml-0 pb-3 md:pb-0`}>
        <div className="text-sm flex justify-start flex-col md:flex-row md:flex-grow">
          {/* <ExternalLink to="https://muditgupta.appspot.com/game-lounge" title="Games" className="block mt-4 mb-4 md:mb-0 md:inline-block md:mt-0 text-white font-semibold text-xl hover:text-green-400 mr-4">
            Games
          </ExternalLink> */}
          {/* {navEntries.map(navEntry => {
            const props = {
              key: navEntry.title,
              title: navEntry.title,
              // to: isEntryType(navEntry, EntryType.Page) ? navEntry.aliases[navEntry.mainAliasIndex] : isEntryType(navEntry, EntryType.Redirect) ? navEntry.target.href : '',
              className: "block mt-4 mb-4 md:mb-0 md:inline-block md:mt-0 text-white font-semibold text-xl hover:text-green-400 mr-4 transition-transform",
              children: <>{navEntry.title}</>,
            } as const;
            // const LinkType = isEntryType(navEntry, EntryType.Page) ? Link : isEntryType(navEntry, EntryType.Redirect) ? ExternalLink : null;
            return (isEntryType(navEntry, EntryType.Page)
              ? <NavLink {...props} to={navEntry.aliases[0]} activeClassName="transform scale-125" isActive={(match, location) => (navEntry.aliases as readonly string[]).includes(location.pathname.substring(1))}>
            </NavLink> : isEntryType(navEntry, EntryType.Redirect)
              ? <ExternalLink {...props} to={navEntry.target.href} className={`${props.className} justify-self-end`}>
            </ExternalLink> : null)!;
          })} */}
          {filtered<ElementOf<typeof navPages>>(navPages, 'isMinorPage', false).map(page => <PageLink key={page.title} page={page} />)}
          <div className="flex-grow"></div>
          {filtered<ElementOf<typeof navPages>>(navPages, 'isMinorPage', true).map(page => <PageLink key={page.title} page={page} />)}
        </div>
        <div>
          {/* <button className="ml-3 bg-transparent hover:bg-green-400 text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded">
            Click me!
          </button> */}
          <div className="flex flex-col group relative">
            <button ref={redirectBoxLabelRef} onClick={() => setClickedInRedirectBox(s=>!s)} className={`py-2 px-4 text-xl text-white font-semibold bg-transparent ${showRedirectBox ? "bg-cyan-400" : "group-hover:bg-cyan-400"} rounded-t-lg`}>
              Links&nbsp;
              <span className={`text-sm ${showRedirectBox ? "-rotate-90" : "group-hover:-rotate-90"} transition-transform duration-[350ms] inline-block`}>▼</span>
              {/* <span className={`text-xs ${showRedirection ? "inline-block" : "hidden group-hover:inline-block"}`}>&#9650;</span> */}
            </button>
            <div className={`flex flex-col absolute top-full right-0 z-50 bg-cyan-400 ${responsive ? "w-full" : "w-max rounded-tl-lg "} rounded-b-lg ${showRedirectBox ? "flex" : "hidden group-hover:flex"}`}>
              {navRedirects.map(redirect => 
                <ExternalLink
                    key={redirect.title}
                    title={redirect.title}
                    to={redirect.target.href}
                    className={`block px-3 py-1 first:pt-2 last:pb-2 ${responsive ? "" : "first:rounded-tl-lg"} last:rounded-b-lg text-white font-semibold text-xl hover:bg-cyan-300 transition-transform`}>
                  {redirect.title}
                </ExternalLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
