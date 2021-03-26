import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { Modal, Button } from "react-bootstrap";
import { apiEndPoint } from "../config";
import "bootstrap/dist/css/bootstrap.css";

const Products = ({ productsData, loading }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = async (id) => {
    setShow(true);
    const data = await fetch(apiEndPoint + "products/" + id);
    const jsonData = await data.json();
    console.log(jsonData);
  };
  const handleEdit = (id) => {};

  if (loading) {
    return <h1>Loading ...</h1>;
  }
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <td>Name</td>
            <td>Price</td>
            <td>Discounted Price</td>
            <td>Image</td>
            <td>Description</td>
            <td>Edit</td>
            <td>Delete</td>
          </tr>
        </thead>
        <tbody>
          {productsData.map((product) => (
            <tr key={product.Id}>
              <td>{product.Name}</td>
              <td>{product.Price}</td>
              <td>{product.Discount}</td>
              <td>{product.Description.substring(0, 50)}</td>
              <td>
                <img src={product.ImagePath} height="100" width="100" />
              </td>
              <td>
                <img
                  onClick={() => handleShow(product.Id)}
                  className="Header-logo"
                  src="edit.png"
                  style={{ width: "30px", height: "30" }}
                  alt="LogoEdit"
                />
              </td>
              <td>
                <img
                  className="Header-logo"
                  src="delete.png"
                  style={{ width: "30px", height: "30" }}
                  alt="Logo"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Products;
