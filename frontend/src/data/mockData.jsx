// Mock complaints data
export const mockComplaints = [
  {
    id: '1',
    title: 'Street Light Not Working',
    description: 'The street light at Sector 15 main road has been out for 2 weeks causing safety concerns for residents.',
    category: 'Infrastructure',
    status: 'pending',
    createdAt: '2025-12-28T10:30:00Z',
    userId: 'user-1',
    userName: 'Rajesh Kumar',
    likes: 12,
    comments: 3,
    location: {
      type: 'Point',
      coordinates: [77.2090, 28.6139]
    },
    address: 'Sector 15, New Delhi'
  },
  {
    id: '2',
    title: 'Water Supply Issue',
    description: 'Irregular water supply in Block C. Water comes only for 1 hour in the morning.',
    category: 'Water',
    status: 'in_progress',
    createdAt: '2025-12-26T14:20:00Z',
    userId: 'user-2',
    userName: 'Priya Sharma',
    likes: 28,
    comments: 8,
    location: {
      type: 'Point',
      coordinates: [77.2310, 28.6289]
    },
    address: 'Block C, Connaught Place'
  },
  {
    id: '3',
    title: 'Garbage Not Collected',
    description: 'Garbage has not been collected for the past 5 days in our locality. Creating health hazard.',
    category: 'Sanitation',
    status: 'resolved',
    createdAt: '2025-12-20T09:15:00Z',
    userId: 'user-3',
    userName: 'Amit Verma',
    likes: 45,
    comments: 12,
    location: {
      type: 'Point',
      coordinates: [77.1855, 28.5815]
    },
    address: 'Vasant Kunj, South Delhi'
  },
  {
    id: '4',
    title: 'Road Pothole Hazard',
    description: 'Large pothole on main highway causing accidents. Needs immediate attention.',
    category: 'Roads',
    status: 'pending',
    createdAt: '2025-12-29T16:45:00Z',
    userId: 'user-1',
    userName: 'Rajesh Kumar',
    likes: 67,
    comments: 15,
    location: {
      type: 'Point',
      coordinates: [77.2500, 28.5900]
    },
    address: 'NH-48, Gurgaon Road'
  },
  {
    id: '5',
    title: 'Public Toilet Maintenance',
    description: 'Public toilet near bus stand is in very poor condition. No water, no cleaning.',
    category: 'Sanitation',
    status: 'in_progress',
    createdAt: '2025-12-25T11:00:00Z',
    userId: 'user-4',
    userName: 'Sunita Devi',
    likes: 34,
    comments: 6,
    location: {
      type: 'Point',
      coordinates: [77.2167, 28.6333]
    },
    address: 'ISBT Kashmere Gate'
  },
  {
    id: '6',
    title: 'Electricity Bill Dispute',
    description: 'Received inflated electricity bill for December. Meter reading seems incorrect.',
    category: 'Electricity',
    status: 'pending',
    createdAt: '2025-12-30T08:30:00Z',
    userId: 'user-5',
    userName: 'Mohit Singh',
    likes: 8,
    comments: 2,
    location: {
      type: 'Point',
      coordinates: [77.1500, 28.6800]
    },
    address: 'Rohini Sector 7'
  }
];

// Mock users for admin panel
export const mockUsers = [
  { id: 'user-1', name: 'Rajesh Kumar', email: 'rajesh@email.com', status: 'active', complaints: 2, joinedAt: '2025-10-15' },
  { id: 'user-2', name: 'Priya Sharma', email: 'priya@email.com', status: 'active', complaints: 1, joinedAt: '2025-11-20' },
  { id: 'user-3', name: 'Amit Verma', email: 'amit@email.com', status: 'active', complaints: 1, joinedAt: '2025-09-05' },
  { id: 'user-4', name: 'Sunita Devi', email: 'sunita@email.com', status: 'active', complaints: 1, joinedAt: '2025-12-01' },
  { id: 'user-5', name: 'Mohit Singh', email: 'mohit@email.com', status: 'blocked', complaints: 1, joinedAt: '2025-08-22' },
];

// Categories for complaints
export const categories = [
  { id: 'infrastructure', name: 'Infrastructure', color: 'bg-blue-500' },
  { id: 'water', name: 'Water', color: 'bg-cyan-500' },
  { id: 'sanitation', name: 'Sanitation', color: 'bg-green-500' },
  { id: 'roads', name: 'Roads', color: 'bg-orange-500' },
  { id: 'Electricity', name: 'Electricity', color: 'bg-yellow-500' },
  { id: 'other', name: 'Other', color: 'bg-purple-500' },
];

// Get category color
export const getCategoryColor = (category) => {
  const cat = categories.find(c => c.name.toLowerCase() === category.toLowerCase());
  return cat?.color || 'bg-gray-500';
};

// Get status info
export const getStatusInfo = (status) => {
  switch (status) {
    case 'pending':
      return { label: 'Pending', class: 'status-pending' };
    case 'in_progress':
      return { label: 'In Progress', class: 'status-progress' };
    case 'resolved':
      return { label: 'Resolved', class: 'status-resolved' };
    default:
      return { label: status, class: 'bg-muted' };
  }
};
