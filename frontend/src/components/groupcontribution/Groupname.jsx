import React from 'react';

const Groupname = ({ formData = {} }) => {  // Added default empty object to avoid undefined errors
  return (
    <div className='groupname-summary p-4 bg-gray-100 rounded-2xl shadow-md'>
      <h2 className='text-xl font-semibold mb-4'>📄 Muhtasari wa Kikundi</h2>
      <ul className='space-y-2'>
        <li><strong>Jina la Kikundi:</strong> {formData.groupName || 'Hakuna jibu'}</li>
        <li><strong>Idadi ya Wanachama:</strong> {formData.memberCount || 'Hakuna jibu'}</li>
        <li><strong>Aina ya Kikundi:</strong> {formData.groupType || 'Hakuna jibu'}</li>
        <li><strong>Nafasi Yako:</strong> {formData.organizationRole || 'Hakuna jibu'}</li>
        <li><strong>Kaunti ya Uendeshaji:</strong> {formData.operationCounty || 'Hakuna jibu'}</li>
        <li>
          <strong>Shirika Limeandikishwa?:</strong> {formData.isRegistered === 'yes' ? 'Ndiyo' : formData.isRegistered === 'no' ? 'Hapana' : 'Hakuna jibu'}
        </li>
        {formData.isRegistered === 'yes' && (
          <li><strong>Nambari ya Usajili:</strong> {formData.registrationNumber || 'Hakuna jibu'}</li>
        )}
      </ul>
    </div>
  );
};

export default Groupname;
