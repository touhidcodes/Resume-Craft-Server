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
    'Passionate software developer with expertise in full-stack development and a keen eye for detail.',
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
  startDate: '2021-05-01T00:00:00.000Z',
  endDate: '2023-03-01T00:00:00.000Z',
  location: 'San Francisco, CA',
  responsibilities: 'Developed and maintained web applications using React.js and Redux.',
};
export const educationData = {
  institution: 'Tech University',
  degree: 'Bachelor of Computer Science',
  startDate: '2017-09-01T00:00:00.000Z',
  endDate: '2021-06-01T00:00:00.000Z',
  location: 'Boston, MA',
  description: 'Focused on software engineering and data structures.',
};
export const skillData = {
  category: 'Programming Languages',
  skills: ['JavaScript', 'Python', 'TypeScript'],
};
export const certificationData = {
  name: 'Certified React Developer',
  issuer: 'React Institute',
  issueDate: '2022-03-15T00:00:00.000Z',
  expirationDate: '2025-03-15T00:00:00.000Z',
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
  description: 'Awarded for outstanding contributions to the development team.',
};
