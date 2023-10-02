import axios from "axios";
import "./feedNavbar.css";
import { Card, Button, Modal } from "react-bootstrap";
import Row from "react-bootstrap/Row";

import { useState, useEffect } from "react";
import { useAuthHeader } from "react-auth-kit";

export default function ClaimedItems() {
  const [itemId, setItemId] = useState();
  const [items, setItems] = useState([]);
  const [securityQues, setsecurityQues] = useState("");
  const [answer, setanswer] = useState("");
  const [show, setShow] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [numberShow, setNumberShow] = useState(false);

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

  const onClaimClick = (e, itemId, securityQues) => {
    e.preventDefault();
    setItemId(itemId);
    setsecurityQues(securityQues);
    setShow(true);
  }; 

  useEffect(() => {
    axios({
      url: "http://localhost:3000/lostitemform/myclaim",
      method: "GET",
      headers: {
        Authorization: authHeader(),
      },
    })
      .then((res) => {
        console.log(res.data.items);
        setItems(res.data.items);
      })
      .catch((e) => console.log(e.message));
  }, []);

  const handleClose = () => {
    setShow(false);
  };

  const handleSeeNumberClose = () => {
    setNumberShow(false);
  };


  const seeUserNumber = (fullname, phonenum) => {
    setFullName(fullname)
    setPhoneNumber(phonenum)
    setNumberShow(true)
    // axios({
    //   url: `http://localhost:3000/lostitemform/myclaim/${itemId}`,
    //   method: "GET",
    //   headers: {
    //     Authorization: authHeader(),
    //   },
    // })
    //   .then((res) => {
    //     const { fullName, phoneNumber } = res.data;
    //     setFullName(fullName);
    //     setPhoneNumber(phoneNumber);
    //   })
    //   .catch((e) => console.log(e.message));
    // setShow(false);
  };

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
          <h2 style={{ marginTop: "15px", marginLeft: "25px" }}>Found Items</h2>

          {items &&
            items
              .filter((item) => item.isClaimed || item.isVerified || item.isRejected)
              .map((item) => (
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
                    <Card.Title>
                      <strong>{item.itemName}</strong>
                    </Card.Title>{" "}
                    <br />
                    <Card.Text>
                      <strong>Item Description: </strong>
                      {item.itemDescription}
                    </Card.Text>
                    <Card.Text>
                      <strong>Security Question: </strong> {item.securityQues}
                    </Card.Text>
                    <Card.Text>
                      <strong>Your response: </strong>
                      {item.answer}
                    </Card.Text>{" "}
                    <br />
                    <Card.Text>
                      <strong>Claim Status: </strong>
                      {!item.isVerified ? (
                        "Pending"
                      ) : item.isVerified && !item.isRejected ? (
                        <button onClick={() => seeUserNumber(item.author.fullname, item.author.phoneNumber)}>Claim Accepted</button>
                      ) : item.isVerified && item.isRejected ? (
                        "Your claim has been rejected."
                      ) : (
                        "default text"
                      )}
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))}
        </Row>
      </div>

      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>CLAIM STATUS</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <strong>Security Question</strong> <br />
              {securityQues}
              <br /> <br />
            </div>

            <div>
              <strong>Your response</strong>
              <br />
              {answer}
              <br /> <br />
            </div>

            <div>
              <strong>Claim Status</strong>
              <br />
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



      <div>
        <Modal show={numberShow} onHide={handleSeeNumberClose}>
          <Modal.Header closeButton>
            <Modal.Title>Claim Accepted!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              Congratulations! Your claim has been accepted by {fullName}. Their contact number is <strong>{phoneNumber}</strong> . <br />
              <br /> <br />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick= {handleSeeNumberClose}>
              Ok
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
