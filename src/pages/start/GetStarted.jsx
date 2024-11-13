import React from "react";
import { useNavigate } from "react-router-dom";
import CalmYou from "../../assets/CalmYou.svg";
import { IoCaretForward } from "react-icons/io5";
import { IoPlayForward } from "react-icons/io5";
import { IoCaretBack } from "react-icons/io5";
import Button from "../../components/Button";

import "./GetStarted.scss";

const GetStarted = () => {
    const [carouselIndex, setCarouselIndex] = React.useState(0);
    const navigate = useNavigate();
    const descriptions = [
        "Sharevana provides a platform to share your thoughts. Enhance your mental well-being by connecting with empathetic individuals.",
        "Sharevana offers a safe space to express yourself anonymously. Share your stories and connect with supportive listeners who value your voice.",
        "Join Sharevana to connect with a community that prioritizes mental health and values every contribution.",
    ];

    const subtitles = [
        "Discover the Power of Sharing",
        "Anonymously Connect and Heal",
        "Your Safe Haven for Mental Well-being",
    ];

    const handleNext = () => {
        if (carouselIndex < descriptions.length - 1) {
            setCarouselIndex(carouselIndex + 1);
        } else navigate("/login");
    };

    const handleSkip = () => {
        // Implement the skip functionality, e.g., navigate to the next page
        if (carouselIndex === 0) {
            navigate("/login");
        } else setCarouselIndex(carouselIndex - 1);
    };

    const props = {
        size: 24,
        style: { padding: "4px" },
    };

    return (
        <div className="get-started">
            <img src={CalmYou} alt="Sharevana Img" className="header-image" />
            <div className="title">Sharevana</div>
            <div className="tagline">{subtitles[carouselIndex]}</div>
            <div className="carousel">
                <div className="description">{descriptions[carouselIndex]}</div>
                <div className="dots">
                    {descriptions.map((_, index) => (
                        <span
                            key={index}
                            className={`dot ${
                                index === carouselIndex ? "active" : ""
                            }`}
                        ></span>
                    ))}
                </div>
                <div className="carousel-controls">
                    <Button
                        className="carousel-button"
                        type="secondary"
                        onClick={handleSkip}
                    >
                        {carouselIndex ? (
                            <IoCaretBack {...props} />
                        ) : (
                            <IoPlayForward {...props} />
                        )}
                    </Button>
                    <Button className="carousel-button" onClick={handleNext}>
                        <IoCaretForward {...props} />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default GetStarted;
