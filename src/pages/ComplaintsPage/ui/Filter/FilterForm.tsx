import { memo } from 'react';
import { DatePicker, Form, FormInstance, Select } from 'antd';
import {
  useComplaintStatuses,
  useComplaintTypes,
} from 'pages/ComplaintsPage/lib';
import { convertDate } from 'utils/date';
import { FilterProps, FormFields } from 'pages/ComplaintsPage/models';

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};

interface FilterForm {
  form: FormInstance<FormFields>;
  onSubmit: (values: FilterProps[]) => void;
}

const FilterForm = ({ form, onSubmit }: FilterForm) => {
  const statuses = useComplaintStatuses();
  const types = useComplaintTypes();

  const handleSubmit = (values: FormFields) => {
    const props = [
      {
        field: 'status',
        value: values['status']?.value,
      },
      {
        field: 'type',
        value: values['type']?.value,
      },
      {
        field: 'created_at',
        value: values['dateTime']?.$d
          ? convertDate(values['dateTime']?.$d)
          : undefined,
      },
    ].filter(({ value }) => value !== undefined) as FilterProps[];
    return onSubmit(props);
  };

  return (
    <Form {...layout} form={form} name="filter_form" onFinish={handleSubmit}>
      <Form.Item label="Тип жалобы" name="type">
        <Select
          showSearch
          labelInValue
          allowClear
          // onClear={onClear}
          maxTagCount="responsive"
          placeholder="Выберите тип жалобы"
          options={types.data}
          loading={types.isLoading}
          disabled={types.isError}
        />
      </Form.Item>
      <Form.Item label="Дата подачи" className="datePicker" name="dateTime">
        <DatePicker />
      </Form.Item>
      <Form.Item label="Статус" name="status">
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
    </Form>
  );
};

const MemoFilterForm = memo(FilterForm);

export default MemoFilterForm;
