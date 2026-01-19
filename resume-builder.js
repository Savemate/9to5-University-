// Resume Builder JavaScript

// DOM Elements
const resumeForm = document.getElementById('resumeForm');
const resumePreview = document.getElementById('resumePreview');
const templateCards = document.querySelectorAll('.template-card');
const selectTemplateBtns = document.querySelectorAll('.btn-select-template');
const loadExampleBtn = document.getElementById('loadExampleBtn');
const loadExampleBtns = document.querySelectorAll('.btn-example-load');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const saveBtn = document.getElementById('saveBtn');
const downloadBtn = document.getElementById('downloadBtn');
const printBtn = document.getElementById('printBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const shareBtn = document.getElementById('shareBtn');
const progressSteps = document.querySelectorAll('.progress-steps .step');
const formSteps = document.querySelectorAll('.form-step');
const addExperienceBtn = document.getElementById('addExperienceBtn');
const addEducationBtn = document.getElementById('addEducationBtn');

// Current state
let currentStep = 1;
let currentTemplate = 'professional';
let experienceCount = 1;
let educationCount = 1;

// Example Data
const examples = {
    tshedimosho: {
        fullName: 'Tshedimosho Mlangeni',
        jobTitle: 'Multi-Industry Professional',
        summary: 'Experienced professional with diverse background in retail, manufacturing, and construction. Strong work ethic with expertise in customer service, operations, and technical assistance across multiple industries. Dedicated worker with proven ability to adapt to different work environments and learn new skills quickly.',
        email: 'mphelamlangeni@gmail.com',
        phone: '079 487 4559',
        address: 'Boksburg North, Boksburg, Gauteng, South Africa',
        linkedin: '',
        exp1_title: 'Deli Assistant & Merchandiser',
        exp1_company: 'Food Lover\'s Market',
        exp1_start: 'May 2022',
        exp1_end: 'May 2024',
        exp1_description: '• Managed shelf stock availability and product placement\n• Conducted regular quality checks to remove expired products\n• Operated deli equipment for food preparation and service\n• Maintained high standards of hygiene and cleanliness\n• Ensured accurate product pricing and scanning',
        exp2_title: 'Packer',
        exp2_company: 'Tiger Brands',
        exp2_start: 'May 2020',
        exp2_end: 'April 2021',
        exp2_description: '• Sorted products and verified manufacturing details\n• Conducted quality assessments of packaging and labeling\n• Operated pellet jacks for product transportation\n• Monitored and recorded product weights for quality control',
        exp3_title: 'Assistant',
        exp3_company: 'JHL Group (PTY) LTD',
        exp3_start: 'November 2013',
        exp3_end: 'February 2020',
        exp3_description: '• Assisted artisans with electrical, welding, and mechanical fitting tasks\n• Operated grinders and various construction tools\n• Managed tool inventory and preparation for daily tasks\n• Coordinated supply runs and material procurement',
        edu1_degree: 'Matric Certificate',
        edu1_field: 'General Education',
        edu1_school: 'Khataza High School',
        edu1_year: '2012',
        edu1_achievements: '• Completed basic education with focus on practical skills\n• Participated in technical and vocational training programs',
        technicalSkills: '• Computer Literacy & Office Software\n• Retail Operations & Merchandising\n• Quality Control & Product Inspection\n• Construction Tool Operation\n• Basic Electrical & Mechanical Assistance',
        softSkills: '• Strong Work Ethic\n• Adaptability\n• Team Collaboration\n• Attention to Detail\n• Communication Skills',
        languages: 'Sepedi (Native), Xitsonga (Native), English (Fluent), isiZulu (Conversational), Setswana (Basic), Sesotho (Basic), siSwati (Basic)',
        certifications: ''
    },
    developer: {
        fullName: 'John Smith',
        jobTitle: 'Senior Software Developer',
        summary: 'Full-stack developer with 5+ years of experience building scalable web applications. Proficient in JavaScript, React, Node.js, and modern development practices. Passionate about creating efficient, user-friendly solutions and mentoring junior developers.',
        email: 'john.smith@example.com',
        phone: '(123) 456-7890',
        address: 'San Francisco, CA',
        linkedin: 'linkedin.com/in/johnsmith',
        exp1_title: 'Senior Software Developer',
        exp1_company: 'Tech Solutions Inc.',
        exp1_start: 'January 2020',
        exp1_end: 'Present',
        exp1_description: '• Led development of customer-facing web applications using React and Node.js\n• Improved application performance by 40% through code optimization\n• Mentored 3 junior developers and conducted code reviews\n• Implemented CI/CD pipeline reducing deployment time by 60%',
        exp2_title: 'Web Developer',
        exp2_company: 'Digital Creations',
        exp2_start: 'June 2018',
        exp2_end: 'December 2020',
        exp2_description: '• Developed and maintained client websites using modern frameworks\n• Implemented responsive designs that increased mobile traffic by 35%\n• Collaborated with design team to improve user experience\n• Reduced page load times by 50% through optimization',
        edu1_degree: 'Bachelor of Science',
        edu1_field: 'Computer Science',
        edu1_school: 'University of Technology',
        edu1_year: '2018',
        edu1_achievements: '• Graduated Magna Cum Laude\n• President of Computer Science Club\n• Relevant Coursework: Data Structures, Algorithms, Web Development',
        technicalSkills: '• JavaScript, React, Node.js, Python\n• HTML/CSS, Sass, Bootstrap\n• MongoDB, PostgreSQL, Redis\n• Git, Docker, AWS, Jenkins',
        softSkills: '• Team Leadership\n• Problem Solving\n• Communication\n• Project Management\n• Mentoring',
        languages: 'English (Native), Spanish (Intermediate)',
        certifications: 'AWS Certified Developer, React Professional Certification'
    },
    marketing: {
        fullName: 'Sarah Johnson',
        jobTitle: 'Marketing Manager',
        summary: 'Digital marketing specialist with 7+ years of experience in campaign management, brand strategy, and team leadership. Proven track record of increasing brand visibility and driving revenue growth through innovative marketing strategies.',
        email: 'sarah.johnson@example.com',
        phone: '(987) 654-3210',
        address: 'New York, NY',
        linkedin: 'linkedin.com/in/sarahjohnson',
        exp1_title: 'Marketing Manager',
        exp1_company: 'Global Brands Inc.',
        exp1_start: 'March 2019',
        exp1_end: 'Present',
        exp1_description: '• Managed team of 5 marketing specialists\n• Increased social media engagement by 150% through targeted campaigns\n• Developed and executed quarterly marketing strategies\n• Reduced customer acquisition cost by 30% through optimization',
        exp2_title: 'Digital Marketing Specialist',
        exp2_company: 'Creative Agency',
        exp2_start: 'July 2016',
        exp2_end: 'February 2019',
        exp2_description: '• Managed digital campaigns for 10+ clients\n• Increased website traffic by 80% through SEO optimization\n• Created content strategy that improved conversion rates by 25%\n• Analyzed campaign performance and provided insights',
        edu1_degree: 'Master of Business Administration',
        edu1_field: 'Marketing',
        edu1_school: 'Business University',
        edu1_year: '2016',
        edu1_achievements: '• Specialization in Digital Marketing\n• Graduated with Honors\n• Marketing Association President',
        technicalSkills: '• Google Analytics, SEO/SEM\n• Social Media Marketing\n• Email Marketing Platforms\n• CRM Systems\n• Content Management Systems',
        softSkills: '• Team Leadership\n• Strategic Planning\n• Communication\n• Analytical Thinking\n• Client Relations',
        languages: 'English (Native), French (Fluent)',
        certifications: 'Google Analytics Certification, HubSpot Inbound Marketing'
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateResumePreview();
    updateProgressSteps();
});

// Template Selection
templateCards.forEach(card => {
    card.addEventListener('click', () => {
        const template = card.getAttribute('data-template');
        selectTemplate(template);
    });
});

selectTemplateBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const template = btn.getAttribute('data-template');
        selectTemplate(template);
    });
});

