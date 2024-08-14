import { Modal } from "antd";

const EditList = ({ isOpen, title, body, handleOnChange, onSave, onCancel }) => {
  return (
    <Modal className="form-modal" title="Edit List" open={isOpen} onOk={() => onSave()} onCancel={() => onCancel()} onClose={() => onCancel()}>
      <div className="form-group">
        <label htmlFor="title" className="form-label">
          Title:{" "}
        </label>
        <textarea id="title" name="title" type="text" className="form-title" value={title} onChange={(e) => handleOnChange("title", e)}></textarea>
      </div>

      <div className="form-group">
        <label htmlFor="body" className="form-label">
          Body:{" "}
        </label>
        <textarea id="body" name="body" type="text" className="form-body" value={body} onChange={(e) => handleOnChange("body", e)}></textarea>
      </div> 
    </Modal>
  );
};

export default EditList;
