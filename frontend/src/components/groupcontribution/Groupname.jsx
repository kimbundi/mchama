import React, { useContext, useEffect, useState } from 'react';
import { storeContext } from '../../context/Storecontext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Groupname = () => {
  const { url } = useContext(storeContext);
  const [latestGroup, setLatestGroup] = useState(null);

  const fetchLatestGroup = async () => {
    try {
      const response = await axios.get(`${url}/api/group/list?timestamp=${new Date().getTime()}`);
      console.log("API Response:", response.data.data); // Debugging step

      if (response.data.success && response.data.data.length > 0) {
        const sortedList = [...response.data.data].sort((a, b) => b.groupid - a.groupid);
        console.log("Sorted List:", sortedList); // Debugging step
        setLatestGroup(sortedList[0]); // Correctly updating state
      } else {
        toast.error("No group data available");
      }
    } catch (error) {
      toast.error("Error fetching group: " + (error.response?.data?.message || error.message));
    }
  };

  useEffect(() => {
    fetchLatestGroup(); // Fetch initially
    const interval = setInterval(fetchLatestGroup, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [url]); // Dependency array to refetch if `url` changes

  return (
    <div>
      {latestGroup ? (
        <div>
          <p><strong> Jina la Kikundi:</strong> {latestGroup.groupName || 'Hakuna jibu'}</p>
          <p><strong> Idadi ya Wanachama:</strong> {latestGroup.memberCount || 'Hakuna jibu'}</p>
          <p><strong> Aina ya Kikundi:</strong> {latestGroup.groupType || 'Hakuna jibu'}</p>
          <p><strong> Nafasi Yako katika Shirika:</strong> {latestGroup.organizationRole || 'Hakuna jibu'}</p>
          <p><strong> Kaunti ya Uendeshaji:</strong> {latestGroup.operationCounty || 'Hakuna jibu'}</p>
          <p><strong> Je, shirika limeandikishwa?:</strong> 
            {latestGroup.isRegistered === 'yes' ? 'Ndio' : latestGroup.isRegistered === 'no' ? 'Hapana' : 'Hakuna jibu'}
          </p>
          {latestGroup.isRegistered === 'yes' && (
            <p><strong> Nambari ya Usajili:</strong> {latestGroup.registrationNumber || 'Hakuna jibu'}</p>
          )}
        </div>
      ) : (
        <p>Loading latest group...</p>
      )}
      <button onClick={fetchLatestGroup} style={{ marginTop: '10px', padding: '5px 10px', cursor: 'pointer' }}>
        Refresh Data
      </button>
    </div>
  );
};

export default Groupname;
