import React, { useEffect, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Popover } from "antd";
import EditItemModal from "../module/modal/EditItemModal";
import { IoMdSettings } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../redux_toolkit/features/itemsSlice";

const ItemType = {
  BOX: "box",
};

const DraggableBox = ({
  position,
  index,
  onDrop,
  isDragDisabled,
  title,
  backgroundImage,
  width,
  height,
  onClick,
  opacity,
  rounded,
  onChangeTitle,
  isEditEnabled,
}) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemType.BOX,
      item: { index },
      canDrag: !isDragDisabled,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [isDragDisabled]
  );

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const [isPopoverVisible, setIsPopoverVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsPopoverVisible(true);
  };

  const handleMouseLeave = () => {
    setIsPopoverVisible(false);
  };

  const handleDoubleClickTitle = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onChangeTitle(index, newTitle);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      onChangeTitle(index, newTitle);
    }
  };

  return (
    <div
      ref={drag}
      onClick={() => {
        window.open("https://behinstart.ir/en/", "_blank");
      }}
      className="absolute flex flex-row justify-center items-center shadow cursor-move text-white break-all p-0 text-[0.80rem] z-0"
      style={{
        background: backgroundImage
          ? `url(${backgroundImage})`
          : "rgba(59, 130, 246, 0.5)",
        width: `${width}px`,
        height: `${height}px`,
        left: position.x,
        top: position.y,
        background: `rgba(59, 130, 246, ${opacity})`,
        borderRadius: `${rounded}px`,
      }}
    >
      {backgroundImage && (
        <div
          className="absolute inset-0"
          style={{
            background: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            opacity: opacity,
            zIndex: -1,
            borderRadius: `${rounded}px`,
          }}
        />
      )}
      <Popover
        content={title}
        open={isPopoverVisible}
        placement="top"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isEditing ? (
          <input
            type="text"
            value={newTitle}
            onChange={handleTitleChange}
            onBlur={handleBlur}
            onKeyPress={handleKeyPress}
            className="text-black outline-none rounded-md border-2 border-blue-500 p-1"
            autoFocus
          />
        ) : (
          <p
            onClick={(e) => {
              e.stopPropagation();
              handleDoubleClickTitle();
            }}
            className="!opacity-100 z-10 text-black text-center w-full h-auto overflow-hidden text-ellipsis"
          >
            {title.length > 13 ? `${title.substring(0, 13)}...` : title}
          </p>
        )}
      </Popover>

      {isEditEnabled && (
        <IoMdSettings
          className="absolute -bottom-1 -left-1 cursor-pointer text-black bg-gray-100 rounded-full shadow p-1"
          size={24}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        />
      )}
    </div>
  );
};

const DropBox = ({
  width,
  height,
  onDrop,
  backgroundColor,
  backgroundImage,
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemType.BOX,
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      const left = Math.round(monitor.getInitialClientOffset().x + delta.x);
      const top = Math.round(monitor.getInitialClientOffset().y + delta.y);
      onDrop(item.index, { x: left - 25, y: top - 25 });
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: backgroundColor || (isOver ? "#f3f4f6" : "#ffffff"),
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
      }}
      className="relative flex items-center justify-center rounded-xl shadow bg-cover"
    />
  );
};

const DragDrop = () => {
  const dispatch = useDispatch();
  const widthContainer = useSelector((state) => state.widthContainer);
  const heightContainer = useSelector((state) => state.heightContainer);
  const bgColorContainer = useSelector((state) => state.bgColorContainer);
  const bgImageContainer = useSelector((state) => state.bgImageContainer);
  const items = useSelector((state) => state.items);
  const editEnabled = useSelector((state) => state.editEnabled);
  const dragDisabled = useSelector((state) => state.dragDisabled);

  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const savedPositions = JSON.parse(localStorage.getItem("boxPositions"));

    if (savedPositions) {
      dispatch(setItems(savedPositions));
      //   setItems((prev) =>
      //     prev.map((item, index) => ({
      //       ...item,
      //       position: savedPositions[index]?.position || item.position,
      //     }))
      //   );
    }
  }, []);

  const handleDrop = (index, newPosition) => {
    dispatch((dispatch, getState) => {
      const { items } = getState();

      const updatedPositions = items.map((item, i) =>
        i === index ? { ...item, position: newPosition } : item
      );

      dispatch(setItems(updatedPositions));
      localStorage.setItem("boxPositions", JSON.stringify(updatedPositions));
    });
  };

  const handleOpenEditModal = (index) => {
    setSelectedItem(items[index]);
    setIsOpenEditModal(true);
  };

  const handleTitleChange = (index, newTitle) => {
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, title: newTitle } : item
      )
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-full w-full flex flex-col gap-10 justify-center items-center font-Poppins">
        <DropBox
          width={widthContainer}
          height={heightContainer}
          onDrop={handleDrop}
          backgroundColor={bgColorContainer}
          backgroundImage={bgImageContainer}
        />

        {items.map((item, index) => (
          <DraggableBox
            key={index}
            title={item.title}
            backgroundImage={item.backgroundImage}
            position={item.position}
            width={item.width}
            height={item.height}
            index={index}
            onDrop={handleDrop}
            isDragDisabled={dragDisabled}
            onClick={() => handleOpenEditModal(index)}
            opacity={item.opacity}
            rounded={item.rounded}
            onChangeTitle={handleTitleChange}
            isEditEnabled={editEnabled}
          />
        ))}
        <EditItemModal
          isOpenEditModal={isOpenEditModal}
          setIsOpenEditModal={setIsOpenEditModal}
          item={selectedItem}
        />
      </div>
    </DndProvider>
  );
};

export default DragDrop;
