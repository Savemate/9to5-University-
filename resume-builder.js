// Resume Builder JavaScript - FIXED VERSION

// DOM Elements with error handling
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

// Enhanced form validation
const formValidation = {
    requiredFields: ['fullName', 'jobTitle', 'email', 'phone'],
    
    validateEmail: (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    validatePhone: (phone) => {
        const re = /^[\d\s\- $$\+]+$/;
        return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
    },
    
    validateField: (field) => {
        const value = field.value.trim();
        const fieldName = field.id || field.name;
        
        // Remove previous error states
        field.classList.remove('error', 'success');
        const errorMsg = field.parentElement.querySelector('.error-message');
        if (errorMsg) errorMsg.remove();
        
        // Required field validation
        if (formValidation.requiredFields.includes(fieldName) && !value) {
            formValidation.showError(field, 'This field is required');
            return false;
        }
        
        // Email validation
        if (fieldName === 'email' && value && !formValidation.validateEmail(value)) {
            formValidation.showError(field, 'Please enter a valid email address');
            return false;
        }
        
        // Phone validation
        if (fieldName === 'phone' && value && !formValidation.validatePhone(value)) {
            formValidation.showError(field, 'Please enter a valid phone number');
            return false;
        }
        
        // Success state
        if (value) {
            field.classList.add('success');
        }
        
        return true;
    },
    
    showError: (field, message) => {
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = 'color: #e74c3c; font-size: 12px; margin-top: 5px;';
        field.parentElement.appendChild(errorDiv);
    }
};

// Add validation styles
const validationCSS = `
.form-group input.error,
.form-group textarea.error {
    border-color: #e74c3c !important;
    box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1) !important;
}

.form-group input.success,
.form-group textarea.success {
    border-color: #27ae60 !important;
    box-shadow: 0 0 0 3px rgba(39, 174, 96, 0.1) !important;
}

.error-message {
    animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}
`;

// Add validation styles
const style = document.createElement('style');
style.textContent = validationCSS;
document.head.appendChild(style);

// Example Data (unchanged)
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

// Enhanced Resume Preview Generation
function updateResumePreview() {
    try {
        // Validate required fields first
        const requiredFields = ['fullName', 'jobTitle', 'email', 'phone'];
        let isValid = true;
        
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field && !formValidation.validateField(field)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            resumePreview.innerHTML = '<div style="text-align: center; padding: 40px; color: #e74c3c;"><i class="fas fa-exclamation-triangle" style="font-size: 48px; margin-bottom: 20px;"></i><p>Please fill in all required fields correctly to preview your resume.</p></div>';
            return;
        }
        
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
        let resumeHTML = generateResumeHTML(currentTemplate, {
            fullName, jobTitle, summary, email, phone, address, experience, education, skills
        });
        
        resumePreview.innerHTML = resumeHTML;
        
    } catch (error) {
        console.error('Error generating resume preview:', error);
        resumePreview.innerHTML = '<div style="text-align: center; padding: 40px; color: #e74c3c;"><i class="fas fa-exclamation-triangle" style="font-size: 48px; margin-bottom: 20px;"></i><p>Error generating resume preview. Please check your input and try again.</p></div>';
    }
}

// Separate HTML generation function for better maintainability
function generateResumeHTML(template, data) {
    const { fullName, jobTitle, summary, email, phone, address, experience, education, skills } = data;
    
    switch(template) {
        case '1': // Classic Professional
            return `
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
            
        case '2': // Modern Executive
            return `
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
            
        default:
            return '<div style="text-align: center; padding: 40px;">Template not found</div>';
    }
}

// Enhanced text formatting
function formatText(text) {
    if (!text) return '';
    
    return text
        .split('\n')
        .map(line => {
            const trimmedLine = line.trim();
            if (!trimmedLine) return '<br>';
            
            if (trimmedLine.startsWith('•')) {
                return `<p style="margin-bottom: 8px; padding-left: 20px; text-indent: -20px; position: relative;">
                    <span style="position: absolute; left: 0; color: var(--secondary-gold);">•</span>
                    ${trimmedLine.substring(1).trim()}
                </p>`;
            }
            
            if (trimmedLine.includes(':')) {
                const parts = trimmedLine.split(':');
                return `<p style="margin-bottom: 10px;"><strong style="color: var(--primary-navy);">${parts[0]}:</strong>${parts.slice(1).join(':')}</p>`;
            }
            
            return `<p style="margin-bottom: 10px;">${trimmedLine}</p>`;
        })
        .join('');
}

// Enhanced template selection
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

