import { Row } from "react-bootstrap";

const ConfirmDelete = ({ handleDelete, selectedFalse }) => {
  return (
    <>
      <p>Are you sure you want to delete?</p>
      <Row className="buttons-row">
        <button type="button" onClick={selectedFalse}>
          Cancel
        </button>
        <button type="button" onClick={handleDelete}>
          Yes
        </button>
      </Row>
    </>
  );
};

export default ConfirmDelete;
