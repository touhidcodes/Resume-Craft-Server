import { prisma } from '../../../../app';

// 1. Get monthly resume creation count
const getMonthlyResumeCount = async () => {
  const monthlyCounts = await prisma.resume.aggregateRaw({
    pipeline: [
      {
        $group: {
          _id: {
            year: { $ifNull: [{ $year: '$createdAt' }, 'Unknown'] },
            month: { $ifNull: [{ $month: '$createdAt' }, 'Unknown'] },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ],
  });
  return (
    monthlyCounts as unknown as {
      _id: {
        year: number;
        month: number;
      };
      count: number;
    }[]
  ).map(({ _id, count }) => ({
    month: `${_id.year}-${String(_id.month).padStart(2, '0')}`,
    count,
  }));
};

// 2. Get last 5 users created data
const getLastFiveUsers = async () => {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    select: {
      id: true,
      userName: true,
      email: true,
      createdAt: true,
    },
  });

  return users;
};

// 3. Get popular templates
const getPopularTemplates = async () => {
  const popularTemplates = await prisma.resume.aggregateRaw({
    pipeline: [
      { $group: { _id: '$templateId', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ],
  });
  return Promise.all(
    (
      popularTemplates as unknown as {
        _id: {
          $oid: string;
        };
        count: number;
      }[]
    ).map(async ({ _id, count }) => {
      const templateDetails = await prisma.template.findUnique({
        where: { id: _id.$oid },
        select: {
          id: true,
          name: true,
          image: true,
        },
      });

      return {
        ...templateDetails,
        usageCount: count,
      };
    })
  );
};

// 4. Get total resume count
const getTotalResumeCount = async () => {
  return prisma.resume.count();
};

const getAnalytics = async () => {
  const monthlyResumeCount = await getMonthlyResumeCount();
  const lastFiveUsers = await getLastFiveUsers();
  const popularTemplates = await getPopularTemplates();
  const totalResumeCount = await getTotalResumeCount();
  return {
    monthlyResumeCount,
    lastFiveUsers,
    popularTemplates,
    totalResumeCount,
  };
};

export const AnalyticsServices = {
  getAnalytics,
};
