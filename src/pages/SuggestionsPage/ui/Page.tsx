import { useMemo, useState } from 'react';
import type { TablePaginationConfig, TableProps } from 'antd';
import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table/interface';
import { Title } from 'components/Title';
import { useGetSuggestions } from '../lib';
import { Suggestion, SuggestionsProps } from '../models';
import './Page.css';

const pageSize = 10;

const paginationOptions: TablePaginationConfig = {
  defaultPageSize: pageSize,
  showSizeChanger: false,
  hideOnSinglePage: true,
  position: ['bottomCenter'],
};

const Page = () => {
  const [filters, setFilters] = useState<SuggestionsProps>({
    pageSize: pageSize,
    page: 1,
  });

  const handleChange: TableProps<Suggestion>['onChange'] = (pagination) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: pagination.current || 1,
    }));
  };

  const {
    data: suggestionsList,
    isFetching,
    isLoading,
  } = useGetSuggestions(filters);

  const columns: ColumnsType<Suggestion> = useMemo(
    () => [
      {
        title: '№ предложения',
        dataIndex: 'id',
        key: 'id',
        render: (_, row) => (
          <>
            <div>Предложение №{row.id}</div>
            <div>{row.created_at}</div>
          </>
        ),
        ellipsis: true,
        width: '25%',
      },
      {
        title: 'Комментарий',
        dataIndex: 'comment',
        key: 'comment',
        ellipsis: true,
        width: '75%',
      },
      {
        title: '',
        dataIndex: 'actions',
        key: 'actions',
        render: (_, row) => <Button>Посмотреть</Button>,
        ellipsis: true,
        width: '148px',
      },
    ],
    [filters],
  );

  return (
    <>
      <Title headerType="h3" margin>
        Предложения
      </Title>
      <Table
        className={'suggestionsTable'}
        rowClassName={(_, index) =>
          index % 2 === 0 ? 'suggestionsTableLight' : 'suggestionsTableDark'
        }
        columns={columns}
        dataSource={suggestionsList?.data ?? []}
        loading={isFetching || isLoading}
        pagination={{ ...paginationOptions, total: suggestionsList?.total }}
        onChange={handleChange}
        rowKey="id"
      />
    </>
  );
};

export default Page;
