import { Input, Layout, Menu, MenuProps } from "antd";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { items } from "./consts";
import style from "./styles.module.scss";

export const Header = () => {
  const navigation = useNavigate();
  const [current, setCurrent] = useState("home");

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    navigation(e.key);
  };

  return (
    <Layout style={{ background: "#FDFDFD" }}>
      <Layout.Header className={style.layoutHeader}>
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
  );
};
