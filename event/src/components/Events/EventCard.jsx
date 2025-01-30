import PropTypes from "prop-types";
import styled from "styled-components";
import { motion } from "framer-motion";

const Card = styled(motion.div)`
  background: #ffffff;
  border-radius: 0.5rem;
  padding: 0.1rem;
  width: 350px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 100%;
    padding: 0.3rem;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 192px;
  object-fit: cover;
  border-radius: 8px;

  @media (max-width: 768px) {
    height: 200px;
  }
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  margin-top: 8px;

  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

const InfoText = styled.p`
  color: black;
  font-size: 0.9rem;
  margin-top: 4px;

  @media (max-width: 768px) {
    font-size: 0.75rem;
    margin-top: 4px;
  }
`;

function EventCard({ event }) {
  if (!event) {
    return <p>No event data available.</p>;
  }

  return (
    <Card
      whileTap={{ x: -100, opacity: 0.7 }} // Adds swipe effect when tapped
      whileHover={{ scale: 1.02 }}
    >
      {event.image && <Image src={event.image} alt={event.title} />}
      <Title>{event.title}</Title>
      <InfoText>
        {event.date} | {event.time}
      </InfoText>
      <InfoText>{event.location}</InfoText>
      <InfoText>{event.details}</InfoText>
    </Card>
  );
}

// PropTypes for validation
EventCard.propTypes = {
  event: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired,
  }).isRequired,
};

export default EventCard;
