import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Space, TablePaginationConfig, TableProps, Tag } from 'antd';
import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table/interface';
import { Title } from 'components/Title';
import { useGetProjects } from '../lib';
import { Projects, ProjectsListProps } from '../models';
import { StatusesColor } from 'utils/constants';
import './Page.css';
import { PlusOutlined } from '@ant-design/icons';
import { convertDate, convertTime } from 'utils/date';

const pageSize = 10;

const paginationOptions: TablePaginationConfig = {
  defaultPageSize: pageSize,
  showSizeChanger: false,
  hideOnSinglePage: true,
  position: ['bottomCenter'],
};

const Page = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState<ProjectsListProps>({
    pageSize: pageSize,
    page: 1,
  });

  const handleChange: TableProps<Projects>['onChange'] = (pagination) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: pagination.current || 1,
    }));
  };

  const {
    data: eventsList,
    isFetching,
    isLoading,
    refetch,
  } = useGetProjects(filters);

  useEffect(() => {
    refetch();
  }, [filters]);

  const columns: ColumnsType<Projects> = useMemo(
    () => [
      {
        title: 'Дата публикации',
        dataIndex: 'created_at',
        key: 'created_at',
        render: (_K, row) =>
          convertDate(row.created_at) + ' ' + convertTime(row.created_at),
        ellipsis: true,
        width: '182px',
      },
      {
        title: 'Заголовок',
        dataIndex: 'title',
        key: 'title',
        width: '100%',
      },
      {
        title: 'Статус',
        dataIndex: 'is_delete',
        key: 'is_delete',
        render: (_, row) => {
          if (row.is_delete) {
            return <Tag color={StatusesColor.REJECTED}>Cкрыть</Tag>;
          }
          return '';
        },
        width: '100px',
      },

      {
        title: '',
        dataIndex: 'actions',
        key: 'actions',
        render: (_, row) => (
          <Button
            type="primary"
            ghost
            onClick={() => navigate(`/events/${row.id}`)}
          >
            Редактировать
          </Button>
        ),
        ellipsis: true,
        width: '180px',
      },
    ],
    [filters],
  );

  return (
    <>
      <Space className="page-header" direction="horizontal" align="baseline">
        <Title headerType="h3" margin>
          Проекты
        </Title>
        <Button
          type="primary"
          ghost
          onClick={() => navigate(`/events/add`)}
          icon={<PlusOutlined />}
        >
          Добавить проект
        </Button>
      </Space>

      <Table
        className={'complaintsTable'}
        rowClassName={(_, index) =>
          index % 2 === 0 ? 'complaintsTableLight' : 'complaintsTableDark'
        }
        columns={columns}
        dataSource={eventsList?.data ?? []}
        loading={isFetching || isLoading}
        pagination={{ ...paginationOptions, total: eventsList?.total }}
        onChange={handleChange}
        rowKey="id"
      />
    </>
  );
};

export default Page;
