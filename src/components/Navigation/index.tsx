import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Input, Layout, Menu, MenuProps } from "antd";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { items, sideBarItems } from "./consts";
import style from "./styles.module.scss";

export const Navigation = () => {
  const navigation = useNavigate();
  const [current, setCurrent] = useState("home");
  const [collapsed, setCollapsed] = useState(false);

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    navigation(e.key);
  };

  return (
    <Layout className={style.mainLayout}>
      <Layout.Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ background: "#FDFDFD" }}
      >
        <div className={style.logo} />
        <Menu
          className={style.mainMenu}
          onClick={onClick}
          selectedKeys={[current]}
          mode="inline"
          items={sideBarItems}
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
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
          />
          <div className={style.searchAvatarWrapper}>
            <Input
              placeholder="Input group or problem name"
              className={style.search}
            />
            <div className={style.avatar}></div>
          </div>
        </Layout.Header>

        <Layout.Content className={style.layoutContent}>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};
