import React from 'react';

const SoSEngineersDropdown = ({ EngineerDetails, setSelectedEngineer, selectedEngineer }) => {


    const handleSelectChange = (event) => {
        setSelectedEngineer(event.target.value);
    };

    return (
        <div>
            <select
                id="engineer-dropdown"
                value={selectedEngineer}
                onChange={handleSelectChange}
            >
                <option value="" disabled>Select an engineer</option>
                {EngineerDetails && EngineerDetails.
                    EngineersAvailable && EngineerDetails.
                        EngineersAvailable.map((engineer) => (
                            <option key={engineer.ServiceEnggId} value={engineer.ServiceEnggId}>
                                {engineer.Name + " " + engineer.duration}
                            </option>
                        ))}
            </select>
        </div>
    );
};

export default SoSEngineersDropdown;
