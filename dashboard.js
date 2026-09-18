/* =========================================
   DASHBOARD.JS
   ========================================= */


/* =========================================
   CHECK LOGIN
   ========================================= */

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


/* =========================================
   DISPLAY USER
   ========================================= */

function displayLoggedInUser() {

    if (!loggedInUser) {
        return;
    }


    const studentName =
        document.getElementById(
            "studentName"
        );


    if (studentName) {

        studentName.textContent =
            loggedInUser.name ||
            loggedInUser.username;

    }

}


displayLoggedInUser();


/* =========================================
   OPEN SECTION
   ========================================= */

async function openSection(section) {

    const container =
        document.getElementById(
            "sectionContainer"
        );


    if (!container) {
        return;
    }


    /* =========================
       ADMISSION
    ========================= */

    if (section === "admission") {

        showAdmissionForm();

    }


    /* =========================
       COMPLAINT
    ========================= */

    else if (section === "complaint") {

        showComplaintForm();

    }


    /* =========================
       LEAVE
    ========================= */

    else if (section === "leave") {

        showLeaveForm();

    }


    /* =========================
       ANNOUNCEMENT
    ========================= */

    else if (
        section === "announcement"
    ) {

        await loadAnnouncements();

    }


    /* =========================
       ROOMS
    ========================= */

    else if (section === "rooms") {

        await loadRooms();

    }

}


/* =========================================
   ADMISSION FORM
   ========================================= */

function showAdmissionForm() {

    const container =
        document.getElementById(
            "sectionContainer"
        );


    container.innerHTML = `

        <h2>Admission Form</h2>

        <div class="tabs">

            <button
                class="tab-btn active"
                onclick="openTab(event, 'profile')">
                Profile Details
            </button>

            <button
                class="tab-btn"
                onclick="openTab(event, 'room')">
                Room Allocation
            </button>

            <button
                class="tab-btn"
                onclick="openTab(event, 'payment')">
                Payment
            </button>

        </div>


        <!-- PROFILE -->

        <div
            id="profile"
            class="tab-content active">

            <form id="profileForm">

                <input
                    type="text"
                    id="fullName"
                    placeholder="Full Name"
                    required
                >

                <input
                    type="date"
                    id="dob"
                    required
                >

                <input
                    type="text"
                    id="yearOfAdmission"
                    placeholder="Year of Admission"
                    required
                >

                <input
                    type="text"
                    id="aadharNumber"
                    placeholder="Aadhar Card Number"
                    required
                >

                <input
                    type="text"
                    id="personalPhone"
                    placeholder="Personal Phone Number"
                    required
                >

                <input
                    type="text"
                    id="parentPhone"
                    placeholder="Parent's Phone Number"
                    required
                >

                <input
                    type="text"
                    id="studyYear"
                    placeholder="Study Year"
                    required
                >

                <textarea
                    id="address"
                    placeholder="Address"
                    rows="3"
                    required>
                </textarea>


                <label>
                    Upload Photo:
                </label>

                <input
                    type="file"
                    id="photoUpload"
                    accept="image/*"
                >


                <button
                    class="submit-btn"
                    type="submit">

                    Save Profile

                </button>

            </form>

        </div>


        <!-- ROOM -->

        <div
            id="room"
            class="tab-content">

            <form id="roomForm">

                <input
                    type="text"
                    id="roomPreference"
                    placeholder="Room Preference"
                    required
                >

                <input
                    type="text"
                    id="floorPreference"
                    placeholder="Floor Preference"
                    required
                >

                <button
                    class="submit-btn"
                    type="submit">

                    Save Room

                </button>

            </form>

        </div>


        <!-- PAYMENT -->

        <div
            id="payment"
            class="tab-content">

            <form id="paymentForm">

                <input
                    type="number"
                    id="paymentAmount"
                    placeholder="Amount"
                    required
                >

                <button
                    class="submit-btn"
                    type="submit">

                    Make Payment

                </button>

            </form>

        </div>

    `;


    addAdmissionEvents();

}


/* =========================================
   COMPLAINT FORM
   ========================================= */

