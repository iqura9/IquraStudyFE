import { Space } from "antd";
import { useAuth } from "contexts/authContext";

const HomePage = () => {
  const { user } = useAuth();

  return (
    <Space>
      HomePage
      <Space>{user?.email}</Space>
    </Space>
  );
};

export default HomePage;
