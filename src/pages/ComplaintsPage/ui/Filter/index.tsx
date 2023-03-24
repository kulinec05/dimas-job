import { useState } from 'react';
import { Button, Form, Modal } from 'antd';
import { FilterFilled } from '@ant-design/icons';
import FilterForm from './FilterForm';
import { FilterProps } from 'pages/ComplaintsPage/models';

import './Filter.css';

const Filter = ({
  getFilterProps,
}: {
  getFilterProps: (value: FilterProps[]) => void;
}) => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const onSubmit = (values: FilterProps[]) => {
    getFilterProps(values);
    closeModal();
  };

  const onClear = () => {
    getFilterProps([]);
    form.resetFields();
    closeModal();
  };

  return (
    <>
      <Button onClick={showModal} size="large">
        Фильтр
        <FilterFilled />
      </Button>
      <Modal
        title="Фильтр обращений"
        open={isModalVisible}
        onCancel={closeModal}
        width={500}
        footer={
          <div className="filterFooter">
            <Button onClick={onClear} type="ghost">
              Сбросить фильтр
            </Button>
            <Button type="primary" form="filter_form" htmlType="submit">
              Применить
            </Button>
          </div>
        }
      >
        <div className="filterBody">
          <FilterForm form={form} onSubmit={onSubmit} />
        </div>
      </Modal>
    </>
  );
};

export default Filter;
