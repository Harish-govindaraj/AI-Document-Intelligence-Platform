import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function Dashboard() {

    return (

        <>
            <Navbar />

            <div className="container mt-4">

                {/* Welcome */}

                <div className="mb-4">

                    <h2 className="fw-bold">

                        Welcome to DocMind AI 👋

                    </h2>

                    <p className="text-secondary">

                        AI Powered Document Intelligence Platform

                    </p>

                </div>

                {/* Statistics */}

                <div className="row g-4">

                    <div className="col-md-4">

                        <div className="card shadow-sm border-0">

                            <div className="card-body text-center">

                                <i className="bi bi-file-earmark-text display-4 text-primary"></i>

                                <h3 className="mt-3">0</h3>

                                <p>Total Documents</p>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-4">

                        <div className="card shadow-sm border-0">

                            <div className="card-body text-center">

                                <i className="bi bi-file-earmark-pdf display-4 text-danger"></i>

                                <h3 className="mt-3">0</h3>

                                <p>PDF Files</p>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-4">

                        <div className="card shadow-sm border-0">

                            <div className="card-body text-center">

                                <i className="bi bi-image display-4 text-success"></i>

                                <h3 className="mt-3">0</h3>

                                <p>Images</p>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Quick Actions */}

                <div className="card shadow border-0 mt-5">

                    <div className="card-body">

                        <h4 className="mb-4">

                            Quick Actions

                        </h4>

                        <div className="d-flex gap-3">

                            <Link
                                to="/upload"
                                className="btn btn-primary btn-lg"
                            >

                                <i className="bi bi-cloud-upload"></i>

                                {" "}Upload Document

                            </Link>

                            <Link
                                to="/history"
                                className="btn btn-outline-dark btn-lg"
                            >

                                <i className="bi bi-clock-history"></i>

                                {" "}View History

                            </Link>

                        </div>

                    </div>

                </div>

                {/* Recent Uploads */}

                <div className="card shadow border-0 mt-5">

                    <div className="card-body">

                        <h4>

                            Recent Uploads

                        </h4>

                        <hr />

                        <p className="text-muted">

                            No documents uploaded yet.

                        </p>

                    </div>

                </div>

            </div>

        </>

    );

}