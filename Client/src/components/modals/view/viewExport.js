import React from 'react'
import Modal from "react-bootstrap/Modal";

export default function viewExport(props) {
  const {result} = props
  return (
    <div>
<Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {modalTitle}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className="row">
          <table className="table table-hover ">
            <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">employeeId</th>
                <th scope="col">totalPrice</th>
                <th scope="col">time</th>
                <th scope="col">action</th>
              </tr>
            </thead>
            <tbody>
              {postList &&
                postList.map((result) => (
                  <tr key={result.id}>
                    <td>{result.id}</td>
                    <td>{result.employeeId}</td>
                    <td>{result.totalPrice}</td>
                    <td>{result.time}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Modal.Body>
      </Modal>
      
    </div>
  )
}


