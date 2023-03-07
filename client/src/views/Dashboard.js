import React from "react";
import { PostContext } from "../contexts/PostContext";
import { useContext, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { AuthContext } from "../contexts/AuthContext";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SinglePost from "../components/posts/SinglePost";
import AddPostModal from "../components/posts/AddPostModal";
import addIcon from "../assets/plus-circle-fill.svg";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Toast from "react-bootstrap/Toast";
import UpdatePostModal from "../components/posts/UpdatePostModal";

const Dashboard = () => {
  // Context auth
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);

  // Context post
  const {
    postState: { post, posts, postsLoading },
    getPosts,
    setShowAddPostModal,
    showToast: { show, message, type },
    setShowToast,
  } = useContext(PostContext);

  // Start: Get all posts
  useEffect(() => {
    const gettingPosts = async () => {
      getPosts();
    };
    gettingPosts();
  }, []);

  let body = null;

  if (postsLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (posts.length === 0) {
    // Nếu user k có bài post nào
    body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1">Hi {username}</Card.Header>
          <Card.Body>
            <Card.Title>Welcome to LearnIt</Card.Title>
            <Card.Text>
              Click the button below to track your first skill to learn
            </Card.Text>
            <Button
              variant="primary"
              onClick={setShowAddPostModal.bind(this, true)}
            >
              LearnIt
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    body = (
      <>
        {/* mặc định 1 cột
            nếu kích cỡ từ medium -> 3 cột
            khoảng cách giữa cột, dòng: g-4
            căn giữa: mx-auto
            margintop: mt-3 */}
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
          {posts.map((post) => (
            <Col key={post._id} className="my-2">
              <SinglePost post={post} />
              {/* SinglePost có prop là {post} */}
            </Col>
          ))}
        </Row>

        {/* Open Add Post Modal */}
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip>Add a new thing to learn</Tooltip>}
        >
          {/* button cho phép mở add post modal */}
          <Button
            className="btn-floating"
            onClick={setShowAddPostModal.bind(this, true)}
          >
            <img src={addIcon} alt="add-post" width="60" height="60"></img>
          </Button>
        </OverlayTrigger>
      </>
    );
  }

  // return
  return (
    <>
      {body}
      <AddPostModal />

      {/* nếu không chọn post nào thì không hiện modal update */}
      {post !== null && <UpdatePostModal />}

      {/* After post is added, show toast */}
      <Toast
        show={show}
        style={{ position: "fixed", top: "13%", right: "8px" }}
        className={`bg-${type} text-white`}
        // khi đóng toast, reset toast về state ban đầu
        onClose={setShowToast.bind(this, {
          show: false,
          message: "",
          type: null,
        })}
        // chỉ hiện thị 3s
        delay={3000}
        autohide
      >
        <Toast.Body>
          <strong>{message}</strong>
        </Toast.Body>
      </Toast>
    </>
  );
};

export default Dashboard;
