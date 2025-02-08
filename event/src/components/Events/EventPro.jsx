import styled from "styled-components";
import EventCard from "./EventCard";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: clamp(1rem, 2vw, 0.5rem);
  justify-content: center;
  padding: clamp(0.5rem, 2vw, 2rem);
  max-width: 1200px;
  margin: 0 auto;
`;

const EventPro = () => {
  const events = [
    {
      image: "eve2.jpg",
      title: "Tech Conference 2025",
      date: "March 10, 2025",
      time: "10:00 AM - 4:00 PM",
      location: "New York Convention Center",
      details:
        "Join us for a day of insightful talks and networking with industry leaders. The event will cover the latest advancements in technology and provide opportunities for growth and learning.",
    },
    {
      image: "eve3.jpg",
      title: "Blockchain Summit 2025",
      date: "April 15, 2025",
      time: "9:00 AM - 5:00 PM",
      location: "Swahilipot Hub",
      details:
        "Explore the future of blockchain technology at the Blockchain Summit. Learn from top experts, and discover how blockchain is transforming industries worldwide.",
    },
    {
      image: "eve4.jpg",
      title: "Blockchain Summit 2025",
      date: "April 15, 2025",
      time: "9:00 AM - 5:00 PM",
      location: "Sote Hub",
      details:
        "Explore the future of blockchain technology at the Blockchain Summit. Learn from top experts, and discover how blockchain is transforming industries worldwide.",
    },
  ];

  return (
    <>
      <Container>
        {events.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </Container>
    </>
  );
};

export default EventPro;
