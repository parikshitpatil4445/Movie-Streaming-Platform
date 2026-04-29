import { useEffect, useState } from "react";
import { Navigationbar } from "./Navbar";
import { Container, Row, Col, Card, Button, Form, Alert, Tab, Tabs, Spinner } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css"; // Import the new CSS

export default function UserDashboard() {
  const [key, setKey] = useState("profile");
  const [user, setUser] = useState({ fullname: "", email: "", password: "" });
  const [watchlist, setWatchlist] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("info");
  const navigate = useNavigate();

  const backendURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchProfile();
    if (key === "watchlist") fetchWatchlist();
    if (key === "history") fetchHistory();
  }, [key, navigate, token]);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${backendURL}/api/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser({ ...res.data.user, password: "" }); // Don't show hashed password
    } catch (error) {
      console.error("Error fetching profile", error);
    }
  };

  const fetchWatchlist = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${backendURL}/api/user/watchlist`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWatchlist(res.data.watchlist || []);
    } catch (error) {
      console.error("Error fetching watchlist", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${backendURL}/api/user/history`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHistory(res.data.history || []);
    } catch (error) {
      console.error("Error fetching history", error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setMessage("");

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (user.password && !passwordRegex.test(user.password)) {
      setVariant("danger");
      setMessage("Password must be at least 8 characters, with uppercase, lowercase, number, and special char.");
      return;
    }

    try {
      await axios.put(`${backendURL}/api/user/update`, user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVariant("success");
      setMessage("Profile updated successfully!");
      fetchProfile();
    } catch (error) {
      setVariant("danger");
      setMessage("Failed to update profile.");
    }
  };

  const removeFromWatchlist = async (movieId) => {
    try {
      await axios.delete(`${backendURL}/api/user/watchlist/${movieId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchWatchlist();
    } catch (error) {
      console.error("Error removing from watchlist", error);
    }
  };

  return (
    <div className="dashboard-container">
      <Navigationbar />
      <Container className="mt-5">
        <h2 className="mb-4 fw-bold">Account</h2>
        <Tabs
          id="user-dashboard-tabs"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-5"
        >
          {/* Profile Tab */}
          <Tab eventKey="profile" title="Profile">
            <Card className="p-4 shadow-sm profile-card">
              <h4>Edit Profile</h4>
              {message && <Alert variant={variant}>{message}</Alert>}
              <Form onSubmit={handleProfileUpdate}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={user.fullname || ""}
                    onChange={(e) => setUser({ ...user, fullname: e.target.value })}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={user.email || ""} disabled />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>New Password (leave blank to keep current)</Form.Label>
                  <Form.Control
                    type="password"
                    value={user.password || ""}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="Enter new password"
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 btn-netflix">
                  Save Changes
                </Button>
              </Form>
            </Card>
          </Tab>

          {/* Watchlist Tab */}
          <Tab eventKey="watchlist" title="Watchlist">
            {loading ? (
              <Spinner animation="border" variant="light" />
            ) : (
              <Row>
                {watchlist.length > 0 ? (
                  watchlist.map((item) => (
                    <Col key={item.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                      <Card className="h-100 shadow-sm movie-card">
                        <Card.Img
                          variant="top"
                          src={item.movie.poster || "https://via.placeholder.com/300x400"}
                          style={{ height: "300px", objectFit: "cover" }}
                        />
                        <Card.Body className="d-flex flex-column">
                          <Card.Title>{item.movie.title}</Card.Title>
                          <Button
                            variant="danger"
                            className="mt-auto"
                            onClick={() => removeFromWatchlist(item.movie.id)}
                          >
                            Remove
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))
                ) : (
                  <p className="text-light">Your watchlist is empty.</p>
                )}
              </Row>
            )}
          </Tab>

          {/* Watch History Tab */}
          <Tab eventKey="history" title="Watch History">
            {loading ? (
              <Spinner animation="border" variant="light" />
            ) : (
              <Row>
                {history.length > 0 ? (
                  history.map((item) => (
                    <Col key={item.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                      <Card className="h-100 shadow-sm movie-card">
                        <Card.Img
                          variant="top"
                          src={item.movie.poster || "https://via.placeholder.com/300x400"}
                          style={{ height: "300px", objectFit: "cover" }}
                        />
                        <Card.Body>
                          <Card.Title>{item.movie.title}</Card.Title>
                          <Card.Text className="text-muted small">
                            Watched on: {new Date(item.watchedAt).toLocaleDateString()}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))
                ) : (
                  <p className="text-light">No watch history found.</p>
                )}
              </Row>
            )}
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
}

