import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import ActionButtons from "./ActionButtons";

// truyền prop là {post} từ component Dashboard sang
const SinglePost = ({ post: { _id, status, title, description, url } }) => {
  return (
    <Card
      className="shadow"
      border={
        status === "learned"
          ? "success"
          : status === "learning"
          ? "warning"
          : "danger"
      }
    >
      <Card.Body>
        <Card.Title>
          <Row>
            <Col>
              <p className="post-title">{title}</p>
              <Badge
                pill
                variant={
                  status === "learned"
                    ? "success"
                    : status === "learning"
                    ? "warning"
                    : "danger"
                }
              >
                {status}
                {/* thẻ Bagde còn lỗi bootstrap */}
              </Badge>
            </Col>

            <Col className="text-right">
              <ActionButtons url={url} _id={_id} />{" "}
              {/* truyền prop {url} và {_id} */}
            </Col>
          </Row>
        </Card.Title>

        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SinglePost;
