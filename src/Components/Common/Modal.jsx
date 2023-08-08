import { Button, Modal } from 'antd';
import { useState, useEffect } from 'react';

const CustomModal = ({ children, isOpen, onSubmit, close, onClick, title, fullWidth, width}) => {
  const [isOpenModal, setIsOpenModal] = useState(isOpen);
  useEffect(() => {
    setIsOpenModal(isOpen);
  }, [isOpen]);

  const handleCancel = () => {
    setIsOpenModal(false);
    onClick(false);
  };

  const handleSubmit = () => {
      setIsOpenModal(false);
      onClick(false);
      onSubmit();  
  }

  return (
    <Modal
      title={title}
      visible={isOpenModal}
      centered
      onOk={handleSubmit}
      onCancel={handleCancel}
      close={close}
      width={fullWidth ? '100%' : width ?? 800}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="save"
          style={{
            backgroundColor: '#2d5161',
            color: '#fff',
          }}
          onClick={handleSubmit}
        >
          Save
        </Button>,
      ]}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;