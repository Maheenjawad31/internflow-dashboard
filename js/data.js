const data = {

    groups: [
        {
            id: 1,
            name: "Frontend Team",
            domain: "Frontend",
            description: "Builds responsive and interactive web interfaces."
        },
        {
            id: 2,
            name: "Backend Team",
            domain: "Backend",
            description: "Develops APIs, databases, and server-side features."
        },
        {
            id: 3,
            name: "Design Team",
            domain: "Design",
            description: "Creates user interfaces and visual experiences."
        }
    ],


    interns: [
        {
            id: 1,
            name: "Ayesha Khan",
            email: "ayesha@example.com",
            domain: "Frontend",
            groupId: 1
        },
        {
            id: 2,
            name: "Hamza Ali",
            email: "hamza@example.com",
            domain: "Frontend",
            groupId: 1
        },
        {
            id: 3,
            name: "Sara Ahmed",
            email: "sara@example.com",
            domain: "Backend",
            groupId: 2
        },
        {
            id: 4,
            name: "Usman Tariq",
            email: "usman@example.com",
            domain: "Backend",
            groupId: 2
        },
        {
            id: 5,
            name: "Maham Raza",
            email: "maham@example.com",
            domain: "Design",
            groupId: 3
        },
        {
            id: 6,
            name: "Ali Hassan",
            email: "ali@example.com",
            domain: "Design",
            groupId: 3
        }
    ],


    tasks: [
        {
            id: 1,
            title: "Build responsive landing page",
            week: 1,
            groupId: 1,
            status: "Complete"
        },
        {
            id: 2,
            title: "Create dashboard components",
            week: 2,
            groupId: 1,
            status: "In Progress"
        },
        {
            id: 3,
            title: "Build REST API",
            week: 2,
            groupId: 2,
            status: "Pending"
        },
        {
            id: 4,
            title: "Design database structure",
            week: 2,
            groupId: 2,
            status: "Complete"
        },
        {
            id: 5,
            title: "Create UI wireframes",
            week: 1,
            groupId: 3,
            status: "Complete"
        },
        {
            id: 6,
            title: "Create final UI design",
            week: 2,
            groupId: 3,
            status: "In Progress"
        }
    ]

};


export default data;