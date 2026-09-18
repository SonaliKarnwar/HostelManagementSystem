// Handle Sidebar Tabs
const tabs = document.querySelectorAll(".sidebar ul li");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    const target = tab.getAttribute("data-tab");
    contents.forEach(c => {
      c.classList.remove("active");
      if (c.id === target) c.classList.add("active");
    });
  });
});

// Handle Approve/Reject Buttons
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("approve")) {
    alert("Admission Approved ✅");
    e.target.closest("tr").style.backgroundColor = "#d4efdf";
  }
  if (e.target.classList.contains("reject")) {
    alert("Admission Rejected ❌");
    e.target.closest("tr").style.backgroundColor = "#f5b7b1";
  }
});
