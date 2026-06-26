import StatCard from './StatCard';

const StatsGrid = ({ stats }) => {
  const items = [
    { label: 'Words', value: stats.words, color: 'blue' },
    { label: 'Unique Words', value: stats.uniqueWords, color: 'blue' },
    { label: 'Characters', value: stats.characters, color: 'green' },
    { label: 'Chars (no space)', value: stats.charactersNoSpace, color: 'green' },
    { label: 'Sentences', value: stats.sentences, color: 'purple' },
    { label: 'Paragraphs', value: stats.paragraphs, color: 'purple' },
    { label: 'Lines', value: stats.lines, color: 'purple' },
    { label: 'Syllables', value: stats.syllables, color: 'teal' },
    { label: 'Pages', value: stats.pages, color: 'teal' },
    { label: 'Stop Words', value: stats.stopWordsCount, color: 'orange' },
    { label: 'Avg Word Len', value: stats.avgWordLength, color: 'green' },
    { label: 'Avg Sent (wds)', value: stats.avgSentenceWords, color: 'purple' },
    { label: 'Avg Sent (chr)', value: stats.avgSentenceChars, color: 'purple' },
    { label: 'Longest Sent', value: stats.longestSentence, color: 'orange' },
    { label: 'Shortest Sent', value: stats.shortestSentence, color: 'orange' },
    { label: 'Reading Time', value: stats.readingTime, color: 'orange', isText: true },
    { label: 'Speaking Time', value: stats.speakingTime, color: 'orange', isText: true },
    { label: 'Handwrite Time', value: stats.writingTime, color: 'orange', isText: true },
    { label: 'Flesch Score', value: stats.readability.score, color: 'teal' },
    { label: 'FK Grade', value: stats.fkGrade !== null ? stats.fkGrade : '—', color: 'teal', isText: stats.fkGrade === null },
  ];

  return (
    <div
      role="region"
      aria-label="Text statistics"
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 mt-6"
    >
      {items.map((item) => (
        <StatCard key={item.label} {...item} />
      ))}
    </div>
  );
};

export default StatsGrid;
