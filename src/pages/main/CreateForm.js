import React from "react";
import DragDrop from "../../components/template/DragDrop";
import DragDropOption from "../../components/template/DragDropOption";

const CreateForm = () => {
  return (
    <div className="h-full w-full flex flex-row justify-center items-center max-lg:h-auto max-lg:flex-col max-lg:justify-start">
      <div className="w-1/2 h-full max-lg:p-10">
        <DragDrop />
      </div>
      <div className="w-1/2 h-full p-10 max-lg:w-8/12 max-md:w-10/12 max-sm:w-full max-sm:p-5">
        <DragDropOption />
      </div>
    </div>
  );
};

export default CreateForm;
