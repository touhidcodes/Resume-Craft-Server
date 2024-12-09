/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Award,
  Certification,
  Education,
  Project,
  Resume,
  Skill,
  WorkExperience,
} from '@prisma/client';
import { prisma } from '../../../app';
import { JwtPayload } from 'jsonwebtoken';
import {
  awardData,
  certificationData,
  educationData,
  projectData,
  resumeData,
  skillData,
  workExperienceData,
} from './resume.demoData';

export const createResumeIntoDB = async (
  {
    resumeData,
    workExperienceData,
    educationData,
    skillData,
    certificationData,
    projectData,
    awardData,
  }: {
    resumeData: Resume;
    workExperienceData: WorkExperience;
    educationData: Education;
    skillData: Skill;
    certificationData: Certification;
    projectData: Project;
    awardData: Award;
  },
  decodeToken: JwtPayload
) => {
  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.findUniqueOrThrow({
      where: { id: decodeToken.userId },
    });
    await transactionClient.template.findUniqueOrThrow({
      where: { id: resumeData.templateId, isDeleted: false },
    });
    const createdResume = await transactionClient.resume.create({
      data: { ...resumeData, userId: decodeToken.userId },
    });
    const resumeId = createdResume.id;
    await transactionClient.workExperience.create({
      data: { ...workExperienceData, resumeId },
    });
    await transactionClient.education.create({
      data: { ...educationData, resumeId },
    });
    await transactionClient.skill.create({
      data: { ...skillData, resumeId },
    });
    await transactionClient.certification.create({
      data: { ...certificationData, resumeId },
    });
    await transactionClient.project.create({
      data: { ...projectData, resumeId },
    });
    await transactionClient.award.create({
      data: { ...awardData, resumeId },
    });
    const fullResumeData = await transactionClient.resume.findUniqueOrThrow({
      where: {
        id: resumeId,
      },
      include: {
        WorkExperience: true,
        Education: true,
        Skill: true,
        Project: true,
        Certification: true,
        Award: true,
      },
    });
    return fullResumeData;
  });

  return result;
};
const createDuplicateResumeIntoDB = async (
  oldResumeId: string,
  userId: string
) => {
  const resume = await prisma.resume.findUniqueOrThrow({
    where: {
      id: oldResumeId,
      userId,
    },
    include: {
      WorkExperience: true,
      Education: true,
      Skill: true,
      Project: true,
      Certification: true,
      Award: true,
    },
  });
  const {
    WorkExperience,
    Education,
    Skill,
    Project,
    Certification,
    Award,
    id,
    createdAt,
    updatedAt,
    ...resumeData
  } = resume;
  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.findUniqueOrThrow({
      where: { id: userId },
    });
    await transactionClient.template.findUniqueOrThrow({
      where: { id: resumeData.templateId, isDeleted: false },
    });
    const createdResume = await transactionClient.resume.create({
      data: { ...resumeData },
    });
    const newResumeId = createdResume.id;
    Promise.all(
      WorkExperience.map(
        async ({
          id,
          resumeId,
          createdAt,
          updatedAt,
          ...workExperienceData
        }) => {
          await transactionClient.workExperience.create({
            data: { ...workExperienceData, resumeId: newResumeId },
          });
        }
      )
    );
    Promise.all(
      Education.map(
        async ({ id, resumeId, createdAt, updatedAt, ...educationData }) => {
          await transactionClient.education.create({
            data: { ...educationData, resumeId: newResumeId },
          });
        }
      )
    );
    Promise.all(
      Skill.map(
        async ({ id, resumeId, createdAt, updatedAt, ...skillData }) => {
          await transactionClient.skill.create({
            data: { ...skillData, resumeId: newResumeId },
          });
        }
      )
    );
    Promise.all(
      Project.map(
        async ({ id, resumeId, createdAt, updatedAt, ...projectData }) => {
          await transactionClient.project.create({
            data: { ...projectData, resumeId: newResumeId },
          });
        }
      )
    );
    Promise.all(
      Certification.map(
        async ({
          id,
          resumeId,
          createdAt,
          updatedAt,
          ...certificationData
        }) => {
          await transactionClient.certification.create({
            data: { ...certificationData, resumeId: newResumeId },
          });
        }
      )
    );
    Promise.all(
      Award.map(
        async ({ id, resumeId, createdAt, updatedAt, ...awardData }) => {
          await transactionClient.award.create({
            data: { ...awardData, resumeId: newResumeId },
          });
        }
      )
    );

    const fullResumeData = await transactionClient.resume.findUniqueOrThrow({
      where: {
        id: newResumeId,
      },
      include: {
        WorkExperience: true,
        Education: true,
        Skill: true,
        Project: true,
        Certification: true,
        Award: true,
      },
    });
    return fullResumeData;
  });

  return result;
};
const geAllUserResumeFromDB = async (userId: string) => {
  const result = await prisma.resume.findMany({
    where: {
      userId,
    },
    include: {
      template: true,
      WorkExperience: true,
      Education: true,
      Skill: true,
      Project: true,
      Certification: true,
      Award: true,
    },
  });
  return result;
};

