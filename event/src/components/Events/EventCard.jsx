import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0.5rem;
  background: #f7fafc;
  min-height: auto;
`;

const Card = styled.div`
  background: #fffff;
  border-radius: 0.5rem;
  padding: 0.2rem;
  width: 350px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0.1rem;
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
    font-size: 1.125rem; /* Adjust font size for smaller screens */
  }
`;

const InfoText = styled.p`
  color: #4a5568;
  font-size: 0.875rem;
  margin-top: 4px;

  @media (max-width: 768px) {
    font-size: 0.75rem; /* Reduce font size for smaller screens */
    margin-top: 6px;
  }
`;

function EventCard({ event }) {
  if (!event) {
    return <p>No event data available.</p>;
  }

  return (
    <Container>
      <Card>
        {event.image && <Image src={event.image} alt={event.title} />}
        <Title>{event.title}</Title>
        <InfoText>
          {event.date} | {event.time}
        </InfoText>
        <InfoText>{event.location}</InfoText>
        <InfoText>{event.details}</InfoText>
      </Card>
    </Container>
  );
}

export default EventCard;
