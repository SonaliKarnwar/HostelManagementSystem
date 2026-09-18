/* =========================================
   WARDEN DASHBOARD
========================================= */


/* Check login */

const loggedInUser =
    JSON.parse(
        localStorage.getItem(
            "loggedInUser"
        )
    );


if (!loggedInUser) {

    window.location.href =
        "login.html";

}


/* Check Warden */

if (
    loggedInUser &&
    loggedInUser.role &&
    loggedInUser.role.toUpperCase()
        !== "WARDEN"
) {

    alert(
        "Access denied."
    );

    window.location.href =
        "dashboard.html";

}


/* =========================================
   OPEN SECTION
========================================= */

async function openSection(section) {

    if (section === "announcement") {

        await loadAnnouncements();

    }

    else if (section === "rooms") {

        await loadRooms();

    }

    else if (section === "applications") {

        await loadApplications();

    }

}


/* =========================================
   ANNOUNCEMENTS
========================================= */

async function loadAnnouncements() {

    const container =
        document.getElementById(
            "sectionContainer"
        );


    try {

        const response =
            await fetch(
                `${API_BASE_URL}/announcements`
            );


        const announcements =
            await response.json();


        let html = `
            <h2>Announcements</h2>

            <button
                class="add-room-btn"
                onclick="addAnnouncement()">
                Add Announcement
            </button>
        `;


        announcements.forEach(
            announcement => {

                html += `

                    <div class="announcement">

                        <h3>
                            ${announcement.title}
                        </h3>

                        <p>
                            ${announcement.description}
                        </p>

                    </div>

                `;

            }
        );


        container.innerHTML =
            html;

    }

    catch (error) {

        console.error(error);

        alert(
            "Unable to load announcements."
        );

    }

}


/* =========================================
   ROOMS
========================================= */

async function loadRooms() {

    const container =
        document.getElementById(
            "sectionContainer"
        );


    try {

        const response =
            await fetch(
                `${API_BASE_URL}/rooms`
            );


        if (!response.ok) {

            throw new Error(
                "Unable to load rooms"
            );

        }


        const rooms =
            await response.json();


        let html = `

            <h2>Rooms Management</h2>

            <button
                class="add-room-btn"
                onclick="addRoom()">

                Add Room

            </button>

        `;


        rooms.forEach(room => {

            html += `

                <div
                    class="room"
                    onclick="viewRoom(${room.id})">

                    <h3>
                        Room ${room.roomNumber}
                    </h3>

                    <p>
                        Capacity:
                        ${room.capacity}
                    </p>

                    <p>
                        Occupied:
                        ${room.occupied || 0}
                    </p>

                </div>

            `;

        });


        container.innerHTML =
            html;

    }

    catch (error) {

        console.error(error);

        alert(
            "Unable to load rooms."
        );

    }

}


/* =========================================
   ADD ROOM
========================================= */

async function addRoom() {

    const roomNumber =
        prompt(
            "Enter room number:"
        );


    if (!roomNumber) {
        return;
    }


    const capacity =
        prompt(
            "Enter room capacity:"
        );


    if (!capacity) {
        return;
    }


    const room = {

        roomNumber:
            roomNumber,

        capacity:
            Number(capacity),

        occupied:
            0,

        status:
            "AVAILABLE"

    };


    try {

        const response =
            await fetch(
                `${API_BASE_URL}/rooms`,
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(room)

                }
            );


        if (!response.ok) {

            throw new Error(
                "Room creation failed"
            );

        }


        alert(
            "Room added successfully!"
        );


        await loadRooms();

    }

    catch (error) {

        console.error(error);

        alert(
            "Unable to add room."
        );

    }

}


/* =========================================
   VIEW ROOM
========================================= */

async function viewRoom(id) {

    try {

        const response =
            await fetch(
                `${API_BASE_URL}/rooms/${id}`
            );


        if (!response.ok) {

            throw new Error(
                "Room not found"
            );

        }


        const room =
            await response.json();


        alert(

            "Room: " +
            room.roomNumber +

            "\nCapacity: " +
            room.capacity +

            "\nOccupied: " +
            (room.occupied || 0) +

            "\nStatus: " +
            room.status

        );

    }

    catch (error) {

        console.error(error);

        alert(
            "Unable to load room details."
        );

    }

}


/* =========================================
   APPLICATIONS
========================================= */

async function loadApplications() {

    const container =
        document.getElementById(
            "sectionContainer"
        );


    try {

        const response =
            await fetch(
                `${API_BASE_URL}/leaves/pending`
            );


        if (!response.ok) {

            throw new Error(
                "Unable to load applications"
            );

        }


        const applications =
            await response.json();


        let html = `

            <h2>
                Student Applications
            </h2>

        `;


        if (
            applications.length === 0
        ) {

            html += `
                <p>
                    No pending applications.
                </p>
            `;

        }


        applications.forEach(
            application => {

                html += `

                    <div
                        class="application">

                        <h4>
                            ${application.studentName}
                        </h4>

                        <p>
                            Reason:
                            ${application.reason}
                        </p>

                        <p>
                            From:
                            ${application.startDate}
                        </p>

                        <p>
                            To:
                            ${application.endDate}
                        </p>


                        <button
                            class="action-btn"
                            onclick="approveApplication(${application.id})">

                            Approve

                        </button>


                        <button
                            class="action-btn"
                            onclick="rejectApplication(${application.id})">

                            Reject

                        </button>

                    </div>

                `;

            }
        );


        container.innerHTML =
            html;

    }

    catch (error) {

        console.error(error);

        alert(
            "Unable to load applications."
        );

    }

}


/* =========================================
   APPROVE
========================================= */

async function approveApplication(id) {

    await updateApplicationStatus(
        id,
        "APPROVED"
    );

}


/* =========================================
   REJECT
========================================= */

async function rejectApplication(id) {

    await updateApplicationStatus(
        id,
        "REJECTED"
    );

}


/* =========================================
   UPDATE STATUS
========================================= */

async function updateApplicationStatus(
    id,
    status
) {

    try {

        const response =
            await fetch(
                `${API_BASE_URL}/leaves/${id}/status`,
                {

                    method: "PUT",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify({

                            status:
                                status

                        })

                }
            );


        if (!response.ok) {

            throw new Error(
                "Status update failed"
            );

        }


        alert(
            "Application " +
            status.toLowerCase() +
            " successfully!"
        );


        await loadApplications();

    }

    catch (error) {

        console.error(error);

        alert(
            "Unable to update application."
        );

    }

}


/* =========================================
   ADD ANNOUNCEMENT
========================================= */

async function addAnnouncement() {

    const title =
        prompt(
            "Enter announcement title:"
        );


    if (!title) {
        return;
    }


    const description =
        prompt(
            "Enter announcement:"
        );


    if (!description) {
        return;
    }


    const announcement = {

        title:
            title,

        description:
            description

    };


    try {

        const response =
            await fetch(
                `${API_BASE_URL}/announcements`,
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(
                            announcement
                        )

                }
            );


        if (!response.ok) {

            throw new Error(
                "Announcement failed"
            );

        }


        alert(
            "Announcement added successfully!"
        );


        await loadAnnouncements();

    }

    catch (error) {

        console.error(error);

        alert(
            "Unable to add announcement."
        );

    }

}


/* =========================================
   LOGOUT
========================================= */

const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );


if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        () => {

            localStorage.removeItem(
                "loggedInUser"
            );

            window.location.href =
                "login.html";

        }
    );

}