import { useState } from "react";
import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";
import documentService from "../services/documentService";

export default function Upload() {

    const [selectedFile, setSelectedFile] = useState(null);

    const [loading, setLoading] = useState(false);

    const [result, setResult] = useState(null);

    const [error, setError] = useState("");

    const handleFileChange = (e) => {

        setSelectedFile(e.target.files[0]);

        setResult(null);

        setError("");

    };

    const handleUpload = async () => {

        if (!selectedFile) {

            alert("Please select a file.");

            return;
        }

        setLoading(true);

        setError("");

        try {

            const response = await documentService.uploadDocument(selectedFile);

            setResult(response);

        } catch (err) {

            if (err.response) {

                setError(err.response.data.message);

            } else {

                setError("Unable to upload document.");

            }

        } finally {

            setLoading(false);

        }

    };

    return (

        <>
            <Navbar />

            <div className="container mt-5">

                <div className="card shadow border-0">

                    <div className="card-body">

                        <h2 className="mb-4">

                            Upload Document

                        </h2>

                        <div className="mb-3">

                            <input

                                type="file"

                                className="form-control"

                                accept=".pdf,.png,.jpg,.jpeg"

                                onChange={handleFileChange}

                            />

                        </div>

                        <button

                            className="btn btn-primary"

                            onClick={handleUpload}

                        >

                            Upload & Process

                        </button>

                    </div>

                </div>

                {loading && <LoadingSpinner />}

                {error &&

                    <div className="alert alert-danger mt-4">

                        {error}

                    </div>

                }

                {result &&

                    <>

                        <div className="card shadow mt-4">

                            <div className="card-body">

                                <h3>Summary</h3>

                                <hr />

                                <p>{result.summary}</p>

                            </div>

                        </div>

                        <div className="row mt-4">

                            <div className="col-md-6">

                                <div className="card shadow">

                                    <div className="card-body">

                                        <h4>

                                            Keywords

                                        </h4>

                                        <hr />

                                        {

                                            result.keywords.map(

                                                (keyword, index) => (

                                                    <span

                                                        key={index}

                                                        className="badge bg-primary me-2 mb-2"

                                                    >

                                                        {keyword}

                                                    </span>

                                                )

                                            )

                                        }

                                    </div>

                                </div>

                            </div>

                            <div className="col-md-6">

                                <div className="card shadow">

                                    <div className="card-body">

                                        <h4>

                                            Named Entities

                                        </h4>

                                        <hr />

                                        {

                                            result.entities.map(

                                                (entity, index) => (

                                                    <div

                                                        key={index}

                                                        className="mb-2"

                                                    >

                                                        <strong>

                                                            {

                                                                entity.text

                                                            }

                                                        </strong>

                                                        <span

                                                            className="badge bg-success ms-2"

                                                        >

                                                            {

                                                                entity.label

                                                            }

                                                        </span>

                                                    </div>

                                                )

                                            )

                                        }

                                    </div>

                                </div>

                            </div>

                        </div>

                    </>

                }

            </div>

        </>

    );

}