function selectTemplate(template) {
    currentTemplate = template;
    
    // Update template cards
    templateCards.forEach(card => {
        card.classList.remove('active');
        if (card.getAttribute('data-template') === template) {
            card.classList.add('active');
        }
    });
    
    updateResumePreview();
}

// Step Navigation
prevBtn.addEventListener('click', () => {
    if (currentStep > 1) {
        currentStep--;
        updateFormSteps();
        updateProgressSteps();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentStep < 5) {
        currentStep++;
        updateFormSteps();
        updateProgressSteps();
    }
});

function updateFormSteps() {
    formSteps.forEach(step => {
        step.classList.remove('active');
        if (parseInt(step.getAttribute('data-step')) === currentStep) {
            step.classList.add('active');
        }
    });
    
    // Update navigation buttons
    prevBtn.style.display = currentStep > 1 ? 'flex' : 'none';
    nextBtn.style.display = currentStep < 5 ? 'flex' : 'none';
    saveBtn.style.display = currentStep === 5 ? 'flex' : 'none';
}

function updateProgressSteps() {
    progressSteps.forEach(step => {
        const stepNum = parseInt(step.getAttribute('data-step'));
        step.classList.remove('active', 'completed');
        
        if (stepNum < currentStep) {
            step.classList.add('completed');
        } else if (stepNum === currentStep) {
            step.classList.add('active');
        }
    });
}

