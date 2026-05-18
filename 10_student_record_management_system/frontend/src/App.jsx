import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./App.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5002";

const EMPTY_FORM = {
  studentId: "",
  fullName: "",
  email: "",
  department: "",
  year: "1",
  phone: "",
  dateOfBirth: "",
  gpa: "7.00",
  status: "Active",
  address: ""
};

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [query, setQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [notice, setNotice] = useState(null);

  const showNotice = (type, text) => {
    setNotice({ type, text });
    window.setTimeout(() => setNotice(null), 2500);
  };

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/students`);
      setStudents(res.data);
    } catch (error) {
      console.error(error);
      showNotice("error", "Unable to load records from the server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredStudents = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return students.filter((student) => {
      const searchable = [
        student.studentId,
        student.fullName,
        student.email,
        student.department,
        student.phone
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = !needle || searchable.includes(needle);
      const matchesDepartment = departmentFilter === "All" || student.department === departmentFilter;
      const matchesStatus = statusFilter === "All" || student.status === statusFilter;

      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [students, query, departmentFilter, statusFilter]);

  const stats = useMemo(() => {
    const total = students.length;
    const active = students.filter((student) => student.status === "Active").length;
    const departments = new Set(students.map((student) => student.department).filter(Boolean)).size;
    const averageGpa = total
      ? (students.reduce((sum, student) => sum + (Number(student.gpa) || 0), 0) / total).toFixed(2)
      : "0.00";

    return { total, active, departments, averageGpa };
  }, [students]);

  const departmentOptions = useMemo(() => {
    return [
      "All",
      ...new Set(students.map((student) => student.department).filter(Boolean))
    ];
  }, [students]);

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !form.studentId.trim() ||
      !form.fullName.trim() ||
      !form.email.trim() ||
      !form.department.trim() ||
      !form.phone.trim() ||
      !form.address.trim()
    ) {
      showNotice("error", "Please fill all required fields.");
      return;
    }

    const payload = {
      ...form,
      studentId: form.studentId.trim().toUpperCase(),
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      department: form.department.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      gpa: Number(form.gpa)
    };

    try {
      setSaving(true);

      if (editingId) {
        await axios.put(`${API_BASE}/students/${editingId}`, payload);
        showNotice("success", "Student record updated.");
      } else {
        await axios.post(`${API_BASE}/students`, payload);
        showNotice("success", "Student record added.");
      }

      resetForm();
      await fetchStudents();
    } catch (error) {
      console.error(error);
      const message = error?.response?.data?.message || "Failed to save record.";
      showNotice("error", message);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (student) => {
    setEditingId(student._id);
    setForm({
      studentId: student.studentId || "",
      fullName: student.fullName || "",
      email: student.email || "",
      department: student.department || "",
      year: student.year || "1",
      phone: student.phone || "",
      dateOfBirth: student.dateOfBirth || "",
      gpa: String(student.gpa ?? "7.00"),
      status: student.status || "Active",
      address: student.address || ""
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this student record?")) {
      return;
    }

    try {
      await axios.delete(`${API_BASE}/students/${id}`);
      setStudents((current) => current.filter((student) => student._id !== id));
      showNotice("success", "Student record deleted.");
    } catch (error) {
      console.error(error);
      showNotice("error", "Failed to delete record.");
    }
  };

  const formatDate = (value) => {
    if (!value) return "—";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "—";

    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  return (
    <div className="app">
      <header className="hero">
        <div>
          <div className="eyebrow">Cloud-Based Student Record Management</div>
          <h1>Manage student data from one clean dashboard.</h1>
          <p>
            Add new records, update existing details, and retrieve student profiles from a live database-backed API.
          </p>
        </div>

        <div className="hero-actions">
          <button className="btn primary" onClick={() => document.getElementById("student-form")?.scrollIntoView({ behavior: "smooth", block: "start" })}>
            Add Student
          </button>
          <button className="btn ghost" onClick={fetchStudents}>
            Refresh Data
          </button>
        </div>
      </header>

      <section className="stats-grid">
        <article className="stat-card">
          <span>Total Students</span>
          <strong>{stats.total}</strong>
        </article>
        <article className="stat-card">
          <span>Active Students</span>
          <strong>{stats.active}</strong>
        </article>
        <article className="stat-card">
          <span>Departments</span>
          <strong>{stats.departments}</strong>
        </article>
        <article className="stat-card">
          <span>Average GPA</span>
          <strong>{stats.averageGpa}</strong>
        </article>
      </section>

      <main className="workspace">
        <aside className="panel form-panel" id="student-form">
          <div className="panel-heading">
            <div>
              <h2>{editingId ? "Update student" : "Add student"}</h2>
              <p>Keep each record current for fast retrieval and administration.</p>
            </div>
            {editingId && <button className="btn link" onClick={resetForm}>Cancel edit</button>}
          </div>

          <form className="student-form" onSubmit={handleSubmit}>
            <div className="field-grid">
              <label>
                Student ID
                <input name="studentId" value={form.studentId} onChange={handleChange} placeholder="SRM2026-001" />
              </label>
              <label>
                Full Name
                <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Aarav Sharma" />
              </label>
            </div>

            <div className="field-grid">
              <label>
                Email
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="aarav@example.com" />
              </label>
              <label>
                Phone
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="9876543210" />
              </label>
            </div>

            <div className="field-grid">
              <label>
                Department
                <input name="department" value={form.department} onChange={handleChange} placeholder="Computer Science" />
              </label>
              <label>
                Year
                <select name="year" value={form.year} onChange={handleChange}>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </label>
            </div>

            <div className="field-grid">
              <label>
                GPA
                <input type="number" min="0" max="10" step="0.01" name="gpa" value={form.gpa} onChange={handleChange} />
              </label>
              <label>
                Status
                <select name="status" value={form.status} onChange={handleChange}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Graduated">Graduated</option>
                </select>
              </label>
            </div>

            <label>
              Date of Birth
              <input type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} />
            </label>

            <label>
              Address
              <textarea name="address" value={form.address} onChange={handleChange} rows="4" placeholder="Student home address" />
            </label>

            <div className="form-actions">
              <button className="btn primary" type="submit" disabled={saving}>
                {saving ? "Saving..." : editingId ? "Update Record" : "Save Record"}
              </button>
              <button className="btn secondary" type="button" onClick={resetForm} disabled={saving}>
                Reset
              </button>
            </div>
          </form>
        </aside>

        <section className="panel records-panel">
          <div className="panel-heading">
            <div>
              <h2>Student records</h2>
              <p>Search, filter, edit and remove entries as needed.</p>
            </div>
            <span className="status-chip">{loading ? "Loading..." : `${filteredStudents.length} shown`}</span>
          </div>

          <div className="toolbar">
            <label className="search-box">
              <span>Search</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Name, ID, email, phone..."
              />
            </label>

            <label>
              Department
              <select value={departmentFilter} onChange={(event) => setDepartmentFilter(event.target.value)}>
                {departmentOptions.map((department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Status
              <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
                <option value="All">All</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Graduated">Graduated</option>
              </select>
            </label>
          </div>

          {filteredStudents.length === 0 ? (
            <div className="empty-state">
              <h3>No records found</h3>
              <p>Add a student from the form to start building the database.</p>
            </div>
          ) : (
            <div className="table-shell">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Year</th>
                    <th>GPA</th>
                    <th>Status</th>
                    <th>Updated</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student._id}>
                      <td>{student.studentId}</td>
                      <td>
                        <strong>{student.fullName}</strong>
                        <div className="subtext">{student.email}</div>
                      </td>
                      <td>{student.department}</td>
                      <td>Year {student.year}</td>
                      <td>{Number(student.gpa).toFixed(2)}</td>
                      <td>
                        <span className={`status-pill ${student.status.toLowerCase()}`}>{student.status}</span>
                      </td>
                      <td>{formatDate(student.updatedAt)}</td>
                      <td>
                        <div className="row-actions">
                          <button className="btn secondary" onClick={() => handleEdit(student)} type="button">
                            Edit
                          </button>
                          <button className="btn danger" onClick={() => handleDelete(student._id)} type="button">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      {notice && <div className={`toast ${notice.type}`}>{notice.text}</div>}
    </div>
  );
}

export default App;