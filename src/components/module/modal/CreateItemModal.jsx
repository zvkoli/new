import Modal from "react-modal";
import { Formik, Form, Field } from "formik";
import { setItems } from "../../../redux_toolkit/features/itemsSlice";
import { useDispatch, useSelector } from "react-redux";

Modal.setAppElement("#root");

const CreateItemModal = ({ isOpenCreateModal, setIsOpenCreateModal }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);

  const initialValues = {
    title: "",
    backgroundImage: "",
    width: 80,
    height: 80,
  };

  const validateForm = (values) => {
    const errors = {};

    if (!values.title) {
      errors.title = "The title is required";
    }

    if (!values.width) {
      errors.width = "Width is required";
    } else if (values.width <= 0) {
      errors.width = "Width must be greater than 0";
    }

    if (!values.height) {
      errors.height = "Height is required";
    } else if (values.height <= 0) {
      errors.height = "Height must be greater than 0";
    }

    return errors;
  };

  // const handleSubmit = (values) => {
  //   dispatch(
  //     setItems((prevItems) => [
  //       ...prevItems,
  //       {
  //         title: values.title,
  //         backgroundImage: values.backgroundImage,
  //         width: values.width,
  //         height: values.height,
  //         position: { x: 0, y: 0 },
  //         opacity: 1,
  //         rounded: 0,
  //       },
  //     ])
  //   );

  //   setIsOpenCreateModal(false);
  // };

  const handleSubmit = (values) => {
    dispatch(
      setItems([
        ...items,
        {
          title: values.title,
          backgroundImage: values.backgroundImage,
          width: values.width,
          height: values.height,
          position: { x: 0, y: 0 },
          opacity: 1,
          rounded: 0,
        },
      ])
    );

    setIsOpenCreateModal(false);
  };  

  return (
    <Modal
      isOpen={isOpenCreateModal}
      onRequestClose={() => setIsOpenCreateModal(false)}
      contentLabel="Station Information"
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
        <h2 className="text-lg mb-4">Create New Item</h2>
        <Formik
          initialValues={initialValues}
          validate={validateForm}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, errors }) => (
            <Form className="w-full flex flex-col gap-4">
              <div>
                <label htmlFor="title">Title : </label>
                <Field
                  type="text"
                  name="title"
                  className="border p-2 rounded w-full outline-none"
                />
                {errors.title && (
                  <div className="text-red-500">{errors.title}</div>
                )}
              </div>

              <div>
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
                {errors.backgroundImage && (
                  <div className="text-red-500">{errors.backgroundImage}</div>
                )}
              </div>

              <div>
                <label htmlFor="width">Width : </label>
                <Field
                  type="number"
                  name="width"
                  className="border p-2 rounded w-full outline-none"
                />
                {errors.width && (
                  <div className="text-red-500">{errors.width}</div>
                )}
              </div>

              <div>
                <label htmlFor="height">Height : </label>
                <Field
                  type="number"
                  name="height"
                  className="border p-2 rounded w-full outline-none"
                />
                {errors.height && (
                  <div className="text-red-500">{errors.height}</div>
                )}
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpenCreateModal(false)}
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

export default CreateItemModal;
