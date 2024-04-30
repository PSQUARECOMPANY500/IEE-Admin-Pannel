import React, { useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import ClientCallBackHis from './ClientCallBackHis';
import { RiArrowDropDownLine } from "react-icons/ri";
import ClientDropDown from './ClientDropDown';
import ClientTableView from './ClientTableView';
import "../../Component/ClientsSubComponent/style/clientModal.css"
import MailIcon from '../../../../Assets/Images/mailIon.svg'
import PdfIcon from '../../../../Assets/Images/pdf-icon.png'
import ExcelIcon from '../../../../Assets/Images/execel-icon.png'
import ClientServiceHistory from './ClientServiceHistory';
import ClientDocuments from './ClientDocuments';
import ClientSOSCall from './ClientSOSCall';

const ClientModal = () => {
  const [showClientModal, setShowClientModal] = useState(true);
  const [dropdowns, setDropdowns] = useState([
    { id: 0, options: ['App', 'Message', 'SMS'], pic: MailIcon, selectedOption: 'Mail1', showOptions: false },
    { id: 1, options: ['Warranty', 'Platinum', 'Gold', 'Silver'], defaultName: 'Membership :', pic: MailIcon, selectedOption: 'Warranty', showOptions: false },
    { id: 2, options: ['Service History', 'Call Back History', 'Document', 'SOS Calls'], pic: MailIcon, selectedOption: 'Call Back History', showOptions: false }
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

  const handleCloseModal = () => {
    setShowClientModal(false);
  };



  const renderComponent = () => {

    switch (dropdowns[2].selectedOption) {

      case "Service History":
        return <ClientServiceHistory/>
      case "Call Back History":
        return <ClientCallBackHis />
      case "Document":
        return <ClientDocuments/>
      case "SOS Calls":
        return <ClientSOSCall/>

    }
  }


  return (
    <>
      {showClientModal && <div className='client-modal-wrapper'>
        <div className='client-modal-container'>
          <div className="cross-icon" onClick={handleCloseModal}>
            <RxCross2 />
          </div>
          <div className="client-child-modal-container">
            <div className='client-modal-profile-container'>
              <div className='client-modal-profile-container-left'>
                <div className='client-modal-img-container'>
                  <img

                    src="https://images.unsplash.com/photo-1543965170-e3d16958f280?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="client img"
                  />

                </div>
                <div className='client-modal-text-container'>
                  <h5>Anuj Rawat</h5>
                  <p>2022100</p>
                </div>
              </div>
              <div className='client-modal-profile-container-right'>
              
                <ClientDropDown

                  key={dropdowns[0].id}
                  pic={dropdowns[0].pic}
                  options={dropdowns[0].options}
                  selectedOption={dropdowns[0].selectedOption}
                  showOptions={dropdowns[0].showOptions}
                  toggleOptions={() => toggleOptions(dropdowns[0].id)}
                  handleOptionClick={(option) => handleOptionClick(dropdowns[0].id, option)}
                  id={dropdowns[0].id}
                  w={'7rem'}
                />
                <ClientDropDown
                  key={dropdowns[1].id}
                  defaultName={dropdowns[1].defaultName}
                  options={dropdowns[1].options}
                  selectedOption={dropdowns[1].selectedOption}
                  showOptions={dropdowns[1].showOptions}
                  toggleOptions={() => toggleOptions(dropdowns[1].id)}
                  handleOptionClick={(option) => handleOptionClick(dropdowns[1].id, option)}
                  id={dropdowns[1].id}
                  w={'16rem'}

                />
                <div>
                  <img src={PdfIcon} />
                </div>
                <div>


                  <img src={ExcelIcon} />
                </div>




                <ClientDropDown
                  key={dropdowns[2].id}
                  options={dropdowns[2].options}
                  selectedOption={dropdowns[2].selectedOption}
                  showOptions={dropdowns[2].showOptions}
                  toggleOptions={() => toggleOptions(dropdowns[2].id)}
                  handleOptionClick={(option) => handleOptionClick(dropdowns[2].id, option)}
                  id={dropdowns[2].id}
                  w={'11rem'}
                  color={'#F8AC1DAD'}

                />
              </div>
            </div>
            <div className='client-modal-card-container'>
              {renderComponent()}

            </div>
          </div>
        </div>
      </div>}

    </>
  )
}

export default ClientModal