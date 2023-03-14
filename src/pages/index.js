import HeroSection from '@/components/func/home/Hero';
import BasicStatistics from '@/components/func/lists/Statistics';
import { Layout } from '@components/layout';

export default function Home() {
  return (
    <Layout active={'home'}>
      <BasicStatistics />
      <HeroSection />
    </Layout>
  );
}
