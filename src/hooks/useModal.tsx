import { useState } from "react";

const useModal = (defaultValue = false) => {
  const [isShow, setVisible] = useState(defaultValue);

  const handleShowModal = () => {
    setVisible(true);
  };

  const handleHideModal = () => {
    setVisible(false);
  };

  return { isShow, handleShowModal, handleHideModal };
};

export default useModal;
