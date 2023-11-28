import axios from "axios";
// import "./feedNavbar.css";
import { Card, Button, Modal, ModalFooter } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useState, useEffect } from "react";
import { useAuthHeader } from "react-auth-kit";
import NavBar from "./components/NavBar";

export default function Feed() {
  const [itemId, setItemId] = useState();
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemStatus, setItemStatus] = useState("");
  const [securityQues, setsecurityQues] = useState("");
  const [answer, setanswer] = useState("");
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateID, setUpdateId] = useState(null);
  const [deleteID, setDeleteId] = useState(null);
  const [showSeeClaimButton, setshowSeeClaimButton] = useState(false);
  const [showSeeClaimButtonAccept, setshowSeeClaimButtonAccept] =
    useState(false);

  const handleClose = () => setShow(false);
  const handleUpdateClose = () => setShowUpdate(false);
  const handleDeleteClose = () => setShowDelete(false);

  const authHeader = useAuthHeader();

  const handleAcceptClaim = () => {
    axios({
      url: `http://localhost:3000/lostitemform/acceptclaim/${itemId}`,
      method: "PUT",
      headers: {
        Authorization: authHeader(),
      },
      data: {
        isVerified: true,
      },
    })
      .then((res) => {
        setsecurityQues(res.data.securityQues);
        setanswer(res.data.answer);
        setshowSeeClaimButtonAccept(false);
        toast("Approval message sent", { type: "success" });
        window.location.reload();
      })
      .catch((e) => console.log(e.message));
    setShow(false);
  };

  const handleRejectClaim = () => {
    axios({
      url: `http://localhost:3000/lostitemform/rejectclaim/${itemId}`,
      method: "PUT",
      headers: {
        Authorization: authHeader(),
      },
      data: {},
    })
      .then((res) => {
        setsecurityQues(res.data.securityQues);
        setanswer(res.data.answer);
        setshowSeeClaimButton(false);
        toast("Rejection message sent", { type: "info" });
        window.location.reload();
      })
      .catch((e) => console.log(e.message));
    setShow(false);
  };

  const update_item = () => {
    axios({
      url: `http://localhost:3000/lostitemform/${updateID}`,
      method: "PUT",
      headers: {
        Authorization: authHeader(),
      },
      data: {
        itemName: itemName,
        itemDescription: itemDescription,
        itemStatus: itemStatus,
        securityQues: securityQues,
      },
    })
      .then((res) => {
        setItemName(res.data.itemName);
        setItemDescription(res.data.itemDescription);
        setItemStatus(res.data.itemStatus);
        setsecurityQues(res.data.securityQues);
        window.location.reload();
      })
      .catch((e) => console.log(e.message));
    setShowUpdate(false);
  };

  const delete_item = () => {
    axios({
      url: `http://localhost:3000/lostitemform/${deleteID}`,
      method: "DELETE",
      headers: {
        Authorization: authHeader(),
      },
    })
      .then((res) => {
        console.log("item deleted");
        window.location.reload();
      })
      .catch((e) => console.log(e.message));
    setShowDelete(true);
  };

  const onUpdateClick = (
    e,
    itemName,
    itemDescription,
    itemStatus,
    securityQues
  ) => {
    e.preventDefault();
    setItemName(itemName);
    setItemDescription(itemDescription);
    setItemStatus(itemStatus);
    setsecurityQues(securityQues);
    setShowUpdate(true);
  };

  const onSeeClaimClick = (e, itemId, securityQues, answer) => {
    e.preventDefault();
    setItemId(itemId);
    setsecurityQues(securityQues);
    setanswer(answer);
    setShow(true);
  };

  useEffect(() => {
    axios({
      url: "http://localhost:3000/lostitemform/user",
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

  return (
    <>
      <NavBar />

      <div>
        <Row>
          <h2 style={{ marginTop: "15px", marginLeft: "25px" }}>Found Items</h2>

          {items &&
            items.map((item) => (
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
                  <Card.Text>{item.itemStatus}</Card.Text>
                  <Card.Text>{item.securityQues}</Card.Text>

                  <a href={`/lostitemform?edit=true&id=${item._id}`}>
                    <Button
                      variant="primary"
                      className="updateButton"
                      onClick={(e) => {
                        onUpdateClick(
                          e,
                          item.itemName,
                          item.itemDescription,
                          item.itemStatus,
                          item.securityQues
                        );
                        setUpdateId(item._id);
                        setShowUpdate(true);
                      }}
                      style={{
                        color: "#f1356d",
                        backgroundColor: "white",
                        marginLeft: "20px",
                        marginRight: "20px",
                      }}
                    >
                      Update{" "}
                    </Button>
                  </a>

                  <Button
                    variant="primary"
                    className="deleteButton"
                    onClick={(e) => {
                      setDeleteId(item._id);
                      setShowDelete(true);
                    }}
                    style={{
                      color: "#f1356d",
                      backgroundColor: "white",
                    }}
                  >
                    Delete{" "}
                  </Button>

                  {item.isClaimed && !item.isVerified ? (
                    <>
                      <Button
                        className="seeClaimButton"
                        onClick={(e) => {
                          onSeeClaimClick(
                            e,
                            item._id,
                            item.securityQues,
                            item.answer
                          );
                        }}
                        style={{
                          backgroundColor: "white",
                          marginTop: "20px",
                          marginLeft: "60px",
                          color: "black",
                        }}
                      >
                        See Claim
                      </Button>
                    </>
                  ) : (
                    ""
                  )}
                </Card.Body>
              </Card>
            ))}
        </Row>
      </div>

      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Claim Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div>
                <strong>Security Question </strong>
                <br />
                {securityQues}
                <br /> <br />
              </div>

              <div>
                <strong>Response</strong> <br />
                {answer}
                <br /> <br />
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleRejectClaim}>
              Reject Claim
            </Button>
            <Button variant="primary" onClick={handleAcceptClaim}>
              Accept Claim
            </Button>
          </Modal.Footer>
        </Modal>
        <ToastContainer />
        <ToastContainer />
      </div>

      <div>
        <Modal show={showUpdate} onHide={handleUpdateClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Item Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div>
                Updated Name <br />
                <input
                  type="text"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                />{" "}
                <br /> <br />
              </div>

              <div>
                Updated Description <br />
                <input
                  type="text"
                  value={itemDescription}
                  onChange={(e) => setItemDescription(e.target.value)}
                />{" "}
                <br /> <br />
              </div>

              <div>
                Updated Status <br />
                <input
                  type="text"
                  value={itemStatus}
                  onChange={(e) => setItemStatus(e.target.value)}
                />{" "}
                <br /> <br />
              </div>

              <div>
                Updated Question <br />
                <input
                  type="text"
                  value={securityQues}
                  onChange={(e) => setsecurityQues(e.target.value)}
                />{" "}
                <br /> <br />
              </div>
            </div>
          </Modal.Body>

          <ModalFooter>
            <Button variant="secondary" onClick={handleUpdateClose}>
              No
            </Button>
            <Button variant="primary" onClick={() => update_item()}>
              Save Changes
            </Button>
          </ModalFooter>
        </Modal>
      </div>

      <div>
        <Modal show={showDelete} onHide={handleClose} backdrop="static">
          <Modal.Body>
            <p>Are you sure ? </p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" onClick={handleDeleteClose}>
              No
            </Button>
            <Button variant="danger" onClick={() => delete_item()}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
