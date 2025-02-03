/// <reference path="./html2pdf.d.ts" />
document.addEventListener('DOMContentLoaded', function () {
    var resumeForm = document.getElementById('resumeForm');
    var generateResumeButton = document.getElementById('generateResume');
    var shareLink = document.getElementById('shareLink');
    var downloadButton = document.getElementById('downloadResume');
    console.log('Script loaded, elements:', { resumeForm: resumeForm, generateResumeButton: generateResumeButton, shareLink: shareLink, downloadButton: downloadButton });
    generateResumeButton === null || generateResumeButton === void 0 ? void 0 : generateResumeButton.addEventListener('click', function () {
        console.log('Generate Resume button clicked');
        var formData = new FormData(resumeForm);
        var username = 'your-username'; // Replace with logic to get actual username
        var name = formData.get('name');
        var email = formData.get('email');
        var phone = formData.get('phone');
        var education = formData.get('education');
        var experience = formData.get('experience');
        var skills = formData.get('skills');
        var profilePicSrc = document.getElementById('profilePicPreview').src;
        console.log('Form data collected:', { name: name, email: email, phone: phone, education: education, experience: experience, skills: skills, profilePicSrc: profilePicSrc });
        var resumeContent = "\n            <div class=\"profile-preview\">\n                <img id=\"editProfilePicPreview\" src=\"".concat(profilePicSrc, "\" alt=\"Profile Picture Preview\" style=\"display:block; max-width:150px; height:auto;\">\n            </div>\n            <fieldset>\n                <legend>Personal Info</legend>\n                <h2>").concat(name, "</h2>\n                <p>Email: ").concat(email, "</p>\n                <p>Phone: ").concat(phone, "</p>\n            </fieldset>\n            <fieldset>\n                <legend>Education</legend>\n                <p>").concat(education, "</p>\n            </fieldset>\n            <fieldset>\n                <legend>Experience</legend>\n                <p>").concat(experience, "</p>\n            </fieldset>\n            <fieldset>\n                <legend>Skills</legend>\n                <p>").concat(skills, "</p>\n            </fieldset>\n        ");
        console.log('Resume content created:', resumeContent);
        // Simplified PDF Generation
        var element = document.createElement('div');
        element.innerHTML = resumeContent;
        console.log('Calling html2pdf with element:', element);
        html2pdf().from(element).save('resume.pdf').then(function () {
            console.log('PDF generated and saved');
        }).catch(function (err) {
            console.error('Error generating PDF:', err);
        });
    });
    // Handle Profile Picture Preview
    var profilePicInput = document.getElementById('profilePic');
    var profilePicPreview = document.getElementById('profilePicPreview');
    profilePicInput === null || profilePicInput === void 0 ? void 0 : profilePicInput.addEventListener('change', function (event) {
        var input = event.target;
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                if (profilePicPreview && e.target) {
                    profilePicPreview.src = e.target.result;
                    profilePicPreview.style.display = 'block';
                }
            };
            reader.readAsDataURL(input.files[0]);
        }
    });
});
