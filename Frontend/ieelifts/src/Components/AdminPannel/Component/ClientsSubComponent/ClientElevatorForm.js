import React, { useEffect, useState } from "react";
import AnimatedInput from "./ClientsReusableComponent/AnimatedInput";
import ElevatorInput from "./ClientsReusableComponent/ElevatorInput";

const ClientElevatorForm = ({ clientModalInformation }) => {
  const [clientFormData, setClientFormData] = useState({
    pitdepth: clientModalInformation.dimensions.floors[0].shaftWidth,
    purpose: clientModalInformation.dimensions.floors[0].shaftDepth,
    stops: clientModalInformation.dimensions.floors[0].doorWidth,
    doortype: clientModalInformation.dimensions.floors[0].doorHeight,
    numberofopenings:
      clientModalInformation.dimensions.floors[0].floorToFloorHeight,
    fl: clientModalInformation.dimensions.floors[0].fl,
    fr: clientModalInformation.dimensions.floors[0].fr,
    pitPoint: clientModalInformation.dimensions.pitPoint.pitDepth,
    hello: "Raj",
  });

  const hadleInputChnage = (e) => {
    const { name, value } = e.target;
    setClientFormData({ ...clientFormData, [name]: value });


  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setClientFormData((prev) => ({
          ...prev,
          [type]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  console.log("carrr", clientModalInformation.dimensions.floors);

  useEffect(() => {}, [clientFormData]);

  return (
    <div className="client-elevatorform-main">
      {clientModalInformation.dimensions &&
        clientModalInformation?.dimensions?.floors?.map((item) => (
          <div className="patna">
            <div className="basement-form-dimensions">
              <div className="floor-header">
                <div className="floor-heading">Basement 1</div>
                <div className="mmBtn">mm</div>
              </div>
              <hr className="client-form-hr" />

              <div className="dimenstions-container">
                <div className="floor-section">
                  <div className="floor">
                    <div>
                      <div className="floor-input-wrapper">
                        <div>
                          {/* <AnimatedInput
                        label={"Shaft Width"}
                        name={"Shaft Width"}
                      /> */}

                          <ElevatorInput
                            label={"Shaft Width"}
                            name={"Shaft Width"}
                            value={item.shaftWidth}
                            w="12vw"
                          />
                        </div>
                        <div>
                          <ElevatorInput
                            label={"Shaft Depth"}
                            name={"Shaft Depth"}
                            value={item.shaftDepth}
                            w="12vw"
                          />
                        </div>
                        <div>
                          <ElevatorInput
                            label={"Door Width"}
                            name={"Door Width"}
                            value={item.doorWidth}
                            w="12vw"
                          />
                        </div>
                        <div>
                          <ElevatorInput
                            label={"Door Height"}
                            name={"Door Height"}
                            value={item.doorHeight}
                            w="12vw"
                          />
                        </div>
                        <div>
                          <ElevatorInput
                            label={"Floor to Floor Height"}
                            name={"Floor to Floor Height"}
                            value={item.floorToFloorHeight}
                            w="12vw"
                          />
                        </div>
                        <div>
                          <ElevatorInput
                            label={"Pit Depth"}
                            name={"Pit Depth"}
                            value={item.pitDepth}
                            w="12vw"
                          />
                        </div>
                        <div>
                          <ElevatorInput
                            label={"FL"}
                            name={"FL"}
                            value={item.fl}
                            w="12vw"
                          />
                        </div>
                        <div>
                          <ElevatorInput
                            label={"FR"}
                            name={"FR"}
                            value={item.fr}
                            w="12vw"
                          />
                        </div>
                      </div>

                      <div className="site-photos">Site Photos</div>
                      <div className="dimension-btn-wrapper">
                        <label className="dimension-btn">
                          Pit
                          <input
                            className="hidden-input"
                            type="file"
                            onChange={(e) => handleFileChange(e, "pitImage")}
                          />
                        </label>
                        {item.sitePhotos && (
                          <img
                            src={item.sitePhotos}
                            alt="Pit"
                            className="uploaded-image"
                          />
                        )}
                        <div className="dimension-upload-btn">
                          <label className="dimension-btn">
                            <span>
                              Bottom to Top{" "}
                              <input className="hidden-input" type="file" />
                            </span>
                          </label>
                        </div>
                        <div className="dimension-upload-btn">
                          <label className="dimension-btn">
                            <span>
                              {" "}
                              Basement Front{" "}
                              <input className="hidden-input" type="file" />
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ClientElevatorForm;
