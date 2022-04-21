import classNames from 'classnames';
import React, {
  FC,
  ReactNode,
  DragEvent,
  useState,
  useRef,
  CSSProperties,
} from 'react';
import { DropTargetPlaceEnum } from '../../interface/internalType';

interface DraggableProps {
  children: ReactNode;
  dndTargetKey: string;
  currentColumLength: number;
  width: number | string;
  disableDrag: boolean;
  initialSize: any;
  disableChange?: boolean;
  isSection?: boolean;
  className?: string;
  styles?: CSSProperties;
  resizingWidth?: number;
  onDropItem: (
    e: DragEvent<HTMLDivElement>,
    target: DropTargetPlaceEnum,
  ) => void;
}
export const DroppableColumnContainer: FC<DraggableProps> = ({
  children,
  dndTargetKey,
  isSection,
  disableDrag,
  className,
  disableChange,
  onDropItem,
}) => {
  const [droppableTarget, setDroppableTarget] = useState<string>();
  const columnRef = useRef<HTMLDivElement>(null);
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const targetEl = e.currentTarget;
    const targetDom = targetEl.getAttribute('target-droppable-item');

    if (targetDom && !isSection) {
      setDroppableTarget(targetDom);
    }
  };

  const isHoveredTargetClassNameSide = (conditions: boolean) => {
    return conditions
      ? 'rlb-droppable-side-hover'
      : 'rlb-droppable-side';
  };
  const handleDragOverLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDroppableTarget('');
  };
  const handleDropToLeft = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onDropItem(e, DropTargetPlaceEnum.LEFT);
    setDroppableTarget('');
  };
  const handleDropToRigth = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onDropItem(e, DropTargetPlaceEnum.RIGHT);
    setDroppableTarget('');
  };

  return (
    <div
      className={classNames(
        'rlb-col',
        // `w-[${widthNumber}%]`,
        className,
      )}
      ref={columnRef}
    >
      {!disableChange ? (
        <div
          className={`${isHoveredTargetClassNameSide(
            droppableTarget === `${dndTargetKey}-left`,
          )}`}
          target-droppable-item={`${dndTargetKey}-left`}
          onDragOver={disableDrag ? undefined : handleDragOver}
          onDragLeave={handleDragOverLeave}
          onDrop={handleDropToLeft}
        ></div>
      ) : null}

      {children}

      {!disableChange ? (
        <div
          className={`${isHoveredTargetClassNameSide(
            droppableTarget === `${dndTargetKey}-right`,
          )}`}
          target-droppable-item={`${dndTargetKey}-right`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragOverLeave}
          onDrop={handleDropToRigth}
        ></div>
      ) : null}
    </div>
  );
};
