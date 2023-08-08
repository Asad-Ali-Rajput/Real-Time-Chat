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
      setIsOpenModal(!isOpenModal);
      onClick(false);
      onSubmit();  
  }

  const handleModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <Modal
      // onOk={handleModal}
      onOk={handleSubmit}
      open={isOpenModal}
      onCancel={handleModal}
      centered
      title={title}
      close={isOpenModal ? false : true}
      // footer={[
      //   <Button key="cancel" onClick={handleCancel}>
      //     Cancel
      //   </Button>,
      //   <Button
      //     key="save"
      //     style={{
      //       backgroundColor: '#2d5161',
      //       color: '#fff',
      //     }}
      //     onClick={handleSubmit}
      //   >
      //     Save
      //   </Button>,
      // ]}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;