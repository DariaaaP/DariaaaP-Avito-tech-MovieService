import { Link } from "react-router-dom";

const Page404 = () => {
    return (
        <div>
            <p
                style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "24px",
                }}
            >
                Page doesn't exist
            </p>
            <p
                style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "24px",
                    marginTop: "30px",
                }}
            >
                Back to
            </p>
            <Link
                style={{
                    display: "block",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "24px",
                    color: "#9f0013",
                    textDecoration: "underline",
                }}
                to="/"
            >
                main page
            </Link>
        </div>
    );
};

export default Page404;