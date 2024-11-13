import Modal from "react-modal";
import { Formik, Form, Field } from "formik";
import { Slider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../../redux_toolkit/features/itemsSlice";

Modal.setAppElement("#root");

const EditItemModal = ({ isOpenEditModal, setIsOpenEditModal, item }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);

  const handleSave = (values) => {
    const updatedItems = items.map((i) =>
      i.position.x === item.position.x && i.position.y === item.position.y
        ? { ...i, ...values }
        : i
    );
    dispatch(setItems(updatedItems));
    setIsOpenEditModal(false);
  };

  return (
    <Modal
      isOpen={isOpenEditModal}
      onRequestClose={() => setIsOpenEditModal(false)}
      contentLabel="Edit Item"
      className="modal fixed inset-0 flex items-center justify-center p-4"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      style={{
        overlay: {
          zIndex: 1000,
        },
      }}
    >
      <div
        style={{ direction: "ltr" }}
        className="h-auto w-auto flex flex-col justify-center items-center p-10 px-20 bg-white rounded-md font-mono max-sm:w-full max-sm:px-10"
      >
        <h2 className="text-lg mb-4">Edit Item</h2>
        <Formik
          initialValues={{
            backgroundImage: item?.backgroundImage || "",
            width: item?.width || 60,
            height: item?.height || 60,
            opacity: item?.opacity,
            rounded: item?.rounded,
          }}
          onSubmit={(values) => handleSave(values)}
        >
          {({ values, handleChange, setFieldValue }) => (
            <Form className="flex flex-col gap-4 w-full">
              <label htmlFor="backgroundImage">Background photo : </label>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  const file = event.currentTarget.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () =>
                      setFieldValue("backgroundImage", reader.result);
                    reader.readAsDataURL(file);
                  }
                }}
              />

              <label className="text-sm">
                Width :
                <Field
                  name="width"
                  type="number"
                  placeholder="Enter width"
                  className="border border-gray-300 p-2 rounded w-full mt-1 outline-none"
                  value={values.width}
                  onChange={handleChange}
                />
              </label>
              <label className="text-sm">
                Height :
                <Field
                  name="height"
                  type="number"
                  placeholder="Enter height"
                  className="border border-gray-300 p-2 rounded w-full mt-1 outline-none"
                  value={values.height}
                  onChange={handleChange}
                />
              </label>

              <label className="text-sm">
                Opacity :
                <Slider
                  min={0}
                  max={1}
                  step={0.01}
                  value={values.opacity}
                  onChange={(value) => setFieldValue("opacity", value)}
                />
              </label>

              <label className="text-sm">
                Border Radius :
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  value={(values.rounded / 40) * 100}
                  onChange={(value) => {
                    const roundedValue = Math.floor((value / 100) * 40);
                    setFieldValue("rounded", roundedValue);
                  }}
                />
              </label>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpenEditModal(false)}
                  className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default EditItemModal;
