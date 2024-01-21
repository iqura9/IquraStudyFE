import React, { FC } from "react";

interface IsShowProps {
  children: React.ReactNode;
  rule: boolean;
}

const IsShow: FC<IsShowProps> = ({ children, rule }) => {
  return rule ? <> {children}</> : <></>;
};

export default IsShow;
