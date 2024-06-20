const message = require("../Modals/ChatModel/MessageModal");
const Referal = require("../Modals/ClientDetailModals/ClientReferalSchema");
const Notification = require("../Modals/NotificationModal/notificationModal.js");
const engineerRating = require("../Modals/Rating/Rating");
const ReportInfoModel = require("../Modals/ReportModal/ReportModal.js");
const AssignEnggService = require("../Modals/ServiceEngineerModals/AssignCallbacks");
const AssignSecheduleRequest = require("../Modals/ServiceEngineerModals/AssignServiceRequest");
const EnggAttendanceServiceRecord = require("../Modals/ServiceEngineerModals/Attendance");
const EnggLeaveServiceRecord = require("../Modals/ServiceEngineerModals/EnggLeaveSchema");
const serviceRequest = require("../Modals/ServicesModal/ClientServicesRequest");
const CallbackRequests = require("../Modals/ServicesModal/ClinetCallback.js");
const SpearPartsRequested = require("../Modals/SpearParts/SparePartRequestModel");

// const admin = require("firebase-admin");





// serviceAccount  = {
//     "type": "service_account",
//     "project_id": "ieelifts-d3155",
//     "private_key_id": "252d099f8fa4cf72331feca129daf24c5c4dc45d",
//     "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC9+GS/Vm3igyqK\nwI33G87R2gFWn070fdXrMSSPivmgXtwv9dRr4fJqFaULdGN3IpVvyqPwbKFWxM7J\nHeTmGsKSk+9MZpYf3az0qW+h6qBTzVnSfG4osZLRERy8iikK9I84r48tKGB/1j29\nf2KYg36ol0BEX4ciY5t6AUv9sfRB+hfQv0SesWcxxzMR6FzboPVRT40yQo5V0tPF\ntGdTfeD5X44Yet4hbi3O2lld/on6oUdlfWAfRf0CofNaQFuwI7hN8Fim/yZOSkne\ngpQHgGZDPg1tI451f47xGcH45kXRA0/v/Ab8eXpNWGS2iZ9wxCaS9oHJeaHXWGGg\nT5/hR3+JAgMBAAECggEAFcpQLsJd3bA986cdTE2cQ5CbZrGPVOwPhZLK0Xbs0JW7\nm/oOtkaMj9k7vTyfIXiOEOylhrEZ2zdn9hm/um/csa4rsg/HreViLrjgsn8/NLLx\nV/t93J0XF3QRtRlZQTBxh9xbXUqsXFLZciBn0XwDze12Kbbra+kRBHBG+dVXty7N\nmbuL7V/LYsdGOXMYHZyUjzaxVj7coWzQjiRtB/tA1b6pQdh5935qYF+wT2XEHGQu\noc98rqkjJ1OTAWQAQbrro0AHvJTzFN5Id3aSBs7ncGSMKgArWp7c5fCjDeCDvTct\n5wUatpncA9X9D7GuS0hUsud99wfo1nCGIKQsH5T4oQKBgQD946ct+jH+IyPY3C4H\nGKgOlU6i/aRDBg1RUiQCINAN+8ZFZoLBG3Xf7SK12yebxhXF9N0QQUVTRydJM7GG\nWugzGaiHppdGbCok9WqPC8AUCfV8K1Nqtby1voErW+NPn8A4wjaMeWKSqhYBe3sG\no3za5YZdjSJWsQEJP8wsN2Bq9wKBgQC/jLQAizdHjPVSYBejBNU6m0qLgHCbwvaS\nVW0kkjQy2r51z8mUFE4mJapbWK1mjIg5Zz7r8iV4lkoXaREAi8sX7a9sIjXB8bLl\nmapy9KLd6sbSsQBcOusA/dPDnbUUmd6LwJp3HdwPZrXHkQIiH2twhyd2SiBECCUm\n73bwZx5JfwKBgQDiGec8buAurySxcAQdlbu0oQsS5Edw2ObrUPd4Xbhre5krHQu8\n5bOn5AtRYQZ5F4M0c8ibPUV70JYP/tVODY9UUrlfdOCrepBdsaFgGtrH/cZ8+iij\nk42nXSyzbHWW53HMGklx+HfsnURTtZ/uXZJHbrimf5XhFmkRz5sIlZhsKQKBgQCx\nRlnsyusNOCJu62nUwItK4x+ZffQ547Tpd1A8cWcHzbRJOlX3ytcMrP097xMD/nmw\njqIIIaGWOZk2k1Fd7QK4EYyxifOwm60SmyXJoCj/MuJxacjIkuqdj0ymFNXazBDP\nzB/or+TTCB6iJM0RoXyAt0TJUA8Oh29C2op8MSMxpwKBgGsLdXefzE6Au7qojkTJ\nR+J1i+OS/APkHXxZexikiZTxgWLr+0eUNkS1u8/+BnarwGv8+lhFuKxSk4xitWLR\nVvC6xvwSEMGQ6ZjlVSFwZivUCqIdpj9sYsSTUpE23IjYB4HLXZBwQCnLa6YZAaG/\nxH7HpvimBjlHLh92cWzHocpe\n-----END PRIVATE KEY-----\n",
//     "client_email": "firebase-adminsdk-zjw6f@ieelifts-d3155.iam.gserviceaccount.com",
//     "client_id": "113576115845138570846",
//     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//     "token_uri": "https://oauth2.googleapis.com/token",
//     "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//     "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-zjw6f%40ieelifts-d3155.iam.gserviceaccount.com",
//     "universe_domain": "googleapis.com"
//   }
  
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//   });

