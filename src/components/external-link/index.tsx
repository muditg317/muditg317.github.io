import React from "react";
import { Link } from "react-router-dom";

export interface ExternalLinkProps {
  to: string;
  className?: string;
}
export function ExternalLink({to, className, children}: React.PropsWithChildren<ExternalLinkProps>) {
  return <Link to={{pathname: to}} target="_blank" className={className}>
    {children}
  </Link>
}