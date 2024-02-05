import React, { useEffect, useRef, useState } from "react";
import { Menu } from "antd";
import { logOut } from "helpers/logOut";
import { IUser } from "types/authTypes";

import styles from "./styles.module.scss";

interface AvatarBlockProps {
  user: IUser | undefined | null;
}

const AvatarBlock: React.FC<AvatarBlockProps> = ({ user }) => {
  const [isBlockVisible, setBlockVisibility] = useState(false);
  const blockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        blockRef.current &&
        !blockRef.current.contains(event.target as Node)
      ) {
        setBlockVisibility(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleAvatarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setBlockVisibility(!isBlockVisible);
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logging out...");
    setBlockVisibility(false);
    logOut();
  };

  const handleLanguageSwitch = (language: string) => {
    // Add your language switch logic here
    console.log(`Switching to ${language} language...`);
    setBlockVisibility(false);
  };

  return (
    <div className={styles.avatar} ref={blockRef} onClick={handleAvatarClick}>
      {user?.userName[0].toUpperCase()}
      {isBlockVisible && (
        <div className={styles.block}>
          <Menu>
            <Menu.Item key="logout" onClick={handleLogout}>
              Log Out
            </Menu.Item>
            <Menu.Item
              key="switch-eng"
              onClick={() => handleLanguageSwitch("eng")}
            >
              Switch to English
            </Menu.Item>
            <Menu.Item
              key="switch-ukr"
              onClick={() => handleLanguageSwitch("ukr")}
            >
              Switch to Ukrainian
            </Menu.Item>
          </Menu>
        </div>
      )}
    </div>
  );
};

export default AvatarBlock;
