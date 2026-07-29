import type { Metadata } from "next";
import { ServiceMapHero } from "../components/ServiceMapHero";

export const metadata: Metadata = {
  title: "Service & Support",
  description:
    "Worldwide marine electronics service, installation, surveys and bridge retrofits coordinated by NAVTEAM.",
};

export default function ServicePage() {
  return <ServiceMapHero />;
}