// 

module.exports.watchNotifications = async (io) => {
    {/* Engg Notification */ }
    EnggLeaveServiceRecord.watch().on('change', data => {
        console.log("EnggLeaveServiceRecord")
        const Data = JSON.stringify({ time: data.wallTime, data: data.fullDocument });
        const owner = ["Engg"];
        if( data.fullDocument){
            saveNotification(owner, Data, io);
        }
    });
    CallbackRequests.watch().on('change', data => {
        console.log("CallbackRequests")

        const Data = JSON.stringify({ time: data.wallTime, data: data.fullDocument });
        const owner = ["Client"];
        if( data.fullDocument){
            saveNotification(owner, Data, io);
        }
    });
    EnggAttendanceServiceRecord.watch().on('change', data => {
        console.log("EnggAttendanceServiceRecord")

        const Data = JSON.stringify({ time: data.wallTime, data: data.fullDocument });
        const owner = ["Engg"];
        if( data.fullDocument){
            saveNotification(owner, Data, io);
        }
    });
    ReportInfoModel.watch().on('change', data => {
        console.log("Report")

        const Data = JSON.stringify({ time: data.wallTime, data: data.fullDocument });
        const owner = ["Engg"];
        if( data.fullDocument){
            saveNotification(owner, Data, io);
        }
    });
    AssignEnggService.watch().on('change', data => {
        console.log("AssignEnggService")

        const Data = JSON.stringify({ time: data.wallTime, data: data.fullDocument });
        const owner = ["Engg", "Client"];
        if( data.fullDocument){
            saveNotification(owner, Data, io);
        }
    });
    AssignSecheduleRequest.watch().on('change', data => {
        console.log("AssignSecheduleRequest")

        const Data = JSON.stringify({ time: data.wallTime, data: data.fullDocument });
        const owner = ["Engg", "Client"];
        if( data.fullDocument){
            saveNotification(owner, Data, io);
        }
    });
    SpearPartsRequested.watch().on('change', data => {
        console.log("SpearPartsRequested")

        const Data = JSON.stringify({ time: data.wallTime, data: data.fullDocument });
        const owner = ["Engg"];
        if( data.fullDocument){
            saveNotification(owner, Data, io);
        }
    });
    serviceRequest.watch().on('change', data => {
        console.log("serviceRequest")

        const Data = JSON.stringify({ time: data.wallTime, data: data.fullDocument });
        const owner = ["Client"];
        if( data.fullDocument){
            saveNotification(owner, Data, io);
        }
    });
    message.watch().on('change', data => {
        console.log("message")

        const Data = JSON.stringify({ time: data.wallTime, data: data.fullDocument });
        const owner = ["Engg"];
        if( data.fullDocument){
            saveNotification(owner, Data, io);
        }
    });

    {/* client Notification */ }
    Referal.watch().on('change', data => {
        console.log("Referal")

        const Data = JSON.stringify({ time: data.wallTime, data: data.fullDocument });
        const owner = ["Client"];
        if( data.fullDocument){
            saveNotification(owner, Data, io);
        }
    });
    engineerRating.watch().on('change', data => {
        console.log("engineerRating")

        const Data = JSON.stringify({ time: data.wallTime, data: data.fullDocument });
        const owner = ["Client"];
        if( data.fullDocument){
            saveNotification(owner, Data, io);
        }
    });
};


const saveNotification = async (owner, data, io) => {
    try {
        if (owner && data) {
            await Notification.create({
                Owner: owner,
                Data: data
            })
            //io.emit('notification', response)
        }
    }
    catch (err) {
        console.log("error in notification", err)
    }
}