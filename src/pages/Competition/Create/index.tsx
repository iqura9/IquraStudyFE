import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  Select,
  Space,
  Typography,
} from "antd";
import styled from "styled-components";

const { Title } = Typography;
const { TextArea } = Input;

const PageContainer = styled("div")({
  padding: 24,
  maxWidth: 800,
  margin: "0 auto",
});

function CreateCompetitionPage() {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Competition Created:", values);
  };

  return (
    <PageContainer>
      <Card>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Title level={3}>Create Competition</Title>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              difficulty: "Easy",
              participantMode: "Virtual",
              format: "IOI",
            }}
          >
            <Form.Item
              label="Competition Title"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Please enter the competition title!",
                },
              ]}
            >
              <Input placeholder="Enter competition title" />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[
                { required: true, message: "Please enter a description!" },
              ]}
            >
              <TextArea placeholder="Enter competition description" rows={4} />
            </Form.Item>

            <Form.Item
              label="Format"
              name="format"
              rules={[
                {
                  required: true,
                  message: "Please select the competition format!",
                },
              ]}
            >
              <Select placeholder="Select format">
                <Select.Option value="IOI">IOI</Select.Option>
                <Select.Option value="ICPC">ICPC</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Participant Mode"
              name="participantMode"
              rules={[
                {
                  required: true,
                  message: "Please select the participant mode!",
                },
              ]}
            >
              <Select placeholder="Select participant mode">
                <Select.Option value="Virtual">Virtual</Select.Option>
                <Select.Option value="Online">Online</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              shouldUpdate={(prevValues, curValues) =>
                prevValues.participantMode !== curValues.participantMode
              }
            >
              {({ getFieldValue }) =>
                getFieldValue("participantMode") === "Virtual" && (
                  <Form.Item
                    label="Duration (hours)"
                    name="duration"
                    rules={[
                      {
                        required: true,
                        message: "Please specify the task duration!",
                      },
                    ]}
                  >
                    <Input
                      type="number"
                      placeholder="Enter duration in hours"
                      min={0}
                      addonAfter="hours"
                    />
                  </Form.Item>
                )
              }
            </Form.Item>

            <Form.Item
              label="Starting Time"
              name="startTime"
              rules={[
                { required: true, message: "Please select the starting time!" },
              ]}
            >
              <DatePicker
                showTime
                format="DD/MM/YYYY HH:mm"
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item
              label="Ending Time"
              name="endTime"
              rules={[
                { required: true, message: "Please select the ending time!" },
              ]}
            >
              <DatePicker
                showTime
                format="DD/MM/YYYY HH:mm"
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item
              label="Difficulty"
              name="difficulty"
              rules={[
                {
                  required: true,
                  message: "Please select a difficulty level!",
                },
              ]}
            >
              <Select placeholder="Select difficulty">
                <Select.Option value="Easy">Easy</Select.Option>
                <Select.Option value="Medium">Medium</Select.Option>
                <Select.Option value="Hard">Hard</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Create Competition
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </Card>
    </PageContainer>
  );
}

export default CreateCompetitionPage;
