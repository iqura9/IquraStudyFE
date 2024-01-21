import React, { FC } from "react";

interface IsPermittedProps {
  children: React.ReactNode;
  rule: boolean;
}

const IsPermitted: FC<IsPermittedProps> = ({ children, rule }) => {
  return rule ? <> {children}</> : <></>;
};

export default IsPermitted;
