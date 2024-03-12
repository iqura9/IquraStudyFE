import React, { useEffect, useRef, useState } from "react";
import { FormattedMessage } from "react-intl";
import { Menu } from "antd";
import { useLocale } from "contexts/localeContext";
import { logOut } from "helpers/logOut";
import { IUser } from "types/authTypes";

import styles from "./styles.module.scss";

interface AvatarBlockProps {
  user: IUser | undefined | null;
}

const AvatarBlock: React.FC<AvatarBlockProps> = ({ user }) => {
  const { locale, handleLanguageChange } = useLocale();
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
    handleLanguageChange && handleLanguageChange(language);
    setBlockVisibility(false);
  };

  return (
    <div className={styles.avatar} ref={blockRef} onClick={handleAvatarClick}>
      {user?.userName[0].toUpperCase()}
      {isBlockVisible && (
        <div className={styles.block}>
          <Menu>
            <Menu.Item key="logout" onClick={handleLogout}>
              <FormattedMessage id="navigation.avatar.log.out" />
            </Menu.Item>
            {locale !== "en" && (
              <Menu.Item
                key="switch-eng"
                onClick={() => handleLanguageSwitch("en")}
              >
                <FormattedMessage id="navigation.avatar.change.language.en" />
              </Menu.Item>
            )}
            {locale !== "uk" && (
              <Menu.Item
                key="switch-ukr"
                onClick={() => handleLanguageSwitch("uk")}
              >
                <FormattedMessage id="navigation.avatar.change.language.uk" />
              </Menu.Item>
            )}
          </Menu>
        </div>
      )}
    </div>
  );
};

export default AvatarBlock;
