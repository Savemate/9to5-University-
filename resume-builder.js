// Resume Builder JavaScript

// DOM Elements
const resumeForm = document.getElementById('resumeForm');
const resumePreview = document.getElementById('resumePreview');
const templates = document.querySelectorAll('.template');
const selectTemplateBtns = document.querySelectorAll('.btn-select-template');
const loadExampleBtn = document.getElementById('loadExampleBtn');
const loadExampleBtns = document.querySelectorAll('.btn-example-load');
const downloadBtn = document.getElementById('downloadBtn');
const printBtn = document.getElementById('printBtn');
const refreshBtn = document.getElementById('refreshBtn');
const shareBtn = document.getElementById('shareBtn');

// Current template
let currentTemplate = '1';

// Example Data
const examples = {
    tshedimosho: {
        fullName: 'Tshedimosho Mlangeni',
        jobTitle: 'Multi-Industry Professional',
        summary: 'Experienced professional with diverse background in retail, manufacturing, and construction. Strong work ethic with expertise in customer service, operations, and technical assistance across multiple industries. Dedicated worker with proven ability to adapt to different work environments and learn new skills quickly.',
        email: 'mphelamlangeni@gmail.com',
        phone: '079 487 4559',
        address: 'Boksburg North, Boksburg, Gauteng, South Africa',
        experience: `Food Lover's Market - Deli Assistant, Merchandiser (May 2022 - May 2024)
• Managed shelf stock availability and product placement
• Conducted regular quality checks to remove expired products
• Operated deli equipment for food preparation and service
• Maintained high standards of hygiene and cleanliness
• Ensured accurate product pricing and scanning

Tiger Brands - Packer (May 2020 - Apr 2021)
• Sorted products and verified manufacturing details
• Conducted quality assessments of packaging and labeling
• Operated pellet jacks for product transportation
• Monitored and recorded product weights for quality control

JHL Group (PTY) LTD - Assistant (Nov 2013 - Feb 2020)
• Assisted artisans with electrical, welding, and mechanical fitting tasks
• Operated grinders and various construction tools
• Managed tool inventory and preparation for daily tasks
• Coordinated supply runs and material procurement`,
        education: `Matric Certificate - Khataza High School
• Completed basic education with focus on practical skills
• Participated in technical and vocational training programs`,
        skills: `• Computer Literacy & Office Software
• Customer Service & Client Interaction
• Retail Operations & Merchandising
• Manufacturing & Quality Control
• Construction Assistance & Tool Operation
• Electrical, Welding & Mechanical Support
• Multilingual: Sepedi, Xitsonga, English, isiZulu, Setswana, Sesotho, siSwati
• Team Collaboration & Communication`
    },
    developer: {
        fullName: 'John Smith',
        jobTitle: 'Senior Software Developer',
        summary: 'Full-stack developer with 5+ years of experience building scalable web applications. Proficient in JavaScript, React, Node.js, and modern development practices. Passionate about creating efficient, user-friendly solutions and mentoring junior developers.',
        email: 'john.smith@example.com',
        phone: '(123) 456-7890',
        address: 'San Francisco, CA',
        experience: `Senior Software Developer at Tech Solutions Inc. (2020-Present)
• Led development of customer-facing web applications using React and Node.js
• Improved application performance by 40% through code optimization
• Mentored 3 junior developers and conducted code reviews
• Implemented CI/CD pipeline reducing deployment time by 60%

Web Developer at Digital Creations (2018-2020)
• Developed and maintained client websites using modern frameworks
• Implemented responsive designs that increased mobile traffic by 35%
• Collaborated with design team to improve user experience
• Reduced page load times by 50% through optimization`,
        education: `Bachelor of Science in Computer Science
University of Technology, 2014-2018
• GPA: 3.8/4.0
• President of Computer Science Club
• Relevant Coursework: Data Structures, Algorithms, Web Development

Web Development Certification
Code Academy, 2019
• Focus: Front-end Development, React, Node.js`,
        skills: `• JavaScript, React, Node.js, Python, HTML/CSS
• Git, Docker, AWS, Jenkins, Agile Methodologies
• Team Leadership, Problem Solving, Communication
• Project Management, Mentoring, Code Review
• Responsive Web Design, API Integration, Testing`
    },
    marketing: {
        fullName: 'Sarah Johnson',
        jobTitle: 'Marketing Manager',
        summary: 'Digital marketing specialist with 7+ years of experience in campaign management, brand strategy, and team leadership. Proven track record of increasing brand visibility and driving revenue growth through innovative marketing strategies.',
        email: 'sarah.johnson@example.com',
        phone: '(987) 654-3210',
        address: 'New York, NY',
        experience: `Marketing Manager at Global Brands Inc. (2019-Present)
• Managed team of 5 marketing specialists
• Increased social media engagement by 150% through targeted campaigns
• Developed and executed quarterly marketing strategies
• Reduced customer acquisition cost by 30% through optimization

Digital Marketing Specialist at Creative Agency (2016-2019)
• Managed digital campaigns for 10+ clients
• Increased website traffic by 80% through SEO optimization
• Created content strategy that improved conversion rates by 25%
• Analyzed campaign performance and provided insights`,
        education: `Master of Business Administration in Marketing
Business University, 2016
• Specialization in Digital Marketing
• Graduated with Honors
• Marketing Association President

Bachelor of Arts in Communications
State University, 2014
• Minor in Business Administration
• Dean\'s List`,
        skills: `• Google Analytics, SEO/SEM, Social Media Marketing
• Email Marketing Platforms, CRM Systems, CMS
• Team Leadership, Strategic Planning, Communication
• Analytical Thinking, Client Relations, Budget Management
• Content Strategy, Brand Development, Market Research`
    }
};

