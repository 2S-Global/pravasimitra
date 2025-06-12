"use client";
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditItemModal = ({ show, onClose, itemData, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    images: [], // new images to upload
  });

  const [existingImages, setExistingImages] = useState([]); // URLs from server
  const [imagePreviews, setImagePreviews] = useState([]); // preview for new images

  useEffect(() => {
    if (itemData) {
      setFormData({
        title: itemData.title || "",
        price: itemData.price || "",
        description: itemData.description || "",
        images: [],
      });

      setExistingImages(itemData.images || []); // assume these are image URLs
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
      alert("Please fill all fields and have at least one image.");
      return;
    }

    const data = new FormData();
    data.append("title", title);
    data.append("price", price);
    data.append("description", description);
    data.append("existingImages", JSON.stringify(existingImages)); 

    images.forEach((img) => data.append("images[]", img));

    // Send to backend
    onSave(data);

    // Cleanup
    setFormData({ title: "", price: "", description: "", images: [] });
    setImagePreviews([]);
    setExistingImages([]);
    onClose();

  };

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter item title"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter item price"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter item description"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Upload New Images</Form.Label>
            <Form.Control
              type="file"
              name="images[]"
              accept="image/*"
              multiple
              onChange={handleChange}
            />
          </Form.Group>

          {/* Existing Image Previews */}
          {existingImages.length > 0 && (
            <div className="d-flex gap-2 mt-3 flex-wrap">
              {existingImages.map((src, idx) => (
                <div
                  key={idx}
                  style={{
                    position: "relative",
                    width: "100px",
                    height: "100px",
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                  }}
                >
                  <img
                    src={src}
                    alt={`Existing Preview ${idx + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "12px",
                    }}
                  />
                  <Button
                    variant="light"
                    size="sm"
                    style={{
                      position: "absolute",
                      top: "4px",
                      right: "4px",
                      borderRadius: "50%",
                      padding: "0px 5px",
                      lineHeight: "1",
                      fontSize: "14px",
                      color: "#dc3545",
                      backgroundColor: "#ffffff",
                      border: "1px solid #dee2e6",
                      boxShadow: "0 0 3px rgba(0,0,0,0.1)",
                    }}
                    onClick={() => handleRemoveImage(idx, true)}
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* New Image Previews */}
          {imagePreviews.length > 0 && (
            <div className="d-flex gap-2 mt-3 flex-wrap">
              {imagePreviews.map((src, idx) => (
                <div
                  key={idx}
                  style={{
                    position: "relative",
                    width: "100px",
                    height: "100px",
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                  }}
                >
                  <img
                    src={src}
                    alt={`Preview ${idx + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "12px",
                    }}
                  />
                  <Button
                    variant="light"
                    size="sm"
                    style={{
                      position: "absolute",
                      top: "4px",
                      right: "4px",
                      borderRadius: "50%",
                      padding: "0px 5px",
                      lineHeight: "1",
                      fontSize: "14px",
                      color: "#dc3545",
                      backgroundColor: "#ffffff",
                      border: "1px solid #dee2e6",
                      boxShadow: "0 0 3px rgba(0,0,0,0.1)",
                    }}
                    onClick={() => handleRemoveImage(idx, false)}
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          )}

          <Button type="submit" variant="primary" className="mt-4">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditItemModal;
