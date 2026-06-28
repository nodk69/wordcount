import { Scale } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout';
import ContentComparison from '../components/analysis/ContentComparison';
import { usePageMeta } from '../hooks/usePageMeta';

const ContentComparisonPage = () => {
  usePageMeta({
    title: 'Content Comparison Tool — Check Text Similarity | CountsYourWords',
    description: 'Free online content comparison tool. Paste two texts to measure cosine similarity, find shared words, and detect duplicate content instantly in your browser.',
    path: '/content-comparison',
  });

  return (
    <PageLayout
      title="Content Comparison"
      subtitle="Paste two pieces of text to measure their similarity and detect duplicate content."
      icon={<Scale className="w-9 h-9" />}
      centered
    >
      <div className="max-w-4xl mx-auto">
        <ContentComparison />
      </div>
    </PageLayout>
  );
};

export default ContentComparisonPage;
