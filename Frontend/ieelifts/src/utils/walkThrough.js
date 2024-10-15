import { walkThroughImages } from "../Walkthrough/WallkthroughImages/index";

export const walkThroughSteps = [

    // {
    //     target: '.walkthrough-screen',
    //     content: 'Welcome to IEE-Admin-Pannel, a comprehensive platform for managing IEE events, resources, and communication.',
    // },
    // {
    //     target: '.user-info',
    //     title: "Admin User",
    //     content: 'EQuick guide to manage user admin setting',

    // },
    // {
    //     target: '.left-side-heading',
    //     title: "Dashboard",
    //     content: 'Navigate seamlessly for maximum efficiency.',

    // },
    // {
    //     target: '#cancelNotification',
    //     title: "Cancel Service Notification",
    //     content: 'Reassign or Modify your service with ease!',
    //     haveImage: true,
    //     image: walkThroughImages.CancleNotifications
    // },
    // {
    //     target: '#notification',
    //     title: "Notification",
    //     content: 'Effortlessly track notification of clients & Engineers.',
    //     haveImage: true,
    //     image: walkThroughImages.Notifications
    // },
    // {
    //     target: '#EngineerCrausel',
    //     title: "Engineers",
    //     content: 'Access a comprehensive list of engineers aligned with services.',

    // },
    // {
    //     target: '.message-icon',
    //     title: "Engineers Conversation",
    //     content: 'Connect instantly with engineers via real-time chat for service related issues.',
    //     haveImage: true,
    //     image: walkThroughImages.Chatbox
    // },
    // {
    //     target: '.tasks-section',
    //     title: "Tasks",
    //     content: 'To manage all the service-related task',

    // },
    // {
    //     target: '.Report-section',
    //     title: "Report",
    //     content: 'Explore the service report for analysing the data',

    // },
    // {
    //     target: '.more-descriptive',
    //     title: "Location",
    //     content: 'Track live location of engineers for improved coordination.',

    // },
    // {
    //     target: '.kanban-button-location',
    //     title: "Kanban view task",
    //     content: 'Utilise the Kanban board to effectively manage tasks.',
    //     haveImage: true,
    //     image: walkThroughImages.kanbanView
    // },
    // {
    //     target: '.child-ticket-div',
    //     title: "Tickets",
    //     content: 'Aligning tasks to engineers &amp; ensuring timely resolution.',

    // },
    // {
    //     target: '.plus-icon',
    //     title: "Assign Task",
    //     content: 'To generate new tickets and assign task to engineers.',
    //     isNavigate: true,
    //     navigateTo: "/Requests",
    //     haveImage: true,
    //     image: walkThroughImages.AddTicketForm
    // },
    // {
    //     target: '#Requests',
    //     title: "Requests",
    //     content: 'Utilising the Request Tab to submit and manage service requests.',
    //     isBack: true,
    //     navigateTo: "/Dashboard"
    // },
    // {
    //     target: '.calender-section',
    //     title: "Service Request Calendar",
    //     content: 'Utilised the calendar features to schedule and manage service request efficiently.',
    // },
    // {
    //     target: '.event-detail-section',
    //     title: "Current date service details",
    //     content: 'Viewing the service requisite and task of the current date.',

    // },
    // {
    //     target: '#RequestTable',
    //     title: "Service Requests",
    //     content: 'Client can easily submit service request.',

    // },
    // {
    //     target: '#ScheduledTable',
    //     title: "Service Scheduled",
    //     content: 'Ensuring timely maintenance and support.',
    //     isNavigate: true,
    //     navigateTo: "/Clients"
    // },
    // {
    //     target: '#Clients',
    //     title: "Clients",
    //     content: 'Access the client tab to manage client information and request.',
    //     isBack: true,
    //     navigateTo: "/Requests"
    // },
    // {
    //     target: '#ClientView',
    //     title: "Clients View",
    //     content: 'To view comprehensive list of clients.',
    // },
    // {
    //     target: '.add-client-button',
    //     title: "Add Client",
    //     content: 'To add the details of new client.',
    //     haveImage: true,
    //     image: walkThroughImages.AddClientForm
    // },
    // {
    //     target: '#ClientViewChange',
    //     title: "Card view",
    //     content: 'Switch to card view for organised display of client details.',
    //     isNavigate: true,
    //     navigateTo: "/Memberships"
    // },
    // {
    //     target: '#Memberships',
    //     title: "Memberships",
    //     content: 'To manage membership details and services.',
    //     isBack: true,
    //     navigateTo: "/Clients"
    // },
    // {
    //     target: '.membershipCards',
    //     title: "Memberships",
    //     content: 'Access the detailed membership information enabling effective management.',
    // },
    // {
    //     target: '#MembershipViewChange',
    //     title: "Memberships (Detailed View)",
    //     content: 'Track live location of engineers for improved coordination.',
    //     isNavigate: true,
    //     navigateTo: "/Engeeniers",
    //     haveImage: true,
    //     image: walkThroughImages.MembershipDetailedView
    // },
    {
        target: '#Engineers',
        title: "Engineers",
        content: 'Access the engineers tab to manage and engage in real time chat in effective communication.',
        isBack: true,
        navigateTo: "/Memberships"
    },
    {
        target: '.EngeeniersCard',
        title: "Engineers Cards",
        content: 'Viewing the details of every engineers.',
    },
    {
        target: '.EngCards',
        title: "Engineers Card",
        content2: "Make a single click on the Card. And wait for next button to arrive"
    },
    {
        target: '.EngeeniersChatF',
        title: "Conversation with Engineer’s",
        content: 'Communicate real-time chatting with engineers.',
    },
    {
        target: '.EngCards',
        title: "Engineers Card",
        content2: "Make a double click on the Card. And wait for next button to arrive"
    },

    {
        target: '.EngeeniersCard',
        title: "Engineers Enlarge View",
        content: 'This is the Detailed view of an engineer.',
    },
    {
        target: '#Task',
        title: "Task Section",
        content: 'Here you can view the task history of an engineer.',
    },
    {
        target: '#Attendence',
        title: "Attendence",
        content: 'Here you can view the attendence and leave history of an eningeer',
    },
    {
        target: '#Rating',
        title: "Rating",
        content: 'Here you can view the rating history of an engineer.',
    },
    {
        target: '#Spare',
        title: "Spare Parts",
        content: 'Here you can view the spare parts carried and sold hostory.',
    },
    {
        target: '#addEnggButton',
        title: "Add Engineer Details",
        content: 'Adding the details of new engineers.',
        isNavigate: true,
        navigateTo: "/SOS",
        haveImage: true,
        image: walkThroughImages.AddEngineerForm
    },
    {
        target: '#sos',
        title: "SOS",
        content: 'Utilise the SOS feature for immediate assistant and support in critical situation.',
        isBack: true,
        navigateTo: "/Engeeniers"
    },
    {
        target: '.main-container_sos',
        title: "SOS",
        content: 'Urgent request from client is raised for ensuring immediate action.',
    },
    {
        target: '.walkthrough-screen-parent',
        title: "THE END",
        content: 'This was END',
    }
];