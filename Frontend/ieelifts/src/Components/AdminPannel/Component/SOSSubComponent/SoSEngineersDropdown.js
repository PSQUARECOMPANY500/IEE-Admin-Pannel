import React from 'react';

const SoSEngineersDropdown = ({ EngineerDetails, setSelectedEngineer, selectedEngineer }) => {
    const handleSelectChange = (event) => {
        setSelectedEngineer(event.target.value);
    };

    return (
        <div>
            <select
                id="engineer-dropdown"
                value={selectedEngineer || ''}
                onChange={handleSelectChange}
                disabled={!EngineerDetails?.EngineersAvailable?.length} // Disable if no engineers available
            >
                <option value="" disabled hidden>
                    {EngineerDetails?.EngineersAvailable?.length ? 'Select an engineer' : EngineerDetails?.message || 'No engineers available'}
                </option>
                {EngineerDetails?.EngineersAvailable?.length > 0 &&
                    EngineerDetails.EngineersAvailable.map((engineer) => (
                        <option key={engineer.ServiceEnggId} value={engineer.ServiceEnggId}>
                            {engineer.Name + " " + engineer.duration}
                        </option>
                    ))
                }
            </select>
        </div>
    );
};

export default SoSEngineersDropdown;
