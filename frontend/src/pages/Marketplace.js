import { useEffect, useState } from "react";
import { getSwappableSlots, sendSwapRequest } from "../services/api";

export default function Marketplace() {
  const [slots, setSlots] = useState([]);
  const [mySwappableSlots, setMySwappableSlots] = useState([]);
  const [selectedMySlot, setSelectedMySlot] = useState("");
  const [selectedTheirSlot, setSelectedTheirSlot] = useState("");

  // Fetch swappable slots from other users
  const fetchSlots = async () => {
    try {
      const res = await getSwappableSlots();
      setSlots(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch swappable slots");
    }
  };

  // Fetch your own swappable slots
  const fetchMySlots = async () => {
    try {
      const res = await getSwappableSlots(true); // pass true to get your own slots
      setMySwappableSlots(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch your swappable slots");
    }
  };

  useEffect(() => {
    fetchSlots();
    fetchMySlots();
  }, []);

  // Handle sending swap request
  const handleSwapRequest = async () => {
    if (!selectedMySlot || !selectedTheirSlot) {
      alert("Select both your slot and the other user's slot");
      return;
    }

    try {
      await sendSwapRequest({ mySlotId: selectedMySlot, theirSlotId: selectedTheirSlot });
      alert("Swap request sent!");
      setSelectedMySlot("");
      setSelectedTheirSlot("");
      fetchSlots(); // Refresh list
    } catch (err) {
      console.error(err);
      alert("Failed to send swap request");
    }
  };

  return (
    <div>
      <h2>Marketplace</h2>

      {/* Swappable Slots */}
      <h3>Available Slots</h3>
      <ul>
        {slots.map((slot) => (
          <li key={slot._id}>
            <strong>{slot.title}</strong> | {new Date(slot.startTime).toLocaleString()} -{" "}
            {new Date(slot.endTime).toLocaleString()}
            <button onClick={() => setSelectedTheirSlot(slot._id)}>Select This Slot</button>
          </li>
        ))}
      </ul>

      {/* Your Swappable Slots */}
      <h3>Your Swappable Slots</h3>
      <ul>
        {mySwappableSlots.map((slot) => (
          <li key={slot._id}>
            <strong>{slot.title}</strong> | {new Date(slot.startTime).toLocaleString()} -{" "}
            {new Date(slot.endTime).toLocaleString()}
            <button onClick={() => setSelectedMySlot(slot._id)}>Select This Slot</button>
          </li>
        ))}
      </ul>

      <button onClick={handleSwapRequest}>Send Swap Request</button>
    </div>
  );
}
