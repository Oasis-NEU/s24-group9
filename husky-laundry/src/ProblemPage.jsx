import React from "react";
import {
  InputGroup,
  Col,
  Button,
  Row,
  Container,
  Card,
  Form,
  Nav,
} from "react-bootstrap";
import ProblemPageNav from "./ProblemPageNav";
import Footer from "./Footer";
import './ProblemPage.css';

const ProblemPage = () => {
  return (
    <>
      <ProblemPageNav />
      <Container>
        <Row className="d-flex justify-content-center align-items-center inputBox">
          <Col md={10} lg={8} xs={12}>
            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-4">
                  <h2 className="fw-bold mb-2 text-uppercase">
                    <img className="logo" src='./blackLogo.png' alt="Logo" />
                  </h2>
                  <p className="mb-5">Enter the details of machine failure!</p>
                  <Form>
                    <Row className="mb-6">
                      <Form.Group
                        as={Col}
                        className="mb-4"
                        controlId="formLocationName">

                        <Form.Label>Location Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" />
                      </Form.Group>

                      <Form.Group
                        as={Col}
                        className="mb-4"
                        controlId="formMachineNumber"
                      >
                        <Form.Label>Machine Number</Form.Label>
                        <Form.Control type="text" placeholder="Enter Machine Number" />
                      </Form.Group>
                    </Row>

                    <br></br>
                    <Row className="mb-3">
                      <Form.Group
                        as={Col}
                        className="mb-3"
                        controlId="formProblem"
                      >
                        <Form.Label>Problem</Form.Label>
                        <Form.Control type="text" placeholder="Enter the Problem" />
                      </Form.Group>
                    </Row>
                    <br></br>
                    <div className="d-grid">
                      <Button variant="primary" type="submit">
                        Submit
                      </Button>
                    </div>
                  </Form>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default ProblemPage;