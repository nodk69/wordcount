import { DAILY_GOAL } from '../../utils/constants';

const ActivityTracker = ({ todayWords, goal = DAILY_GOAL }) => {
  const percentage = Math.min((todayWords / goal) * 100, 100);
  const achieved = todayWords >= goal;

  return (
    <div className="section-card mt-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <span aria-hidden="true">✍️</span> Today&apos;s Writing Goal
        </h2>
        {achieved && (
          <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
            🎉 Goal reached!
          </span>
        )}
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
        <span>
          <span className="font-bold text-gray-900 dark:text-white">{todayWords.toLocaleString()}</span> words written today
        </span>
        <span>
          Goal: <span className="font-medium">{goal.toLocaleString()}</span> &nbsp;·&nbsp;
          <span className={achieved ? 'text-green-600 dark:text-green-400 font-semibold' : ''}>
            {Math.round(percentage)}%
          </span>
        </span>
      </div>

      <div
        className="w-full h-3 bg-gray-200 dark:bg-dark-border rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={todayWords}
        aria-valuemin={0}
        aria-valuemax={goal}
        aria-label={`Writing goal progress: ${Math.round(percentage)}%`}
      >
        <div
          className={`h-full rounded-full transition-all duration-700 ${
            achieved
              ? 'bg-gradient-to-r from-green-400 to-green-600'
              : 'bg-gradient-to-r from-primary to-secondary'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {!achieved && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          {Math.max(0, goal - todayWords).toLocaleString()} words to reach your daily goal
        </p>
      )}
    </div>
  );
};

export default ActivityTracker;
