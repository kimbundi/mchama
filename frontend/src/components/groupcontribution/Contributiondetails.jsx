import React, { useEffect, useState } from 'react';
import './Contributiondetails.css';

const ContributionDetails = () => {
  const [contributionData, setContributionData] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem('contributionData');
    if (storedData) {
      setContributionData(JSON.parse(storedData));
    }
  }, []);

  if (!contributionData) {
    return <p>Hakuna data ya mchango iliyopatikana.</p>;
  }

  return (
    <div className="contribution-summary">
    

      <div className="summary-box">
        <p><strong>Jina la Mchango:</strong> {contributionData.contributionName || 'Hakuna jibu'}</p>
        <p><strong> Kiasi cha Mchango:</strong> {contributionData.memberContribution || 'Hakuna jibu'}</p>
        <p><strong> Tarehe ya Kuanza:</strong> {contributionData.startDate || 'Hakuna jibu'}</p>
        <p><strong> Utoaji wa Mchango:</strong> 
          {contributionData.frequency === 'month' && ' Mara moja kwa Mwezi'}
          {contributionData.frequency === 'week' && ' Mara moja kwa Wiki'}
          {contributionData.frequency === 'day' && ' Mara moja kwa Siku'}
          {!contributionData.frequency && ' Hakuna jibu'}
        </p>
        <p><strong> Ankara kwa Wanachama:</strong> 
          {contributionData.wish === 'yes' ? ' Ndio' : contributionData.wish === 'no' ? ' Hapana' : ' Hakuna jibu'}
        </p>
      </div>
    </div>
  );
};

export default ContributionDetails;
