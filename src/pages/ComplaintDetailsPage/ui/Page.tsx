import { useNavigate, useParams } from 'react-router-dom';

import { Button, Row } from 'antd';
import { Title } from 'components/Title';
import ComplaintForm from './ComplaintForm';
import MapView from './MapView';
import { ReactComponent as ArrowLeftIcon } from 'assets/arrow-left.svg';
import { useComplaintDetails } from '../lib';
import { convertDate } from 'utils/date';
import { LoadingIndicator } from 'components/LoadingIndicator';

import './Page.css';

const FORM_NAME = 'edit_complaint_form';

const Page = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleBackHistory = () => navigate(-1);
  const { data } = useComplaintDetails(id);

  if (!data) return <LoadingIndicator isScreen />;

  const initialValues = {
    adminComment: data?.admin_comment ?? undefined,
    status: {
      label: data?.status.label,
      value: data?.status.value,
    },
    result: undefined,
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
        Все жалобы
      </Title>
      <section className="detailsPage">
        <div className="detailsItem">
          <div className="detailsItemLabel">Номер обращения :</div>
          <div className="detailsItemInformation">Обращение №{data?.id}</div>
        </div>
        <div className="detailsItem">
          <div className="detailsItemLabel">Дата подачи :</div>
          <div className="detailsItemInformation">
            от {convertDate(data?.created_at)}
          </div>
        </div>
        <div className="detailsItem">
          <div className="detailsItemLabel">Тип жалобы :</div>
          <div className="detailsItemInformation">{data?.type.label}</div>
        </div>
        <div className="detailsItem">
          <div className="detailsItemLabel">Фотографии :</div>
          <div className="detailsItemInformation">{''}</div>
        </div>
        <div className="detailsItem">
          <div className="detailsItemLabel">Адрес :</div>
          <div className="detailsItemInformation">{data?.address}</div>
        </div>
        <div className="detailsItem">
          <div className="detailsItemLabel">Комментарий пользователя :</div>
          <div className="detailsItemInformation">{data?.comment}</div>
        </div>
        <ComplaintForm formName={FORM_NAME} initialValues={initialValues} />
        {data?.latitude && data?.longitude && (
          <div className="detailsItem borderNone">
            <div className="detailsItemLabel">Комментарий пользователя :</div>
            <div className="detailsItemInformation detailsItemMap">
              <MapView coordinates={[data?.latitude, data?.longitude]} />
            </div>
          </div>
        )}
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