// Load Example
loadExampleBtn.addEventListener('click', () => {
    loadExample('tshedimosho');
});

loadExampleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const example = btn.getAttribute('data-example');
        loadExample(example);
        alert('Example loaded! Customize the information to match your own experience.');
    });
});

function loadExample(exampleName) {
    const example = examples[exampleName];
    if (!example) return;
    
    // Populate form fields
    Object.keys(example).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            element.value = example[key];
        }
    });
    
    updateResumePreview();
}

// Update Resume Preview
function updateResumePreview() {
    // Get form values
    const formData = getFormData();
    
    // Generate resume HTML based on template
    let resumeHTML = '';
    
    switch(currentTemplate) {
        case 'professional':
            resumeHTML = generateProfessionalTemplate(formData);
            break;
        case 'modern':
            resumeHTML = generateModernTemplate(formData);
            break;
        case 'creative':
            resumeHTML = generateCreativeTemplate(formData);
            break;
        case 'executive':
            resumeHTML = generateExecutiveTemplate(formData);
            break;
        case 'minimal':
            resumeHTML = generateMinimalTemplate(formData);
            break;
        default:
            resumeHTML = generateProfessionalTemplate(formData);
    }
    
    resumePreview.innerHTML = resumeHTML;
}

function getFormData() {
    const formElements = resumeForm.elements;
    const data = {};
    
    for (let element of formElements) {
        if (element.name || element.id) {
            const key = element.id || element.name;
            data[key] = element.value || '';
        }
    }
    
    return data;
}

// Template Generators
function generateProfessionalTemplate(data) {
    return `
        <div class="resume-header">
            <div class="resume-name">${data.fullName || 'Your Name'}</div>
            <div class="resume-title">${data.jobTitle || 'Professional Title'}</div>
            <div class="resume-contact">
                ${data.email ? `<div class="resume-contact-item"><i class="fas fa-envelope"></i> ${data.email}</div>` : ''}
                ${data.phone ? `<div class="resume-contact-item"><i class="fas fa-phone"></i> ${data.phone}</div>` : ''}
                ${data.address ? `<div class="resume-contact-item"><i class="fas fa-map-marker-alt"></i> ${data.address}</div>` : ''}
                ${data.linkedin ? `<div class="resume-contact-item"><i class="fab fa-linkedin"></i> ${data.linkedin}</div>` : ''}
            </div>
        </div>
        
        ${data.summary ? `
        <div class="resume-section">
            <div class="resume-section-title">Professional Summary</div>
            <div class="resume-content">${formatText(data.summary)}</div>
        </div>` : ''}
        
        ${data.exp1_title || data.exp1_description ? `
        <div class="resume-section">
            <div class="resume-section-title">Work Experience</div>
            ${generateExperienceItems(data)}
        </div>` : ''}
        
        ${data.edu1_degree || data.edu1_school ? `
        <div class="resume-section">
            <div class="resume-section-title">Education</div>
            ${generateEducationItems(data)}
        </div>` : ''}
        
        ${data.technicalSkills || data.softSkills ? `
        <div class="resume-section">
            <div class="resume-section-title">Skills</div>
            <div class="resume-content">
                ${data.technicalSkills ? `<p><strong>Technical:</strong> ${formatText(data.technicalSkills, false)}</p>` : ''}
                ${data.softSkills ? `<p><strong>Soft Skills:</strong> ${formatText(data.softSkills, false)}</p>` : ''}
                ${data.languages ? `<p><strong>Languages:</strong> ${data.languages}</p>` : ''}
                ${data.certifications ? `<p><strong>Certifications:</strong> ${formatText(data.certifications, false)}</p>` : ''}
            </div>
        </div>` : ''}
    `;
}

