/// <reference path="./html2pdf.d.ts" />

document.addEventListener('DOMContentLoaded', () => {
    const resumeForm = document.getElementById('resumeForm') as HTMLFormElement;
    const generateResumeButton = document.getElementById('generateResume') as HTMLButtonElement;
    const shareLink = document.getElementById('shareLink') as HTMLAnchorElement;
    const downloadButton = document.getElementById('downloadResume') as HTMLButtonElement;

    console.log('Script loaded, elements:', { resumeForm, generateResumeButton, shareLink, downloadButton });

    generateResumeButton?.addEventListener('click', () => {
        console.log('Generate Resume button clicked');

        const formData = new FormData(resumeForm);
        const username = 'your-username'; // Replace with logic to get actual username

        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string;
        const education = formData.get('education') as string;
        const experience = formData.get('experience') as string;
        const skills = formData.get('skills') as string;
        const profilePicSrc = (document.getElementById('profilePicPreview') as HTMLImageElement).src;

        console.log('Form data collected:', { name, email, phone, education, experience, skills, profilePicSrc });

        const resumeContent = `
            <div class="profile-preview">
                <img id="editProfilePicPreview" src="${profilePicSrc}" alt="Profile Picture Preview" style="display:block; max-width:150px; height:auto;">
            </div>
            <fieldset>
                <legend>Personal Info</legend>
                <h2>${name}</h2>
                <p>Email: ${email}</p>
                <p>Phone: ${phone}</p>
            </fieldset>
            <fieldset>
                <legend>Education</legend>
                <p>${education}</p>
            </fieldset>
            <fieldset>
                <legend>Experience</legend>
                <p>${experience}</p>
            </fieldset>
            <fieldset>
                <legend>Skills</legend>
                <p>${skills}</p>
            </fieldset>
        `;

        console.log('Resume content created:', resumeContent);

        // Simplified PDF Generation
        const element = document.createElement('div');
        element.innerHTML = resumeContent;

        console.log('Calling html2pdf with element:', element);
        html2pdf().from(element).save('resume.pdf').then(() => {
            console.log('PDF generated and saved');
        }).catch(err => {
            console.error('Error generating PDF:', err);
        });
    });

    // Handle Profile Picture Preview
    const profilePicInput = document.getElementById('profilePic') as HTMLInputElement;
    const profilePicPreview = document.getElementById('profilePicPreview') as HTMLImageElement;

    profilePicInput?.addEventListener('change', (event) => {
        const input = event.target as HTMLInputElement;

        if (input.files && input.files[0]) {
            const reader = new FileReader();

            reader.onload = (e) => {
                if (profilePicPreview && e.target) {
                    profilePicPreview.src = e.target.result as string;
                    profilePicPreview.style.display = 'block';
                }
            };

            reader.readAsDataURL(input.files[0]);
        }
    });
});
