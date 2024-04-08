import React, { useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import ClientCallBackHis from './ClientCallBackHis';
import { RiArrowDropDownLine } from "react-icons/ri";
import ClientDropDown from './ClientDropDown';


const ClientModal = () => {
  const [showClientModal, setShowClientModal] = useState(true);
  const [dropdowns, setDropdowns] = useState([
    { id: 0, options: ['mail1', 'mail2', 'mali3'], selectedOption: 'mail1', showOptions: false },
    { id: 1, options: ['mail1', 'mail2', 'mali3'], selectedOption: 'mail1', showOptions: false },
    { id: 2, options: ['Service History', 'Call Back History', 'Document', 'SOS Calls'], selectedOption: 'Call Back History', showOptions: false }
]);


  const toggleOptions = (id) => {
    setDropdowns(prevDropdowns =>
      prevDropdowns.map(dropdown =>
        dropdown.id === id ? { ...dropdown, showOptions: !dropdown.showOptions } : dropdown
      )
    );
  };

  const handleOptionClick = (id, option) => {
    setDropdowns(prevDropdowns =>
      prevDropdowns.map(dropdown =>
        dropdown.id === id ? { ...dropdown, selectedOption: option, showOptions: false } : dropdown
      )
    );
  };


  const renderComponent=()=>{

    switch (dropdowns[2].selectedOption) {
      case "Service History":
        return 'h1llo'
      case "Call Back History":
        return <ClientCallBackHis/>
      case "Document":
        return 'h1llo3'
      case "SOS Calls":
        return 'h1ll4'

    }
  }


  return (
    <>
      {showClientModal && <div className='client-modal-wrapper'>
        <div className='client-modal-container'>
          <div className="cross-icon" >
            <RxCross2 />
          </div>
          <div className="client-child-modal-container">
            <div className='client-modal-profile-container'>
              <div className='client-modal-profile-container-left'>
                <div className='client-modal-img-container'></div>
                <div className='client-modal-text-container'>
                  <h5>anuj rawat</h5>
                  <p>2022100</p>
                </div>
              </div>
              <div className='client-modal-profile-container-right'>
                <ClientDropDown
                  key={dropdowns[0].id}
                  options={dropdowns[0].options}
                  selectedOption={dropdowns[0].selectedOption}
                  showOptions={dropdowns[0].showOptions}
                  toggleOptions={() => toggleOptions(dropdowns[0].id)}
                  handleOptionClick={(option) => handleOptionClick(dropdowns[0].id, option)}
                  id={dropdowns[0].id}
                  w={'5rem'}
                />
                <ClientDropDown
                  key={dropdowns[1].id}
                  options={dropdowns[1].options}
                  selectedOption={dropdowns[1].selectedOption}
                  showOptions={dropdowns[1].showOptions}
                  toggleOptions={() => toggleOptions(dropdowns[1].id)}
                  handleOptionClick={(option) => handleOptionClick(dropdowns[1].id, option)}
                  id={dropdowns[1].id}
                  w={'10rem'}
                  />

                <ClientDropDown
                  key={dropdowns[2].id}
                  options={dropdowns[2].options}
                  selectedOption={dropdowns[2].selectedOption}
                  showOptions={dropdowns[2].showOptions}
                  toggleOptions={() => toggleOptions(dropdowns[2].id)}
                  handleOptionClick={(option) => handleOptionClick(dropdowns[2].id, option)}
                  id={dropdowns[2].id}
                  w={'15rem'}
                  />
              </div>
            </div>
            <div className='client-modal-card-container'>
              { renderComponent()}

            </div>
          </div>
        </div>
      </div>}

    </>
  )
}

export default ClientModal