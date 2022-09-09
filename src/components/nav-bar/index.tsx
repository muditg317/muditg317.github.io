import { useState, useEffect, useRef, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ExternalLink } from 'components/external-link';
import { defaultPage, navPages, navRedirects, filtered } from 'data/urls';
import { PageLink } from './page-link';
import { ElementOf } from 'utils/types';

import { IconProp } from '@fortawesome/fontawesome-svg-core';

const fasDownAngle: IconProp = ['fas','angle-down'];

// TODO: remove rotation on the links dropdown

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
      <div className="block md:hidden">
        <button onClick={(e) => [console.log("hi"),setResponsive(r => !![console.log("r",r),5] && !r)]} className="flex items-center z-50 px-3 py-2 border rounded text-white border-white hover:text-green-400 hover:border-green-400 outline-none">
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
        </button>
      </div>
      <div className={`w-full ${responsive ? "block z-50" : "hidden"} flex-grow md:flex md:items-center md:w-auto bg-cyan-500 absolute md:relative top-full md:top-0 -ml-3 md:ml-0 pb-3 md:pb-0`}>
        <div className="text-sm flex justify-start flex-col md:flex-row md:flex-grow">
          {filtered<ElementOf<typeof navPages>>(navPages, 'isMinorPage', false).map(page => <PageLink key={page.title} page={page} />)}
          <div className="flex-grow"></div>
          {filtered<ElementOf<typeof navPages>>(navPages, 'isMinorPage', true).map(page => <PageLink key={page.title} page={page} />)}
        </div>
        <div>
          <div className="flex flex-col group relative">
            <button ref={redirectBoxLabelRef} onClick={() => setClickedInRedirectBox(s=>!s)} className={`py-2 px-4 text-xl text-white font-semibold bg-transparent ${showRedirectBox ? "bg-cyan-400" : "group-hover:bg-cyan-400"} rounded-t-lg`}>
              Links&nbsp;
              <FontAwesomeIcon icon={fasDownAngle} size='1x' className="w-4" />
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
