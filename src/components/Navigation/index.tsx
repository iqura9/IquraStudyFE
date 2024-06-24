import { useState } from "react";
import { useIntl } from "react-intl";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button, Input, Layout, Menu, MenuProps } from "antd";
import { useAuth } from "contexts/authContext";

import logo from "../../../public/logoIquraStudy.png";

import AvatarBlock from "./AvatarBlock";
import { sideBarItems } from "./consts";

import style from "./styles.module.scss";

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

export const Navigation = () => {
  const { formatMessage } = useIntl();
  const navigation = useNavigate();
  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname.slice(1) || "home");
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuth();
  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    navigation(e.key);
  };
  const updatedSideBar =
    user?.role === "Teacher"
      ? sideBarItems
      : sideBarItems?.filter(
          (key) => !key?.key?.toLocaleString().includes("create")
        );
  return (
    <Layout className={style.mainLayout}>
      <Layout.Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ background: "#FDFDFD", justifyContent: "center" }}
      >
        <div className={collapsed ? style.logoCollapsed : style.logo}>
          <img src={logo} alt="" />
        </div>
        <Menu
          className={style.mainMenu}
          onClick={onClick}
          selectedKeys={[current]}
          items={updatedSideBar}
        />
      </Layout.Sider>

      <Layout style={{ background: "#FDFDFD" }}>
        <Layout.Header className={style.layoutHeader}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          {/* doesn't work well with 18 react */}
          {/* <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
          /> */}
          <div className={style.searchAvatarWrapper}>
            <Input
              placeholder={formatMessage({
                id: "navigation.search.placeholder",
              })}
              className={style.search}
            />
            <AvatarBlock user={user} />
          </div>
        </Layout.Header>

        <Layout.Content className={style.layoutContent}>
          {/* <BreadcrumbDynamic /> */}
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};
