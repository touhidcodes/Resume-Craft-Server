# Resume-Craft-Server 🌟

Craft your future, one professional resume at a time with Resume Craft.


## Table of Contents 📖

- [About the Project](#about-the-project)
- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Team Overview](#team-overview)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## About the Project 📃

Resume Craft is your ultimate partner in building standout resumes effortlessly. This advanced yet user-friendly platform empowers individuals to create visually appealing, professional resumes tailored to their unique career aspirations. With an array of customizable templates and seamless functionality, Resume Craft transforms resume creation into a quick and enjoyable experience.

Designed for both users and admins, the platform integrates smart features that simplify every step of the process, from design to delivery. Whether you're a job seeker striving for that perfect first impression or an admin managing applications, Resume Craft ensures a hassle-free, efficient journey to success.


## Project Overview 📊

Summarize the project objectives, key metrics, and any relevant statistics.

- **Objective:** Build an advanced yet user-friendly online resume builder platform to empower individuals in creating professional, visually appealing resumes effortlessly.
- **Target Audience:** Job seekers, students, and professionals across diverse industries.
- **Key Metrics:**  
  - Resume Creation Time: <5 minutes
  - Template Customization Options: 5+
  - User Satisfaction Rate: 95%
  - Daily Active Users: 10+ 
- **Deployment:** Hosted on Vercel with a CI/CD pipeline.
  
 
## Tech Stack 🛠️

- **Frontend:** React.js, Next.js, TypeScript  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB, Prisma ORM  
- **Authentication:** Firebase, JWT  
- **Deployment:** Vercel  
## Installation ⚙️

Clone the repo and install dependencies:

```bash
git clone https://github.com/touhidcodes/Resume-Craft-Server.git
cd Resume-Craft-Server
npm install
```

Set up environment variables by creating a `.env` file in the root directory:

```env
DATABASE_URL=YOUR_DB_URL

PORT=YOUR_PORT
BCRYPT_SALT_ROUNDS=YOUR_BCRYPT_SALT
JWT_ACCESS_TOKEN=YOUR_JWT_ACCESS_TOKEN
JWT_REFRESH_TOKEN=YOUR_JWT_REFRESH_TOKEN
JWT_ACCESS_EXPIRES_IN=YOUR_JWT_ACCESS_EXPIRES_IN
JWT_REFRESH_EXPIRES_IN=YOUR_JWT_REFRESH_EXPIRES_IN
```

Run the application:

```bash
npm run dev
```
## Team Overview 👥

Our team is a passionate group of innovators dedicated to building Resume Craft, combining our unique skills to deliver a seamless resume-building experience. 

| Name            | Role                | Contributions                                        |  
|---------------------|--------------------------|------------------------------------------------------------|  
| Touhidur Zaman     | Team Leader & GitHub Manager | Led the team, managed GitHub repository, ensured project coordination. |  
| MD Rifat           | Co-Leader & Backend Developer | Designed and implemented backend APIs and system architecture. |  
| Imtiaz Tamim       | Backend Developer          | Contributed to API development and database management.     |  
| Emon Ahmed         | Frontend Developer         | Built responsive UI components and optimized frontend performance. |  
| Rakib Ahmed        | Frontend Developer         | Developed user-facing features and ensured cross-platform compatibility. |  
| Nur Muhammad       | Frontend Developer         | Implemented core frontend functionality and styled components. |  

## Contributing 🤝

Contributions are what make the open-source community an amazing place! 

### Steps to contribute:
  - Fork the Project
  - Create a branch (`git checkout -b feature/AmazingFeature`)
  - Commit changes (`git commit -m 'Add some AmazingFeature'`)
  - Push the branch (`git push origin feature/AmazingFeature`)
  - Open a Pull Request

## License 📜

Distributed under the MIT License. See `LICENSE.txt` for more information.


## Contact 📬

**🔗 Live URL:** [Resume Craft](https://resume-craft-nine.vercel.app/)
**🔗 Server URL:** [Resume Craft Server](https://resume-craft-api.vercel.app/)

Touhidur Zaman - [@touhidcodes](https://www.linkedin.com/in/touhidur-zaman/) - touhidcodes@gmail.com  

Project Link: [Resume Craft](https://github.com/touhidcodes/Resume-Craft)


# API Reference

## User Collection

### Register An User

```http
  Post /api/user/register
```
```
{   "userName":"rifat",
    "email":"rifat@gmail.com",
    "password":"123456"
}
```

### Register An User By Google

```http
  Post /api/user/register-google
```
```
{   "userName":"rifat",
    "email":"rifat@gmail.com",
    "password":"123456"
}
```

### Get An User

```http
  Get /api/user/profile
```
| Token | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `accessToken` | `string` | **Required**. User Access Token |

### Get All User

```http
  Get /api/user/all-profile
```
| Token | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `accessToken` | `string` | **Required**. Admin Access Token |

### Delete An User

```http
  Delete /api/user/delete/:id
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. User id |

| Token | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `accessToken` | `string` | **Required**.Admin Access Token|

### Make User Admin

```http
  Post /api/user/register-admin/:id
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. User id |

| Token | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `accessToken` | `string` | **Required**.Admin Access Token|


### Login An User

```http
  Post /api/auth/login
```
```
{   "identifier":"rifat",
    "password":"123456"
}
```

### Get Refresh Token For An User

```http
  Get /api/auth/refresh-token
```

### Change Password An User

```http
  Patch /api/auth/refresh-token
```

```
{  
     "email":"rifat@gmail.com",
    "oldPassword":"123456" ,
    "newPassword":"555555" 
}
```

| Token | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `accessToken` | `string` | **Required**.User Access Token|

## Resume Template Collection

### Create Template

```http
  Post /api/template/create-template
```

```
{  
     "image":"https://marketplace.canva.com/EAFszEvkM50/1/0/1131w/canva-simple-professional-cv-resume-J74DKa9D3nk.jpg",
    "name":"Apollo" ,
}
```

| Token | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `accessToken` | `string` | **Required**.Admin Access Token|

### Get All Template

```http
  Get /api/template/templates
```

### Get A Template

```http
  Get /api/template/template/:templateId
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `templateId` | `string` | **Required**. Template id |

### Delete A Template

```http
  Delete /api/template/remove-template/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Template id |

| Token | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `accessToken` | `string` | **Required**.Admin Access Token|

## Cover Letter Template Collection

### Create Cover Letter Template

```http
  Post /api/cover-letter-template/create-template
```

```
{  
     "image":"https://marketplace.canva.com/EAFszEvkM50/1/0/1131w/canva-simple-professional-cv-resume-J74DKa9D3nk.jpg",
    "name":"Apollo" ,
}
```

| Token | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `accessToken` | `string` | **Required**.Admin Access Token|

### Get All Cover Letter Template

```http
  Get /api/cover-letter-template/templates
```

### Get A Cover Letter Template

```http
  Get /api/cover-letter-template/template/:templateId
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `templateId` | `string` | **Required**. Cover Letter Template id |

### Delete A Cover Letter Template

```http
  Delete /api/cover-letter-template/remove-template/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Cover Letter Template id |

| Token | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `accessToken` | `string` | **Required**.Admin Access Token|

## Resume Collection

### Create Resume

```http
  Post /api/resume/create-resume
```

```
{  
     "templateId":"65s4df65sd4fsd65f4sd65f4",
    "name":"Apollo" ,
}
```

| Token | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `accessToken` | `string` | **Required**.User Access Token|

### Create Duplicate Resume

```http
  Post /api/resume/create-resume-duplicate/:resumeId
```

| Token | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `accessToken` | `string` | **Required**.User Access Token|

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `resumeId` | `string` | **Required**. Resume id |

### Get All Resume Of An User

```http
  Get /api/resume/resumes
```

| Token | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `accessToken` | `string` | **Required**.User Access Token|

### Get A Resume

```http
  Get /api/resume/resume/:resumeId
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `resumeId` | `string` | **Required**. Resume id |

### Update A Resume

```http
  Patch /api/resume/update-resume/:id
```
```
{
    {
    "personalInfo": {
        "fullName": "Md Rifat",
        "jobTitle": "Full-Stack Developer",
        "email": "rifat@example.com",
        "website": "https://protfolio-client.vercel.app/",
        "github": "https://github.com/Rifat7432",
        "phone": "+880 9999999999999",
        "linkedin": "https://www.linkedin.com/in/md-rifat-taluckdar/",
        "location": "USA NY New York 123 Main St 10001"
    },
    "profileSummary": "I am a passionate software developer with expertise in full-stack development and a keen eye for detail.",
    "design": {
        "font": "Roboto",
        "sectionStyles": {
            "header": {
                "fontSize": "20px"
            },
            "titles": {
                "fontSize": "14px",
                "color": "#44444"
            }
        }
    },
    "hobby": [
        "Reading",
        "Gaming"
    ],
    "language": [
        {
            "name": "English",
            "proficiency": "Comfortable"
        },
        {
            "name": "Bangla",
            "proficiency": "Native"
        }
    ]
}
}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Resume id |

| Token | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `accessToken` | `string` | **Required**.User Access Token|

### Delete A Resume

```http
  Delete /api/resume/delete-resume/:resumeId
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `resumeId` | `string` | **Required**. Resume id |

| Token | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `accessToken` | `string` | **Required**.User Access Token|

## Cover Letter Collection

### Create Cover Letter

```http
  Post /api/cover-letter/create-cover-letter
```

```
{  
     "templateId":"65s4df65sd4fsd65f4sd65f4",
    "name":"Apollo" ,
}
```

| Token | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `accessToken` | `string` | **Required**.User Access Token|

### Create Duplicate Cover Letter

```http
  Post /api/cover-letter/create-cover-letter-duplicate/:coverLetterId
```

| Token | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `accessToken` | `string` | **Required**.User Access Token|

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `coverLetterId` | `string` | **Required**. Cover Letter id |

### Get All Cover Letter Of An User

```http
  Get /api/cover-letter/cover-letters
```

| Token | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `accessToken` | `string` | **Required**.User Access Token|

### Get A Cover Letter

```http
  Get /api/cover-letter/:coverLetterId
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `coverLetterId` | `string` | **Required**. Cover Letter id |

### Update A Cover Letter

```http
  Patch /api/cover-letter/update-cover-letter/:id
```
```
{
   {
  "personalInfo": {
    "fullName": "John Doe",
    "jobTitle": "Software Developer",
    "email": "johndoe@example.com",
    "phone": "+123456789",
    "website": "https://www.linkedin.com",
    "linkedin": "https://www.linkedin.com/in/md-rifat-taluckdar/",
    "github": "https://www.linkedin.com/in/md-rifat-taluckdar/",
    "location": "USA NY New York 123 Main St 10001"
  },
  "body": `
    <p>Dear [Hiring Manager or Company],</p>
    <p>
      It is with great pleasure that I am applying for the Professional Sales
      position at [Company]. As a recent graduate of XYZ University, not only
      did I maintain excellent grades, but I was also a Captain of the Hockey
      team that won more games than any team in the past twelve years.
    </p>
    <p>
      My background has required me to be a strong manager of my time to
      balance school and athletics, which I am confident, will be a quality
      that will be important in this position. My years of working in a team
      environment, my strong competitive nature, as well as my success in
      leadership, are also qualities that I bring to my career.
    </p>
    <p>
      As a chosen team leader, I had to listen, motivate, think creatively,
      and delegate so together my teammates and I could achieve success. I
      have proven that I am passionate about what I do as well as dedicated.
      My goal is to join a company where there is growth potential, so I am
      sure I can fulfill that need of yours. My personality and competitive
      nature have made me realize that my skills will be beneficial in dealing
      with clients in sales.
    </p>
    <p>
      I am extremely passionate about the work in this profession and would be
      ecstatic to share my skills and experiences with your exceptional team.
      I appreciate your time and consideration and look forward to speaking
      with you soon.
    </p>`,
  "closing": "Thank you for considering my application. I look forward to the possibility of discussing how I can contribute to your team. Please feel free to contact me at your convenience.\n\nBest regards,\nJane Doe",
  "recipient": {
    "name": "John Smith",
    "email": "john.smith@techcorp.com",
    "position": "Hiring Manager",
    "companyName": "TechCorp Solutions",
    "companyEmail": "contact@techcorp.com",
    "companyWebsite": "https://techcorp.com",
    "address": "456 Innovation Drive, Metropolis, USA"
  },
  "date": "2024-12-07"
}

}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Cover Letter id |

| Token | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `accessToken` | `string` | **Required**.User Access Token|

### Delete A Cover Letter

```http
  Delete /api/cover-letter/delete-cover-letter/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Cover Letter id |

| Token | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `accessToken` | `string` | **Required**.User Access Token|

## Work WorkExperience Collection

### Create Work WorkExperience

```http
  Post /api/resume/work-experience/create-experience
```
```json
{
    "resumeId": "674c43f7cbbfa5adea1cbca2",
    "companyName": "TechCorp",
    "jobTitle": "Frontend Developer",
    "startDate": "2021-05-01T00:00:00.000Z",
    "endDate": "2023-03-01T00:00:00.000Z",
    "location": "San Francisco, CA",
    "responsibilities": "Developed and maintained web applications using React.js and Redux."
}
```
### Update Work WorkExperience

```http
  Patch /api/resume/work-experience/update-experience/:id
```
```json
{
    "companyName": "TechCorp",
    "jobTitle": "Frontend Developer",
    "startDate": "2021-05-01T00:00:00.000Z",
    "endDate": "2023-03-01T00:00:00.000Z",
    "location": "San Francisco, CA",
    "responsibilities": "Developed and maintained web applications using React.js and Redux."
}
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Work Experience id |

### Get A Work WorkExperience

```http
  Get /api/resume/work-experience/experience/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Work Experience id |

### Get All Work WorkExperience Of A Resume

```http
  Get /api/resume/work-experience/all-experience/:resumeId
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `resumeId` | `string` | **Required**. Resume id |

### Delete A Work WorkExperience Of A Resume

```http
  Delete /api/resume/work-experience/remove-experience/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Work Experience id |


## Education Collection

### Create Education

```http
  Post /api/resume/education/create-education
```
```json
{
  "resumeId": "674c43f7cbbfa5adea1cbca2",
  "institution": "Tech University",
  "degree": "Bachelor of Computer Science",
  "startDate": "05/2016",
  "endDate": "10/2018",
  "location": "Boston, MA",
  "description": "<p>Graduated with honors. Relevant coursework: Data Structures, Algorithms, Web Development, and Database Systems.</p>"
}

```
### Update Education

```http
  Patch /api/resume/education/update-education/:id
```
```json
{
  "institution": "Tech University",
  "degree": "Bachelor of Computer Science",
  "startDate": "05/2016",
  "endDate": "10/2018",
  "location": "Boston, MA",
  "description": "<p>Graduated with honors. Relevant coursework: Data Structures, Algorithms, Web Development, and Database Systems.</p>"
}

```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Education id |

### Get A Education

```http
  Get /api/resume/education/education/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Education id |

### Get All Education Of A Resume

```http
  Get /api/resume/education/all-education/:resumeId
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `resumeId` | `string` | **Required**. Resume id |

### Delete A Education Of A Resume

```http
  Delete /api/resume/education/remove-education/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Education id |


## Certification Collection

### Create Certification

```http
  Post /api/resume/certification/create-certification
```
```json
{
  "resumeId": "674c43f7cbbfa5adea1cbca2",
  "name": "Certified React Developer",
  "issuer": "React Institute",
  "issueDate": "05/2019",
  "expirationDate": "12/2022",
  "certificateLink": "12345-ABCDE"
}

```
### Update Certification

```http
  Patch /api/resume/certification/update-certification/:id
```
```json
{
  "name": "Certified React Developer",
  "issuer": "React Institute",
  "issueDate": "05/2019",
  "expirationDate": "12/2022",
  "certificateLink": "12345-ABCDE"
}

```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Certification id |

### Get A Certification

```http
  Get /api/resume/certification/certification/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Certification id |

### Get All Certification Of A Resume

```http
  Get /api/resume/certification/all-certification/:resumeId
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `resumeId` | `string` | **Required**. Resume id |

### Delete A Certification Of A Resume

```http
  Delete /api/resume/certification/remove-certification/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Certification id |


## Skill Collection

### Create Skill

```http
  Post /api/resume/skill/create-skill
```
```json
{
  "resumeId": "674c43f7cbbfa5adea1cbca2",
  "category": "Programming Languages",
  "skills": ["JavaScript", "Python", "TypeScript"]
}

```
### Update Skill

```http
  Patch /api/resume/skill/update-skill/:id
```
```json
{
  "category": "Programming Languages",
  "skills": ["JavaScript", "Python", "TypeScript"]
}
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Skill id |

### Get A Skill

```http
  Get /api/resume/skill/skill/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Skill id |

### Get All Skill Of A Resume

```http
  Get /api/resume/skill/all-skill/:resumeId
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `resumeId` | `string` | **Required**. Resume id |

### Delete A Skill Of A Resume

```http
  Delete /api/resume/skill/remove-skill/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Skill id |


## Award Collection

### Create Award

```http
  Post /api/resume/award/create-award
```
```json
{
  "resumeId": "674c43f7cbbfa5adea1cbca2",
  "name": "Best Developer Award",
  "organization": "Tech Association",
  "year": 2023,
  "description": "<p>Awarded for outstanding contributions to the development team.</p>"
}

```
### Update Award

```http
  Patch /api/resume/award/update-award/:id
```
```json
{
  "name": "Best Developer Award",
  "organization": "Tech Association",
  "year": 2023,
  "description": "<p>Awarded for outstanding contributions to the development team.</p>"
}

```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Award id |

### Get A Award

```http
  Get /api/resume/award/award/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Award id |

### Get All Award Of A Resume

```http
  Get /api/resume/award/all-award/:resumeId
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `resumeId` | `string` | **Required**. Resume id |

### Delete A Award Of A Resume

```http
  Delete /api/resume/award/remove-award/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Award id |


## Project Collection

### Create Project

```http
  Post /api/resume/project/create-project
```
```json
{
  "resumeId": "674c43f7cbbfa5adea1cbca2",
  "name": "Portfolio Website",
  "description": "A personal portfolio showcasing my skills and projects.",
  "technologies": ["React.js", "Next.js", "TailwindCSS"],
  "role": "Full-Stack Developer",
  "link": "https://www.johndoe.dev"
}

```
### Update Project

```http
  Patch /api/resume/project/update-project/:id
```
```json
{
  "name": "Portfolio Website",
  "description": "A personal portfolio showcasing my skills and projects.",
  "technologies": ["React.js", "Next.js", "TailwindCSS"],
  "role": "Full-Stack Developer",
  "link": "https://www.johndoe.dev"
}

```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Project id |

### Get A Project

```http
  Get /api/resume/project/project/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Project id |

### Get All Project Of A Resume

```http
  Get /api/resume/project/all-project/:resumeId
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `resumeId` | `string` | **Required**. Resume id |

### Delete A Project Of A Resume

```http
  Delete /api/resume/project/remove-project/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Project id |

## Admin dashboard Analytics API

```http
  Get /api/analytics/admin-dashboard-data
```
| Token | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `accessToken` | `string` | **Required**. Admin Access Token |