// Initialize Resume Preview
function updateResumePreview() {
    // Get form values
    const fullName = document.getElementById('fullName').value || 'John Smith';
    const jobTitle = document.getElementById('jobTitle').value || 'Software Developer';
    const summary = document.getElementById('summary').value || 'Professional summary...';
    const email = document.getElementById('email').value || 'john.smith@example.com';
    const phone = document.getElementById('phone').value || '(123) 456-7890';
    const address = document.getElementById('address').value || 'New York, NY';
    const experience = document.getElementById('experience').value || 'No experience provided';
    const education = document.getElementById('education').value || 'No education provided';
    const skills = document.getElementById('skills').value || 'No skills provided';
    
    // Generate resume HTML based on template
    let resumeHTML = '';
    
    switch(currentTemplate) {
        case '1': // Classic Professional
            resumeHTML = `
                <div class="resume-header">
                    <div class="resume-name">${fullName.toUpperCase()}</div>
                    <div class="resume-title">${jobTitle}</div>
                    <div class="resume-contact">
                        <div class="resume-contact-item">
                            <i class="fas fa-envelope"></i> ${email}
                        </div>
                        <div class="resume-contact-item">
                            <i class="fas fa-phone"></i> ${phone}
                        </div>
                        <div class="resume-contact-item">
                            <i class="fas fa-map-marker-alt"></i> ${address}
                        </div>
                    </div>
                </div>
                
                ${summary ? `
                <div class="resume-section">
                    <div class="resume-section-title">Professional Summary</div>
                    <div class="resume-content">${formatText(summary)}</div>
                </div>` : ''}
                
                ${experience ? `
                <div class="resume-section">
                    <div class="resume-section-title">Work Experience</div>
                    <div class="resume-content">${formatText(experience)}</div>
                </div>` : ''}
                
                ${education ? `
                <div class="resume-section">
                    <div class="resume-section-title">Education</div>
                    <div class="resume-content">${formatText(education)}</div>
                </div>` : ''}
                
                ${skills ? `
                <div class="resume-section">
                    <div class="resume-section-title">Skills</div>
                    <div class="resume-content">${formatText(skills)}</div>
                </div>` : ''}
            `;
            break;
            
        case '2': // Modern Executive
            resumeHTML = `
                <div style="color: white; background: var(--primary-navy); padding: 30px; border-radius: 5px; margin-bottom: 30px;">
                    <h1 style="font-size: 32px; margin-bottom: 5px; color: var(--secondary-gold);">${fullName.toUpperCase()}</h1>
                    <h2 style="font-size: 20px; margin-bottom: 15px; color: white; opacity: 0.9;">${jobTitle}</h2>
                    <div style="display: flex; flex-wrap: wrap; gap: 15px; font-size: 14px;">
                        <span><i class="fas fa-envelope"></i> ${email}</span>
                        <span><i class="fas fa-phone"></i> ${phone}</span>
                        <span><i class="fas fa-map-marker-alt"></i> ${address}</span>
                    </div>
                </div>
                
                ${summary ? `
                <div style="margin-bottom: 25px;">
                    <h3 style="color: var(--primary-navy); font-size: 18px; border-bottom: 2px solid var(--secondary-gold); padding-bottom: 5px; margin-bottom: 15px;">PROFILE</h3>
                    <div style="font-size: 14px; line-height: 1.6;">${formatText(summary)}</div>
                </div>` : ''}
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
                    <div>
                        ${experience ? `
                        <div style="margin-bottom: 25px;">
                            <h3 style="color: var(--primary-navy); font-size: 18px; border-bottom: 2px solid var(--secondary-gold); padding-bottom: 5px; margin-bottom: 15px;">EXPERIENCE</h3>
                            <div style="font-size: 14px; line-height: 1.6;">${formatText(experience)}</div>
                        </div>` : ''}
                    </div>
                    
                    <div>
                        ${education ? `
                        <div style="margin-bottom: 25px;">
                            <h3 style="color: var(--primary-navy); font-size: 18px; border-bottom: 2px solid var(--secondary-gold); padding-bottom: 5px; margin-bottom: 15px;">EDUCATION</h3>
                            <div style="font-size: 14px; line-height: 1.6;">${formatText(education)}</div>
                        </div>` : ''}
                        
                        ${skills ? `
                        <div>
                            <h3 style="color: var(--primary-navy); font-size: 18px; border-bottom: 2px solid var(--secondary-gold); padding-bottom: 5px; margin-bottom: 15px;">SKILLS</h3>
                            <div style="font-size: 14px; line-height: 1.6;">${formatText(skills)}</div>
                        </div>` : ''}
                    </div>
                </div>
            `;
            break;
            
        case '3': // Creative Design
            resumeHTML = `
                <div style="background: var(--accent-teal); color: white; padding: 30px; border-radius: 5px; margin-bottom: 30px; text-align: center;">
                    <h1 style="font-size: 36px; margin-bottom: 5px; font-weight: 700;">${fullName}</h1>
                    <h2 style="font-size: 20px; margin-bottom: 15px; color: var(--secondary-gold);">${jobTitle}</h2>
                    <div style="display: flex; justify-content: center; flex-wrap: wrap; gap: 15px; font-size: 14px;">
                        <span><i class="fas fa-envelope"></i> ${email}</span>
                        <span><i class="fas fa-phone"></i> ${phone}</span>
                        <span><i class="fas fa-map-marker-alt"></i> ${address}</span>
                    </div>
                </div>
                
                ${summary ? `
                <div style="margin-bottom: 25px; padding: 20px; background: rgba(0, 168, 168, 0.1); border-radius: 5px;">
                    <h3 style="color: var(--accent-teal); font-size: 18px; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                        <i class="fas fa-user"></i> ABOUT ME
                    </h3>
                    <div style="font-size: 14px; line-height: 1.6;">${formatText(summary)}</div>
                </div>` : ''}
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
                    <div>
                        ${experience ? `
                        <div style="margin-bottom: 25px;">
                            <h3 style="color: var(--accent-teal); font-size: 18px; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                                <i class="fas fa-briefcase"></i> EXPERIENCE
                            </h3>
                            <div style="font-size: 14px; line-height: 1.6;">${formatText(experience)}</div>
                        </div>` : ''}
                    </div>
                    
                    <div>
                        ${education ? `
                        <div style="margin-bottom: 25px;">
                            <h3 style="color: var(--accent-teal); font-size: 18px; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                                <i class="fas fa-graduation-cap"></i> EDUCATION
                            </h3>
                            <div style="font-size: 14px; line-height: 1.6;">${formatText(education)}</div>
                        </div>` : ''}
                        
                        ${skills ? `
                        <div>
                            <h3 style="color: var(--accent-teal); font-size: 18px; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                                <i class="fas fa-tools"></i> SKILLS
                            </h3>
                            <div style="font-size: 14px; line-height: 1.6;">${formatText(skills)}</div>
                        </div>` : ''}
                    </div>
                </div>
            `;
            break;
            
        case '4': // Executive Style
            resumeHTML = `
                <div style="border-bottom: 3px solid var(--secondary-gold); padding-bottom: 20px; margin-bottom: 30px;">
                    <h1 style="font-size: 34px; color: var(--primary-navy); margin-bottom: 5px; font-weight: 300;">${fullName}</h1>
                    <h2 style="font-size: 18px; color: #666; margin-bottom: 15px; font-weight: 400;">${jobTitle}</h2>
                    <div style="display: flex; flex-wrap: wrap; gap: 20px; font-size: 14px; color: #888;">
                        <span>${email}</span>
                        <span>${phone}</span>
                        <span>${address}</span>
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 40px;">
                    <div>
                        ${summary ? `
                        <div style="margin-bottom: 30px;">
                            <h3 style="color: var(--primary-navy); font-size: 16px; letter-spacing: 1px; margin-bottom: 15px; text-transform: uppercase;">Summary</h3>
                            <div style="font-size: 14px; line-height: 1.6;">${formatText(summary)}</div>
                        </div>` : ''}
                        
                        ${skills ? `
                        <div style="margin-bottom: 30px;">
                            <h3 style="color: var(--primary-navy); font-size: 16px; letter-spacing: 1px; margin-bottom: 15px; text-transform: uppercase;">Skills</h3>
                            <div style="font-size: 14px; line-height: 1.6;">${formatText(skills)}</div>
                        </div>` : ''}
                    </div>
                    
                    <div>
                        ${experience ? `
                        <div style="margin-bottom: 30px;">
                            <h3 style="color: var(--primary-navy); font-size: 16px; letter-spacing: 1px; margin-bottom: 15px; text-transform: uppercase;">Experience</h3>
                            <div style="font-size: 14px; line-height: 1.6;">${formatText(experience)}</div>
                        </div>` : ''}
                        
                        ${education ? `
                        <div>
                            <h3 style="color: var(--primary-navy); font-size: 16px; letter-spacing: 1px; margin-bottom: 15px; text-transform: uppercase;">Education</h3>
                            <div style="font-size: 14px; line-height: 1.6;">${formatText(education)}</div>
                        </div>` : ''}
                    </div>
                </div>
            `;
            break;
            
        case '5': // Example CV
            resumeHTML = `
                <div class="resume-header">
                    <div class="resume-name">${fullName.toUpperCase()}</div>
                    <div class="resume-title">${jobTitle}</div>
                    <div class="resume-contact">
                        <div class="resume-contact-item">
                            <i class="fas fa-envelope"></i> ${email}
                        </div>
                        <div class="resume-contact-item">
                            <i class="fas fa-phone"></i> ${phone}
                        </div>
                        <div class="resume-contact-item">
                            <i class="fas fa-map-marker-alt"></i> ${address}
                        </div>
                    </div>
                </div>
                
                ${summary ? `
                <div class="resume-section">
                    <div class="resume-section-title">Professional Profile</div>
                    <div class="resume-content">${formatText(summary)}</div>
                </div>` : ''}
                
                ${experience ? `
                <div class="resume-section">
                    <div class="resume-section-title">Work Experience</div>
                    <div class="resume-content">${formatText(experience)}</div>
                </div>` : ''}
                
                ${education ? `
                <div class="resume-section">
                    <div class="resume-section-title">Education & Training</div>
                    <div class="resume-content">${formatText(education)}</div>
                </div>` : ''}
                
                ${skills ? `
                <div class="resume-section">
                    <div class="resume-section-title">Skills & Competencies</div>
                    <div class="resume-content">
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                            ${formatText(skills).split('<br>').map(skill => `
                                <div style="padding: 10px; background: var(--gold-light); border-radius: 5px; border-left: 3px solid var(--secondary-gold);">
                                    ${skill}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>` : ''}
                
                <div class="resume-section">
                    <div class="resume-section-title">References</div>
                    <div class="resume-content">
                        <p>Available upon request</p>
                    </div>
                </div>
            `;
            break;
    }
    
    resumePreview.innerHTML = resumeHTML;
}

// Format text with bullet points
function formatText(text) {
    return text
        .split('\n')
        .map(line => {
            if (line.trim().startsWith('•')) {
                return `<p style="margin-bottom: 8px; padding-left: 20px; text-indent: -20px;">${line}</p>`;
            }
            return `<p style="margin-bottom: 10px;">${line}</p>`;
        })
        .join('');
}

// Template Selection
templates.forEach(template => {
    template.addEventListener('click', () => {
        templates.forEach(t => t.classList.remove('active'));
        template.classList.add('active');
        currentTemplate = template.getAttribute('data-template');
        updateResumePreview();
    });
});

selectTemplateBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const template = btn.getAttribute('data-template');
        templates.forEach(t => t.classList.remove('active'));
        document.querySelector(`.template[data-template="${template}"]`).classList.add('active');
        currentTemplate = template;
        updateResumePreview();
    });
});

// Load Example
function loadExample(exampleName) {
    const example = examples[exampleName];
    if (!example) return;
    
    // Populate form fields
    document.getElementById('fullName').value = example.fullName;
    document.getElementById('jobTitle').value = example.jobTitle;
    document.getElementById('summary').value = example.summary;
    document.getElementById('email').value = example.email;
    document.getElementById('phone').value = example.phone;
    document.getElementById('address').value = example.address;
    document.getElementById('experience').value = example.experience;
    document.getElementById('education').value = example.education;
    document.getElementById('skills').value = example.skills;
    
    // Switch to template 5 for example CV
    if (exampleName === 'tshedimosho') {
        templates.forEach(t => t.classList.remove('active'));
        document.querySelector('.template[data-template="5"]').classList.add('active');
        currentTemplate = '5';
    }
    
    updateResumePreview();
    
    alert('Example loaded! Customize the information to match your own experience.');
}

loadExampleBtn.addEventListener('click', () => {
    loadExample('tshedimosho');
});

loadExampleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const example = btn.getAttribute('data-example');
        loadExample(example);
    });
});

// Update preview on form input
if (resumeForm) {
    resumeForm.addEventListener('input', updateResumePreview);
}

// Download PDF
downloadBtn.addEventListener('click', async () => {
    downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating PDF...';
    downloadBtn.disabled = true;
    
    try {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });
        
        // Get resume data
        const fullName = document.getElementById('fullName').value || 'John Smith';
        const jobTitle = document.getElementById('jobTitle').value || 'Software Developer';
        const summary = document.getElementById('summary').value || 'Professional summary...';
        const email = document.getElementById('email').value || 'john.smith@example.com';
        const phone = document.getElementById('phone').value || '(123) 456-7890';
        const address = document.getElementById('address').value || 'New York, NY';
        const experience = document.getElementById('experience').value || 'No experience provided';
        const education = document.getElementById('education').value || 'No education provided';
        const skills = document.getElementById('skills').value || 'No skills provided';
        
        // Set margins
        const margin = 20;
        let yPos = margin;
        const pageWidth = 210;
        const contentWidth = pageWidth - (margin * 2);
        
        // Set font
        pdf.setFont("helvetica");
        
        // Name
        pdf.setFontSize(24);
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(10, 26, 61);
        pdf.text(fullName.toUpperCase(), margin, yPos);
        yPos += 10;
        
        // Title
        pdf.setFontSize(16);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(0, 168, 168);
        pdf.text(jobTitle, margin, yPos);
        yPos += 10;
        
        // Contact info
        pdf.setFontSize(11);
        pdf.setTextColor(100, 100, 100);
        const contactInfo = `${email} | ${phone} | ${address}`;
        pdf.text(contactInfo, margin, yPos);
        yPos += 15;
        
        // Line separator
        pdf.setDrawColor(201, 169, 110);
        pdf.setLineWidth(0.5);
        pdf.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 15;
        
        // Summary
        if (summary) {
            pdf.setFontSize(14);
            pdf.setFont("helvetica", "bold");
            pdf.setTextColor(10, 26, 61);
            pdf.text("PROFESSIONAL SUMMARY", margin, yPos);
            yPos += 8;
            
            pdf.setFontSize(11);
            pdf.setFont("helvetica", "normal");
            pdf.setTextColor(0, 0, 0);
            const summaryLines = pdf.splitTextToSize(summary, contentWidth);
            pdf.text(summaryLines, margin, yPos);
            yPos += (summaryLines.length * 6) + 15;
        }
        
        // Experience
        if (experience) {
            pdf.setFontSize(14);
            pdf.setFont("helvetica", "bold");
            pdf.setTextColor(10, 26, 61);
            pdf.text("WORK EXPERIENCE", margin, yPos);
            yPos += 8;
            
            pdf.setFontSize(11);
            pdf.setFont("helvetica", "normal");
            const expLines = pdf.splitTextToSize(experience, contentWidth);
            pdf.text(expLines, margin, yPos);
            yPos += (expLines.length * 6) + 15;
        }
        
        // Education
        if (education) {
            pdf.setFontSize(14);
            pdf.setFont("helvetica", "bold");
            pdf.setTextColor(10, 26, 61);
            pdf.text("EDUCATION", margin, yPos);
            yPos += 8;
            
            pdf.setFontSize(11);
            pdf.setFont("helvetica", "normal");
            const eduLines = pdf.splitTextToSize(education, contentWidth);
            pdf.text(eduLines, margin, yPos);
            yPos += (eduLines.length * 6) + 15;
        }
        
        // Skills
        if (skills) {
            pdf.setFontSize(14);
            pdf.setFont("helvetica", "bold");
            pdf.setTextColor(10, 26, 61);
            pdf.text("SKILLS", margin, yPos);
            yPos += 8;
            
            pdf.setFontSize(11);
            pdf.setFont("helvetica", "normal");
            const skillLines = pdf.splitTextToSize(skills, contentWidth);
            pdf.text(skillLines, margin, yPos);
        }
        
        // Footer
        pdf.setFontSize(9);
        pdf.setTextColor(150, 150, 150);
        pdf.text("Created with 9to5 University Resume Builder", margin, 285);
        
        // Save PDF
        const fileName = `Resume_${fullName.replace(/\s+/g, '_')}.pdf`;
        pdf.save(fileName);
        
        downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download as PDF';
        downloadBtn.disabled = false;
        
        alert('Your professional resume has been downloaded successfully!');
    } catch (error) {
        console.error('Error generating PDF:', error);
        downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download as PDF';
        downloadBtn.disabled = false;
        alert('Error generating PDF. Please try again.');
    }
});

// Print Resume
if (printBtn) {
    printBtn.addEventListener('click', () => {
        const printContent = resumePreview.innerHTML;
        const originalContent = document.body.innerHTML;
        
        document.body.innerHTML = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Print Resume</title>
                <style>
                    body { 
                        font-family: Arial, sans-serif; 
                        line-height: 1.6;
                        color: #333;
                        max-width: 800px;
                        margin: 0 auto;
                        padding: 20px;
                    }
                    @media print {
                        @page { margin: 0; }
                        body { margin: 1.6cm; }
                    }
                </style>
            </head>
            <body>
                ${printContent}
                <script>
                    window.onafterprint = function() {
                        document.body.innerHTML = \`${originalContent.replace(/`/g, '\\`')}\`;
                        window.location.reload();
                    };
                    window.print();
                <\/script>
            </body>
            </html>
        `;
    });
}

// Refresh Preview
if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
        updateResumePreview();
        refreshBtn.innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(() => {
            refreshBtn.innerHTML = '<i class="fas fa-sync-alt"></i>';
        }, 1000);
    });
}

// Share Resume
if (shareBtn) {
    shareBtn.addEventListener('click', () => {
        if (navigator.share) {
            const fullName = document.getElementById('fullName').value || 'Resume';
            navigator.share({
                title: `${fullName}'s Resume`,
                text: 'Check out my professional resume created with 9to5 University',
                url: window.location.href,
            });
        } else {
            // Fallback: Copy to clipboard
            const textArea = document.createElement('textarea');
            textArea.value = window.location.href;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('Resume link copied to clipboard!');
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateResumePreview();
});