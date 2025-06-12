"use client";
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddItemModal = ({ show, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    images: [],
  });

  const [imagePreviews, setImagePreviews] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "images[]") {
      const newFiles = Array.from(files);
      const updatedImages = [...formData.images, ...newFiles];

      const uniqueImages = Array.from(
        new Map(updatedImages.map((file) => [file.name, file])).values()
      );

      setFormData((prev) => ({ ...prev, images: uniqueImages }));
      setImagePreviews(uniqueImages.map((file) => URL.createObjectURL(file)));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    setFormData((prev) => ({ ...prev, images: updatedImages }));
    setImagePreviews(updatedImages.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, price, description, images } = formData;

    if (!title || !price || !description || images.length === 0) {
      alert("Please fill all fields and upload at least one image.");
      return;
    }

    const data = new FormData();
    data.append("title", title);
    data.append("price", price);
    data.append("description", description);
    images.forEach((img) => data.append("images[]", img));

    alert("Item added!");

    setFormData({ title: "", price: "", description: "", images: [] });
    setImagePreviews([]);
    onClose();
  };

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      size="lg"
      dialogClassName="custom-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title className="fw-semibold fs-4">🛒 Add New Item</Modal.Title>
      </Modal.Header>

      <Modal.Body className="bg-white">
        <Form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="p-3"
        >
          <Form.Group className="mb-4">
            <Form.Label className="fw-medium">Item Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Wooden Study Table"
              className="rounded-3 shadow-sm"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-medium">Price (₹)</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g. 4999"
              className="rounded-3 shadow-sm"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-medium">Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief description about the item..."
              className="rounded-3 shadow-sm"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-medium">Upload Images</Form.Label>
            <Form.Control
              type="file"
              name="images[]"
              accept="image/*"
              multiple
              onChange={handleChange}
              className="rounded-3 shadow-sm"
            />
          </Form.Group>

          {imagePreviews.length > 0 && (
            <div className="d-flex flex-wrap gap-3 mt-3">
              {imagePreviews.map((src, idx) => (
                <div
                  key={idx}
                  className="position-relative"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "12px",
                    overflow: "hidden",
                    border: "1px solid #ddd",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                >
                  <img
                    src={src}
                    alt={`Preview ${idx + 1}`}
                    className="w-100 h-100 object-fit-cover"
                  />
                  <Button
                    variant="danger"
                    size="sm"
                    className="position-absolute top-0 end-0 translate-middle rounded-circle"
                    style={{
                      width: "22px",
                      height: "22px",
                      padding: 0,
                      fontSize: "14px",
                      lineHeight: "1",
                    }}
                    onClick={() => handleRemoveImage(idx)}
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          )}

          <div className="d-flex justify-content-end mt-4">
            <Button
              type="submit"
              style={{
                background: "#c12020",
                color: "#fff",
                border: "none",
              }}
              className="px-4 py-2 fw-medium rounded-pill"
            >
          Submit
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddItemModal;