function showComplaintForm() {

    const container =
        document.getElementById(
            "sectionContainer"
        );


    container.innerHTML = `

        <h2>Complaint Box</h2>

        <form id="complaintForm">

            <input
                type="text"
                id="complaintSubject"
                placeholder="Subject"
                required
            >


            <textarea
                id="complaintDescription"
                placeholder="Write your complaint..."
                rows="5"
                required>
            </textarea>


            <button
                class="submit-btn"
                type="submit">

                Submit Complaint

            </button>

        </form>

    `;


    document
        .getElementById(
            "complaintForm"
        )
        .addEventListener(
            "submit",
            submitComplaint
        );

}


/* =========================================
   SUBMIT COMPLAINT
   ========================================= */

async function submitComplaint(event) {

    event.preventDefault();


    const complaint = {

        studentId:
            loggedInUser.id,

        subject:
            document
                .getElementById(
                    "complaintSubject"
                )
                .value,

        description:
            document
                .getElementById(
                    "complaintDescription"
                )
                .value,

        status:
            "PENDING"

    };


    try {

        const response =
            await fetch(
                `${API_BASE_URL}/complaints`,
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(
                            complaint
                        )

                }
            );


        if (!response.ok) {

            throw new Error(
                "Complaint submission failed"
            );

        }


        alert(
            "Complaint submitted successfully!"
        );


        document
            .getElementById(
                "complaintForm"
            )
            .reset();

    }

    catch (error) {

        console.error(error);

        alert(
            "Unable to submit complaint."
        );

    }

}


/* =========================================
   LEAVE FORM
   ========================================= */

function showLeaveForm() {

    const container =
        document.getElementById(
            "sectionContainer"
        );


    container.innerHTML = `

        <h2>Leave Application</h2>

        <form id="leaveForm">

            <label>
                Student Name:
            </label>

            <input
                type="text"
                id="leaveStudentName"
                value="${loggedInUser.name || ""}"
                required
            >


            <label>
                Study Year:
            </label>

            <input
                type="text"
                id="leaveStudyYear"
                placeholder="e.g. 1st Year"
                required
            >


            <label>
                Reason:
            </label>

            <textarea
                id="leaveReason"
                rows="4"
                required>
            </textarea>


            <label>
                Start Date:
            </label>

            <input
                type="date"
                id="startDate"
                required
            >


            <label>
                End Date:
            </label>

            <input
                type="date"
                id="endDate"
                required
            >


            <label>
                Parent Phone:
            </label>

            <input
                type="text"
                id="leaveParentPhone"
                required
            >


            <button
                class="submit-btn"
                type="submit">

                Submit Leave Application

            </button>

        </form>

    `;


    document
        .getElementById(
            "leaveForm"
        )
        .addEventListener(
            "submit",
            submitLeave
        );

}


/* =========================================
   SUBMIT LEAVE
   ========================================= */

async function submitLeave(event) {

    event.preventDefault();


    const leave = {

        studentId:
            loggedInUser.id,

        studentName:
            document
                .getElementById(
                    "leaveStudentName"
                )
                .value,

        studyYear:
            document
                .getElementById(
                    "leaveStudyYear"
                )
                .value,

        reason:
            document
                .getElementById(
                    "leaveReason"
                )
                .value,

        startDate:
            document
                .getElementById(
                    "startDate"
                )
                .value,

        endDate:
            document
                .getElementById(
                    "endDate"
                )
                .value,

        parentPhone:
            document
                .getElementById(
                    "leaveParentPhone"
                )
                .value,

        status:
            "PENDING"

    };


    try {

        const response =
            await fetch(
                `${API_BASE_URL}/leaves`,
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(
                            leave
                        )

                }
            );


        if (!response.ok) {

            throw new Error(
                "Leave submission failed"
            );

        }


        alert(
            "Leave application submitted successfully!"
        );


        event.target.reset();

    }

    catch (error) {

        console.error(error);

        alert(
            "Unable to submit leave application."
        );

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


        if (!response.ok) {

            throw new Error(
                "Failed to load announcements"
            );

        }


        const announcements =
            await response.json();


        let html = `
            <h2>Announcements by Warden</h2>
        `;


        if (
            announcements.length === 0
        ) {

            html += `
                <p>No announcements available.</p>
            `;

        }


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

        container.innerHTML = `
            <h2>Announcements</h2>
            <p>Unable to load announcements.</p>
        `;

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
                "Failed to load rooms"
            );

        }


        const rooms =
            await response.json();


        let html = `

            <h2>Available Rooms</h2>

        `;


        if (rooms.length === 0) {

            html += `
                <p>No rooms available.</p>
            `;

        }


        rooms.forEach(room => {

            html += `

                <div class="room">

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

                    <p>
                        Status:
                        ${room.status || "AVAILABLE"}
                    </p>

                </div>

            `;

        });


        container.innerHTML =
            html;

    }

    catch (error) {

        console.error(error);

        container.innerHTML = `

            <h2>Rooms</h2>

            <p>
                Unable to load rooms.
            </p>

        `;

    }

}


