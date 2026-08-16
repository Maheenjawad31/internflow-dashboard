// ========================================
// InternFlow Dashboard
// UI Rendering Functions
// ========================================


// ========================================
// Get Initials
// ========================================

function getInitials(name) {
    return name
        .split(" ")
        .map(word => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}


// ========================================
// Task Statistics
// ========================================

function getTaskStats(tasks) {

    return {
        total: tasks.length,

        complete: tasks.filter(
            task => task.status === "Complete"
        ).length,

        progress: tasks.filter(
            task => task.status === "In Progress"
        ).length,

        pending: tasks.filter(
            task => task.status === "Pending"
        ).length
    };
}


// ========================================
// Dashboard Statistics
// ========================================

function renderStats(data) {

    const totalGroups =
        document.getElementById("totalGroups");

    const totalInterns =
        document.getElementById("totalInterns");

    const completedTasks =
        document.getElementById("completedTasks");

    const progressTasks =
        document.getElementById("progressTasks");


    const stats =
        getTaskStats(data.tasks);


    if (totalGroups) {
        totalGroups.textContent =
            data.groups.length;
    }

    if (totalInterns) {
        totalInterns.textContent =
            data.interns.length;
    }

    if (completedTasks) {
        completedTasks.textContent =
            stats.complete;
    }

    if (progressTasks) {
        progressTasks.textContent =
            stats.progress;
    }
}


// ========================================
// Dashboard Groups
// ========================================

function renderDashboardGroups(data) {

    const container =
        document.getElementById("dashboardGroups");


    if (!container) {
        return;
    }


    container.innerHTML = "";


    data.groups.forEach(group => {

        const members =
            data.interns.filter(
                intern => intern.groupId === group.id
            );


        const card =
            document.createElement("div");


        card.className =
            "group-mini-card";


        card.innerHTML = `

            <div class="group-mini-info">

                <div class="group-avatar">
                    ${getInitials(group.name)}
                </div>

                <div>

                    <h4>
                        ${group.name}
                    </h4>

                    <p>
                        ${members.length} members ·
                        ${group.domain}
                    </p>

                </div>

            </div>

            <span class="domain-badge">
                ${group.domain}
            </span>

        `;


        container.appendChild(card);

    });
}


// ========================================
// Task Overview
// ========================================

function renderTaskOverview(data) {

    const container =
        document.getElementById("taskOverview");


    if (!container) {
        return;
    }


    const stats =
        getTaskStats(data.tasks);


    const total =
        stats.total || 1;


    const completePercentage =
        Math.round(
            (stats.complete / total) * 100
        );


    const progressPercentage =
        Math.round(
            (stats.progress / total) * 100
        );


    const pendingPercentage =
        Math.round(
            (stats.pending / total) * 100
        );


    container.innerHTML = `

        <div class="progress-item">

            <div class="progress-header">
                <span>Completed</span>
                <span>
                    ${stats.complete} tasks
                </span>
            </div>

            <div class="progress-track">

                <div
                    class="progress-fill"
                    style="width: ${completePercentage}%"
                ></div>

            </div>

        </div>


        <div class="progress-item">

            <div class="progress-header">
                <span>In Progress</span>
                <span>
                    ${stats.progress} tasks
                </span>
            </div>

            <div class="progress-track">

                <div
                    class="progress-fill"
                    style="width: ${progressPercentage}%"
                ></div>

            </div>

        </div>


        <div class="progress-item">

            <div class="progress-header">
                <span>Pending</span>
                <span>
                    ${stats.pending} tasks
                </span>
            </div>

            <div class="progress-track">

                <div
                    class="progress-fill"
                    style="width: ${pendingPercentage}%"
                ></div>

            </div>

        </div>

    `;
}


// ========================================
// Groups View
// ========================================

function renderGroups(data) {

    const container =
        document.getElementById("groupsContainer");


    if (!container) {
        return;
    }


    container.innerHTML = "";


    data.groups.forEach(group => {

        const members =
            data.interns.filter(
                intern => intern.groupId === group.id
            );


        const tasks =
            data.tasks.filter(
                task => task.groupId === group.id
            );


        const completedTasks =
            tasks.filter(
                task => task.status === "Complete"
            ).length;


        const completionPercentage =
            tasks.length
                ? Math.round(
                    (completedTasks / tasks.length) * 100
                )
                : 0;


        const card =
            document.createElement("article");


        card.className =
            "group-card";


        card.innerHTML = `

            <div class="group-card-header">

                <div class="group-avatar">
                    ${getInitials(group.name)}
                </div>

                <div>

                    <h4>
                        ${group.name}
                    </h4>

                    <span class="domain-badge">
                        ${group.domain}
                    </span>

                </div>

            </div>


            <p>
                ${group.description}
            </p>


            <div class="progress-item">

                <div class="progress-header">

                    <span>
                        Task completion
                    </span>

                    <strong>
                        ${completionPercentage}%
                    </strong>

                </div>


                <div class="progress-track">

                    <div
                        class="progress-fill"
                        style="width: ${completionPercentage}%"
                    ></div>

                </div>

            </div>


            <div class="group-meta">

                <span>
                    ${members.length} Members
                </span>

                <span>
                    ${tasks.length} Tasks
                </span>

            </div>

        `;


        container.appendChild(card);

    });
}


// ========================================
// Members View
// ========================================

function renderMembers(interns, groups) {

    const container =
        document.getElementById("membersContainer");


    if (!container) {
        return;
    }


    if (interns.length === 0) {

        container.innerHTML = `

            <div class="empty-state">

                <div class="empty-state-icon">
                    🔎
                </div>

                <h4>
                    No interns found
                </h4>

                <p>
                    Try changing your search or filters.
                </p>

            </div>

        `;

        return;
    }


    container.innerHTML = `

        <table class="members-table">

            <thead>

                <tr>

                    <th>
                        Member
                    </th>

                    <th>
                        Domain
                    </th>

                    <th>
                        Group
                    </th>

                </tr>

            </thead>


            <tbody>

                ${interns.map(intern => {

                    const group =
                        groups.find(
                            group =>
                                group.id === intern.groupId
                        );


                    return `

                        <tr>

                            <td>

                                <div
                                    class="member-name member-clickable"
                                    data-member-id="${intern.id}"
                                >

                                    <div class="member-avatar">
                                    ${intern.name
                                        .split(" ")
                                        .map(name => name[0])
                                        .join("")
                                        .substring(0, 2)
                                        .toUpperCase()}
                                    </div>

                                    <div>

                                        <strong>
                                            ${intern.name}
                                        </strong>

                                        <span>
                                            ${intern.email}
                                        </span>

                                    </div>

                                </div>

                            </td>


                            <td>

                                <span class="domain-badge">
                                    ${intern.domain}
                                </span>

                            </td>


                            <td>
                                ${
                                    group
                                        ? group.name
                                        : "Unassigned"
                                }
                            </td>

                        </tr>

                    `;

                }).join("")}

            </tbody>

        </table>

    `;
}
// ========================================
// Tasks View
// ========================================
function renderTasks(tasks) {

    const container =
        document.getElementById("tasksContainer");

    if (!container) {
        return;
    }

    if (tasks.length === 0) {

        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🔎</div>

                <h4>
                    No tasks found
                </h4>

                <p>
                    Try changing your search or status filter.
                </p>
            </div>
        `;

        return;
    }

    container.innerHTML = tasks.map(task => {

        let statusClass = "status-pending";

        if (task.status === "Complete") {
            statusClass = "status-complete";
        }

        if (task.status === "In Progress") {
            statusClass = "status-progress";
        }

        return `
            <article class="task-card">

                <div class="task-info">

                    <h4>
                        ${task.title}
                    </h4>

                    <p>
                        Week ${task.week}
                    </p>

                </div>


                <div class="task-actions">

                    <select
                        class="task-status-select ${statusClass}"
                        data-task-id="${task.id}"
                    >

                        <option
                            value="Pending"
                            ${task.status === "Pending" ? "selected" : ""}
                        >
                            Pending
                        </option>

                        <option
                            value="In Progress"
                            ${task.status === "In Progress" ? "selected" : ""}
                        >
                            In Progress
                        </option>

                        <option
                            value="Complete"
                            ${task.status === "Complete" ? "selected" : ""}
                        >
                            Complete
                        </option>

                    </select>

                </div>

            </article>
        `;

    }).join("");
}


   

// ========================================
// Group Filter
// ========================================

function populateGroupFilter(groups) {

    const select =
        document.getElementById("groupFilter");


    if (!select) {
        return;
    }


    groups.forEach(group => {

        const option =
            document.createElement("option");


        option.value =
            group.id;


        option.textContent =
            group.name;


        select.appendChild(option);

    });
}


// ========================================
// Export Functions
// ========================================

export {
    renderStats,
    renderDashboardGroups,
    renderTaskOverview,
    renderGroups,
    renderMembers,
    renderTasks,
    populateGroupFilter
};


// ========================================
// Task Analytics
// ========================================

export function renderAnalytics(tasks) {

    const total = tasks.length;

    const completed =
        tasks.filter(
            task => task.status === "Complete"
        ).length;

    const inProgress =
        tasks.filter(
            task => task.status === "In Progress"
        ).length;

    const pending =
        tasks.filter(
            task => task.status === "Pending"
        ).length;


    const percentage =
        total === 0
            ? 0
            : Math.round(
                (completed / total) * 100
            );


    const percentageElement =
        document.getElementById(
            "completionPercentage"
        );

    const progressElement =
        document.getElementById(
            "overallProgress"
        );

    const completeElement =
        document.getElementById(
            "analyticsComplete"
        );

    const progressCountElement =
        document.getElementById(
            "analyticsProgress"
        );

    const pendingElement =
        document.getElementById(
            "analyticsPending"
        );


    if (percentageElement) {

        percentageElement.textContent =
            `${percentage}%`;

    }


    if (progressElement) {

        progressElement.style.width =
            `${percentage}%`;

    }


    if (completeElement) {

        completeElement.textContent =
            completed;

    }


    if (progressCountElement) {

        progressCountElement.textContent =
            inProgress;

    }


    if (pendingElement) {

        pendingElement.textContent =
            pending;

    }

}