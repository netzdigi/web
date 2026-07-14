import LegalPage from '../../components/LegalPage';
import SetHtmlLang from '../../components/SetHtmlLang';
import { termsBg } from '../../content/legalBg';

export const metadata = {
  title: `${termsBg.title} — WebCraft Bulgaria`,
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <>
      <SetHtmlLang lang="bg" />
      <div className="bg-mesh" aria-hidden="true" />
      <LegalPage data={termsBg} />
    </>
  );
}
