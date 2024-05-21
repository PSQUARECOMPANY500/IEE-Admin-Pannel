import React from "react";
import AnimatedInput from "./ClientsReusableComponent/AnimatedInput";

const ClientElevatorForm = ({ w }) => {
  return (
    <div className="client-elevatorform-main">
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
                      <AnimatedInput label={"Door Width"} name={"Door Width"} />
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
                    <div>
                      <AnimatedInput label={"Pit Depth"} name={"Pit Depth"} />
                    </div>
                    <div>
                      <AnimatedInput label={"FL"} name={"FL"} />
                    </div>
                    <div>
                      <AnimatedInput label={"FR"} name={"FR"} />
                    </div>
                  </div>

                  <div className="site-photos">Site Photos</div>
                  <div className="dimension-btn-wrapper">
                    <label className="dimension-btn">
                      Pit
                      <input className="hidden-input" type="file" />
                    </label>
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

      <div className="patna">
        <div className="basement-form-dimensions">
          <div className="floor-header">
            <div className="floor-heading">Floor 1</div>
            <div className="mmBtn">mm</div>
          </div>
          <hr className="client-form-hr" />

          <div className="dimenstions-container">
            <div className="floor-section">
              <div className="floor">
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
                      <AnimatedInput label={"Door Width"} name={"Door Width"} />
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
                      Pit
                      <input className="hidden-input" type="file" />
                    </label>
                    <div className="dimension-upload-btn">
                      <label className="dimension-btn">
                        <span>Bottom to Top</span>
                        <input className="hidden-input" type="file" />
                      </label>
                    </div>
                    <div className="dimension-upload-btn">
                      <label className="dimension-btn">
                        <span>Basement Front</span>
                        <input className="hidden-input" type="file" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="delhi">
        <div className="patna">
          <div className="basement-form-dimensions">
            <div className="floor-header">
              <div className="floor-heading">Floor 2</div>
              <div className="mmBtn">mm</div>
            </div>
            <hr className="client-form-hr" />

            <div className="dimenstions-container">
              <div className="floor-section">
                <div className="floor">
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
                        Pit
                        <input className="hidden-input" type="file" />
                      </label>
                      <div className="dimension-upload-btn">
                        <label className="dimension-btn">
                          <span>Bottom to Top</span>
                          <input className="hidden-input" type="file" />
                        </label>
                      </div>
                      <div className="dimension-upload-btn">
                        <label className="dimension-btn">
                          <span>Basement Front</span>
                          <input className="hidden-input" type="file" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="delhi">
        <div className="patna">
          <div className="basement-form-dimensions">
            <div className="floor-header">
              <div className="floor-heading">Floor Top</div>
              <div className="mmBtn">mm</div>
            </div>
            <hr className="client-form-hr" />

            <div className="dimenstions-container">
              <div className="floor-section">
                <div className="floor">
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

                      

                      <div className="rrr">
                        <AnimatedInput
                          label={"Overhead (opt)"}
                          name={"Overhead"}
                          
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
                        <label className="dimension-btn">
                          <span>Bottom to Top</span>
                          <input className="hidden-input" type="file" />
                        </label>
                      </div>
                      <div className="dimension-upload-btn">
                        <label className="dimension-btn">
                          <span>Basement Front</span>
                          <input className="hidden-input" type="file" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientElevatorForm;
