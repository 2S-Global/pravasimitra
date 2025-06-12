"use client";
import React from "react";
import { Modal, Button, Table } from "react-bootstrap";

const ContactModal = ({ show, onClose, contacts, itemName }) => {
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
          <Table striped bordered hover responsive className="mb-0">
            <thead className="table-primary">
              <tr>
                <th style={{ width: "5%" }}>#</th>
                <th style={{ width: "25%" }}>Name</th>
                <th style={{ width: "35%" }}>Email</th>
                <th style={{ width: "25%" }}>Phone</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
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
