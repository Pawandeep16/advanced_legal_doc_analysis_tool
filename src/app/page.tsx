
import Header from './Component/Header'
import UploadVideo from './Component/UplaodVideo'
import Services from './Component/Services'
import Tabs from "./Component/Tabs"

export default function Home() {
  return (
    <div className="space-y-6 scroll-smooth">
      <Header />
      <UploadVideo />
      <Tabs />
    </div>
  );
}
