import { useContext, useEffect, useState } from "react";
import { storeContext } from "../../context/Storecontext";

const GroupDetails = ({ groupId }) => {
    const { url, list } = useContext(storeContext);
    const [groupData, setGroupData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [finalGroupId, setFinalGroupId] = useState(groupId || null); // Set default groupId

    useEffect(() => {
        // If groupId is not provided, get it from list[0]
        if (!finalGroupId && list.length > 0) {
            setFinalGroupId(list[0]); 
        }
    }, [list, finalGroupId]); // Runs if list updates

    useEffect(() => {
        if (!finalGroupId) return;

        const fetchGroupDetails = async () => {
            try {
                const response = await fetch(`${url}/api/all/list/${finalGroupId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`, 
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch group details");
                }

                const data = await response.json();
                setGroupData(data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGroupDetails();
    }, [finalGroupId, url]); // Fetches data when `finalGroupId` is set

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="group-details">
            <h2>Group: {groupData?.group?.groupName || "N/A"}</h2>
            <p>Group Type: {groupData?.group?.groupType || "N/A"}</p>
            <p>Member Count: {groupData?.group?.memberCount || "N/A"}</p>
            <p>Organizational Role: {groupData?.group?.organizationRole || "N/A"}</p>
            <p>Operation County: {groupData?.group?.operationCounty || "N/A"}</p>

            <h3>Members:</h3>
            <ul>
                {groupData?.members?.map((member) => (
                    <li key={member._id}>
                        {member.name} - {member.role} ({member.phone})
                    </li>
                )) || <p>No members added</p>}
            </ul>

            <h3>Banks:</h3>
            <ul>
    {groupData?.banks?.length > 0 ? (
        groupData.banks.map((bank) => (
            <li key={bank._id}>
                <strong>Provider:</strong> {bank.provider} <br />
                <strong>Account Name:</strong> {bank.moneyAccountName} <br />
                <strong>Account Number:</strong> {bank.moneyAccountNumber}
            </li>
        ))
    ) : (
        <li>No bank accounts added</li> // Correctly renders inside <ul>
    )}
</ul>


            <h3>Contributions:</h3>
            <ul>
                {groupData?.contributions?.map((contribution) => (
                    <li key={contribution._id}>
                        {contribution.contributionName} (Frequency: {contribution.frequency})
                        (Startdate: {contribution.startDate})
                        (MemberContribution: {contribution.memberContribution})
                    </li>
                )) || <p>No contributions added</p>}
            </ul>
        </div>
    );
};

export default GroupDetails;
