import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useState, useEffect } from "react";
import { PostContext } from "../../contexts/PostContext";

const UpdatePostModal = () => {
  // Context posts
  const {
    postState: { post },
    showUpdatePostModal,
    setShowUpdatePostModal,
    updatePost,
    setShowToast,
  } = useContext(PostContext);

  // State
  const [updatedPost, setUpdatedPost] = useState(post);

  // use effect: thay đổi state của updatedPost khi người dùng update xong

  useEffect(() => {
    const setAfterUpdatedPost = async () => {
      setUpdatedPost(post);
    };

    // khi người dùng chọn chỉnh sửa post khác
    setAfterUpdatedPost();
  }, [post]);

  const { title, description, url, status } = updatedPost;

  // function onchange new pots form
  const onChangeUpdatedPostForm = (event) => {
    setUpdatedPost({
      ...updatedPost,
      [event.target.name]: event.target.value,
    });
  };

  //function closeDialog
  const closeDialog = () => {
    setUpdatedPost(post); // nếu có chỉnh sửa nhưng k submit, khi thoát ra sẽ reset về post ban đầu
    setShowUpdatePostModal(false);
  };

  // function submit tạo post mới
  const onSubmit = async (event) => {
    event.preventDefault();

    const { success, message } = await updatePost(updatedPost);

    setShowUpdatePostModal(false);

    // hiện thông báo
    setShowToast({ show: true, message, type: success ? "success" : "danger" });
  };

  return (
    <Modal show={showUpdatePostModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Making progress?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              required
              aria-describedby="title-help"
              value={title}
              onChange={onChangeUpdatedPostForm}
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Description"
              name="description"
              value={description}
              onChange={onChangeUpdatedPostForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Youtube Tutorial URL"
              name="url"
              value={url}
              onChange={onChangeUpdatedPostForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="select"
              name="status"
              value={status}
              onChange={onChangeUpdatedPostForm}
            >
              <option value="to learn">To learn</option>
              <option value="learning">Learning</option>
              <option value="learned">Learned</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            LearnIt!
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdatePostModal;
