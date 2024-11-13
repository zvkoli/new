import { useEffect, useState } from "react";
import CreateItemModal from "../module/modal/CreateItemModal";
import { Switch } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setWidthContainer } from "../../redux_toolkit/features/widthContainerSlice";
import { setHeightContainer } from "../../redux_toolkit/features/heightContainerSlice";
import { setItems } from "../../redux_toolkit/features/itemsSlice";
import { setEditEnabled } from "../../redux_toolkit/features/editEnabledSlice";
import { setBgColorContainer } from "../../redux_toolkit/features/bgColorContainerSlice";
import { setBgImageContainer } from "../../redux_toolkit/features/bgImageContainerSlice";
import { setDragDisabled } from "../../redux_toolkit/features/dragDisabledSlice";

const DragDropOption = () => {
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);

  const dispatch = useDispatch();
  const widthContainer = useSelector((state) => state.widthContainer);
  const heightContainer = useSelector((state) => state.heightContainer);
  const items = useSelector((state) => state.items);
  const editEnabled = useSelector((state) => state.editEnabled);
  const bgColorContainer = useSelector((state) => state.bgColorContainer);
  const bgImageContainer = useSelector((state) => state.bgImageContainer);
  const dragDisabled = useSelector((state) => state.dragDisabled);

  const handleResize = () => {
    const newWidth =
      parseInt(document.getElementById("widthInput").value) || 200;
    const newHeight =
      parseInt(document.getElementById("heightInput").value) || 200;

    dispatch(setWidthContainer(newWidth));
    dispatch(setHeightContainer(newHeight));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        dispatch(setBgImageContainer(reader.result));
      };

      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    dispatch(setItems([]));
    localStorage.removeItem("boxPositions");
  };

  return (
    <div className="w-full h-full flex flex-col items-start justify-start gap-4 font-Poppins border-2 border-gray-500 rounded-xl border-dashed p-5 max-sm:text-[0.90rem]">
      <div className="flex flex-col justify-center items-start gap-2">
        <label className="text-gray-500">
          Width & Height of large square :{" "}
        </label>
        <div className="flex flex-row justify-center items-center gap-2 max-xl:flex-col max-xl:items-start">
          <input
            id="widthInput"
            type="number"
            placeholder={`${heightContainer} (px)`}
            className="border p-2 rounded mr-2 outline-none"
          />
          <input
            id="heightInput"
            type="number"
            placeholder={`${widthContainer} (px)`}
            className="border p-2 rounded mr-2 outline-none"
          />
          <button
            onClick={handleResize}
            className="bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>

      <div className="flex flex-row justify-center items-center gap-2">
        <label className="text-gray-500">Select Background Color :</label>
        <input
          type="color"
          value={bgColorContainer}
          onChange={(e) => dispatch(setBgColorContainer(e.target.value))}
        />
      </div>

      <div className="flex flex-col justify-center items-start gap-2">
        <div className="flex flex-row justify-center items-center gap-2 max-xl:flex-col max-xl:items-start">
          <label className="text-gray-500">Select Background Image : </label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        {bgImageContainer && (
          <button
            onClick={() => dispatch(setBgImageContainer(null))}
            className="bg-blue-500 text-white py-2 px-4 rounded shadow"
          >
            Remove Background
          </button>
        )}
      </div>

      <div className="flex flex-row justify-center items-center">
        <button
          onClick={() => setIsOpenCreateModal(true)}
          className="bg-blue-500 text-white py-2 px-4 rounded shadow"
        >
          Create Item
        </button>
      </div>

      <div className="flex flex-row justify-center items-center gap-2">
        <p>Enable Edit : </p>
        <Switch
          checked={editEnabled}
          onChange={(checked) => dispatch(setEditEnabled(checked))}
          style={{
            backgroundColor: editEnabled ? "green" : "red",
          }}
        />
      </div>

      {items.length > 0 && (
        <button
          onClick={handleReset}
          className="bg-red-500 text-white py-2 px-4 rounded shadow hover:bg-red-600"
        >
          Delete all items
        </button>
      )}

      {items.length > 0 && (
        <button
          onClick={() => dispatch(setDragDisabled(!dragDisabled))}
          className={`shadow ${
            dragDisabled ? "bg-gray-500" : "bg-blue-500"
          } text-white py-2 px-4 rounded hover:bg-blue-600`}
        >
          {dragDisabled ? "Enable Dragging" : "Disable Dragging"}
        </button>
      )}

      <CreateItemModal
        isOpenCreateModal={isOpenCreateModal}
        setIsOpenCreateModal={setIsOpenCreateModal}
      />
    </div>
  );
};

export default DragDropOption;
