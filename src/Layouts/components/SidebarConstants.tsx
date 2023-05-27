import {
  IconAnalyze,
  IconChartPie2,
  IconDashboard,
  IconFileDollar,
  IconForms,
  IconHelp,
  IconHome,
  IconLayoutDashboard,
  IconLayoutGridAdd,
  IconTable,
  IconToggleLeft,
  IconUserPlus,
  IconUsers,
  IconUpload,
  IconActivity,
  IconHomeMove,
  IconEdit,
  IconSettings,
  IconCalendar
} from '@tabler/icons-react';

export const sidebarMenu = [
  {
    title: 'Dashboard',
    link: '/st',
    icon: <IconHome size={20} stroke={1.5} style={{ marginBottom: '-4px' }} />
  },
  {
    title: 'Update Periods',
    link: '/st/periods',
    icon: <IconEdit size={20} stroke={1.5} style={{ marginBottom: '-4px' }} />
  }
];

export const adminSidebarMenu = [
  {
    title: 'Dashboard',
    link: '/admin',
    icon: <IconHome size={20} stroke={1.5} style={{ marginBottom: '-4px' }} />
  },
  {
    title: 'Room Management',
    link: '/admin/room-management',
    icon: <IconHomeMove size={20} stroke={1.5} style={{ marginBottom: '-4px' }} />
  },
  {
    title: 'ST Management',
    link: '/admin/st-management',
    icon: <IconUsers size={20} stroke={1.5} style={{ marginBottom: '-4px' }} />
  },
  {
    title: 'Configuration',
    link: '/admin/config',
    icon: <IconSettings size={20} stroke={1.5} style={{ marginBottom: '-4px' }} />
  },
  {
    title: 'Routine',
    link: '/admin/routine',
    icon: <IconCalendar size={20} stroke={1.5} style={{ marginBottom: '-4px' }} />
  }
];

export default sidebarMenu;
