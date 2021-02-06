import styled, { keyframes } from "styled-components";
import React, { useState, FC } from "react";
import { FullScreenContainer } from "../../../components/full-screen-container";
import arrowDown from "./arrow-down.png";
import dropItHere from "./drop-it-here.png";
import { Hole } from "../../../components/hole";
import { AspectRatioContainer } from "../../../components/aspect-ratio-container";
type DropZoneContainerProps = {
  isDraggingOver: boolean;
};

const swing = keyframes`
    from {
      transform: translateY(-5%);
    }
    50% {
      transform: translateY();
    }
    to {
      transform: translateY(+20%);
    }
`;

const DropZoneContainer = styled(FullScreenContainer)<DropZoneContainerProps>`
  background: ${({ isDraggingOver }) => (isDraggingOver ? "yellow" : "white")};
`;
const DropZoneBase = styled(AspectRatioContainer)`
  .drop-it-here {
    width: 100%;
    height: 30%;
    background: url(${dropItHere});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .arrow-down {
    width: 100%;
    height: 40%;
    background: url(${arrowDown});
    background-size: 15%;
    background-repeat: no-repeat;
    background-position: center;

    animation: ${swing} 0.7s 0s ease-in-out infinite alternate;
  }
`;

const DropOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
`;

type DropZoneProps = {
  onFile: (files: File[]) => void;
};

export const DropZone: FC<DropZoneProps> = ({ onFile }) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);

    if (e.dataTransfer.files) {
      onFile([...e.dataTransfer.files]);
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
    <>
      <DropZoneContainer isDraggingOver={isDraggingOver}>
        <DropZoneBase>
          <div className="drop-it-here" />
          <div className="arrow-down" />
          <Hole isActive={isDraggingOver} />
          {/* <div className='arrow'/>
        <div className='tip'/> */}
        </DropZoneBase>
      </DropZoneContainer>
      <DropOverlay
        onDrop={handleDrop}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
      />
    </>
  );
};
