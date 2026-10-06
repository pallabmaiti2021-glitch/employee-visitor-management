import React from "react";

export default function VisitorTable({
  visitors,
  onEdit,
  onDelete,
  loading
}) {
  return (
    <section className="card">
      <div className="section-title">
        <div>
          <h2>Visitor Records</h2>
          <p>
            {visitors.length} record
            {visitors.length !== 1 ? "s" : ""} found
          </p>
        </div>
      </div>

      {loading ? (
        <div className="empty">Loading visitors...</div>
      ) : visitors.length === 0 ? (
        <div className="empty">No visitor records found.</div>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Mobile</th>
                <th>Organization</th>
                <th>Person to Meet</th>
                <th>Purpose</th>
                <th>Date & Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {visitors.map((v) => (
                <tr key={v._id}>
                  <td>
                    <strong>{v.visitorName}</strong>
                    <small>{v.email || "No email"}</small>
                  </td>

                  <td>{v.mobileNumber}</td>

                  <td>{v.organization || "-"}</td>

                  <td>{v.personToMeet}</td>

                  <td>{v.purpose}</td>

                  <td>
                    {new Date(v.visitDateTime).toLocaleString()}
                  </td>

                  <td>
                    <span
                      className={`status ${
                        v.status === "Checked In" ? "in" : "out"
                      }`}
                    >
                      {v.status}
                    </span>
                  </td>

                  <td className="actions">
                    <button
                      className="edit"
                      onClick={() => onEdit(v)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete"
                      onClick={() => onDelete(v)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}