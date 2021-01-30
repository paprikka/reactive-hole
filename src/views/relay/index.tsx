import React, { useState, FC } from "react";
import styled from "styled-components";

type DropZoneBaseProps = {
  isDraggingOver: boolean;
};

const FullScreenContainer = styled.section`
  width: 100vw;
  height: 100vh;

  display: grid;
  align-items: center;
  justify-content: center;

  h1 {
    padding: 0;
    margin: 0;
    font-size: 5vw;
    user-select: none;
  }
`;

const DropZoneBase = styled(FullScreenContainer)<DropZoneBaseProps>`
  background: ${({ isDraggingOver }) => (isDraggingOver ? "yellow" : "white")};
`;

type DropZoneProps = {
  onFile: (files: DataTransferItem[]) => void;
};

const DropZone: FC<DropZoneProps> = ({ onFile }) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);

    if (e.dataTransfer.files) {
      onFile([...e.dataTransfer.items]);
    }
  };
  const handleDragEnter = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLElement>) => {
    setIsDraggingOver(false);
    e.preventDefault();
  };

  return (
    <DropZoneBase
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      isDraggingOver={isDraggingOver}
    >
      <h1>[ drag a file here to upload ]</h1>
    </DropZoneBase>
  );
};

const WaitingForConnection = () => {
  return (
    <FullScreenContainer>
      <h1>[ ready ]</h1>
    </FullScreenContainer>
  );
};

export const RelayView: FC = () => {
  const [files, setFiles] = useState<DataTransferItem[]>([]);
  const hasFiles = Array.isArray(files) && files.length;
  return hasFiles ? <WaitingForConnection /> : <DropZone onFile={setFiles} />;
};