/* =========================================
   TABS
   ========================================= */

function openTab(event, tabName) {

    const contents =
        document.querySelectorAll(
            ".tab-content"
        );


    contents.forEach(
        content => {

            content.classList.remove(
                "active"
            );

        }
    );


    const buttons =
        document.querySelectorAll(
            ".tab-btn"
        );


    buttons.forEach(
        button => {

            button.classList.remove(
                "active"
            );

        }
    );


    const selectedTab =
        document.getElementById(
            tabName
        );


    if (selectedTab) {

        selectedTab.classList.add(
            "active"
        );

    }


    event.currentTarget.classList.add(
        "active"
    );

}


/* =========================================
   ADMISSION EVENTS
   ========================================= */

function addAdmissionEvents() {

    const profileForm =
        document.getElementById(
            "profileForm"
        );


    if (profileForm) {

        profileForm.addEventListener(
            "submit",
            submitProfile
        );

    }


    const roomForm =
        document.getElementById(
            "roomForm"
        );


    if (roomForm) {

        roomForm.addEventListener(
            "submit",
            submitRoomAllocation
        );

    }


    const paymentForm =
        document.getElementById(
            "paymentForm"
        );


    if (paymentForm) {

        paymentForm.addEventListener(
            "submit",
            submitPayment
        );

    }

}


/* =========================================
   PROFILE
   ========================================= */

async function submitProfile(event) {

    event.preventDefault();


    const student = {

        userId:
            loggedInUser.id,

        fullName:
            document.getElementById(
                "fullName"
            ).value,

        dob:
            document.getElementById(
                "dob"
            ).value,

        yearOfAdmission:
            document.getElementById(
                "yearOfAdmission"
            ).value,

        aadharNumber:
            document.getElementById(
                "aadharNumber"
            ).value,

        personalPhone:
            document.getElementById(
                "personalPhone"
            ).value,

        parentPhone:
            document.getElementById(
                "parentPhone"
            ).value,

        studyYear:
            document.getElementById(
                "studyYear"
            ).value,

        address:
            document.getElementById(
                "address"
            ).value

    };


    try {

        const response =
            await fetch(
                `${API_BASE_URL}/students`,
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(
                            student
                        )

                }
            );


        if (!response.ok) {

            throw new Error(
                "Profile save failed"
            );

        }


        alert(
            "Profile saved successfully!"
        );

    }

    catch (error) {

        console.error(error);

        alert(
            "Unable to save profile."
        );

    }

}


/* =========================================
   ROOM ALLOCATION
   ========================================= */

async function submitRoomAllocation(event) {

    event.preventDefault();


    const allocation = {

        studentId:
            loggedInUser.id,

        roomPreference:
            document
                .getElementById(
                    "roomPreference"
                )
                .value,

        floorPreference:
            document
                .getElementById(
                    "floorPreference"
                )
                .value

    };


    try {

        const response =
            await fetch(
                `${API_BASE_URL}/allocations`,
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(
                            allocation
                        )

                }
            );


        if (!response.ok) {

            throw new Error(
                "Room allocation failed"
            );

        }


        alert(
            "Room request submitted successfully!"
        );

    }

    catch (error) {

        console.error(error);

        alert(
            "Unable to save room allocation."
        );

    }

}


/* =========================================
   PAYMENT
   ========================================= */

async function submitPayment(event) {

    event.preventDefault();


    const amount =
        document.getElementById(
            "paymentAmount"
        ).value;


    const payment = {

        studentId:
            loggedInUser.id,

        amount:
            Number(amount),

        paymentStatus:
            "PAID"

    };


    try {

        const response =
            await fetch(
                `${API_BASE_URL}/payments`,
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(
                            payment
                        )

                }
            );


        if (!response.ok) {

            throw new Error(
                "Payment failed"
            );

        }


        alert(
            "Payment recorded successfully!"
        );

    }

    catch (error) {

        console.error(error);

        alert(
            "Unable to process payment."
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