// Enhanced example loading
function loadExample(exampleName) {
    try {
        const example = examples[exampleName];
        if (!example) {
            throw new Error(`Example '${exampleName}' not found`);
        }
        
        // Show loading state
        const originalHTML = loadExampleBtn.innerHTML;
        loadExampleBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        loadExampleBtn.disabled = true;
        
        // Simulate loading delay for better UX
        setTimeout(() => {
            // Populate form fields
            Object.keys(example).forEach(key => {
                const field = document.getElementById(key);
                if (field) {
                    field.value = example[key];
                    // Trigger validation
                    formValidation.validateField(field);
                }
            });
            
            // Switch to appropriate template
            if (exampleName === 'tshedimosho') {
                templates.forEach(t => t.classList.remove('active'));
                document.querySelector('.template[data-template="5"]').classList.add('active');
                currentTemplate = '5';
            }
            
            updateResumePreview();
            
            // Restore button state
            loadExampleBtn.innerHTML = originalHTML;
            loadExampleBtn.disabled = false;
            
            // Show success message
            showNotification('Example loaded successfully! Customize the information to match your experience.', 'success');
        }, 1000);
        
    } catch (error) {
        console.error('Error loading example:', error);
        showNotification('Error loading example. Please try again.', 'error');
        loadExampleBtn.innerHTML = '<i class="fas fa-file-import"></i> Load Example';
        loadExampleBtn.disabled = false;
    }
}

// Enhanced form validation on input
if (resumeForm) {
    // Add real-time validation
    const formFields = resumeForm.querySelectorAll('input, textarea');
    formFields.forEach(field => {
        field.addEventListener('blur', () => {
            formValidation.validateField(field);
        });
        
        field.addEventListener('input', () => {
            // Clear error on input
            if (field.classList.contains('error')) {
                formValidation.validateField(field);
            }
        });
    });
    
    // Form submission handling
    resumeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        formFields.forEach(field => {
            if (!formValidation.validateField(field)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            updateResumePreview();
            showNotification('Resume updated successfully!', 'success');
        } else {
            showNotification('Please fix the errors in the form.', 'error');
        }
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
    
    // Manual close
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
}

// Enhanced PDF download with better error handling
downloadBtn.addEventListener('click', async () => {
    // Validate form first
    const requiredFields = ['fullName', 'jobTitle', 'email', 'phone'];
    let isValid = true;
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field && !formValidation.validateField(field)) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        showNotification('Please fill in all required fields correctly before downloading.', 'error');
        return;
    }
    
    downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating PDF...';
    downloadBtn.disabled = true;
    
    try {
        // Check if jsPDF is available
        if (typeof window.jspdf === 'undefined') {
            throw new Error('PDF generation library not loaded. Please check your internet connection.');
        }
        
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
            compress: true
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
        
        // Enhanced PDF generation with better formatting
        generatePDF(pdf, {
            fullName, jobTitle, summary, email, phone, address, experience, education, skills
        });
        
        // Save PDF
        const fileName = `Resume_${fullName.replace(/\s+/g, '_')}.pdf`;
        pdf.save(fileName);
        
        showNotification('Resume downloaded successfully!', 'success');
        
    } catch (error) {
        console.error('Error generating PDF:', error);
        showNotification(`Error generating PDF: ${error.message}. Please try again or contact support.`, 'error');
    } finally {
        downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download as PDF';
        downloadBtn.disabled = false;
    }
});

// Enhanced PDF generation function
function generatePDF(pdf, data) {
    const { fullName, jobTitle, summary, email, phone, address, experience, education, skills } = data;
    
    // Set margins and dimensions
    const margin = 20;
    let yPos = margin;
    const pageWidth = 210;
    const contentWidth = pageWidth - (margin * 2);
    
    // Set font
    pdf.setFont("helvetica");
    
    // Header with better formatting
    pdf.setFontSize(24);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(10, 26, 61);
    pdf.text(fullName.toUpperCase(), margin, yPos);
    yPos += 10;
    
    pdf.setFontSize(16);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(0, 168, 168);
    pdf.text(jobTitle, margin, yPos);
    yPos += 10;
    
    // Contact info with icons
    pdf.setFontSize(11);
    pdf.setTextColor(100, 100, 100);
    const contactItems = [];
    if (email) contactItems.push(`📧 ${email}`);
    if (phone) contactItems.push(`📞 ${phone}`);
    if (address) contactItems.push(`📍 ${address}`);
    
    contactItems.forEach((item, index) => {
        pdf.text(item, margin, yPos);
        yPos += 6;
    });
    yPos += 10;
    
    // Line separator
    pdf.setDrawColor(201, 169, 110);
    pdf.setLineWidth(0.5);
    pdf.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 15;
    
    // Sections with better formatting
    const sections = [
        { title: 'PROFESSIONAL SUMMARY', content: summary },
        { title: 'WORK EXPERIENCE', content: experience },
        { title: 'EDUCATION', content: education },
        { title: 'SKILLS', content: skills }
    ];
    
    sections.forEach(section => {
        if (section.content && section.content.trim() !== 'No ' + section.title.toLowerCase() + ' provided') {
            // Section title
            pdf.setFontSize(14);
            pdf.setFont("helvetica", "bold");
            pdf.setTextColor(10, 26, 61);
            pdf.text(section.title, margin, yPos);
            yPos += 8;
            
            // Section content
            pdf.setFontSize(11);
            pdf.setFont("helvetica", "normal");
            pdf.setTextColor(0, 0, 0);
            
            const lines = pdf.splitTextToSize(section.content, contentWidth);
            lines.forEach(line => {
                if (yPos > 280) { // Check for page break
                    pdf.addPage();
                    yPos = margin;
                }
                pdf.text(line, margin, yPos);
                yPos += 6;
            });
            yPos += 10;
        }
    });
    
    // Footer
    pdf.setFontSize(9);
    pdf.setTextColor(150, 150, 150);
    pdf.text("Created with 9to5 University Resume Builder", margin, 285);
}

