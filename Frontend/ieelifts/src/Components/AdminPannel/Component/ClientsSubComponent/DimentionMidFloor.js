import React from 'react'
import TextInput from './ClientsReusableComponent/TextInput'
export const DimentionMidFloor = ({Flevel,handleClick,click,fileNames,handleClickFalse,handleFileChangeInLevel,levelData,handleInputChange}) => {
  return (
   <>
      {Flevel &&
            Flevel.slice(1, -1).map((val, index) => {
              const uniqueKey = `floor-${index}`;
              return (
                <div className="floor-section" key={index}>
                  <div className="floor">
                    <div className="floor-heading floor-margin">{val}</div>
                    <div>
                      <div className="floor-input-wrapper">
                        <div>
                          <TextInput
                            label={"Shaft Width"}
                            name={"shaftWidth"}
                            onFocus={handleClick}
                            value={levelData[index]?.shaftWidth || ""}
                            onChange={(event) =>
                              handleInputChange(index, event)
                            }
                            click={click.shaftWidth}
                            onBlur={handleClickFalse}
                          />
                        </div>
                        <div>
                          <TextInput
                            label={"Shaft Depth"}
                            name={"shaftDepth"}
                            onFocus={handleClick}
                            value={levelData[index]?.shaftDepth || ""}
                            onChange={(event) =>
                              handleInputChange(index, event)
                            }
                            click={click.shaftDepth}
                            onBlur={handleClickFalse}
                          />
                        </div>
                        <div>
                          <TextInput
                            label={"Door Width"}
                            name={"doorWidth"}
                            onFocus={handleClick}
                            value={levelData[index]?.doorWidth || ""}
                            onChange={(event) =>
                              handleInputChange(index, event)
                            }
                            click={click.doorWidth}
                            onBlur={handleClickFalse}
                          />
                        </div>
                        <div>
                          <TextInput
                            label={"Door Height"}
                            name={"doorHeight"}
                            onFocus={handleClick}
                            value={levelData[index]?.doorHeight || ""}
                            onChange={(event) =>
                              handleInputChange(index, event)
                            }
                            click={click.doorHeight}
                            onBlur={handleClickFalse}
                          />
                        </div>
                        <div>
                          <TextInput
                            label={"Floor to Floor Height"}
                            name={"floorToFloorHeight"}
                            onFocus={handleClick}
                            value={levelData[index]?.floorToFloorHeight || ""}
                            onChange={(event) =>
                              handleInputChange(index, event)
                            }
                            click={click.floorToFloorHeight}
                            onBlur={handleClickFalse}
                          />
                        </div>
                        <div className="floor-fl-fr-container">
                          <TextInput
                            label={"FL"}
                            name={"fl"}
                            onFocus={handleClick}
                            value={levelData[index]?.fl || ""}
                            onChange={(event) =>
                              handleInputChange(index, event)
                            }
                            click={click.fl}
                            onBlur={handleClickFalse}
                          />
                          <TextInput
                            label={"FR"}
                            name={"fr"}
                            onFocus={handleClick}
                            value={levelData[index]?.fr || ""}
                            onChange={(event) =>
                              handleInputChange(index, event)
                            }
                            click={click.fr}
                            onBlur={handleClickFalse}
                          />
                        </div>
                      </div>
                      <div className="site-photos">Site Photos</div>
                      <div className="dimension-btn-wrapper">
                        <div>
                          <label
                            className={`dimension-btn ${
                              fileNames[uniqueKey]
                                ? "dimension-btn-background"
                                : ""
                            }`}
                          >
                            <span>Floor Front</span>
                            <img
                              src="./uploadIcon.png "
                              className="upload-icon"
                            />
                            <input
                              className="hidden-input"
                              type="file"
                              onChange={(e) =>
                                handleFileChangeInLevel(e, uniqueKey)
                              }
                            />
                          </label>

                          {fileNames[uniqueKey] && (
                            <div className="file-name">
                              {fileNames[uniqueKey]}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
   </>
  )
}
