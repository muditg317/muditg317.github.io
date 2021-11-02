import React from "react";
import { Link } from "react-router-dom";

export interface ExternalLinkProps {
  to: string;
  className?: string;
  title?: string;
}
export function ExternalLink({to, className, title, children}: React.PropsWithChildren<ExternalLinkProps>) {
  return <Link to={{pathname: to}} title={title} target="_blank" className={className}>
    {children}
  </Link>
}