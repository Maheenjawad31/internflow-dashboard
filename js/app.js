import data from "./data.js";

import {
    renderStats,
    renderDashboardGroups,
    renderTaskOverview,
    renderGroups,
    renderMembers,
    renderTasks,
    populateGroupFilter
} from "./ui.js";


// ========================================
// Persistent Task Data
// ========================================

const savedTasks =
    localStorage.getItem("internflowTasks");

if (savedTasks) {

    try {

        data.tasks =
            JSON.parse(savedTasks);

    } catch (error) {

        console.error(
            "Could not load saved tasks.",
            error
        );

    }

}


// ========================================
// Save Tasks
// ========================================

function saveTasks() {

    localStorage.setItem(
        "internflowTasks",
        JSON.stringify(data.tasks)
    );

}


// ========================================
// Navigation
// ========================================

const views = {

    dashboard:
        document.getElementById("dashboardView"),

    groups:
        document.getElementById("groupsView"),

    members:
        document.getElementById("membersView"),

    tasks:
        document.getElementById("tasksView")

};


const pageTitle =
    document.getElementById("pageTitle");


const navItems =
    document.querySelectorAll(".nav-item");


function showView(viewName) {

    Object.values(views).forEach(view => {

        if (view) {

            view.classList.remove(
                "active-view"
            );

        }

    });


    if (views[viewName]) {

        views[viewName]
            .classList.add("active-view");

    }


    navItems.forEach(item => {

        item.classList.toggle(
            "active",
            item.dataset.view === viewName
        );

    });


    const titles = {

        dashboard: "Dashboard",
        groups: "Groups",
        members: "Members",
        tasks: "Tasks"

    };


    if (pageTitle) {

        pageTitle.textContent =
            titles[viewName] || "Dashboard";

    }

}


// ========================================
// Navigation Clicks
// ========================================

navItems.forEach(item => {

    item.addEventListener(
        "click",
        () => {

            showView(
                item.dataset.view
            );

        }
    );

});


document
    .querySelectorAll("[data-view-target]")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                showView(
                    button.dataset.viewTarget
                );

            }
        );

    });


// ========================================
// Members Filtering
// ========================================

const memberSearch =
    document.getElementById("memberSearch");

const domainFilter =
    document.getElementById("domainFilter");

const groupFilter =
    document.getElementById("groupFilter");


function filterMembers() {

    const search =
        memberSearch.value
            .toLowerCase()
            .trim();


    const domain =
        domainFilter.value;


    const group =
        groupFilter.value;


    const filtered =
        data.interns.filter(intern => {

            const matchesSearch =
                intern.name
                    .toLowerCase()
                    .includes(search) ||

                intern.email
                    .toLowerCase()
                    .includes(search);


            const matchesDomain =
                domain === "all" ||
                intern.domain === domain;


            const matchesGroup =
                group === "all" ||
                String(intern.groupId) === group;


            return (
                matchesSearch &&
                matchesDomain &&
                matchesGroup
            );

        });


    renderMembers(
        filtered,
        data.groups
    );

}


// ========================================
// Tasks Filtering
// ========================================

const taskSearch =
    document.getElementById("taskSearch");

const taskStatusFilter =
    document.getElementById(
        "taskStatusFilter"
    );


function filterTasks() {

    const search =
        taskSearch.value
            .toLowerCase()
            .trim();


    const status =
        taskStatusFilter.value;


    const filtered =
        data.tasks.filter(task => {

            const matchesSearch =
                task.title
                    .toLowerCase()
                    .includes(search);


            const matchesStatus =
                status === "all" ||
                task.status === status;


            return (
                matchesSearch &&
                matchesStatus
            );

        });


    renderTasks(filtered);

}


// ========================================
// Clear Filters
// ========================================

function clearMemberFilters() {

    memberSearch.value = "";

    domainFilter.value = "all";

    groupFilter.value = "all";

    filterMembers();

}


function clearTaskFilters() {

    taskSearch.value = "";

    taskStatusFilter.value = "all";

    filterTasks();

}


// ========================================
// Add Clear Buttons
// ========================================

const memberFilterBar =
    memberSearch.closest(".filter-bar");


const taskFilterBar =
    taskSearch.closest(".filter-bar");


const memberClearButton =
    document.createElement("button");

memberClearButton.type = "button";

memberClearButton.className =
    "complete-button";

memberClearButton.textContent =
    "Clear";


memberClearButton.addEventListener(
    "click",
    clearMemberFilters
);


memberFilterBar.appendChild(
    memberClearButton
);


const taskClearButton =
    document.createElement("button");

taskClearButton.type = "button";

taskClearButton.className =
    "complete-button";

taskClearButton.textContent =
    "Clear";


taskClearButton.addEventListener(
    "click",
    clearTaskFilters
);


taskFilterBar.appendChild(
    taskClearButton
);


// ========================================
// Search Events
// ========================================

memberSearch.addEventListener(
    "input",
    filterMembers
);


domainFilter.addEventListener(
    "change",
    filterMembers
);


groupFilter.addEventListener(
    "change",
    filterMembers
);


taskSearch.addEventListener(
    "input",
    filterTasks
);


taskStatusFilter.addEventListener(
    "change",
    filterTasks
);


// ========================================
// Change Task Status
// ========================================

document.addEventListener(
    "change",
    event => {

        const select =
            event.target.closest(
                ".task-status-select"
            );


        if (!select) {
            return;
        }


        const taskId =
            Number(
                select.dataset.taskId
            );


        const task =
            data.tasks.find(
                item =>
                    item.id === taskId
            );


        if (!task) {
            return;
        }


        task.status =
            select.value;


        select.classList.remove(
            "status-pending",
            "status-progress",
            "status-complete"
        );


        if (
            task.status === "Pending"
        ) {

            select.classList.add(
                "status-pending"
            );

        }


        if (
            task.status === "In Progress"
        ) {

            select.classList.add(
                "status-progress"
            );

        }


        if (
            task.status === "Complete"
        ) {

            select.classList.add(
                "status-complete"
            );

        }


        saveTasks();

        renderAll();

        filterTasks();

    }
);


