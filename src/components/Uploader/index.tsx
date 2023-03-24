// import { FC, useCallback, useState } from 'react';
import { Button, Form, message, Upload, UploadProps } from 'antd';
// import {
//   RcFile,
//   UploadChangeParam,
//   UploadFile,
// } from 'antd/es/upload/interface';
import { UploadOutlined } from '@ant-design/icons';
// import { getFileNameAndExt } from 'utils';

// import './Upload.css';

const acceptedTypes = [
  '.jpg',
  '.jpeg',
  '.png',
  '.pdf',
  '.jfif',
  '.jfi',
  '.webp',
  '.avif',
  '.doc',
  '.docx',
  '.txt',
  '.doc',
  '.docx',
  '.xml,application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const isValidType = [
  'image/jpeg',
  'image/png',
  'image/jpg',
  'image/pdf',
  'image/webp',
  'image/avif',
  '.doc',
  '.docx',
  '.txt',
  '.doc',
  '.docx',
  '.xml,application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
];

// const getBase64 = (
//   img: UploadChangeParam<UploadFile<any>>,
//   callback: (url: string) => void,
// ) => {
//   const reader = new FileReader();
//   reader.addEventListener('load', () => callback(reader.result as string));
//   reader.readAsDataURL(img);
// };

const defaultProps: UploadProps = {
  // action: undefined,
  // onChange(res) {
  //   // if (info.file.status !== 'uploading') {
  //   //   const reader = new FileReader();
  //   //   reader.onload = (e) => {
  //   //     console.log(e.target?.result);
  //   //   };
  //   //   reader.readAsText(info.file.originFileObj);
  //   // }
  //   // if (res?.file?.status === 'done' && res?.file) {
  //   //   message.success(`${res.file.name} файл успешно загружен`);
  //   //   return getBase64(res);
  //   // }
  //   if (res.file.status === 'uploading') {
  //     // setLoading(true);
  //     return;
  //   }
  //   if (res.file.status === 'done') {
  //     // Get this url from response in real world.
  //     getBase64(res.file.originFileObj as RcFile, (url) => {
  //       return url;
  //     });
  //   }
  //   if (res?.file?.status === 'error') {
  //     message.error(`${res.file.name} загрузка файла не удалась`);
  //   }
  // },
  customRequest({ onSuccess }) {
    if (onSuccess === undefined) return false;
    setTimeout(() => {
      onSuccess({ body: 'ok' });
    }, 0);
  },
  beforeUpload(file) {
    if (!isValidType.includes(file.type)) {
      message.error('Неверный формат файла');
      return false;
    }

    const isLimitSizeMb = file.size / 1024 / 1024 < 16;
    if (!isLimitSizeMb) {
      message.error('Файл должны быть не больше 15MB!');
      return false;
    }

    return true;
  },
  onRemove() {
    return true;
  },
  progress: {
    strokeColor: {
      '0%': '#108ee9',
      '100%': '#87d068',
    },
    size: 3,
    format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
  },
};

// interface FileExtencion {
//   name: string;
//   extension: string;
// }

const Uploader = () => {
  return (
    <Form.Item
      name="result"
      label="Результат"
      labelAlign="left"
      valuePropName="file"
    >
      <Upload
        name="fileloader"
        {...defaultProps}
        listType="text"
        multiple={false}
        maxCount={1}
        accept={acceptedTypes.join(', ')}
        // onChange={onChanged}
        // fileList={files}
      >
        <Button icon={<UploadOutlined />}>Прикрепить файл</Button>
      </Upload>
    </Form.Item>
  );
};

export default Uploader;
// const [loadingImg, setLoadingImg] = useState(true);
// const [fileName, setFileName] = useState<FileExtencion | null>(null);
// const [files, setFiles] = useState<UploadChangeParam<UploadFile<any>>>();

// const onChanged = (res: UploadChangeParam<UploadFile>) => {
//   //возвращение изображения
//   if (res?.file?.status !== 'uploading') {
//     setLoadingImg(true);
//   }
//   if (res?.file?.status === 'done' && res?.file?.originFileObj) {
//     // const name = getFileNameAndExt(res?.file.name);
//     // setLoadingImg(false);
//     // setFileName(name);
//     // setFiles([res]);
//     // getBase64(res?.file?.originFileObj, () =>
//     //   setFiles(res?.file?.originFileObj),
//     // );
//     message.success(`${res.file.name} файл успешно загружен`);
//   } else if (res?.file?.status === 'error') {
//     message.error(`${res.file.name} загрузка файла не удалась`);
//   }
// };
// const onChange = (info: UploadChangeParam<UploadFile>) => {
//   switch (info.file.status) {
//     case 'uploading':
//       setFiles([info.file]);
//       break;
//     case 'done':
//       setFiles([info.file]);
//       // nextState.selectedFileList = [info.file];
//       break;

//     default:
//       // error or removed
//       setFiles([]);
//     // nextState.selectedFileList = [];
//   }
// };
