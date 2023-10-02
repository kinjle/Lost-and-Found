import axios from "axios";
import "./feedNavbar.css";
import { Card, Button, Modal } from "react-bootstrap";
import Row from "react-bootstrap/Row";

import { useState, useEffect } from "react";
import { useAuthHeader } from "react-auth-kit";

export default function MainFeed() {
    const [itemId, setItemId] = useState();
  const [items, setItems] = useState([]);
  const [securityQues, setsecurityQues] = useState("");
  const [answer, setanswer] = useState("");
  const [show, setShow] = useState(false);
  const [username, setUserName] = useState("")
  const authHeader = useAuthHeader();

  const handleSubmitResponse = () => {
    axios({
      url: `http://localhost:3000/lostitemform/claim/${itemId}`,
      method: "PUT",
      headers: {
        Authorization: authHeader(),
      },  
      data: {
        answer: answer,
      },
    })
      .then((res) => {
        setsecurityQues(res.data.securityQues);
        setanswer(res.data.answer);
        window.location.reload();
      })
      .catch((e) => console.log(e.message));
    setShow(false);
  };
  
  const onClaimClick = (
    e,
    itemId,
    securityQues
  ) => {
    e.preventDefault();
    setItemId(itemId)
    setsecurityQues(securityQues);
    setShow(true);
  };

  useEffect(() => {
    axios({
      url: "http://localhost:3000/lostitemform",
      method: "GET",
      headers: {
        Authorization: authHeader(),
      },
    })
      .then((res) => {
        setItems(res.data.items);
      })
      .catch((e) => console.log(e.message));
  }, []);

  useEffect(() => {
    axios({
      url: "http://localhost:3000/user/details",
      method: "GET",
      headers: {
        Authorization: authHeader(),
      },
    })
      .then((res) => {
        console.log(res.data)
        setUserName(res.data.fullname)
        // setItems(res.data.items);
      })
      .catch((e) => console.log(e.message));
  }, [])
  
  const handleClose = () => {
    setShow(false)
  }

  return (
    <>
      <nav className="feedNavbar">
        <h1>Lost and Found</h1>

        <div className="links">
          <a id="postItemButton" href="/lostitemform">
            <button
              style={{
                color: "white",
                backgroundColor: "#f1356d",
                marginRight: "20px",
              }}
            >
              Post Item
            </button>
          </a>

          <a id="allPostsButton" href="/feed">
            <button
              style={{
                color: "white",
                marginRight: "20px",
                color: "black",
              }}
            >
              My Posts
            </button>
          </a>

          <a id="claimedItemsButton" href="/claimeditems">
            <button
              style={{
                color: "white",
                marginRight: "20px",
                color: "black",
              }}
            >
              Claimed Items
            </button>
          </a>

          <a id="signOutButton" href="/">
            <button
              style={{
                color: "black",
                marginRight: "20px",
              }}
            >
              Sign Out
            </button>
          </a>
        </div>
      </nav>

      <div>
        <Row>
          <h2 style={{ marginTop: "15px", marginLeft: "25px" }}>Hello {username}</h2>
          <h2 style={{ marginTop: "15px", marginLeft: "25px" }}>Found Items</h2>

          {items &&
            items.filter(item => !item.isClaimed).map((item) => (
              <Card
                style={{
                  width: "18rem",
                  marginLeft: "25px",
                  marginTop: "20px",
                }}
                key={item._id}
              >
                <Card.Img variant="top" src={item.itemImage} />

                <Card.Body>
                  <Card.Title>{item.itemName}</Card.Title>
                  <Card.Text>{item.itemDescription}</Card.Text>

                  <a href={`/lostitemform?edit=true&id=${item._id}`}>
                    <Button
                      variant="primary"
                      className="updateButton"
                      onClick={(e) => {
                        onClaimClick(
                          e,
                          item._id,
                         item.securityQues
                        );
                        // setUpdateId(item._id);
                      }}
                      style={{
                        color: "#f1356d",
                        backgroundColor: "white",
                      }}
                    >
                      Claim {" "}
                    </Button>
                  </a>
                </Card.Body>
              </Card>
            ))}
        </Row>
      </div>

      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Please answer the security question to place your claim</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <div>
                Security Question <br />
                {securityQues}
                <br /> <br />
            </div>

            <div>
              Your response <br />
              <input
                type="text"
                onChange={(e) => setanswer(e.target.value)}
              />{" "}
              <br /> <br />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleSubmitResponse}>
              Submit Answer
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
