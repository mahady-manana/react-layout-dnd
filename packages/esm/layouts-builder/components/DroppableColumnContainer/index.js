import classnames from '../../../node_modules/classnames/index.js';
import React, { useState, useRef } from 'react';
import { DropTargetPlaceEnum } from '../../interface/internalType.js';

var DroppableColumnContainer = function DroppableColumnContainer(_a) {
  var children = _a.children,
      dndTargetKey = _a.dndTargetKey,
      isSection = _a.isSection,
      disableDrag = _a.disableDrag,
      className = _a.className,
      disableChange = _a.disableChange,
      onDropItem = _a.onDropItem;

  var _b = useState(),
      droppableTarget = _b[0],
      setDroppableTarget = _b[1];

  var columnRef = useRef(null);

  var handleDragOver = function handleDragOver(e) {
    e.stopPropagation();
    e.preventDefault();
    var targetEl = e.currentTarget;
    var targetDom = targetEl.getAttribute('target-droppable-item');

    if (targetDom && !isSection) {
      setDroppableTarget(targetDom);
    }
  };

  var isHoveredTargetClassNameSide = function isHoveredTargetClassNameSide(conditions) {
    return conditions ? 'rlb-droppable-side-hover' : 'rlb-droppable-side';
  };

  var handleDragOverLeave = function handleDragOverLeave(e) {
    e.preventDefault();
    setDroppableTarget('');
  };

  var handleDropToLeft = function handleDropToLeft(e) {
    e.preventDefault();
    onDropItem(e, DropTargetPlaceEnum.LEFT);
    setDroppableTarget('');
  };

  var handleDropToRigth = function handleDropToRigth(e) {
    e.preventDefault();
    onDropItem(e, DropTargetPlaceEnum.RIGHT);
    setDroppableTarget('');
  };

  return /*#__PURE__*/React.createElement("div", {
    className: classnames('rlb-col', // `w-[${widthNumber}%]`,
    className),
    ref: columnRef
  }, !disableChange ? /*#__PURE__*/React.createElement("div", {
    className: "".concat(isHoveredTargetClassNameSide(droppableTarget === "".concat(dndTargetKey, "-left"))),
    "target-droppable-item": "".concat(dndTargetKey, "-left"),
    onDragOver: disableDrag ? undefined : handleDragOver,
    onDragLeave: handleDragOverLeave,
    onDrop: handleDropToLeft
  }) : null, children, !disableChange ? /*#__PURE__*/React.createElement("div", {
    className: "".concat(isHoveredTargetClassNameSide(droppableTarget === "".concat(dndTargetKey, "-right"))),
    "target-droppable-item": "".concat(dndTargetKey, "-right"),
    onDragOver: handleDragOver,
    onDragLeave: handleDragOverLeave,
    onDrop: handleDropToRigth
  }) : null);
};

export { DroppableColumnContainer };