function generateModernTemplate(data) {
    return `
        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 30px;">
            <div>
                <div style="margin-bottom: 30px;">
                    <h1 style="color: var(--primary-navy); font-size: 32px; margin-bottom: 5px;">${data.fullName || 'Your Name'}</h1>
                    <h2 style="color: var(--accent-teal); font-size: 18px; margin-bottom: 20px;">${data.jobTitle || 'Professional Title'}</h2>
                </div>
                
                ${data.summary ? `
                <div style="margin-bottom: 30px;">
                    <h3 style="color: var(--primary-navy); font-size: 18px; border-bottom: 2px solid var(--secondary-gold); padding-bottom: 5px; margin-bottom: 15px;">PROFILE</h3>
                    <div style="font-size: 14px; line-height: 1.6;">${formatText(data.summary)}</div>
                </div>` : ''}
                
                ${data.exp1_title || data.exp1_description ? `
                <div style="margin-bottom: 30px;">
                    <h3 style="color: var(--primary-navy); font-size: 18px; border-bottom: 2px solid var(--secondary-gold); padding-bottom: 5px; margin-bottom: 15px;">EXPERIENCE</h3>
                    ${generateExperienceItems(data)}
                </div>` : ''}
                
                ${data.edu1_degree || data.edu1_school ? `
                <div>
                    <h3 style="color: var(--primary-navy); font-size: 18px; border-bottom: 2px solid var(--secondary-gold); padding-bottom: 5px; margin-bottom: 15px;">EDUCATION</h3>
                    ${generateEducationItems(data)}
                </div>` : ''}
            </div>
            
            <div style="background: var(--gold-light); padding: 25px; border-radius: 8px; height: fit-content;">
                ${data.email || data.phone || data.address || data.linkedin ? `
                <div style="margin-bottom: 25px;">
                    <h3 style="color: var(--primary-navy); font-size: 16px; margin-bottom: 15px; text-transform: uppercase;">Contact</h3>
                    <div style="font-size: 13px; line-height: 1.8;">
                        ${data.email ? `<p><strong>Email:</strong><br>${data.email}</p>` : ''}
                        ${data.phone ? `<p><strong>Phone:</strong><br>${data.phone}</p>` : ''}
                        ${data.address ? `<p><strong>Location:</strong><br>${data.address}</p>` : ''}
                        ${data.linkedin ? `<p><strong>LinkedIn:</strong><br>${data.linkedin}</p>` : ''}
                    </div>
                </div>` : ''}
                
                ${data.technicalSkills || data.softSkills ? `
                <div>
                    <h3 style="color: var(--primary-navy); font-size: 16px; margin-bottom: 15px; text-transform: uppercase;">Skills</h3>
                    <div style="font-size: 13px; line-height: 1.8;">
                        ${data.technicalSkills ? `<p><strong>Technical:</strong><br>${formatText(data.technicalSkills, false)}</p>` : ''}
                        ${data.softSkills ? `<p><strong>Soft Skills:</strong><br>${formatText(data.softSkills, false)}</p>` : ''}
                        ${data.languages ? `<p><strong>Languages:</strong><br>${data.languages}</p>` : ''}
                        ${data.certifications ? `<p><strong>Certifications:</strong><br>${formatText(data.certifications, false)}</p>` : ''}
                    </div>
                </div>` : ''}
            </div>
        </div>
    `;
}

function generateCreativeTemplate(data) {
    return `
        <div style="color: #333;">
            <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 3px solid var(--accent-teal);">
                <h1 style="color: var(--primary-navy); font-size: 36px; margin-bottom: 5px; font-weight: 700;">${data.fullName || 'Your Name'}</h1>
                <h2 style="color: var(--accent-teal); font-size: 20px; margin-bottom: 15px;">${data.jobTitle || 'Professional Title'}</h2>
                <div style="display: flex; justify-content: center; flex-wrap: wrap; gap: 15px; font-size: 14px; color: #666;">
                    ${data.email ? `<span><i class="fas fa-envelope"></i> ${data.email}</span>` : ''}
                    ${data.phone ? `<span><i class="fas fa-phone"></i> ${data.phone}</span>` : ''}
                    ${data.address ? `<span><i class="fas fa-map-marker-alt"></i> ${data.address}</span>` : ''}
                </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
                <div>
                    ${data.summary ? `
                    <div style="margin-bottom: 25px;">
                        <h3 style="color: var(--primary-navy); font-size: 18px; margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                            <i class="fas fa-user"></i> About Me
                        </h3>
                        <div style="font-size: 14px; line-height: 1.6;">${formatText(data.summary)}</div>
                    </div>` : ''}
                    
                    ${data.exp1_title || data.exp1_description ? `
                    <div style="margin-bottom: 25px;">
                        <h3 style="color: var(--primary-navy); font-size: 18px; margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                            <i class="fas fa-briefcase"></i> Experience
                        </h3>
                        ${generateExperienceItems(data)}
                    </div>` : ''}
                </div>
                
                <div>
                    ${data.edu1_degree || data.edu1_school ? `
                    <div style="margin-bottom: 25px;">
                        <h3 style="color: var(--primary-navy); font-size: 18px; margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                            <i class="fas fa-graduation-cap"></i> Education
                        </h3>
                        ${generateEducationItems(data)}
                    </div>` : ''}
                    
                    ${data.technicalSkills || data.softSkills ? `
                    <div>
                        <h3 style="color: var(--primary-navy); font-size: 18px; margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                            <i class="fas fa-tools"></i> Skills
                        </h3>
                        <div style="font-size: 14px; line-height: 1.6;">
                            ${data.technicalSkills ? `<p><strong>Technical:</strong> ${formatText(data.technicalSkills, false)}</p>` : ''}
                            ${data.softSkills ? `<p><strong>Soft Skills:</strong> ${formatText(data.softSkills, false)}</p>` : ''}
                            ${data.languages ? `<p><strong>Languages:</strong> ${data.languages}</p>` : ''}
                        </div>
                    </div>` : ''}
                </div>
            </div>
        </div>
    `;
}

