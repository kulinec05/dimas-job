import { useNavigate, useParams } from 'react-router-dom';

import { Form, Button, Row, Checkbox } from 'antd';
import { Title } from 'components/Title';

import { ReactComponent as ArrowLeftIcon } from 'assets/arrow-left.svg';
import { useNewsDetails, useEditNews, useAddNews } from '../lib';
import { convertDate } from 'utils/date';
import { LoadingIndicator } from 'components/LoadingIndicator';

import './Page.css';
import TextArea from 'antd/es/input/TextArea';
import layout from 'antd/es/layout';
import Uploader from 'components/Uploader';
const validateMessages = {
  required: 'Поле "${label}" обязательно!',
};

const FORM_NAME = 'edit_complaint_form';

interface FormProps {
  text?: string;
  title?: string;
  is_delete?: boolean;
  result?: {
    image: any;
  } | null;
}

const Page = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const { data } = useNewsDetails(id);
  const { mutate } = useEditNews(!!id);

  const navigate = useNavigate();

  const onSubmit = (values: FormProps) => {
    console.log(values, data);

    const props = {
      id: id && +id,
      text: values?.text,
      title: values?.title,
      is_delete: values?.is_delete,
      result: values.result && values.result?.image,
    };

    mutate(props);
  };
  const handleBackHistory = () => navigate(-1);

  if (id && !data) return <LoadingIndicator isScreen />;

  const initialValues = {
    title: id ? data.title : '',
    text: id ? data.text : '',
    is_delete: id ? data?.is_delete : false,
  };

  return (
    <>
      <Title
        headerType="h4"
        margin
        onClick={handleBackHistory}
        className="title"
      >
        <ArrowLeftIcon style={{ marginRight: '8px' }} />
        {id ? 'Редактирование новости' : 'Добавить новость'}
      </Title>
      <section className="detailsPage">
        <Form
          {...layout}
          form={form}
          name={FORM_NAME}
          onFinish={onSubmit}
          initialValues={initialValues}
          validateMessages={validateMessages}
        >
          <Form.Item
            name="title"
            label="Заголовок"
            rules={[{ required: true, message: 'Поле не должно быть пустым' }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="text"
            label="Текст новости"
            rules={[{ required: true, message: 'Поле не должно быть пустым' }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          {id && (
            <Form.Item name="is_delete" valuePropName="checked">
              <Checkbox>Отображать на главной</Checkbox>
            </Form.Item>
          )}
          <Uploader label="Фотография для главной" />
        </Form>
        <Row justify="end" style={{ width: '100%' }}>
          <Button type="primary" form={FORM_NAME} htmlType="submit">
            {id ? 'Сохранить' : 'Добавить'}
          </Button>
        </Row>
      </section>
    </>
  );
};

export default Page;
