import React, { useState, useEffect } from "react";
import { Navigationbar } from "./Navbar";
import { Container, Row, Col, Card, Button, Form, Spinner, Modal, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [message, setMessage] = useState("");

  const backendURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
  const token = localStorage.getItem("token");

  const CATEGORIES = ["Sports", "Action", "Love Story", "Horror", "Comedy", "Historical"];

  // Fetch movies
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${backendURL}/api/movies`);
        const data = await res.json();
        setMovies(data.movies || []);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [backendURL]);

  const addToHistory = async (movieId) => {
    if (!token) return;
    try {
      await fetch(`${backendURL}/api/user/history`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ movieId }),
      });
    } catch (error) {
      console.error("Failed to add to history", error);
    }
  };

  const handleWatchNow = (movie) => {
    if (movie.videoId) {
      setActiveVideoId(movie.videoId);
      setShowModal(true);
      addToHistory(movie.id);
    } else {
      navigate(`/movie/${movie.id}`);
      addToHistory(movie.id);
    }
  };

  const handlePosterClick = (movie) => {
    setSelectedMovie(movie);
    setShowDescriptionModal(true);
  };

  const addToWatchlist = async (movieId) => {
    if (!token) {
      setMessage("Please login to add to watchlist.");
      setTimeout(() => setMessage(""), 3000);
      return;
    }
    try {
      const res = await fetch(`${backendURL}/api/user/watchlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ movieId }),
      });
      if (res.ok) {
        setMessage("Added to Watchlist!");
      } else {
        setMessage("Failed to add to Watchlist.");
      }
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Failed to add to watchlist", error);
    }
  };

  // Filter movies by search
  const searchedMovies = movies.filter((movie) =>
    movie.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navigationbar />
      <div className="home-page">
        {/* Hero Section */}
        <div className="hero-section text-center text-light d-flex flex-column justify-content-center align-items-center">
          <h1 className="display-4 fw-bold">
            <span className="white-text">Movie</span> Streaming Platform
          </h1>
          <p className="lead">Stream the best movies anytime, anywhere!</p>

          <div className="d-flex gap-2 w-50 mt-3">
            <Form.Control
              type="text"
              placeholder="Search for movies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Movie Rows */}
        <Container className="mt-5" fluid>
          {message && <Alert variant="info" className="text-center w-50 mx-auto">{message}</Alert>}

          {loading ? (
            <div className="text-center my-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2">Loading movies...</p>
            </div>
          ) : (
            <>
              {searchedMovies.length === 0 && (
                <p className="text-center text-muted">No movies found.</p>
              )}

              {/* If searching, just show all results. If not, show categories */}
              {search ? (
                <Row>
                  {searchedMovies.map((movie) => (
                    <Col key={movie.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                      <MovieCard
                        movie={movie}
                        onWatch={handleWatchNow}
                        onAdd={addToWatchlist}
                        onPosterClick={handlePosterClick}
                      />
                    </Col>
                  ))}
                </Row>
              ) : (
                CATEGORIES.map((category) => {
                  const categoryMovies = movies.filter(
                    (m) => m.genre?.toLowerCase() === category.toLowerCase()
                  );

                  if (categoryMovies.length === 0) return null;

                  return (
                    <div key={category} className="mb-5">
                      <h3 className="text-light mb-3 px-3 border-start border-4 border-danger">
                        {category}
                      </h3>
                      <div className="d-flex overflow-auto px-3 pb-3" style={{ gap: "20px" }}>
                        {categoryMovies.map((movie) => (
                          <div key={movie.id} style={{ minWidth: "250px", maxWidth: "250px" }}>
                            <MovieCard
                              movie={movie}
                              onWatch={handleWatchNow}
                              onAdd={addToWatchlist}
                              onPosterClick={handlePosterClick}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
            </>
          )}
        </Container>

        {/* Footer */}
        <footer className="footer text-center py-4 mt-5 text-light bg-dark">
          <p>
            © {new Date().getFullYear()} Movie Streaming Platform. All rights
            reserved.
          </p>
        </footer>
      </div>

      {/*Video Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Now Playing</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {activeVideoId ? (
            <div className="ratio ratio-16x9">
              <iframe
                width="100%"
                height="400"
                src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
                title="Movie Trailer"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <p>No trailer available.</p>
          )}
        </Modal.Body>
      </Modal>

      {/* Description Modal */}
      <Modal
        show={showDescriptionModal}
        onHide={() => setShowDescriptionModal(false)}
        centered
      >
        <Modal.Header closeButton className="bg-dark text-white border-secondary">
          <Modal.Title>{selectedMovie?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
          <div className="d-flex flex-column align-items-center mb-3">
            <img
              src={selectedMovie?.poster || "https://via.placeholder.com/300x400?text=No+Poster"}
              alt={selectedMovie?.title}
              style={{ maxHeight: "300px", borderRadius: "10px", objectFit: "cover" }}
            />
          </div>
          <p><strong>Genre:</strong> {selectedMovie?.genre}</p>
          <p><strong>Release Year:</strong> {selectedMovie?.release_year}</p>
          <p><strong>Description:</strong></p>
          <p>{selectedMovie?.description || "No description available."}</p>
        </Modal.Body>
        <Modal.Footer className="bg-dark border-secondary">
          <Button variant="secondary" onClick={() => setShowDescriptionModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {
            setShowDescriptionModal(false);
            handleWatchNow(selectedMovie);
          }}>
            Watch Now
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

// Extracted Movie Card Component for cleaner code
const MovieCard = ({ movie, onWatch, onAdd, onPosterClick }) => (
  <Card className="movie-card shadow-lg border-0 h-100">
    <Card.Img
      variant="top"
      src={
        movie.poster
          ? movie.poster
          : "https://via.placeholder.com/300x400?text=No+Poster"
      }
      alt={movie.title}
      className="movie-poster"
      style={{ height: "350px", objectFit: "cover", cursor: "pointer" }}
      onClick={() => onPosterClick(movie)}
    />

    <Card.Body className="d-flex flex-column">
      <Card.Title className="text-truncate">{movie.title}</Card.Title>
      <Card.Text className="text-muted small mb-1">
        {movie.release_year}
      </Card.Text>

      <div className="mt-auto">
        <Button
          variant="primary"
          className="w-100 mb-2"
          onClick={() => onWatch(movie)}
        >
          Watch Now
        </Button>
        <Button
          variant="outline-secondary"
          className="w-100"
          onClick={() => onAdd(movie.id)}
        >
          + Watchlist
        </Button>
      </div>
    </Card.Body>
  </Card>
);

export default Home;
