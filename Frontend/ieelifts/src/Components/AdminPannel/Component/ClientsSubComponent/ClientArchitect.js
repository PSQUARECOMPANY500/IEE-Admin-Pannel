// <-----------------------------  Author:- Rahul kumar ----------------------------------->
import React,{useState,useEffect} from 'react';
import AnimatedInput from './ClientsReusableComponent/AnimatedInput';
import Clientbutton from './ClientsReusableComponent/Clientbutton';
import TextInput from './ClientsReusableComponent/TextInput';
const ClientArchitect = () => {
  const [clientFormData, setClientFormData] = useState({ architectName:'',architectNumber:'',contractorName:'',name:''
});
const [click, setClick] = useState({});
const hadleInputChnage = (e) => {
  const { name, value } = e.target;
  setClientFormData({ ...clientFormData, [name]: value });
};

const handleClick = (e) => {
  const { name } = e.target;
  setClick({ ...click, [name]: true });
};

const handleClickFalse = (e) => {
  const { name } = e.target;
  setClick({ ...click, [name]: false });
};

useEffect(() => {
}, [clientFormData]);

  return (
    <div className='client-architect'>
       <h5 className='client-form-details-heading'>Architect Details</h5>
      <hr className='client-form-hr' />
      <div className='client-architect-container client-form-input-wrapper'>
      <div>
      <TextInput
            label={"Architect Name"}
            name={"architectName"}
            // name paste here from useState

            onFocus={handleClick}
            // same name paste here from useState
            value={clientFormData.architectName}
            onChange={hadleInputChnage}
            // name paste here from useState
            click={click.architectName}
            onBlur={handleClickFalse}
          />
        </div>
      <div>
      <TextInput
            label={"Number"}
            name={"architectNumber"}
            // name paste here from useState

            onFocus={handleClick}
            // same name paste here from useState
            value={clientFormData.architectNumber}
            onChange={hadleInputChnage}
            // name paste here from useState
            click={click.architectNumber}
            onBlur={handleClickFalse}
          />
        </div>
      <div>
      <TextInput
            label={"Contractor Name"}
            name={"contractorName"}
            // name paste here from useState

            onFocus={handleClick}
            // same name paste here from useState
            value={clientFormData.contractorName}
            onChange={hadleInputChnage}
            // name paste here from useState
            click={click.contractorName}
            onBlur={handleClickFalse}
          />
        </div>
      <div>
      <TextInput
            label={"Name"}
            name={"name"}
            // name paste here from useState

            onFocus={handleClick}
            // same name paste here from useState
            value={clientFormData.name}
            onChange={hadleInputChnage}
            // name paste here from useState
            click={click.name}
            onBlur={handleClickFalse}
          />
        </div>
      </div>
   
    </div>
  );
};

export default ClientArchitect;