import EventCard from "./EventCard";

const EventPro = () => {
  const event1 = {
    image: "eve2.jpg",
    title: "Tech Conference 2025",
    date: "March 10, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "New York Convention Center",
    details:
      "Join us for a day of insightful talks and networking with industry leaders. The event will cover the latest advancements in technology and provide opportunities for growth and learning.",
  };

  const event2 = {
    image: "eve3.jpg",
    title: "Blockchain Summit 2025",
    date: "April 15, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "San Francisco Tech Hub",
    details:
      "Explore the future of blockchain technology at the Blockchain Summit. Learn from top experts, and discover how blockchain is transforming industries worldwide.",
  };

  return (
    <div>
      <EventCard event={event1} />
      <EventCard event={event2} />
    </div>
  );
};

export default EventPro;
