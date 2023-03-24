import { Form, Input, Select } from 'antd';
import Uploader from 'components/Uploader';
import { useEditComplaint } from 'pages/ComplaintDetailsPage/lib';
import { useComplaintStatuses } from 'pages/ComplaintsPage/lib';
import { useParams } from 'react-router-dom';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: 'Поле "${label}" обязательно!',
};

// interface ComplaintFormProps {
//   form: FormInstance<any>;
//   onSubmit: (values: any[]) => void;
// }
// { form, onSubmit }: ComplaintFormProps

interface FormProps {
  adminComment?: string;
  result?: {
    file: any;
    fileList: any[];
  } | null;
  status: {
    label: string;
    value: number;
  };
}

interface IComplaintForm {
  formName: string;
  initialValues: FormProps;
}

const ComplaintForm = ({ formName, initialValues }: IComplaintForm) => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const statuses = useComplaintStatuses();
  const { mutate } = useEditComplaint();

  const onSubmit = (values: FormProps) => {
    if (!id) return;
    const props = {
      id: +id,
      adminComment: values?.adminComment,
      result: values.result?.file,
      status: values.status?.value,
    };

    mutate(props);
  };

  return (
    <>
      <Form
        {...layout}
        form={form}
        name={formName}
        onFinish={onSubmit}
        initialValues={initialValues}
        validateMessages={validateMessages}
      >
        <Form.Item
          label="Статус"
          labelAlign="left"
          name="status"
          rules={[{ required: true }]}
        >
          <Select
            showSearch
            labelInValue
            allowClear
            maxTagCount="responsive"
            placeholder="Выберите статус"
            options={statuses.data}
            loading={statuses.isLoading}
            disabled={statuses.isError}
          />
        </Form.Item>

        <Uploader />

        <Form.Item
          name="adminComment"
          labelAlign="left"
          label="Комментарий к результату"
        >
          <Input.TextArea
            placeholder="Введите комментарий к результату"
            style={{ height: 120, resize: 'none' }}
          />
        </Form.Item>
      </Form>
    </>
  );
};

export default ComplaintForm;
