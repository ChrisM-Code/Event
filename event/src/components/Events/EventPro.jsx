import styled from "styled-components";
import EventCard from "./EventCard";
import { useState, useEffect } from "react";
import Modal from "./Modal";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: clamp(1rem, 2vw, 0.5rem);
  justify-content: center;
  padding: clamp(0.5rem, 2vw, 2rem);
  max-width: 1200px;
  margin: 0 auto;
`;

const PastEventsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: clamp(1rem, 2vw, 0.5rem);
  justify-content: center;
  padding: clamp(0.5rem, 2vw, 2rem);
  margin: 0 auto;
`;

const PastEventCard = styled.div`
  padding: clamp(0.5rem, 2vw, 2rem);
  border-radius: 8px;
  margin: 0 auto;
  opacity: 0.8;
  transition: opacity 0.3s;
  pointer-events: none;
`;

const H2 = styled.h2`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 0.5rem;
  text-align: center;

  span {
    color: #ff4500;
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
      color: #fb923c;
    }
  }
`;

const LoadingMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: gray;
`;

const EventPro = () => {
  const [events, setEvents] = useState([
    {
      image: "eve2.jpg",
      title: "Tech Conference 2025",
      date: "March 10, 2025",
      time: "10:00 AM - 4:00 PM",
      location: "Nairobi",
      details:
        "Join us for a day of insightful talks and networking with industry leaders.",
    },
    {
      image: "eve3.jpg",
      title: "Blockchain Summit 2025",
      date: "April 15, 2025",
      time: "9:00 AM - 5:00 PM",
      location: "Mombasa",
      details:
        "Explore the future of blockchain technology at the Blockchain Summit.",
    },
    {
      image: "eve3.jpg",
      title: "Blockchain Summit 2025",
      date: "February 11, 2025",
      time: "9:00 PM - 9:30 PM",
      location: "Mombasa",
      details:
        "Explore the future of blockchain technology at the Blockchain Summit.",
    },
    {
      image: "eve3.jpg",
      title: "Blockchain Summit 2025",
      date: "April 15, 2025",
      time: "9:00 AM - 5:00 PM",
      location: "Mombasa",
      details:
        "Explore the future of blockchain technology at the Blockchain Summit.",
    },
    {
      image: "eve4.jpg",
      title: "Blockchain Summit 2025",
      date: "February 11, 2025",
      time: "9:00 PM - 9:30 PM",
      location: "Mombasa",
      details:
        "Explore the future of blockchain technology at the Blockchain Summit.",
    },
    {
      image: "eve2.jpg",
      title: "Blockchain Summit 2025",
      date: "February 11, 2025",
      time: "9:00 PM - 9:30 PM",
      location: "Mombasa",
      details:
        "Explore the future of blockchain technology at the Blockchain Summit.",
    },
  ]);

  const [inactiveEvents, setInactiveEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const today = new Date();
    const newActiveEvents = [];
    const newInactiveEvents = [];

    events.forEach((event) => {
      const eventDate = new Date(event.date);
      const timeDifference = today - eventDate;
      const daysPassed = timeDifference / (1000 * 60 * 60 * 24);

      if (daysPassed >= 4) {
        return; // Exclude from active events
      } else if (daysPassed >= 2) {
        newInactiveEvents.push(event);
      } else {
        newActiveEvents.push(event);
      }
    });

    setInactiveEvents(newInactiveEvents);
    setEvents(newActiveEvents);
    setLoading(false);
  }, []); // ✅ Removed `events` dependency to prevent infinite re-renders

  const handleEventClick = (event) => {
    const eventDate = new Date(event.date);
    const today = new Date();
    if (today > eventDate) {
      setSelectedEvent(event);
      setModalOpen(true);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingMessage>Loading events...</LoadingMessage>
      ) : (
        <>
          {inactiveEvents.length > 0 && (
            <>
              <H2>
                Past <span>Events</span>
              </H2>
              <PastEventsContainer>
                {inactiveEvents.map((event, index) => (
                  <PastEventCard key={index}>
                    <EventCard event={event} />
                  </PastEventCard>
                ))}
              </PastEventsContainer>
            </>
          )}

          <H2>
            Upcoming <span>Events</span>
          </H2>
          <Container>
            {events.length > 0 ? (
              events.map((event, index) => (
                <EventCard
                  key={index}
                  event={event}
                  onClick={() => handleEventClick(event)}
                />
              ))
            ) : (
              <p>No upcoming events.</p>
            )}
          </Container>

          {modalOpen && (
            <Modal onClose={() => setModalOpen(false)}>
              <h2>Event Passed</h2>
              <p>Wait for a new event to be updated.</p>
            </Modal>
          )}
        </>
      )}
    </>
  );
};

export default EventPro;
