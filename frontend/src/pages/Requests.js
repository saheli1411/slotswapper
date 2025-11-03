import React, { useEffect, useState } from 'react';
import API from '../services/api';

function Requests() {
  const [incoming, setIncoming] = useState([]);
  const [outgoing, setOutgoing] = useState([]);

  const fetchRequests = async () => {
    try {
      const res = await API.get('/swap-requests'); // We'll create this endpoint
      setIncoming(res.data.incoming);
      setOutgoing(res.data.outgoing);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => { fetchRequests(); }, []);

  const respondSwap = async (requestId, accept) => {
    try {
      await API.post(`/swap-response/${requestId}`, { accept });
      fetchRequests();
      alert(`Swap ${accept ? 'accepted' : 'rejected'}!`);
    } catch (err) {
      alert(err.response.data.message || 'Error responding');
    }
  };

  return (
    <div>
      <h2>Incoming Requests</h2>
      <ul>
        {incoming.map(r => (
          <li key={r._id}>
            Offer: {r.mySlot.title} → Your Slot: {r.theirSlot.title} 
            [Status: {r.status}]
            {r.status === 'PENDING' && (
              <>
                <button onClick={() => respondSwap(r._id, true)}>Accept</button>
                <button onClick={() => respondSwap(r._id, false)}>Reject</button>
              </>
            )}
          </li>
        ))}
      </ul>

      <h2>Outgoing Requests</h2>
      <ul>
        {outgoing.map(r => (
          <li key={r._id}>
            Your Slot: {r.mySlot.title} → Their Slot: {r.theirSlot.title} 
            [Status: {r.status}]
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Requests;
