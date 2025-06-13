"use client";
import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";

const AddRoomModal = ({ show, onClose, itemData, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    propertyType: "",
    roomSize: "",
    images: [],
  });

  const [existingImages, setExistingImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    if (itemData) {
      setFormData({
        title: itemData.title || "",
        price: itemData.price || "",
        description: itemData.description || "",
        propertyType: itemData.propertyType || "",
        roomSize: itemData.roomSize || "",
        images: [],
      });
      setExistingImages(itemData.images || []);
      setImagePreviews([]);
    }
  }, [itemData]);

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

  const handleRemoveImage = (index, isExisting = false) => {
    if (isExisting) {
      const updated = [...existingImages];
      updated.splice(index, 1);
      setExistingImages(updated);
    } else {
      const updated = [...formData.images];
      updated.splice(index, 1);
      setFormData((prev) => ({ ...prev, images: updated }));
      setImagePreviews(updated.map((file) => URL.createObjectURL(file)));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, price, description, images } = formData;

    if (!title || !price || !description || (images.length === 0 && existingImages.length === 0)) {
      alert("Please fill all fields and provide at least one image.");
      return;
    }

    const data = new FormData();
    data.append("title", title);
    data.append("price", price);
    data.append("description", description);
    data.append("propertyType", formData.propertyType);
    data.append("roomSize", formData.roomSize);
    data.append("existingImages", JSON.stringify(existingImages));
    images.forEach((img) => data.append("images[]", img));

    onSave(data);

    setFormData({
      title: "",
      price: "",
      description: "",
      propertyType: "",
      roomSize: "",
      images: [],
    });
    setImagePreviews([]);
    setExistingImages([]);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="fw-semibold fs-4">
          🛠️ Add Property Details
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="bg-white">
        <Form onSubmit={handleSubmit} encType="multipart/form-data" className="p-3">
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Property Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. 2 BHK Apartment"
              className="rounded-3 shadow-sm"
            />
          </Form.Group>

          <Row className="mb-4">
            <Col md={4}>
              <Form.Group>
                <Form.Label className="fw-semibold">Property Type</Form.Label>
                <Form.Select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="rounded-3 shadow-sm"
                >
                  <option value="">Select</option>
                  <option value="Rent">Rent</option>
                  <option value="Lease">Lease</option>
                  <option value="Sell">Sell</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label className="fw-semibold">Room Size</Form.Label>
                <Form.Control
                  type="text"
                  name="roomSize"
                  value={formData.roomSize}
                  onChange={handleChange}
                  placeholder="e.g. 950 sq.ft"
                  className="rounded-3 shadow-sm"
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label className="fw-semibold">Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g. 4999"
                  className="rounded-3 shadow-sm"
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Description of the property..."
              className="rounded-3 shadow-sm"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Upload New Images</Form.Label>
            <Form.Control
              type="file"
              name="images[]"
              accept="image/*"
              multiple
              onChange={handleChange}
              className="rounded-3 shadow-sm"
            />
          </Form.Group>

          {existingImages.length > 0 && (
            <>
              <p className="fw-bold mt-3">Existing Images</p>
              <div className="d-flex flex-wrap gap-3">
                {existingImages.map((src, idx) => (
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
                      alt={`Existing ${idx + 1}`}
                      className="w-100 h-100 object-fit-cover"
                    />
                    <Button
                      variant="light"
                      size="sm"
                      className="position-absolute top-0 end-0 translate-middle rounded-circle"
                      style={{
                        width: "22px",
                        height: "22px",
                        padding: 0,
                        fontSize: "14px",
                      }}
                      onClick={() => handleRemoveImage(idx, true)}
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            </>
          )}

          {imagePreviews.length > 0 && (
            <>
              <p className="fw-bold mt-3">New Image Previews</p>
              <div className="d-flex flex-wrap gap-3">
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
                      }}
                      onClick={() => handleRemoveImage(idx)}
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            </>
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

export default AddRoomModal;
