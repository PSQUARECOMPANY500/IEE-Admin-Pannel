/**
 * <-----------------------------Author:Rahul Kumar---------------1/05/2024------------------------->
 */
const mongoose = require('mongoose');


const clientForm = new mongoose.Schema({
    clientFormDetails: {
        //First part of the form
        jon: {
            type: String,
            // unique: true
        },
        userName: {
            type: String,
            // required: true
        },
        phoneNumber: {
            type: String,
            // required: true
        },
        alternativeNumber: {
            type: String
        },
        email: {
            type: String,
            // required: true
        },
        sourceOfLead: {
            type: String,
            // required: true
        },
        reference: {
            type: String
        },
        referenceName: {
            type: String
        }
    },
    clientSalesManDetails: {
        salesmanId: {
            type:String
            // required: true
        },
        salesmanName: {
            type:String
            // required: true
        },

        discountAmount: {
            type:String,
            // required: true
        },
        discountInPercentage: {
            type:String,
            // required: true
        },
        discountInRupees: {
            type:String,
            // required: true
        },
        finalAmount: {
            type:String,
            // required: true
        },
        finalPrice: {
            type:String,
            // required: true
        },
        quotatedPrice: {
            type:String,
            // required: true
        },
    

    },
    clientMembershipDocument: {
        selectedMembership:{
        type: String,
        enum: ["Warranty", "Silver", "Gold", "Platnium"],
        // required: true}
    },paymentForm:{
        type:String,
    },
    chequeForm:{
        type:String
    },
    salesOrder:{
        type:String
    },
    signedQuotation:{
        type:String
    },
    },
    
    clientArchitect: {
        architectName: {
            type: String,
            // required: true
        },
        architectNumber: {
            type: String,
            // required: true
        },
        contractorName: {
            type: String,
            // required: true
        },
        name: {
            type: String,
            // required: true
        },
    },

    //Second part of the form start

    elevatorDetails: {
        pitDepth: {
            type: String
        },
        type: {
            type: String
        },
        purpose: {
            type: String
        },
        capacity: {
            type: String
        },
        capacityUnit: {
            type: String
        },
        stops: {
            numberOfStops: {
                type: Number
            },
            Basement: [{
                type: String,
                enum: ["B1", "B2"]
            }],
            FloorType: {
                type: String,
                enum: ["G", "S"]
            }
        },
        doorType: {
            type: String
        },
        constructionMaterial: {
            type: String
        },
        numberOfOpenings: {
            type: String
        },
        sideOpening: [
            {
                type: String,
                enum: ["180d", "90dL", "90dR"]
            }
        ]
        ,
        levelOpening: [
            {
                level: {
                    type: String
                },
                opening: [
                    {
                        type: String,
                        enum: ["original", "180d", "90dL", "90dR"]
                    }
                ]
            }
        ]
        ,
        remarks: {
            type: String
        }

    }
    //third part of the form
    ,
    dimensions: {
        pitPoint: {
            levelName: {
                type: String
            },
            shaftWidth: {
                type: String
            },
            shaftDepth: {
                type: String
            },
            doorWidth: {
                type: String
            },
            doorHeight: {
                type: String
            },
            floorToFloorHeight: {
                type: String
            },
            pitDepth: {
                type: String
            },
            FL: {
                type: String
            },
            FR: {
                type: String
            },
            sitePhotos: {
                pitImage: {
                    type: String
                },
                bottomToTopImages:
                {
                    type: String
                }
                ,
                basementFrontImages:
                {
                    type: String
                }
                ,

            }
        },
        floors: [
            {
                levelName: {
                    type: String
                },
                shaftWidth: {
                    type: String
                },
                shaftDepth: {
                    type: String
                },
                doorWidth: {
                    type: String
                },
                doorHeight: {
                    type: String
                },
                floorToFloorHeight: {
                    type: String
                },
                fl: {
                    type: String
                },
                fr: {
                    type: String
                },
                sitePhotos: {
                    type: String
                },
            }
        ],
        topPoint: {
            levelName: {
                type: String
            },
            shaftWidth: {
                type: String
            },
            shaftDepth: {
                type: String
            },
            doorHeight: {
                type: String
            },
            doorWidth: {
                type: String
            },
            overhead: {
                type: String
            },
            sitePhotos: {
                floorFront: {
                    type: String
                },
                bottomToTopImages:
                {
                    type: String
                }
                ,
                overheadImages:
                {
                    type: String
                }
                ,
            }
        },

    }
})

module.exports = mongoose.model("RegisteredElevatorForm", clientForm);