function generateExecutiveTemplate(data) {
    return `
        <div style="color: #333;">
            <div style="border-bottom: 2px solid var(--secondary-gold); padding-bottom: 20px; margin-bottom: 30px;">
                <h1 style="color: var(--primary-navy); font-size: 34px; margin-bottom: 5px; font-weight: 300;">${data.fullName || 'Your Name'}</h1>
                <h2 style="color: #666; font-size: 18px; margin-bottom: 15px; font-weight: 400;">${data.jobTitle || 'Professional Title'}</h2>
                <div style="display: flex; flex-wrap: wrap; gap: 20px; font-size: 14px; color: #888;">
                    ${data.email ? `<span>${data.email}</span>` : ''}
                    ${data.phone ? `<span>${data.phone}</span>` : ''}
                    ${data.address ? `<span>${data.address}</span>` : ''}
                </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 40px;">
                <div>
                    ${data.summary ? `
                    <div style="margin-bottom: 30px;">
                        <h3 style="color: var(--primary-navy); font-size: 16px; letter-spacing: 1px; margin-bottom: 15px; text-transform: uppercase;">Summary</h3>
                        <div style="font-size: 14px; line-height: 1.6;">${formatText(data.summary)}</div>
                    </div>` : ''}
                    
                    ${data.technicalSkills || data.softSkills ? `
                    <div style="margin-bottom: 30px;">
                        <h3 style="color: var(--primary-navy); font-size: 16px; letter-spacing: 1px; margin-bottom: 15px; text-transform: uppercase;">Skills</h3>
                        <div style="font-size: 14px; line-height: 1.6;">
                            ${data.technicalSkills ? `<p>${formatText(data.technicalSkills, false)}</p>` : ''}
                            ${data.softSkills ? `<p>${formatText(data.softSkills, false)}</p>` : ''}
                        </div>
                    </div>` : ''}
                </div>
                
                <div>
                    ${data.exp1_title || data.exp1_description ? `
                    <div style="margin-bottom: 30px;">
                        <h3 style="color: var(--primary-navy); font-size: 16px; letter-spacing: 1px; margin-bottom: 15px; text-transform: uppercase;">Experience</h3>
                        ${generateExperienceItems(data, true)}
                    </div>` : ''}
                    
                    ${data.edu1_degree || data.edu1_school ? `
                    <div>
                        <h3 style="color: var(--primary-navy); font-size: 16px; letter-spacing: 1px; margin-bottom: 15px; text-transform: uppercase;">Education</h3>
                        ${generateEducationItems(data, true)}
                    </div>` : ''}
                </div>
            </div>
        </div>
    `;
}

function generateMinimalTemplate(data) {
    return `
        <div style="color: #333; font-family: 'Arial', sans-serif;">
            <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #000; font-size: 28px; margin-bottom: 5px; font-weight: 400;">${data.fullName || 'Your Name'}</h1>
                <h2 style="color: #666; font-size: 16px; margin-bottom: 15px; font-weight: 300;">${data.jobTitle || 'Professional Title'}</h2>
                <div style="display: flex; justify-content: center; flex-wrap: wrap; gap: 15px; font-size: 13px; color: #888;">
                    ${data.email ? `<span>${data.email}</span>` : ''}
                    ${data.phone ? `<span>${data.phone}</span>` : ''}
                    ${data.address ? `<span>${data.address}</span>` : ''}
                </div>
            </div>
            
            <div style="max-width: 600px; margin: 0 auto;">
                ${data.summary ? `
                <div style="margin-bottom: 25px;">
                    <div style="font-size: 14px; line-height: 1.6; text-align: center;">${formatText(data.summary)}</div>
                </div>` : ''}
                
                ${data.exp1_title || data.exp1_description ? `
                <div style="margin-bottom: 25px;">
                    <div style="border-top: 1px solid #eee; padding-top: 20px;">
                        ${generateExperienceItems(data, false, true)}
                    </div>
                </div>` : ''}
                
                ${data.edu1_degree || data.edu1_school ? `
                <div style="margin-bottom: 25px;">
                    <div style="border-top: 1px solid #eee; padding-top: 20px;">
                        ${generateEducationItems(data, false, true)}
                    </div>
                </div>` : ''}
                
                ${data.technicalSkills || data.softSkills ? `
                <div>
                    <div style="border-top: 1px solid #eee; padding-top: 20px;">
                        <div style="font-size: 14px; line-height: 1.6;">
                            ${data.technicalSkills ? `<p>${formatText(data.technicalSkills, false)}</p>` : ''}
                            ${data.softSkills ? `<p>${formatText(data.softSkills, false)}</p>` : ''}
                        </div>
                    </div>
                </div>` : ''}
            </div>
        </div>
    `;
}

