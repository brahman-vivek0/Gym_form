// script.js

let userPhotoUrl = '';

function validateForm() {
    let id = document.getElementById('id').value;
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let age = document.getElementById('age').value;
    let membership = document.getElementById('membership').value;
    let startDate = document.getElementById('startdate').value;
    let photo = document.getElementById('photo').files[0];

    // Check if any field is empty
    if (!id || !name || !email || !phone || !age || !membership || !startDate || !photo) {
        alert("All fields are required!");
        return false;
    }

    // Check if phone number is valid
    let phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
        alert("Please enter a valid 10-digit phone number.");
        return false;
    }

    // Show photo preview
    let reader = new FileReader();
    reader.onload = function(e) {
        userPhotoUrl = e.target.result;
        displayFormData(id, name, email, phone, age, membership, startDate, userPhotoUrl);
    }
    reader.readAsDataURL(photo);

    // Show the PDF button after form data is displayed
    document.getElementById('pdfBtn').style.display = 'block';

    // Prevent form from submitting
    return false;
}

function displayFormData(id, name, email, phone, age, membership, startDate, photoUrl) {
    let formOutput = document.getElementById('formOutput');

    let tableHTML = `
        <h3>Registration Successful!</h3>
        <div class="profile-photo" style="text-align: center;">
            <img src="${photoUrl}" alt="Profile Photo" style="width: 150px; height: 150px; border-radius: 50%; object-fit: cover;">
        </div>
        <table>
            <tr><th>ID</th><td>${id}</td></tr>
            <tr><th>Name</th><td>${name}</td></tr>
            <tr><th>Email</th><td>${email}</td></tr>
            <tr><th>Phone</th><td>${phone}</td></tr>
            <tr><th>Age</th><td>${age}</td></tr>
            <tr><th>Membership Type</th><td>${membership}</td></tr>
            <tr><th>Start Date</th><td>${startDate}</td></tr>
        </table>
    `;
    formOutput.innerHTML = tableHTML;
}

// Function to generate PDF using jsPDF
function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let id = document.getElementById('id').value;
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let age = document.getElementById('age').value;
    let membership = document.getElementById('membership').value;
    let startDate = document.getElementById('startdate').value;

    // Set PDF Title
    doc.setFontSize(18);
    doc.text("Gym Registration Form", 20, 20);

    // Add Profile Image
    doc.addImage(userPhotoUrl, 'JPEG', 20, 30, 40, 40);

    // Table data structure
    const tableData = [
        ['ID', id],
        ['Name', name],
        ['Email', email],
        ['Phone', phone],
        ['Age', age],
        ['Membership Type', membership],
        ['Start Date', startDate]
    ];

    // Add the table to the PDF with styling
    doc.autoTable({
        head: [['Field', 'Data']],
        body: tableData,
        startY: 80,
        theme: 'grid',
        headStyles: { fillColor: [52, 58, 64], textColor: [255, 255, 255] },
        margin: { top: 10 }
    });

    // Save the PDF
    doc.save('gym_registration_form.pdf');
}
