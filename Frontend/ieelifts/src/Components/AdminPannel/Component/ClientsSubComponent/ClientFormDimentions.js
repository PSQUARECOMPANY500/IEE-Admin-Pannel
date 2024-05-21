// <-----------------------------  Author:- Rahul Kumar ----------------------------------->
import React, { useState, useEffect, useMemo } from "react";
import AnimatedInput from "./ClientsReusableComponent/AnimatedInput";
import TextInput from "./ClientsReusableComponent/TextInput";
const ClientFormDimentions = ({ valforDimention, Flevel }) => {
  const [len, setLen] = useState();
  const [Basementlen, setBasementLen] = useState();
  const [visible, setVisible] = useState(false);
  const [basementLevel,setBasemnetLevel]=useState([]);
  console.log(Flevel)
  useMemo(() => {
    let count = 0;
    let bLevels =[];
    Flevel.forEach((data) => {
      if (data.includes("Level")) {
        count++;
      }
      if(data.includes("Ground")){
       bLevels.push("Ground")
      }
      if(data.includes("B1")){
       bLevels.push("Basement 1")
      }
      if(data.includes("B2")){
       bLevels.push("Basement 2")
      }
      if(data.includes("Stilt")){
       bLevels.push("Stilt")
      }
    });
    setLen(count);
    
    setBasemnetLevel(bLevels)
  }, [Flevel]);
  const elementsArray = Array.from({ length: len - 1 }, (_, index) => index);
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

  const toggleVisibility = () => {
    setVisible((prev) => !prev);
  };
  

  useEffect(() => {}, [clientFormData]);
  return (
    <div className="client-form-dimensions">
      <h5 className="client-form-details-heading">Dimensions</h5>
      <hr className="client-form-hr" />
      <div className={`dimention-btn ${visible?'hide':''}`} onClick={toggleVisibility}>
        Generate dimensions <img src="generateicon.png" alt="icon" className="generateIcon"/>
      </div>
      {visible && (
        <div className="dimenstions-container">
          {/* basement wrapper */}
          {basementLevel &&
            basementLevel.map((val,index) => {
              return (
                <div className="basement-section" key={index}>
                  <div className="floor-header">
                    <div className="floor-heading">{val}</div>
                    <div className="mmBtn">mm</div>
                  </div>
                  <div className="basement-input-wrapper">
                    <div>
                      <TextInput
                        label={"Shaft Width"}
                        name={"shaftWidth"}
                        onFocus={handleClick}
                        value={clientFormData.shaftWidth}
                        onChange={hadleInputChnage}
                        click={click.shaftWidth}
                        onBlur={handleClickFalse}
                      />
                    </div>
                    <div>
                      <TextInput
                        label={"Shaft Depth"}
                        name={"shaftDepth"}
                        onFocus={handleClick}
                        value={clientFormData.shaftDepth}
                        onChange={hadleInputChnage}
                        click={click.shaftDepth}
                        onBlur={handleClickFalse}
                      />
                    </div>
                    <div>
                      <TextInput
                        label={"Door Width"}
                        name={"doorWidth"}
                        onFocus={handleClick}
                        value={clientFormData.doorWidth}
                        onChange={hadleInputChnage}
                        click={click.doorWidth}
                        onBlur={handleClickFalse}
                      />
                    </div>
                    <div>
                      <TextInput
                        label={"Door Height"}
                        name={"doorHeight"}
                        onFocus={handleClick}
                        value={clientFormData.doorHeight}
                        onChange={hadleInputChnage}
                        click={click.doorHeight}
                        onBlur={handleClickFalse}
                      />
                    </div>
                    <div>
                      <TextInput
                        label={"Floor to Floor Height"}
                        name={"floorToFloorHeight"}
                        onFocus={handleClick}
                        value={clientFormData.floorToFloorHeight}
                        onChange={hadleInputChnage}
                        click={click.floorToFloorHeight}
                        onBlur={handleClickFalse}
                      />
                    </div>
                    <div>
                      <TextInput
                        label={"Pit Depth"}
                        name={"pitDepth"}
                        onFocus={handleClick}
                        value={clientFormData.pitDepth}
                        onChange={hadleInputChnage}
                        click={click.pitDepth}
                        onBlur={handleClickFalse}
                      />
                    </div>
                    <div>
                      <TextInput
                        label={"FL"}
                        name={"fl"}
                        onFocus={handleClick}
                        value={clientFormData.fl}
                        onChange={hadleInputChnage}
                        click={click.fl}
                        onBlur={handleClickFalse}
                      />
                    </div>
                    <div>
                      <TextInput
                        label={"FR"}
                        name={"fr"}
                        onFocus={handleClick}
                        value={clientFormData.fr}
                        onChange={hadleInputChnage}
                        click={click.fr}
                        onBlur={handleClickFalse}
                      />
                    </div>
                  </div>
                  <div className="site-photos">Site Photos</div>
                  <div className="dimension-btn-wrapper">
                  <label className="dimension-btn">
                    Pit
                    <input className="hidden-input" type="file" />
                  </label>
                    <div className="dimension-upload-btn">
                      <label className="dimension-upload-btn">
                     Bottom to Top{" "}<img src="./uploadIcon.png " className="upload-icon" />
                    <input className="hidden-input" type="file" />
                  </label>
                    </div>
                    <div className="dimension-upload-btn">
                    <label className="dimension-upload-btn">
                    Basement Front{" "}<img src="./uploadIcon.png " className="upload-icon" />
                    <input className="hidden-input" type="file" />
                  </label>
                    </div>
                  </div>
                </div>
              );
            })}

          {/* floor start SOLVED*/}
          {elementsArray &&
            elementsArray.map((index) => (
              <div className="floor-section">
                <div className="floor">
                  <div className="floor-heading floor-margin">Floor {index+1}</div>
                  <div>
                    <div className="floor-input-wrapper">
                      <div>
                        <AnimatedInput
                          label={"Shaft Width"}
                          name={"Shaft Width"}
                        />
                      </div>
                      <div>
                        <AnimatedInput
                          label={"Shaft Depth"}
                          name={"Shaft Depth"}
                        />
                      </div>
                      <div>
                        <AnimatedInput
                          label={"Door Width"}
                          name={"Door Width"}
                        />
                      </div>
                      <div>
                        <AnimatedInput
                          label={"Door Height"}
                          name={"Door Height"}
                        />
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
                    <label className="dimension-btn">
                    Floor Front
                    <input className="hidden-input" type="file" />
                  </label>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          {/* floor top SOLVED*/}

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
      )}
    </div>
  );
};

export default ClientFormDimentions;