const updateResumeIntoDB = async (
  id: string,
  resumeUpdateData: Partial<Resume>
) => {
  const resumeData = await prisma.resume.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const { design, personalInfo, templateId, ...remainingResumeData } =
    resumeUpdateData;
  if (templateId) {
    await prisma.template.findUniqueOrThrow({ where: { id: templateId } });
  }

  const modifiedUpdatedData = {
    ...remainingResumeData,
    templateId,
    personalInfo: resumeData.personalInfo,
    design: resumeData.design,
  };

  if (personalInfo && Object.keys(personalInfo).length) {
    for (const [key, value] of Object.entries(personalInfo)) {
      modifiedUpdatedData.personalInfo[`${key as keyof typeof personalInfo}`] =
        value;
    }
  }
  if (design && Object.keys(design).length) {
    const { sectionStyles, ...remainingDesignData } = design;

    for (const [key, value] of Object.entries(remainingDesignData)) {
      modifiedUpdatedData.design[`${key as keyof typeof remainingDesignData}`] =
        value;
    }
    if (sectionStyles && Object.keys(sectionStyles).length) {
      const { header, titles } = sectionStyles;
      if (header && Object.keys(header).length) {
        for (const [key, value] of Object.entries(header)) {
          modifiedUpdatedData.design.sectionStyles.header[
            `${key as keyof typeof header}`
          ] = value;
        }
      }
      if (titles && Object.keys(titles).length) {
        for (const [key, value] of Object.entries(titles)) {
          modifiedUpdatedData.design.sectionStyles.titles[
            `${key as keyof typeof titles}`
          ] = value;
        }
      }
    }
  }

  const result = await prisma.resume.update({
    where: { id },
    data: modifiedUpdatedData,
  });
  return result;
};
const deleteUserResumeFromDB = async (resumeId: string, userId: string) => {
  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.resume.findUniqueOrThrow({
      where: {
        userId,
        id: resumeId,
      },
    });

    await transactionClient.workExperience.deleteMany({ where: { resumeId } });
    await transactionClient.education.deleteMany({ where: { resumeId } });
    await transactionClient.skill.deleteMany({ where: { resumeId } });
    await transactionClient.certification.deleteMany({ where: { resumeId } });
    await transactionClient.project.deleteMany({ where: { resumeId } });
    await transactionClient.award.deleteMany({ where: { resumeId } });
    const deleteResume = await transactionClient.resume.delete({
      where: {
        id: resumeId,
      },
    });
    return deleteResume;
  });

  return result;
};
const resumeSectionCompletionStatusFromDB = async (id: string) => {
  const resume = await prisma.resume.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      WorkExperience: true,
      Education: true,
      Skill: true,
      Project: true,
      Certification: true,
      Award: true,
    },
  });
  let Header = false;
  let Summary = false;
  let Experience = false;
  let Education = false;
  let Skills = false;
  let Certificate = false;
  let Projects = false;
  let Awards = false;
  let Language = false;
  let Hobby = false;

  if (resume.WorkExperience.length > 0) {
    resume.WorkExperience.map(
      ({ companyName, jobTitle, location, startDate, responsibilities }) => {
        if (
          companyName === workExperienceData.companyName ||
          jobTitle === workExperienceData.jobTitle ||
          location === workExperienceData.location ||
          responsibilities === workExperienceData.responsibilities
        ) {
          Experience = false;
        } else if (
          companyName === null ||
          jobTitle === null ||
          location === null ||
          startDate === null
        ) {
          Experience = false;
        } else {
          Experience = true;
        }
      }
    );
  }
  if (resume.Award.length > 0) {
    resume.Award.map(({ name, organization, year, description }) => {
      if (
        name === awardData.name ||
        organization === awardData.organization ||
        year === awardData.year ||
        description === awardData.description
      ) {
        Awards = false;
      } else if (name === null || organization === null || year === null) {
        Awards = false;
      } else {
        Awards = true;
      }
    });
  }
  if (resume.Certification.length > 0) {
    resume.Certification.map(({ name, certificateLink, issueDate, issuer }) => {
      if (
        name === certificationData.name ||
        issuer === certificationData.issuer ||
        issueDate === certificationData.issueDate ||
        certificateLink === certificationData.certificateLink
      ) {
        Certificate = false;
      } else if (name === null || issuer === null || issueDate === null) {
        Certificate = false;
      } else {
        Certificate = true;
      }
    });
  }

  //
  if (resume.Project.length > 0) {
    resume.Project.map(({ name, description, link, role, technologies }) => {
      if (
        name === projectData.name ||
        link === projectData.link ||
        role === projectData.role ||
        technologies === projectData.technologies ||
        description === projectData.description
      ) {
        Projects = false;
      } else if (
        name === null ||
        link === null ||
        role === null ||
        technologies === null
      ) {
        Projects = false;
      } else {
        Projects = true;
      }
    });
  }
  if (resume.Education.length > 0) {
    resume.Education.map(
      ({ institution, location, startDate, degree, description, endDate }) => {
        if (
          institution === educationData.institution ||
          location === educationData.location ||
          degree === educationData.degree ||
          description === educationData.description ||
          (startDate === educationData.startDate &&
            endDate === educationData.endDate)
        ) {
          Education = false;
        } else if (
          institution === null ||
          location === null ||
          degree === null
        ) {
          Education = false;
        } else {
          Education = true;
        }
      }
    );
  }
  if (resume.Skill.length > 0) {
    resume.Skill.map(({ category, skills }) => {
      if (JSON.stringify(skills) === JSON.stringify(skillData.skills)) {
        Skills = false;
      } else if (category === null || skills === null) {
        Skills = false;
      } else {
        Skills = true;
      }
    });
  }
  if (resume.personalInfo) {
    const {
      fullName,
      email,
      github,
      jobTitle,
      linkedin,
      location,
      phone,
      website,
    } = resume.personalInfo;
    if (
      fullName === resumeData.personalInfo.fullName ||
      email === resumeData.personalInfo.email ||
      github === resumeData.personalInfo.github ||
      jobTitle === resumeData.personalInfo.jobTitle ||
      linkedin === resumeData.personalInfo.linkedin ||
      location === resumeData.personalInfo.location ||
      phone === resumeData.personalInfo.phone ||
      website === resumeData.personalInfo.website
    ) {
      Header = false;
    } else if (
      fullName === null ||
      email === null ||
      github === null ||
      jobTitle === null ||
      linkedin === null ||
      website === null ||
      phone === null ||
      location === null
    ) {
      Header = false;
    } else {
      Header = true;
    }
  }
  if (resume.hobby) {
    if (JSON.stringify(resume.hobby) === JSON.stringify(resumeData.hobby)) {
      Hobby = false;
    } else if (resume.hobby === null) {
      Hobby = false;
    } else {
      Hobby = true;
    }
  }
  if (resume.profileSummary) {
    if (resume.profileSummary === resumeData.profileSummary) {
      Summary = false;
    } else if (resume.profileSummary === null) {
      Summary = false;
    } else {
      Summary = true;
    }
  }
  if (resume.language.length > 0) {
    resume.language.map(({ proficiency, name }) => {
      if (proficiency === null || name === null) {
        Language = false;
      } else {
        Language = true;
      }
    });
  }
  return {
    Header,
    Summary,
    Experience,
    Skills,
    Education,
    Projects,
    Certificate,
    Awards,
    Language,
    Hobby,
  };
};
const getResumeFromDB = async (id: string, userId: string) => {
  const result = await prisma.resume.findUniqueOrThrow({
    where: {
      id,
      userId,
    },
    include: {
      WorkExperience: true,
      Education: true,
      Skill: true,
      Project: true,
      Certification: true,
      Award: true,
    },
  });
  const resumeSectionCompletionStatus =
    await resumeSectionCompletionStatusFromDB(id);
  return { resume: result, resumeSectionCompletionStatus };
};

export const resumeServices = {
  createResumeIntoDB,
  getResumeFromDB,
  geAllUserResumeFromDB,
  updateResumeIntoDB,
  deleteUserResumeFromDB,
  createDuplicateResumeIntoDB,
};
