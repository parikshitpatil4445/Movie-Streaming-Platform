import { useEffect, useState } from "react";
import { Navigationbar } from "./Navbar";
import axios from "axios";
import { FloatingLabel, Form } from "react-bootstrap";

export default function AdminDashboard() {
  const [view, setView] = useState("users");
  const [users, setUsers] = useState([]);
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({
    title: "",
    release_year: "",
    genre: "",
    description: "",
    poster: "",
    videoId: "",
    created_by: "",
  });
  const [userMessage, setUserMessage] = useState("");
  const [movieMessage, setMovieMessage] = useState("");

  const backendURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
  const token = localStorage.getItem("token");

  // Hardcoded categories as per requirement
  const ALLOWED_CATEGORIES = ["Sports", "Action", "Love Story", "Horror", "Comedy", "Historical"];

  useEffect(() => {
    if (!token) {
      setUserMessage("Please login again.");
      return;
    }
    view === "users" ? fetchUsers() : fetchMovies();
  }, [view, token]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${backendURL}/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.users);
    } catch {
      setUserMessage("Failed to load users.");
    }
  };

  const fetchMovies = async () => {
    try {
      const res = await axios.get(`${backendURL}/api/admin/movies`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMovies(res.data.movies);
    } catch {
      setMovieMessage("Failed to load movies.");
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`${backendURL}/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserMessage("User deleted successfully!");
      fetchUsers();
    } catch (error) {
      console.error("Delete user error:", error.response?.data || error.message);
      setUserMessage(error.response?.data?.message || "Failed to delete user.");
    }
  };

  const handleDeleteMovie = async (id) => {
    try {
      await axios.delete(`${backendURL}/api/admin/movies/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMovieMessage("Movie deleted successfully!");
      fetchMovies();
    } catch (error) {
      console.error("Delete movie error:", error.response?.data || error.message);
      setMovieMessage(error.response?.data?.message || "Failed to delete movie.");
    }
  };

  const extractVideoId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : url;
  };

  const handleAddMovie = async (e) => {
    e.preventDefault();
    try {
      if (!newMovie.title || !newMovie.release_year) {
        setMovieMessage("Please enter both title and release year.");
        return;
      }

      const payload = {
        title: newMovie.title.trim(),
        releaseYear: newMovie.release_year.trim(),
        genre: newMovie.genre?.trim() || null,
        description: newMovie.description?.trim() || null,
        poster: newMovie.poster?.trim() || null,
        videoId: extractVideoId(newMovie.videoId?.trim()) || null,
        createdBy: newMovie.created_by?.trim() || "Admin",
      };

      await axios.post(`${backendURL}/api/admin/movies`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMovieMessage(" Movie added successfully!");
      setNewMovie({
        title: "",
        release_year: "",
        genre: "",
        description: "",
        poster: "",
        videoId: "",
        created_by: "",
      });
      fetchMovies();
    } catch (error) {
      console.error("Add movie error:", error.response?.data || error.message);
      setMovieMessage(error.response?.data?.message || "Failed to add movie.");
    }
  };

  return (
    <>
      <Navigationbar />
      <div style={{ display: "flex" }}>
        {/* Sidebar */}
        <div
          style={{
            width: "220px",
            backgroundColor: "#1f2937",
            color: "white",
            height: "100vh",
            padding: "1rem",
          }}
        >
          <h4 style={{ marginBottom: "2rem" }}>Admin Panel</h4>
          <button
            onClick={() => setView("users")}
            className={`btn w-100 mb-2 ${view === "users" ? "btn-primary" : "btn-outline-light"}`}
          >
            User List
          </button>
          <button
            onClick={() => setView("movies")}
            className={`btn w-100 mb-2 ${view === "movies" ? "btn-primary" : "btn-outline-light"}`}
          >
            Movies List
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
            className="btn btn-danger w-100 mt-4"
          >
            Logout
          </button>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: "2rem" }}>
          <h2>Admin Dashboard</h2>
          {userMessage && view === "users" && <div className="alert alert-info">{userMessage}</div>}
          {movieMessage && view === "movies" && <div className="alert alert-info">{movieMessage}</div>}

          {view === "users" && (
            <>
              <h4>User List</h4>
              <table className="table table-bordered mt-3">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td>{u.id}</td>
                      <td>{u.fullname}</td>
                      <td>{u.email}</td>
                      <td>{u.role}</td>
                      <td>
                        <button
                          onClick={() => handleDeleteUser(u.id)}
                          className="btn btn-danger btn-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {view === "movies" && (
            <>
              <h4>Add Movie</h4>
              <form onSubmit={handleAddMovie} className="mb-4">
                <input
                  type="text"
                  placeholder="Title"
                  className="form-control mb-2"
                  value={newMovie.title}
                  onChange={(e) =>
                    setNewMovie({ ...newMovie, title: e.target.value })
                  }
                  required
                />

                <input
                  type="number"
                  placeholder="Year of Release"
                  className="form-control mb-2"
                  value={newMovie.release_year}
                  onChange={(e) =>
                    setNewMovie({ ...newMovie, release_year: e.target.value })
                  }
                  required
                />

                <FloatingLabel controlId="floatingSelect" label="Genre" className="mb-2 text-dark">
                  <Form.Select
                    value={newMovie.genre}
                    onChange={(e) => setNewMovie({ ...newMovie, genre: e.target.value })}
                    required
                  >
                    <option value="" disabled>Select Genre</option>
                    {ALLOWED_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </Form.Select>
                </FloatingLabel>

                <textarea
                  placeholder="Description"
                  className="form-control mb-2"
                  rows="3"
                  value={newMovie.description || ""}
                  onChange={(e) =>
                    setNewMovie({ ...newMovie, description: e.target.value })
                  }
                ></textarea>

                <input
                  type="text"
                  placeholder="Poster Image URL"
                  className="form-control mb-2"
                  value={newMovie.poster || ""}
                  onChange={(e) =>
                    setNewMovie({ ...newMovie, poster: e.target.value })
                  }
                />

                <input
                  type="text"
                  placeholder="YouTube Video ID (optional)"
                  className="form-control mb-2"
                  value={newMovie.videoId || ""}
                  onChange={(e) =>
                    setNewMovie({ ...newMovie, videoId: e.target.value })
                  }
                />

                <input
                  type="text"
                  placeholder="Created By"
                  className="form-control mb-2"
                  value={newMovie.created_by}
                  onChange={(e) =>
                    setNewMovie({ ...newMovie, created_by: e.target.value })
                  }
                />

                <button type="submit" className="btn btn-success w-100">
                  Add Movie
                </button>
              </form>

              <h4>Movies List</h4>
              <table className="table table-bordered mt-3">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Genre</th>
                    <th>Release Year</th>
                    <th>Created By</th>
                    <th>Poster</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {movies.map((movie) => (
                    <tr key={movie.id}>
                      <td>{movie.id}</td>
                      <td>{movie.title}</td>
                      <td>{movie.genre}</td>
                      <td>{movie.release_year}</td>
                      <td>{movie.created_by}</td>
                      <td>
                        {movie.poster ? (
                          <img
                            src={movie.poster}
                            alt={movie.title}
                            width="60"
                            height="80"
                            style={{
                              objectFit: "cover",
                              borderRadius: "5px",
                            }}
                          />
                        ) : (
                          "No Image"
                        )}
                      </td>
                      <td>
                        {movie.description
                          ? movie.description.slice(0, 50) + "..."
                          : "No description"}
                      </td>
                      <td>
                        <button
                          onClick={() => handleDeleteMovie(movie.id)}
                          className="btn btn-danger btn-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </>
  );
}
