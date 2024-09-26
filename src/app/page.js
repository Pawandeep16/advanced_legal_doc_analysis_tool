import Image from "next/image";
import Header from "./Component/Header";
import UploadVideo from "./Component/UplaodVideo";

export default function Home() {
  return (
    <div className="space-y-4">
      <Header />
      <UploadVideo />
    </div>
  );
}
