export const resumeData = {
  personalInfo: {
    fullName: 'John Doe',
    jobTitle: 'Software Developer',
    email: 'johndoe@example.com',
    phone: '+123456789',
    website: 'https://www.linkedin.com',
    linkedin: 'https://www.linkedin.com/in/md-rifat-taluckdar/',
    github: 'https://www.linkedin.com/in/md-rifat-taluckdar/',
    location: 'USA NY New York 123 Main St 10001',
  },
  profileSummary:
    '<p>A passionate software engineer with 5+ years of experience in building high-quality web applications. Skilled in JavaScript, TypeScript, React, and Node.js. Strong problem-solving skills and a passion for clean code.</p>',
  design: {
    font: 'Arial',
    themeColor: '#4CAF50',
    backgroundColor: '#FFFFFF',
    sectionStyles: {
      header: {
        fontSize: '24px',
        color: '#333333',
      },
      titles: {
        fontSize: '20px',
        color: '#4CAF50',
      },
    },
  },
  hobby: ['Reading', 'Hiking', 'Gaming'],
  language: [
    {
      name: 'English',
      proficiency: 'Fluent',
    },
  ],
  allSection: [
    { name: 'Summary', isActive: true },
    { name: 'Experience', isActive: true },
    { name: 'Skills', isActive: true },
    { name: 'Education', isActive: true },
    { name: 'Language', isActive: true },
    { name: 'Certificate', isActive: false },
    { name: 'Awards', isActive: false },
    { name: 'Hobby', isActive: false },
  ],
};

export const workExperienceData = {
  companyName: 'TechCorp',
  jobTitle: 'Frontend Developer',
  startDate: '06/2022',
  endDate: '11/2023',
  location: 'San Francisco, CA',
  responsibilities: `<ul><li>Developed and maintained the front-end of the company's main product using React and Redux.</li><li>Collaborated with the design team to ensure a seamless user experience.</li><li>Optimized web pages for performance, ensuring fast load times.</li></ul>`,
};
export const educationData = {
  institution: 'Tech University',
  degree: 'Bachelor of Computer Science',
  startDate: '05/2016',
  endDate: '10/2018',
  location: 'Boston, MA',
  description: `<p>Graduated with honors. Relevant coursework: Data Structures, Algorithms, Web Development, and Database Systems.</p>`,
};
export const skillData = {
  category: 'Programming Languages',
  skills: ['JavaScript', 'Python', 'TypeScript'],
};
export const certificationData = {
  name: 'Certified React Developer',
  issuer: 'React Institute',
  issueDate: '05/2019',
  expirationDate: '12/2022',
  certificateLink: '12345-ABCDE',
};
export const projectData = {
  name: 'Portfolio Website',
  description: 'A personal portfolio showcasing my skills and projects.',
  technologies: ['React.js', 'Next.js', 'TailwindCSS'],
  role: 'Full-Stack Developer',
  link: 'https://www.johndoe.dev',
};
export const awardData = {
  name: 'Best Developer Award',
  organization: 'Tech Association',
  year: 2023,
  description: `<p>Awarded for outstanding contributions to the development team.</p>`,
};
