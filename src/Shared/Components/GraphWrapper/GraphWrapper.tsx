import React, { useState } from 'react';
import { Text, Card, Modal, Box } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';

import { IGraphWrapper } from './GraphWrapperTypes';

const GraphWrapper = ({ children, title, content }: IGraphWrapper) => {
  const { width } = useViewportSize();

  const isScreenMd = () => {
    return width >= 768;
  };

  const handleModalButtonClick = () => {
    if (isScreenMd()) {
      setIsOpen(true);
    }
  };
  const [isOpen, setIsOpen] = useState(false);

  const Tiles = () => {
    return (
      <Box>
        <Text fw={500} mb={8}>
          {title}
        </Text>
        <Card withBorder onClick={() => handleModalButtonClick()}>
          <Text size="xs" color="#666666" mb={16}>
            {content}
          </Text>
          {children}
          <Text size="xs" color="#666666" mt={8} mb={8}></Text>
        </Card>
      </Box>
    );
  };

  return (
    <>
      <Tiles />
      {isScreenMd() && (
        <Modal
          size="75%"
          opened={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
        >
          <Tiles />
        </Modal>
      )}
    </>
  );
};

export default GraphWrapper;