// Helper Functions
function generateExperienceItems(data, compact = false, minimal = false) {
    let items = '';
    
    for (let i = 1; i <= 3; i++) {
        const title = data[`exp${i}_title`];
        const company = data[`exp${i}_company`];
        const start = data[`exp${i}_start`];
        const end = data[`exp${i}_end`];
        const description = data[`exp${i}_description`];
        
        if (title || description) {
            if (minimal) {
                items += `
                    <div style="margin-bottom: ${i < 3 ? '15px' : '0'};">
                        ${title ? `<div style="font-weight: 600; color: #000;">${title}</div>` : ''}
                        ${company ? `<div style="color: #666; font-size: 13px;">${company}</div>` : ''}
                        ${(start || end) ? `<div style="color: #888; font-size: 12px; margin-bottom: 5px;">${start} ${end ? ' - ' + end : ''}</div>` : ''}
                        ${description ? `<div style="color: #555; font-size: 13px; line-height: 1.5;">${formatText(description)}</div>` : ''}
                    </div>
                `;
            } else if (compact) {
                items += `
                    <div style="margin-bottom: ${i < 3 ? '15px' : '0'};">
                        <div style="font-weight: 600; color: #333;">${title || ''}</div>
                        <div style="color: #666; font-size: 14px;">${company || ''} | ${start || ''} ${end ? ' - ' + end : ''}</div>
                        ${description ? `<div style="color: #555; font-size: 13px; margin-top: 5px;">${formatText(description)}</div>` : ''}
                    </div>
                `;
            } else {
                items += `
                    <div class="resume-item">
                        ${title ? `<div class="resume-item-title">${title}</div>` : ''}
                        ${company ? `<div class="resume-item-subtitle">${company}</div>` : ''}
                        ${(start || end) ? `<div class="resume-item-date">${start} ${end ? ' - ' + end : ''}</div>` : ''}
                        ${description ? `<div class="resume-item-description">${formatText(description)}</div>` : ''}
                    </div>
                `;
            }
        }
    }
    
    return items;
}

function generateEducationItems(data, compact = false, minimal = false) {
    let items = '';
    
    for (let i = 1; i <= 2; i++) {
        const degree = data[`edu${i}_degree`];
        const field = data[`edu${i}_field`];
        const school = data[`edu${i}_school`];
        const year = data[`edu${i}_year`];
        const achievements = data[`edu${i}_achievements`];
        
        if (degree || school) {
            if (minimal) {
                items += `
                    <div style="margin-bottom: ${i < 2 ? '15px' : '0'};">
                        ${degree ? `<div style="font-weight: 600; color: #000;">${degree}</div>` : ''}
                        ${field ? `<div style="color: #666; font-size: 13px;">${field}</div>` : ''}
                        ${school ? `<div style="color: #666; font-size: 13px;">${school}</div>` : ''}
                        ${year ? `<div style="color: #888; font-size: 12px; margin-bottom: 5px;">${year}</div>` : ''}
                        ${achievements ? `<div style="color: #555; font-size: 13px; line-height: 1.5;">${formatText(achievements)}</div>` : ''}
                    </div>
                `;
            } else if (compact) {
                items += `
                    <div style="margin-bottom: ${i < 2 ? '15px' : '0'};">
                        <div style="font-weight: 600; color: #333;">${degree || ''}</div>
                        <div style="color: #666; font-size: 14px;">${school || ''} | ${year || ''}</div>
                        ${achievements ? `<div style="color: #555; font-size: 13px; margin-top: 5px;">${formatText(achievements)}</div>` : ''}
                    </div>
                `;
            } else {
                items += `
                    <div class="resume-item">
                        ${degree ? `<div class="resume-item-title">${degree}</div>` : ''}
                        ${field ? `<div class="resume-item-subtitle">${field}</div>` : ''}
                        ${school ? `<div class="resume-item-subtitle">${school}</div>` : ''}
                        ${year ? `<div class="resume-item-date">${year}</div>` : ''}
                        ${achievements ? `<div class="resume-item-description">${formatText(achievements)}</div>` : ''}
                    </div>
                `;
            }
        }
    }
    
    return items;
}

