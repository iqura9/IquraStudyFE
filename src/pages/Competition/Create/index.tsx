import { FormattedMessage, useIntl } from "react-intl";
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

import { useCreateCompetition } from "./useCreateCompetition";

const { Title } = Typography;
const { TextArea } = Input;

const PageContainer = styled("div")({
  padding: 24,
  maxWidth: 800,
  margin: "0 auto",
});

function CreateCompetitionPage() {
  const { formatMessage } = useIntl();
  const [form] = Form.useForm();

  const { createCompetition, isPending } = useCreateCompetition();

  const onFinish = (values: any) => {
    createCompetition(values);
    console.log("Competition Created:", values);
  };

  return (
    <PageContainer>
      <Card>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Title level={3}>
            <FormattedMessage id="competition.create.title" />
          </Title>

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
              label={<FormattedMessage id="competition.create.title.title" />}
              name="title"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="competition.create.message.title.required" />
                  ),
                },
              ]}
            >
              <Input
                placeholder={formatMessage({
                  id: "competition.create.title.placeholder",
                })}
              />
            </Form.Item>

            <Form.Item
              label={<FormattedMessage id="competition.create.description" />}
              name="description"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="competition.create.message.description.required" />
                  ),
                },
              ]}
            >
              <TextArea
                rows={4}
                placeholder={formatMessage({
                  id: "competition.create.description.placeholder",
                })}
              />
            </Form.Item>

            <Form.Item
              label={<FormattedMessage id="competition.create.format" />}
              name="format"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="competition.create.message.format.required" />
                  ),
                },
              ]}
            >
              <Select
                placeholder={
                  <FormattedMessage id="competition.create.format.placeholder" />
                }
                disabled
              >
                <Select.Option value="IOI">IOI</Select.Option>
                <Select.Option value="ICPC">ICPC</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label={<FormattedMessage id="competition.create.mode" />}
              name="participantMode"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="competition.create.message.participantMode.required" />
                  ),
                },
              ]}
            >
              <Select
                placeholder={
                  <FormattedMessage id="competition.create.mode.placeholder" />
                }
              >
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
                    label={
                      <FormattedMessage id="competition.create.duration.label" />
                    }
                    name="duration"
                    rules={[
                      {
                        required: true,
                        message: (
                          <FormattedMessage id="competition.create.duration.required" />
                        ),
                      },
                    ]}
                  >
                    <Input
                      type="number"
                      min={0}
                      placeholder={formatMessage({
                        id: "competition.create.message.durationPlaceholder",
                      })}
                      addonAfter={
                        <FormattedMessage id="competition.create.message.hours" />
                      }
                    />
                  </Form.Item>
                )
              }
            </Form.Item>

            <Form.Item
              label={
                <FormattedMessage id="competition.create.startTime.label" />
              }
              name="startTime"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="competition.create.startTime.required" />
                  ),
                },
              ]}
            >
              <DatePicker
                showTime
                format="DD/MM/YYYY HH:mm"
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item
              label={<FormattedMessage id="competition.create.endTime.label" />}
              name="endTime"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="competition.create.endTime.required" />
                  ),
                },
              ]}
            >
              <DatePicker
                showTime
                format="DD/MM/YYYY HH:mm"
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item
              label={
                <FormattedMessage id="competition.create.difficulty.label" />
              }
              name="difficulty"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="competition.create.difficulty.required" />
                  ),
                },
              ]}
            >
              <Select
                placeholder={
                  <FormattedMessage id="competition.create.difficulty.placeholder" />
                }
              >
                <Select.Option value="Easy">Easy</Select.Option>
                <Select.Option value="Medium">Medium</Select.Option>
                <Select.Option value="Hard">Hard</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isPending}
                block
              >
                {isPending ? (
                  <FormattedMessage id="competition.create.button.submitting" />
                ) : (
                  <FormattedMessage id="competition.create.button.default" />
                )}
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </Card>
    </PageContainer>
  );
}

export default CreateCompetitionPage;
