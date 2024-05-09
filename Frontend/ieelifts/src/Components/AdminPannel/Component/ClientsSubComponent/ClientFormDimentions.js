// <-----------------------------  Author:- Rahul Kumar ----------------------------------->
import React, { useState, useEffect } from "react";
import AnimatedInput from "./ClientsReusableComponent/AnimatedInput";
import TextInput from "./ClientsReusableComponent/TextInput";
const ClientFormDimentions = () => {
  const stops = 5;
  const elementsArray = Array.from({ length: stops }, (_, index) => index);

  const [clientFormData, setClientFormData] = useState({
    shaftWidth: "",
    shaftDepth: "",
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

  useEffect(() => {}, [clientFormData]);
  return (
    <div className="client-form-dimensions">
      <h5 className="client-form-details-heading">Dimensions</h5>
      <hr className="client-form-hr" />
      <div className="dimenstions-container">
        <div className="basement-section">
          <div className="floor-header">
            <div className="floor-heading">Basement 1</div>
            <div className="mmBtn">mm</div>
          </div>
          {/* basement wrapper */}
          <div className="basement-input-wrapper">
            <div>
              <TextInput
                label={"Shaft Width"}
                name={"shaftWidth"}
                // name paste here from useState

                onFocus={handleClick}
                // same name paste here from useState
                value={clientFormData.shaftWidth}
                onChange={hadleInputChnage}
                // name paste here from useState
                click={click.shaftWidth}
                onBlur={handleClickFalse}
              />
            </div>
            <div>
              <TextInput
                label={"Shaft Depth"}
                name={"shaftDepth"}
                // name paste here from useState

                onFocus={handleClick}
                // same name paste here from useState
                value={clientFormData.shaftDepth}
                onChange={hadleInputChnage}
                // name paste here from useState
                click={click.shaftDepth}
                onBlur={handleClickFalse}
              />
            </div>
            <div>
              <TextInput
                label={"Door Width"}
                name={"doorWidth"}
                // name paste here from useState

                onFocus={handleClick}
                // same name paste here from useState
                value={clientFormData.doorWidth}
                onChange={hadleInputChnage}
                // name paste here from useState
                click={click.doorWidth}
                onBlur={handleClickFalse}
              />
            </div>
            <div>
              <TextInput
                label={"Door Height"}
                name={"doorHeight"}
                // name paste here from useState

                onFocus={handleClick}
                // same name paste here from useState
                value={clientFormData.doorHeight}
                onChange={hadleInputChnage}
                // name paste here from useState
                click={click.doorHeight}
                onBlur={handleClickFalse}
              />
            </div>
            <div>
            <TextInput
              label={"Floor to Floor Height"}
              name={"floorToFloorHeight"}
              // name paste here from useState

              onFocus={handleClick}
              // same name paste here from useState
              value={clientFormData.floorToFloorHeight}
              onChange={hadleInputChnage}
              // name paste here from useState
              click={click.floorToFloorHeight}
              onBlur={handleClickFalse}
            />
            </div>
            <div>
              <TextInput
                label={"Pit Depth"}
                name={"pitDepth"}
                // name paste here from useState

                onFocus={handleClick}
                // same name paste here from useState
                value={clientFormData.pitDepth}
                onChange={hadleInputChnage}
                // name paste here from useState
                click={click.pitDepth}
                onBlur={handleClickFalse}
              />
            </div>
            <div>
            <TextInput
                label={"FL"}
                name={"fl"}
                // name paste here from useState

                onFocus={handleClick}
                // same name paste here from useState
                value={clientFormData.fl}
                onChange={hadleInputChnage}
                // name paste here from useState
                click={click.fl}
                onBlur={handleClickFalse}
              />
            </div>
            <div>
            <TextInput
                label={"FR"}
                name={"fr"}
                // name paste here from useState

                onFocus={handleClick}
                // same name paste here from useState
                value={clientFormData.fr}
                onChange={hadleInputChnage}
                // name paste here from useState
                click={click.fr}
                onBlur={handleClickFalse}
              />
            </div>
          </div>
          <div className="site-photos">Site Photos</div>
          <div className="dimension-btn-wrapper">
            <div className="dimension-btn">Pit</div>
            <div className="dimension-upload-btn">
              <span>
                Bottom to Top{" "}
                <img src="./uploadIcon.png " className="upload-icon" />
              </span>
            </div>
            <div className="dimension-upload-btn">
              <span>
                {" "}
                Basement Front{" "}
                <img src="./uploadIcon.png" className="upload-icon" />
              </span>
            </div>
          </div>
        </div>
        {/* floor start */}
        {elementsArray.map((index) => (
          <div className="floor-section">
            <div className="floor">
              <div className="floor-heading floor-margin">Floor 1</div>
              <div>
                <div className="floor-input-wrapper">
                  <div>
                    <AnimatedInput label={"Shaft Width"} name={"Shaft Width"} />
                  </div>
                  <div>
                    <AnimatedInput label={"Shaft Depth"} name={"Shaft Depth"} />
                  </div>
                  <div>
                    <AnimatedInput label={"Door Width"} name={"Door Width"} />
                  </div>
                  <div>
                    <AnimatedInput label={"Door Height"} name={"Door Height"} />
                  </div>
                  <div>
                    <AnimatedInput
                      label={"Floor to Floor Height"}
                      name={"Floor to Floor Height"}
                    />
                  </div>
                  <div className="floor-fl-fr-container">
                    <AnimatedInput label={"FL"} name={"FL"} />
                    <AnimatedInput label={"FR"} name={"FR"} />
                  </div>
                </div>
                <div className="site-photos">Site Photos</div>
                <div className="dimension-btn-wrapper">
                  <div className="dimension-btn">Floor Front</div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* floor top */}

        <div className="floor-section">
          <div className="floor">
            <div className="floor-heading floor-margin">Floor Front</div>
            <div>
              <div className="floor-input-wrapper">
                <div>
                  <AnimatedInput label={"Shaft Width"} name={"Shaft Width"} />
                </div>
                <div>
                  <AnimatedInput label={"Shaft Depth"} name={"Shaft Depth"} />
                </div>
                <div>
                  <AnimatedInput label={"Door Width"} name={"Door Width"} />
                </div>
                <div>
                  <AnimatedInput label={"Door Height"} name={"Door Height"} />
                </div>
              </div>
              <div className="overhead-input">
                <AnimatedInput label={"Overhead (opt)"} name={"Overhead"} />
              </div>
              <div className="site-photos">Site Photos</div>
              <div className="dimension-btn-wrapper">
                <label className="dimension-btn">
                  Floor Front
                  <input className="hidden-input" type="file" />
                </label>
                <div className="dimension-upload-btn">
                  <span>
                    Top to Bottom{" "}
                    <img src="./uploadIcon.png " className="upload-icon" />
                  </span>
                </div>
                <div className="dimension-upload-btn">
                  <span>
                    {" "}
                    Overhead{" "}
                    <img src="./uploadIcon.png" className="upload-icon" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientFormDimentions;
