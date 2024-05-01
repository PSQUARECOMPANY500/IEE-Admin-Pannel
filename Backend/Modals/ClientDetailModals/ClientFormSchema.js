/**
 * <-----------------------------Author:Rahul Kumar---------------1/05/2024------------------------->
 */
const mongoose = require('mongoose');


const clientForm = new mongoose.Schema({
    clientDetails: {
        //First part of the form
        JON: {
            type: String,
            // unique: true
        },
        name: {
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
    salesManDetails: {
        salesmanId: {
            type: Number,
            // required: true
        },
        salesmanName: {
            type: String,
            // required: true
        }
    },
    quotation: {
        quotatedPrice: {
            type: String,
        },
        finalPrice: {
            type: String
        },
        discountInRupees: {
            type: String
        },
        discountInPercentage: {
            type: String
        },
        mdDiscount: {
            discountAmount: {
                type: String
            },
            finalAmount: {
                type: String
            }
        }
    },
    clientMembership: {
        type: String,
        enum: ["Warranty", "Silver", "Gold", "Platnium"],
        // required: true
    },
    documents: {
        signedQuotation: {
            type: String
        },
        paymentForm: {
            type: String
        },
        chequeForm: {
            type: String
        },
        salesOrder: {
            type: String
        },
    },
    architectDetails: {
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
        contractorNumber: {
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
                bottomToTopImages: [
                    {
                        type: String
                    }
                ],
                basementFrontImages: [
                    {
                        type: String
                    }
                ],

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
                bottomToTopImages: [
                    {
                        type: String
                    }
                ],
                overheadImages: [
                    {
                        type: String
                    }
                ],
            }
        },

    }
})

module.exports = mongoose.model("RegisteredElevatorForm", clientForm);