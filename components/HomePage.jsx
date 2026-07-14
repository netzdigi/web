import Header from './Header';
import Hero from './Hero';
import ProblemSection from './ProblemSection';
import ServicesSection from './ServicesSection';
import AutomationSection from './AutomationSection';
import ProcessSection from './ProcessSection';
import WhyUsSection from './WhyUsSection';
import PortfolioSection from './PortfolioSection';
import PackagesSection from './PackagesSection';
import FaqSection from './FaqSection';
import LeadFunnel from './LeadFunnel';
import ContactSection from './ContactSection';
import Footer from './Footer';
import MobileCta from './MobileCta';
import SetHtmlLang from './SetHtmlLang';
import ScrollProgress from './ScrollProgress';

export default function HomePage({ content }) {
  return (
    <>
      <SetHtmlLang lang={content.htmlLang} />
      <ScrollProgress />
      <div className="bg-mesh" aria-hidden="true" />
      <Header content={content} />
      <main id="top">
        <Hero content={content} />
        <ProblemSection content={content} />
        <ServicesSection content={content} />
        <AutomationSection content={content} />
        <ProcessSection content={content} />
        <WhyUsSection content={content} />
        <PortfolioSection content={content} />
        <PackagesSection content={content} />
        <FaqSection content={content} />
        <LeadFunnel content={content} />
        <ContactSection content={content} />
      </main>
      <Footer content={content} />
      <MobileCta content={content} />
    </>
  );
}
