import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Space, TablePaginationConfig, TableProps, Tag } from 'antd';
import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table/interface';
import { Title } from 'components/Title';
import { useGetNews } from '../lib';
import { News, NewsListProps } from '../models';
import { StatusesColor } from 'utils/constants';
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

  const [filters, setFilters] = useState<NewsListProps>({
    pageSize: pageSize,
    page: 1,
  });

  const handleChange: TableProps<News>['onChange'] = (pagination) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: pagination.current || 1,
    }));
  };

  const {
    data: newsList,
    isFetching,
    isLoading,
    refetch,
  } = useGetNews(filters);

  useEffect(() => {
    refetch();
  }, [filters]);

  const columns: ColumnsType<News> = useMemo(
    () => [
      {
        title: 'Дата публикации',
        dataIndex: 'created_at',
        key: 'created_at',
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
            onClick={() => navigate(`/news/${row.id}`)}
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
      <Space wrap direction="horizontal">
        <Title headerType="h3" margin>
          Новости
        </Title>
        <Button type="primary" ghost onClick={() => navigate(`/news/add`)}>
          Добавить новость
        </Button>
      </Space>

      <Table
        className={'complaintsTable'}
        rowClassName={(_, index) =>
          index % 2 === 0 ? 'complaintsTableLight' : 'complaintsTableDark'
        }
        columns={columns}
        dataSource={newsList?.data ?? []}
        loading={isFetching || isLoading}
        pagination={{ ...paginationOptions, total: newsList?.total }}
        onChange={handleChange}
        rowKey="id"
      />
    </>
  );
};

export default Page;
