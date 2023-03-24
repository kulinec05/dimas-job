import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TablePaginationConfig, TableProps, Tag } from 'antd';
import { Button, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table/interface';
import { Title } from 'components/Title';
import { useGetComplaints } from '../lib';
import { Complaint, ComplaintsListProps, FilterProps } from '../models';
import { StatusesColor } from 'utils/constants';
import Filter from './Filter';
import './Page.css';

const pageSize = 10;

const paginationOptions: TablePaginationConfig = {
  defaultPageSize: pageSize,
  showSizeChanger: false,
  hideOnSinglePage: true,
  position: ['bottomCenter'],
};

const Page = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState<ComplaintsListProps>({
    pageSize: pageSize,
    page: 1,
  });

  const handleChange: TableProps<Complaint>['onChange'] = (pagination) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: pagination.current || 1,
    }));
  };

  const {
    data: complaintsList,
    isFetching,
    isLoading,
    refetch,
  } = useGetComplaints(filters);

  useEffect(() => {
    refetch();
  }, [filters]);

  const handleSetFilters = (values: FilterProps[]) => {
    setFilters({
      filter: values,
      pageSize,
      page: 1,
    });
  };

  const columns: ColumnsType<Complaint> = useMemo(
    () => [
      {
        title: '№ обращения',
        dataIndex: 'id',
        key: 'id',
        render: (_, row) => (
          <>
            <div>Обращения №{row.id}</div>
            <div>{row.created_at}</div>
          </>
        ),
        ellipsis: true,
        width: '20%',
      },
      {
        title: 'Комментарий',
        dataIndex: 'comment',
        key: 'comment',
        ellipsis: true,
        width: '30%',
      },
      {
        title: 'Тип жалобы',
        dataIndex: 'type',
        key: 'type',
        render: (_, row) => <>{row.type.label}</>,
        ellipsis: true,
        width: '15%',
      },
      {
        title: 'Адрес',
        dataIndex: 'address',
        key: 'address',
        ellipsis: true,
        width: '25%',
      },
      {
        title: 'Статус',
        dataIndex: 'status',
        key: 'status',
        render: (_, row) => (
          <Tag color={StatusesColor[row.status.name]}>{row.status.label}</Tag>
        ),
        ellipsis: true,
        width: '15%',
      },
      {
        title: '',
        dataIndex: 'actions',
        key: 'actions',
        render: (_, row) => (
          <Button
            type="primary"
            ghost
            onClick={() => navigate(`/complaints/${row.id}`)}
          >
            Посмотреть
          </Button>
        ),
        ellipsis: true,
        width: '146px',
      },
    ],
    [filters],
  );

  return (
    <>
      <Space
        align="end"
        style={{ marginBottom: 16, width: '100%', justifyContent: 'flex-end' }}
      >
        <Filter getFilterProps={handleSetFilters} />
      </Space>
      <Title headerType="h3" margin>
        Жалобы
      </Title>
      <Table
        className={'complaintsTable'}
        rowClassName={(_, index) =>
          index % 2 === 0 ? 'complaintsTableLight' : 'complaintsTableDark'
        }
        columns={columns}
        dataSource={complaintsList?.data ?? []}
        loading={isFetching || isLoading}
        pagination={{ ...paginationOptions, total: complaintsList?.total }}
        onChange={handleChange}
        rowKey="id"
      />
    </>
  );
};

export default Page;

// const columns: ColumnsType<Complaint[]> = [
//   {
//     title: 'Name',
//     dataIndex: 'name',
//     key: 'name',
//     filters: [
//       { text: 'Joe', value: 'Joe' },
//       { text: 'Jim', value: 'Jim' },
//     ],
//     filteredValue: filteredInfo.name || null,
//     onFilter: (value: string | number | boolean, record: Complaint) =>
//       record.name.includes(String(value)),
//     sorter: (a, b) => a.name.length - b.name.length,
//     sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
//     ellipsis: true,
//   },
//   {
//     title: 'Age',
//     dataIndex: 'age',
//     key: 'age',
//     sorter: (a, b) => a.age - b.age,
//     sortOrder: sortedInfo.columnKey === 'age' ? sortedInfo.order : null,
//     ellipsis: true,
//   },
//   {
//     title: 'Address',
//     dataIndex: 'address',
//     key: 'address',
//     filters: [
//       { text: 'London', value: 'London' },
//       { text: 'New York', value: 'New York' },
//     ],
//     filteredValue: filteredInfo.address || null,
//     onFilter: (value: string | number | boolean, record: Complaint) =>
//       record.address.includes(String(value)),
//     sorter: (a, b) => a.address.length - b.address.length,
//     sortOrder: sortedInfo.columnKey === 'address' ? sortedInfo.order : null,
//     ellipsis: true,
//   },
// ];
