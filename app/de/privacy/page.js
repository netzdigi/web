import LegalPage from '../../../components/LegalPage';
import SetHtmlLang from '../../../components/SetHtmlLang';
import { privacyDe } from '../../../content/legalDe';

export const metadata = {
  title: `${privacyDe.title} — WebCraft Bulgaria`,
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <>
      <SetHtmlLang lang="de" />
      <div className="bg-mesh" aria-hidden="true" />
      <LegalPage data={privacyDe} />
    </>
  );
}