// Enhanced Print functionality
if (printBtn) {
    printBtn.addEventListener('click', () => {
        try {
            const printContent = resumePreview.innerHTML;
            const printWindow = window.open('', '_blank', 'width=800,height=600');
            
            printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Print Resume - ${document.getElementById('fullName').value || 'Resume'}</title>
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
                            @page { margin: 1cm; size: A4; }
                            body { margin: 0; }
                            .no-print { display: none; }
                        }
                        @media screen {
                            body { background: #f5f5f5; }
                        }
                    </style>
                </head>
                <body>
                    ${printContent}
                    <div class="no-print" style="text-align: center; margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 5px;">
                        <p>This resume was generated by 9to5 University Resume Builder</p>
                        <button onclick="window.print()" style="background: #0066cc; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Print Resume</button>
                        <button onclick="window.close()" style="background: #6c757d; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-left: 10px;">Close</button>
                    </div>
                    <script>
                        window.onafterprint = function() {
                            setTimeout(() => window.close(), 1000);
                        };
                        // Auto-print after a short delay to ensure styles are loaded
                        setTimeout(() => window.print(), 500);
                    <\/script>
                </body>
                </html>
            `);
            printWindow.document.close();
            
        } catch (error) {
            console.error('Print error:', error);
            showNotification('Error opening print window. Please try again.', 'error');
        }
    });
}

// Enhanced Refresh functionality
if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
        refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        refreshBtn.disabled = true;
        
        setTimeout(() => {
            updateResumePreview();
            refreshBtn.innerHTML = '<i class="fas fa-sync-alt"></i>';
            refreshBtn.disabled = false;
            showNotification('Preview refreshed!', 'success');
        }, 500);
    });
}

// Enhanced Share functionality
if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
        try {
            const fullName = document.getElementById('fullName').value || 'Resume';
            const shareData = {
                title: `${fullName}'s Professional Resume`,
                text: `Check out my professional resume created with 9to5 University Resume Builder`,
                url: window.location.href,
            };
            
            if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
                await navigator.share(shareData);
                showNotification('Resume shared successfully!', 'success');
            } else {
                // Fallback: Copy to clipboard
                await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
                showNotification('Resume link copied to clipboard!', 'success');
            }
        } catch (error) {
            console.error('Share error:', error);
            // Final fallback
            const textArea = document.createElement('textarea');
            textArea.value = window.location.href;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showNotification('Resume link copied to clipboard!', 'success');
        }
    });
}

// Initialize on page load with error handling
document.addEventListener('DOMContentLoaded', () => {
    try {
        updateResumePreview();
        
        // Add keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + P for print
            if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
                e.preventDefault();
                if (printBtn) printBtn.click();
            }
            // Ctrl/Cmd + S for download
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                if (downloadBtn) downloadBtn.click();
            }
        });
        
    } catch (error) {
        console.error('Initialization error:', error);
        showNotification('Error initializing resume builder. Please refresh the page.', 'error');
    }
});

// Add CSS animations
const animationCSS = `
@keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

.notification {
    animation: slideInRight 0.3s ease-out;
}

.notification-close {
    background: none;
    border: none;
    color: white;
    font-size: 18px;
    cursor: pointer;
    margin-left: auto;
    padding: 0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background 0.2s;
}

.notification-close:hover {
    background: rgba(255,255,255,0.2);
}
`;

// Add animation styles
const animStyle = document.createElement('style');
animStyle.textContent = animationCSS;
document.head.appendChild(animStyle);
