import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumb } from "antd";

const items = [
  {
    path: "/",
    title: "home",
  },
  {
    path: "home",
    title: "home",
  },
  {
    path: "groups",
    title: "groups",
  },
];

function renderBreadcrumb(
  route: any,
  routes: any[],
  index: number,
  parentPath: string = ""
) {
  const path = parentPath + "/" + route.path;
  const isLast = index === routes.length - 1;

  return isLast ? (
    <span key={path}>{route.title}</span>
  ) : (
    <Link key={path} to={path}>
      {route.title}
    </Link>
  );
}

export const BreadcrumbDynamic = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);

  const breadcrumbs = pathSnippets.map((path, index) => {
    const currentPath = "/" + pathSnippets.slice(0, index + 1).join("/");
    const route = items.find((item) => currentPath.startsWith(item.path));
    return route ? renderBreadcrumb(route, items, index, "") : null;
  });

  return <Breadcrumb>{breadcrumbs}</Breadcrumb>;
};
