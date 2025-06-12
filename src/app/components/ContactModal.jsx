"use client";
import React from "react";
import { Modal, Button, Table, Image } from "react-bootstrap";

const ContactModal = ({ show, onClose, contacts, itemName }) => {
  const defaultImage =
    "https://t4.ftcdn.net/jpg/02/14/74/61/360_F_214746128_31JkeaP6rU0NzzzdFC4khGkmqc8noe6h.jpg";

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          <span className="fw-bold text-primary">
            Contacted Users for "{itemName}"
          </span>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
        {contacts.length > 0 ? (
          <Table striped bordered hover responsive className="mb-0 align-middle">
            <thead className="table-primary">
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <Image
                      src={contact.image || defaultImage}
                      alt={contact.name}
                      roundedCircle
                      width={90}
                      height={100}
                      style={{ objectFit: "cover" }}
                    />
                  </td>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phone}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p className="text-muted">No contacts found for this item.</p>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ContactModal;