// ========================================
// Render Everything
// ========================================

function renderAll() {

    renderStats(data);

    renderDashboardGroups(data);

    renderTaskOverview(data);

    renderGroups(data);

    renderMembers(
        data.interns,
        data.groups
    );

    renderTasks(
        data.tasks
    );

}


// ========================================
// Member Details Modal
// ========================================

const memberModal =
    document.getElementById(
        "memberModal"
    );


const memberModalContent =
    document.getElementById(
        "memberModalContent"
    );


const closeMemberModal =
    document.getElementById(
        "closeMemberModal"
    );


// Open modal

document.addEventListener(
    "click",
    event => {

        const member =
            event.target.closest(
                ".member-clickable"
            );


        if (!member) {
            return;
        }


        const memberId =
            Number(
                member.dataset.memberId
            );


        const intern =
            data.interns.find(
                item =>
                    item.id === memberId
            );


        if (!intern) {
            return;
        }


        const group =
            data.groups.find(
                item =>
                    item.id === intern.groupId
            );


        // Create initials directly here

        const initials =
            intern.name
                .split(" ")
                .map(name => name[0])
                .join("")
                .substring(0, 2)
                .toUpperCase();


        // Find this member's group tasks

        const memberTasks =
            data.tasks.filter(
                task =>
                    task.groupId ===
                    intern.groupId
            );


        const completedTasks =
            memberTasks.filter(
                task =>
                    task.status === "Complete"
            ).length;


        const totalTasks =
            memberTasks.length;


        const completion =
            totalTasks === 0
                ? 0
                : Math.round(
                    (
                        completedTasks /
                        totalTasks
                    ) * 100
                );


                memberModalContent.innerHTML = `

                <div class="member-profile">
            
                    <div class="member-profile-avatar">
                        ${intern.name
                            .split(" ")
                            .map(name => name[0])
                            .join("")
                            .substring(0, 2)
                            .toUpperCase()}
                    </div>
            
                    <div>
            
                        <h3>
                            ${intern.name}
                        </h3>
            
                        <p>
                            ${intern.email}
                        </p>
            
                    </div>
            
                </div>
            
            
                <div class="member-detail-grid">
            
                    <div class="member-detail-card">
            
                        <span>
                            Domain
                        </span>
            
                        <strong>
                            ${intern.domain}
                        </strong>
            
                    </div>
            
            
                    <div class="member-detail-card">
            
                        <span>
                            Group
                        </span>
            
                        <strong>
                            ${group ? group.name : "Unassigned"}
                        </strong>
            
                    </div>
            
                </div>
            
            
                <div class="member-detail-card">
            
                    <span>
                        Assigned Tasks
                    </span>
            
                    <strong>
                        ${data.tasks.filter(
                            task => task.groupId === intern.groupId
                        ).length}
                    </strong>
            
            
                    <div class="member-task-progress">
            
                        <div class="member-task-progress-header">
            
                            <span>
                                Group task progress
                            </span>
            
                            <span>
                                ${
                                    data.tasks.filter(
                                        task =>
                                            task.groupId === intern.groupId &&
                                            task.status === "Complete"
                                    ).length
                                } /
                                ${
                                    data.tasks.filter(
                                        task =>
                                            task.groupId === intern.groupId
                                    ).length
                                }
                            </span>
            
                        </div>
            
            
                        <div class="member-task-progress-track">
            
                            <div
                                class="member-task-progress-fill"
                                style="width: ${
                                    (() => {
            
                                        const tasks =
                                            data.tasks.filter(
                                                task =>
                                                    task.groupId === intern.groupId
                                            );
            
                                        const completed =
                                            tasks.filter(
                                                task =>
                                                    task.status === "Complete"
                                            ).length;
            
                                        return tasks.length
                                            ? (completed / tasks.length) * 100
                                            : 0;
            
                                    })()
                                }%"
                            ></div>
            
                        </div>
            
                    </div>
            
                </div>
            
            
                <div class="member-task-list">
            
                    ${
                        data.tasks
                            .filter(
                                task =>
                                    task.groupId === intern.groupId
                            )
                            .map(task => `
            
                                <div class="member-task-item">
            
                                    <span>
                                        ${task.title}
                                    </span>
            
                                    <span class="
                                        status-badge
                                        ${
                                            task.status === "Complete"
                                                ? "status-complete"
                                                : task.status === "In Progress"
                                                    ? "status-progress"
                                                    : "status-pending"
                                        }
                                    ">
                                        ${task.status}
                                    </span>
            
                                </div>
            
                            `)
                            .join("")
                    }
            
                </div>
            
            `;




        memberModal.classList.add(
            "show"
        );


        memberModal.setAttribute(
            "aria-hidden",
            "false"
        );

    }
);


// Close button

if (closeMemberModal) {

    closeMemberModal.addEventListener(
        "click",
        closeMemberDetails
    );

}


// Close when clicking background

if (memberModal) {

    memberModal.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                memberModal
            ) {

                closeMemberDetails();

            }

        }
    );

}


// Close with Escape

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeMemberDetails();

        }

    }
);


function closeMemberDetails() {

    if (!memberModal) {
        return;
    }


    memberModal.classList.remove(
        "show"
    );


    memberModal.setAttribute(
        "aria-hidden",
        "true"
    );

}


// ========================================
// Initial Setup
// ========================================

populateGroupFilter(
    data.groups
);


renderAll();

showView("dashboard");