function formatText(text, asHTML = true) {
    if (!text) return '';
    
    if (asHTML) {
        return text
            .replace(/\n/g, '<br>')
            .replace(/\•/g, '•')
            .replace(/\*/g, '•');
    } else {
        return text
            .replace(/\n/g, ', ')
            .replace(/[•*]/g, '');
    }
}

// Form Input Listener
resumeForm.addEventListener('input', () => {
    updateResumePreview();
});

// Download PDF
downloadBtn.addEventListener('click', async () => {
    downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating PDF...';
    downloadBtn.disabled = true;
    
    try {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
            hotfixes: ["px_scaling"]
        });
        
        const formData = getFormData();
        const margin = 20;
        let yPos = margin;
        const pageWidth = 210;
        const contentWidth = pageWidth - (margin * 2);
        
        // Set font
        pdf.setFont("helvetica");
        
        // Name
        pdf.setFontSize(24);
        pdf.setFont("helvetica", "bold");
        pdf.text(formData.fullName || 'Your Name', margin, yPos);
        yPos += 10;
        
        // Title
        pdf.setFontSize(16);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(100, 100, 100);
        pdf.text(formData.jobTitle || 'Professional Title', margin, yPos);
        yPos += 15;
        
        // Contact info
        pdf.setFontSize(11);
        const contactInfo = [];
        if (formData.email) contactInfo.push(formData.email);
        if (formData.phone) contactInfo.push(formData.phone);
        if (formData.address) contactInfo.push(formData.address);
        
        if (contactInfo.length > 0) {
            pdf.text(contactInfo.join(' | '), margin, yPos);
            yPos += 10;
        }
        
        // Separator
        pdf.setDrawColor(201, 169, 110);
        pdf.setLineWidth(0.5);
        pdf.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 15;
        
        // Summary
        if (formData.summary) {
            pdf.setFontSize(14);
            pdf.setFont("helvetica", "bold");
            pdf.setTextColor(0, 0, 0);
            pdf.text("PROFESSIONAL SUMMARY", margin, yPos);
            yPos += 8;
            
            pdf.setFontSize(11);
            pdf.setFont("helvetica", "normal");
            const summaryLines = pdf.splitTextToSize(formData.summary, contentWidth);
            pdf.text(summaryLines, margin, yPos);
            yPos += (summaryLines.length * 6) + 15;
        }
        
        // Experience
        if (formData.exp1_title || formData.exp1_description) {
            pdf.setFontSize(14);
            pdf.setFont("helvetica", "bold");
            pdf.text("EXPERIENCE", margin, yPos);
            yPos += 8;
            
            pdf.setFontSize(11);
            pdf.setFont("helvetica", "normal");
            
            for (let i = 1; i <= 3; i++) {
                const title = formData[`exp${i}_title`];
                const company = formData[`exp${i}_company`];
                const start = formData[`exp${i}_start`];
                const end = formData[`exp${i}_end`];
                const description = formData[`exp${i}_description`];
                
                if (title || description) {
                    // Position title
                    if (title) {
                        pdf.setFont("helvetica", "bold");
                        pdf.text(title, margin, yPos);
                        yPos += 6;
                    }
                    
                    // Company and dates
                    let companyInfo = '';
                    if (company) companyInfo += company;
                    if (start || end) {
                        if (company) companyInfo += ' | ';
                        companyInfo += `${start || ''} ${end ? ' - ' + end : ''}`;
                    }
                    
                    if (companyInfo) {
                        pdf.setFont("helvetica", "italic");
                        pdf.text(companyInfo, margin, yPos);
                        yPos += 6;
                    }
                    
                    // Description
                    if (description) {
                        pdf.setFont("helvetica", "normal");
                        const descLines = pdf.splitTextToSize(description, contentWidth);
                        pdf.text(descLines, margin, yPos);
                        yPos += (descLines.length * 6);
                    }
                    
                    yPos += 10;
                }
            }
            yPos += 5;
        }
        
        // Education
        if (formData.edu1_degree || formData.edu1_school) {
            pdf.setFontSize(14);
            pdf.setFont("helvetica", "bold");
            pdf.text("EDUCATION", margin, yPos);
            yPos += 8;
            
            pdf.setFontSize(11);
            pdf.setFont("helvetica", "normal");
            
            for (let i = 1; i <= 2; i++) {
                const degree = formData[`edu${i}_degree`];
                const field = formData[`edu${i}_field`];
                const school = formData[`edu${i}_school`];
                const year = formData[`edu${i}_year`];
                const achievements = formData[`edu${i}_achievements`];
                
                if (degree || school) {
                    // Degree
                    if (degree) {
                        pdf.setFont("helvetica", "bold");
                        pdf.text(degree, margin, yPos);
                        yPos += 6;
                    }
                    
                    // School and field
                    let schoolInfo = '';
                    if (school) schoolInfo += school;
                    if (field) {
                        if (school) schoolInfo += ' - ';
                        schoolInfo += field;
                    }
                    if (year) {
                        if (schoolInfo) schoolInfo += ' | ';
                        schoolInfo += year;
                    }
                    
                    if (schoolInfo) {
                        pdf.setFont("helvetica", "italic");
                        pdf.text(schoolInfo, margin, yPos);
                        yPos += 6;
                    }
                    
                    // Achievements
                    if (achievements) {
                        pdf.setFont("helvetica", "normal");
                        const achievementLines = pdf.splitTextToSize(achievements, contentWidth);
                        pdf.text(achievementLines, margin, yPos);
                        yPos += (achievementLines.length * 6);
                    }
                    
                    yPos += 10;
                }
            }
            yPos += 5;
        }
        
        // Skills
        if (formData.technicalSkills || formData.softSkills) {
            pdf.setFontSize(14);
            pdf.setFont("helvetica", "bold");
            pdf.text("SKILLS", margin, yPos);
            yPos += 8;
            
            pdf.setFontSize(11);
            pdf.setFont("helvetica", "normal");
            
            let skillsText = '';
            if (formData.technicalSkills) {
                skillsText += 'Technical: ' + formData.technicalSkills.replace(/\n/g, ', ').replace(/[•*]/g, '') + '\n';
            }
            if (formData.softSkills) {
                skillsText += 'Soft Skills: ' + formData.softSkills.replace(/\n/g, ', ').replace(/[•*]/g, '') + '\n';
            }
            if (formData.languages) {
                skillsText += 'Languages: ' + formData.languages + '\n';
            }
            if (formData.certifications) {
                skillsText += 'Certifications: ' + formData.certifications.replace(/\n/g, ', ').replace(/[•*]/g, '');
            }
            
            if (skillsText) {
                const skillsLines = pdf.splitTextToSize(skillsText, contentWidth);
                pdf.text(skillsLines, margin, yPos);
            }
        }
        
        // Footer
        pdf.setFontSize(9);
        pdf.setTextColor(150, 150, 150);
        pdf.text("Created with 9to5 University Resume Builder", margin, 285);
        
        // Save PDF
        const fileName = `Resume_${(formData.fullName || 'Resume').replace(/\s+/g, '_')}.pdf`;
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
printBtn.addEventListener('click', () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
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
                        body { padding: 0; }
                    }
                </style>
            </head>
            <body>
                ${resumePreview.innerHTML}
                <script>
                    window.onload = function() {
                        window.print();
                        setTimeout(() => window.close(), 1000);
                    }
                <\/script>
            </body>
        </html>
    `);
    printWindow.document.close();
});

// Fullscreen Preview
fullscreenBtn.addEventListener('click', () => {
    const preview = document.querySelector('.resume-preview-container');
    if (!document.fullscreenElement) {
        if (preview.requestFullscreen) {
            preview.requestFullscreen();
        } else if (preview.webkitRequestFullscreen) {
            preview.webkitRequestFullscreen();
        } else if (preview.msRequestFullscreen) {
            preview.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
});

// Share Resume
shareBtn.addEventListener('click', () => {
    if (navigator.share) {
        navigator.share({
            title: 'My Professional Resume',
            text: 'Check out my professional resume created with 9to5 University',
            url: window.location.href
        });
    } else {
        // Fallback: Copy to clipboard
        const tempInput = document.createElement('input');
        tempInput.value = window.location.href;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        alert('Resume link copied to clipboard!');
    }
});

// Add Experience/Education
addExperienceBtn.addEventListener('click', () => {
    if (experienceCount < 3) {
        experienceCount++;
        alert('In a full implementation, this would add another experience field. For now, you can edit the existing fields.');
    } else {
        alert('Maximum 3 experience entries allowed in this demo.');
    }
});

addEducationBtn.addEventListener('click', () => {
    if (educationCount < 2) {
        educationCount++;
        alert('In a full implementation, this would add another education field. For now, you can edit the existing fields.');
    } else {
        alert('Maximum 2 education entries allowed in this demo.');
    }
});