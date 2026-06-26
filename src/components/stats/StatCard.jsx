import { formatNumber } from '../../utils/helpers';

const colorMap = {
  blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800',
  green: 'bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800',
  purple: 'bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-800',
  orange: 'bg-orange-50 dark:bg-orange-900/20 border-orange-100 dark:border-orange-800',
  teal: 'bg-teal-50 dark:bg-teal-900/20 border-teal-100 dark:border-teal-800',
};

const labelColorMap = {
  blue: 'text-blue-600 dark:text-blue-400',
  green: 'text-green-600 dark:text-green-400',
  purple: 'text-purple-600 dark:text-purple-400',
  orange: 'text-orange-600 dark:text-orange-400',
  teal: 'text-teal-600 dark:text-teal-400',
};

const StatCard = ({ label, value, color = 'blue', isText = false }) => (
  <div className={`stat-card border ${colorMap[color]}`}>
    <div className={`text-xs font-medium uppercase tracking-wide mb-1 ${labelColorMap[color]}`}>
      {label}
    </div>
    <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white truncate">
      {isText ? (value || '—') : formatNumber(value)}
    </div>
  </div>
);

export default StatCard;
