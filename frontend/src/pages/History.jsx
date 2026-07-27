import { useState } from "react";
import Navbar from "../components/Navbar";

export default function History() {

    const [documents] = useState([

        {
            id: 1,
            fileName: "Resume.pdf",
            fileType: "PDF",
            status: "Processed",
            uploadedAt: "Today"
        },

        {
            id: 2,
            fileName: "Invoice.pdf",
            fileType: "PDF",
            status: "Processed",
            uploadedAt: "Yesterday"
        },

        {
            id: 3,
            fileName: "Screenshot.png",
            fileType: "Image",
            status: "Processed",
            uploadedAt: "2 Days Ago"
        }

    ]);

    return (

        <>
            <Navbar />

            <div className="container mt-4">

                <div className="card shadow border-0">

                    <div className="card-body">

                        <div className="d-flex justify-content-between align-items-center">

                            <h3>My Documents</h3>

                            <input
                                className="form-control w-25"
                                placeholder="Search..."
                            />

                        </div>

                        <hr />

                        <table className="table table-hover align-middle">

                            <thead className="table-dark">

                                <tr>

                                    <th>#</th>

                                    <th>Filename</th>

                                    <th>Type</th>

                                    <th>Status</th>

                                    <th>Uploaded</th>

                                    <th>Action</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    documents.map((doc, index) => (

                                        <tr key={doc.id}>

                                            <td>{index + 1}</td>

                                            <td>{doc.fileName}</td>

                                            <td>{doc.fileType}</td>

                                            <td>

                                                <span className="badge bg-success">

                                                    {doc.status}

                                                </span>

                                            </td>

                                            <td>{doc.uploadedAt}</td>

                                            <td>

                                                <button
                                                    className="btn btn-outline-primary btn-sm"
                                                >
                                                    View
                                                </button>

                                            </td>

                                        </tr>

                                    ))

                                }

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </>

    );

}