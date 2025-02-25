import React, { useState } from 'react';



import './GroupSections.css';
import ContributionDetails from './Contributiondetails';
import MemberDetails from '../tables/Memberdetails';
import AccountDetails from '../money/Accountdetails';

const GroupSections = () => {
  const [showMembers, setShowMembers] = useState(true);
  const [showContributions, setShowContributions] = useState(false);
  const [showBankDetails, setShowBankDetails] = useState(false);

  return (
    <div className="group-sections">
      <button className="section-button" onClick={() => setShowMembers(!showMembers)}>
        {showMembers ? '🔽' : '▶️'} Wanachama wa Kikundi
      </button>
      {showMembers && <MemberDetails />}

      <button className="section-button" onClick={() => setShowContributions(!showContributions)}>
        {showContributions ? '🔽' : '▶️'} Mipangilio ya Michango
      </button>
      {showContributions && <ContributionDetails/>}

      <button className="section-button" onClick={() => setShowBankDetails(!showBankDetails)}>
        {showBankDetails ? '🔽' : '▶️'} Maelezo ya Akaunti ya Benki
      </button>
      {showBankDetails && <AccountDetails />}
    </div>
  );
};

export default GroupSections;
