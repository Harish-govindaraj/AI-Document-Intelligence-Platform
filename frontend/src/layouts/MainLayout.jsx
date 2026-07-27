import Navbar from "../components/Navbar";

export default function MainLayout({ children }) {
    return (
        <>
            <Navbar />
            <main className="container py-4 py-lg-5">
                {children}
            </main>
        </>
    );
}