import { useParams } from 'react-router-dom';

import { Title } from 'components/Title';
import { Button, Form, Input, Row } from 'antd';
import { useEditBotSettings, useGetBotSettings } from '../lib';

import './Page.css';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: 'Поле "${label}" обязательно!',
};

const FORM_NAME = 'edit_bot_settings_form';

const Page = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const { data, isLoading } = useGetBotSettings();
  const { mutate } = useEditBotSettings();

  const onSubmit = (values: any) => {
    if (!id) return;
    const props = {
      id: +id,
      adminComment: values?.adminComment,
      result: values.result?.file,
      status: values.status?.value,
    };

    // mutate(props);
  };

  console.log(data);
  return (
    <>
      <Title headerType="h3" margin>
        Настройки бота
      </Title>
      <section className="detailsPage">
        <Form
          {...layout}
          form={form}
          name={FORM_NAME}
          onFinish={onSubmit}
          // initialValues={initialValues}
          validateMessages={validateMessages}
        >
          <Form.Item
            name="adminComment"
            labelAlign="left"
            label="Текст при вводе команды /start"
            rules={[{ required: true }]}
          >
            <Input.TextArea
              placeholder="Введите комментарий"
              style={{ height: 120, resize: 'none' }}
            />
          </Form.Item>

          <Form.Item
            label="Текст при смене статуса На рассмотрении"
            labelAlign="left"
            name="status"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Текст при смене статуса Принят"
            labelAlign="left"
            name="status"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Текст при смене статуса Отклонен"
            labelAlign="left"
            name="status"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
        <Row justify="end" style={{ width: '100%' }}>
          <Button type="primary" form={FORM_NAME} htmlType="submit">
            Сохранить
          </Button>
        </Row>
      </section>
    </>
  );
};

export default Page;
