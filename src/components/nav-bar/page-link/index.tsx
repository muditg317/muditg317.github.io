import type {Page} from 'data/urls';
import { NavLink } from 'react-router-dom';
import {ReactComponent as Logo} from 'assets/images/logo.svg';

function MainPageLink({page}: {page: Page}) {
  return <Logo className="fill-current" width="60" height="48" title={page.title} />;
}

const mainPageClassName = "flex items-center flex-shrink-0" as const;
const otherPageClassName = "block mt-4 mb-4 md:mb-0 md:inline-block md:mt-0 font-semibold text-xl" as const;
const minorPageClassName = "justify-self-end" as const;
function getClassName(isMainPage: boolean, isMinorPage: boolean) {
  return `text-white hover:text-green-400 transition-transform duration-200 ease-out text-center md:text-left px-1 md:mr-4 ${isMainPage ? mainPageClassName : otherPageClassName} ${isMinorPage ? minorPageClassName : ""}`;
}

export function PageLink({page}: {page: Page}) {
  let children = page.isMainPage ? <MainPageLink page={page} /> : <>{page.title}</>;
  let className = getClassName(page.isMainPage, page.isMinorPage);
  return <NavLink to={`/${page.aliases[0]}`} className={className}  activeClassName="transform scale-125 ml-2 md:ml-0 px-1" isActive={(match, location) => page.aliases.includes(location.pathname.substring(1))}>
    {children}
  </NavLink>;
}