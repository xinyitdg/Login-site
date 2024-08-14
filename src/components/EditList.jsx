import { Modal } from "antd";

const EditList = ({ isOpen, title, body, handleOnChange, onSave, onCancel }) => {
  return (
    <Modal title="Edit List" open={isOpen} onOk={() => onSave()} onCancel={() => onCancel()} onClose={() => onCancel()}>
      <div className="form-group">
        <label htmlFor="title" className="form-label">
          Title:{" "}
        </label>
        <input id="title" name="title" type="text" className="form-input" value={title} onChange={(e) => handleOnChange("title", e)}></input>
      </div>

      <div className="form-group">
        <label htmlFor="body" className="form-label">
          Body:{" "}
        </label>
        <input id="body" name="body" type="text" className="form-input" value={body} onChange={(e) => handleOnChange("body", e)}></input>
      </div>
    </Modal>
  );
};

export default EditList;
