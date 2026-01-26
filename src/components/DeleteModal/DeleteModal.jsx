// import React, { useState } from "react";
// import { Modal, Button, Spinner } from "react-bootstrap";
// import { useGenericMutation } from "../../api/apiSlice";
// import { toast } from "react-toastify";

// const DeleteModal = ({
//   show,
//   onHide,
//   endpoint,
//   id,
//   label,
//   onDeleteSuccess,
// }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [deleteddocument] = useGenericMutation();

//   const handleDelete = async () => {
//     setIsLoading(true);
//     try {
//       await deleteddocument({
//         endpoint: `${endpoint}?object_id=${id}`,
//       }).unwrap();

//       toast.success(`${label} deleted successfully.`);
//       if (onDeleteSuccess) onDeleteSuccess();
//     } catch (error) {
//       toast.error(error?.data?.detail || "Delete failed");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Modal show={show} centered onHide={onHide} className="delete-modal">
//       <Modal.Header closeButton>
//         <Modal.Title>Delete Confirmation</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <p>Are you sure you want to delete this {label.toLowerCase()}?</p>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={onHide}>
//           Cancel
//         </Button>
//         <Button variant="danger" onClick={handleDelete}>
//           {!isLoading ? "Delete" : <Spinner animation="border" role="status" />}
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default DeleteModal;

import React from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { useGenericMutation } from "../../api/apiSlice";
import { toast } from "react-toastify";

const DeleteModal = ({
  show,
  onHide,
  endpoint,
  id,
  label,
  onDeleteSuccess,
}) => {
  const [deleteddocument, { isLoading }] = useGenericMutation();

  const handleDelete = async () => {
    try {
      await deleteddocument({
        endpoint: `${endpoint}?object_id=${id}`,
      }).unwrap();

      toast.success(`${label} deleted successfully.`);
      if (onDeleteSuccess) onDeleteSuccess();
    } catch (error) {
      toast.error(error?.data?.detail || "Delete failed");
    }
  };

  return (
    <Modal
      show={show}
      centered
      onHide={onHide}
      className="delete-modal"
      backdrop="static"
    >
      <Modal.Header closeButton={!isLoading}>
        <Modal.Title>Delete Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body >
       <p>Are you sure you want to delete this {label.toLowerCase()}?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={isLoading}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete} disabled={isLoading}>
          {isLoading ? (
            <Spinner animation="border" size="sm" role="status" />
          ) : (
            "Delete"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
