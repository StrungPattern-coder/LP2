import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5001";

function App() {
    const [blogs, setBlogs] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editContent, setEditContent] = useState("");
    const [notice, setNotice] = useState(null);
    const [errorText, setErrorText] = useState("");

    const showNotice = (type, text) => {
        setNotice({ type, text });
        setTimeout(() => setNotice(null), 2500);
    };

    const fetchBlogs = async () => {
        setLoading(true);
        setErrorText("");
        try {
            const res = await axios.get(`${API_BASE}/blogs`);
            setBlogs(res.data);
        } catch (error) {
            console.error(error);
            setErrorText("Unable to load blogs. Check backend/CORS settings and refresh.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const addBlog = async () => {
        if (!title.trim() || !content.trim()) {
            showNotice("error", "Please fill all fields");
            return;
        }

        try {
            setSaving(true);
            const res = await axios.post(`${API_BASE}/blogs`, {
                title: title.trim(),
                content: content.trim()
            });

            setTitle("");
            setContent("");
            setBlogs((prev) => [res.data, ...prev]);
            showNotice("success", "Blog published");
        } catch (error) {
            console.error(error);
            showNotice("error", "Failed to publish blog");
        } finally {
            setSaving(false);
        }
    };

    const deleteBlog = async (id) => {
        if (!window.confirm("Delete this story?")) return;

        try {
            await axios.delete(`${API_BASE}/blogs/${id}`);
            setBlogs((prev) => prev.filter((blog) => blog._id !== id));
            showNotice("success", "Blog deleted");
        } catch (error) {
            console.error(error);
            showNotice("error", "Failed to delete blog");
        }
    };

    const openEdit = (blog) => {
        setEditingId(blog._id);
        setEditTitle(blog.title || "");
        setEditContent(blog.content || "");
    };

    const closeEdit = () => {
        setEditingId(null);
        setEditTitle("");
        setEditContent("");
    };

    const updateBlog = async () => {
        if (!editTitle.trim() || !editContent.trim()) {
            showNotice("error", "Please fill all fields");
            return;
        }

        try {
            setSaving(true);
            const res = await axios.put(`${API_BASE}/blogs/${editingId}`, {
                title: editTitle.trim(),
                content: editContent.trim()
            });

            setBlogs((prev) => prev.map((blog) => (blog._id === editingId ? res.data : blog)));
            closeEdit();
            showNotice("success", "Blog updated");
        } catch (error) {
            console.error(error);
            showNotice("error", "Failed to update blog");
        } finally {
            setSaving(false);
        }
    };

    const formatDate = (dateLike) => {
        if (!dateLike) return "Just now";
        const dt = new Date(dateLike);
        if (Number.isNaN(dt.getTime())) return "Just now";
        return dt.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
    };

    return (
        <div className="page">
            <header className="site-header">
                <div className="brand">CloudStories</div>
                <div className="header-actions">
                    <button className="btn ghost" onClick={fetchBlogs}>Refresh</button>
                </div>
            </header>

            <main className="layout">
                <section className="compose" id="create">
                    <h2>Write a story</h2>
                    <p className="subtle">Share ideas, updates and project learnings.</p>

                    <label className="field-label" htmlFor="title-input">Title</label>
                    <input
                        id="title-input"
                        className="text-input"
                        placeholder="Give your story a strong title"
                        value={title}
                        maxLength={120}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <label className="field-label" htmlFor="content-input">Content</label>
                    <textarea
                        id="content-input"
                        className="text-area"
                        placeholder="Write your blog content here..."
                        value={content}
                        maxLength={2500}
                        onChange={(e) => setContent(e.target.value)}
                        rows={10}
                    />

                    <div className="composer-meta">{content.length} / 2500</div>

                    <div className="composer-actions">
                        <button className="btn primary" onClick={addBlog} disabled={saving}>
                            {saving ? "Publishing..." : "Publish"}
                        </button>
                        <button
                            className="btn secondary"
                            onClick={() => {
                                setTitle("");
                                setContent("");
                            }}
                            disabled={saving}
                        >
                            Clear
                        </button>
                    </div>
                </section>

                <section className="feed" id="blogs">
                    <div className="feed-head">
                        <h1>Latest stories</h1>
                        <span>{loading ? "Loading..." : `${blogs.length} posts`}</span>
                    </div>

                    {errorText && <div className="error-banner">{errorText}</div>}

                    {blogs.length === 0 && !loading ? (
                        <div className="empty-state">No stories yet. Publish your first one.</div>
                    ) : (
                        <div className="story-list">
                            {blogs.map((blog) => (
                                <article key={blog._id} className="story-card">
                                    <div className="story-meta">Published {formatDate(blog.createdAt)}</div>
                                    <h3>{blog.title}</h3>
                                    <p>{blog.content}</p>
                                    <div className="story-actions">
                                        <button className="btn secondary" onClick={() => openEdit(blog)}>Edit</button>
                                        <button className="btn danger" onClick={() => deleteBlog(blog._id)}>Delete</button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </section>
            </main>

            {editingId && (
                <div className="modal-overlay" onClick={closeEdit}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <h3>Edit story</h3>
                        <input
                            className="text-input"
                            value={editTitle}
                            maxLength={120}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <textarea
                            className="text-area"
                            rows={8}
                            maxLength={2500}
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                        />
                        <div className="composer-actions">
                            <button className="btn ghost" onClick={closeEdit}>Cancel</button>
                            <button className="btn primary" onClick={updateBlog} disabled={saving}>
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {notice && (
                <div className={`toast ${notice.type === "error" ? "error" : "success"}`}>
                    {notice.text}
                </div>
            )}
        </div>
    );
}

export default App;