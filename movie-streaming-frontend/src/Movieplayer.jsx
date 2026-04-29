import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Youtube from "react-youtube";
import { Button, Container, Row, Col, Alert, Spinner } from "react-bootstrap";
import { Navigationbar } from "./pages/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

const MoviePlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [player, setPlayer] = useState(null);
  const [status, setStatus] = useState("Loading movie...");
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch movie from backend by ID
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const backendURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
        const res = await fetch(`${backendURL}/api/movies/${id}`);
        const data = await res.json();
        if (data && data.movie) {
          setMovie(data.movie);
          setStatus("Player ready");
        } else {
          navigate("/home");
        }
      } catch (error) {
        console.error("Error fetching movie:", error);
        navigate("/home");
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id, navigate]);

  // YouTube Player configuratiion
  const opts = {
    height: "400",
    width: "700",
    playerVars: {
      autoplay: 0,
    },
  };

  // YouTube event handlers
  const onPlayerReady = (e) => {
    setPlayer(e.target);
    setStatus("Player is ready");
  };

  const playVideo = () => {
    if (player) {
      player.playVideo();
      setStatus(" Playing video");
    }
  };

  const pauseVideo = () => {
    if (player) {
      player.pauseVideo();
      setStatus(" Video paused");
    }
  };

  const stopVideo = () => {
    if (player) {
      player.stopVideo();
      setStatus("Video stopped");
    }
  };

  return (
    <>
      <Navigationbar />
      <Container className="mt-5 text-center">
        {loading ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          <>
            <Row className="justify-content-center">
              <Col>
                {movie ? (
                  <>
                    <h2>{movie.title}</h2>
                    <p className="text-muted mb-3">{movie.description}</p>
                    <Youtube
                      videoId={movie.videoId}
                      opts={opts}
                      onReady={onPlayerReady}
                    />
                  </>
                ) : (
                  <p>No movie found.</p>
                )}
              </Col>
            </Row>

            <Row className="justify-content-center mt-4">
              <Col xs="auto">
                <Button
                  variant="secondary"
                  onClick={() => navigate("/home")}
                  className="me-2"
                >
                  Back to Home
                </Button>
                <Button variant="primary" onClick={playVideo} className="me-2">
                  ▶ Play
                </Button>
                <Button variant="warning" onClick={pauseVideo} className="me-2">
                  ⏸ Pause
                </Button>
                <Button variant="danger" onClick={stopVideo}>
                  ⏹ Stop
                </Button>
              </Col>
            </Row>

            <Row className="justify-content-center mt-4">
              <Col xs="auto">
                <Alert variant="info">{status}</Alert>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default MoviePlayer;
