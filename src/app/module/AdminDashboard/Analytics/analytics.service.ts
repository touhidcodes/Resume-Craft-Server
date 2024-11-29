import { prisma } from '../../../../app';

const getAnalytics = async () => {
  // Get total count of templates
  const totalTemplates = await prisma.template.count();

  // Get total count of users
  const totalUsers = await prisma.user.count();

  const popularTemplate = await prisma.template.groupBy({
    by: ['templateId'],
    _count: {
      templateId: true,
    },
    orderBy: {
      _count: {
        templateId: 'desc',
      },
    },
  });
  // Format the result
  const formattedResult = popularTemplate.map((item) => ({
    templateId: item.templateId,
    totalCreations: item._count.templateId,
  }));

  return {
    totalTemplates,
    totalUsers,
    popularTemplate: formattedResult[0] || null, // Handle case if no templates exist
  };
};

export const AnalyticsServices = {
  getAnalytics,
};
