import { useNavigate, useParams } from 'react-router-dom';

import { Form, Button, Row, Checkbox, DatePicker, Input, Select } from 'antd';
import { Title } from 'components/Title';

import { ReactComponent as ArrowLeftIcon } from 'assets/arrow-left.svg';
import { useProjectsDetails, useEditProjects } from '../lib';
import { convertDate, dayjs } from 'utils/date';
import { LoadingIndicator } from 'components/LoadingIndicator';

import './Page.css';
import TextArea from 'antd/es/input/TextArea';
import layout from 'antd/es/layout';
import Uploader from 'components/Uploader';
import { EditProjectsProps } from '../models';
import { useProjectsStatuses } from 'pages/ProjectsPage/lib';
const validateMessages = {
  required: 'Поле "${label}" обязательно!',
};

const FORM_NAME = 'edit_complaint_form';

interface FormProps {
  text?: string;
  title?: string;
  is_delete?: boolean;
  result?: {
    image: unknown;
  } | null;
  status: {
    label: string;
    value: number;
  };
}

const Page = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const { data } = useProjectsDetails(id);
  const statuses = useProjectsStatuses();
  const { mutate } = useEditProjects(!!id);

  const navigate = useNavigate();

  const onSubmit = (values: FormProps) => {
    console.log(values.status);

    const props = {
      id: id && +id,
      text: values?.text,
      title: values?.title,
      is_delete: values?.is_delete,
      result: values.result && values.result?.image,
      status: values.status.value,
    };
    mutate(props as EditProjectsProps);
  };
  const handleBackHistory = () => navigate(-1);
  console.log(statuses);

  if (id && !data) return <LoadingIndicator isScreen />;

  const initialValues = {
    created_at: id ? dayjs(data?.created_at, 'DD/MM/YYYY') : '',
    title: id ? data?.title : '',
    text: id ? data?.text : '',
    is_delete: id ? data?.is_delete : false,
    status: {
      label: id ? data?.status?.label : '',
      value: id ? data?.status?.value : 0,
    },
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
        {id ? 'Редактирование проекта' : 'Добавить проект'}
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
          <Form.Item name="created_at" label="План реализации проекта">
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="title"
            label="Заголовок"
            rules={[{ required: true, message: 'Поле не должно быть пустым' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="text"
            label="Текст проекта"
            rules={[{ required: true, message: 'Поле не должно быть пустым' }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item name="is_delete" valuePropName="checked">
            <Checkbox>Отображать на главной</Checkbox>
          </Form.Item>
          <Uploader label="Фотография" />
          <Form.Item
            label="Статус"
            labelAlign="left"
            required={true}
            name="status"
            rules={[{ required: true }]}
          >
            <Select
              labelInValue
              maxTagCount="responsive"
              placeholder="Выберите статус"
              options={statuses.data}
              loading={statuses.isLoading}
              disabled={statuses.isError}
            />
          </Form.Item>
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
