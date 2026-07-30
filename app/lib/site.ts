export const productGroups = [
  {
    name: "Radar",
    detail: "X-band and S-band navigation and collision avoidance.",
    image: "products/radar.png",
    ctaLabel: "Ask about radar",
    enquirySubject: "radar equipment",
  },
  {
    name: "GMDSS",
    detail: "Distress, safety and operational communications.",
    image: "products/gmdss.png",
    ctaLabel: "Ask about GMDSS",
    enquirySubject: "GMDSS equipment",
  },
  {
    name: "Heading devices",
    detail: "GPS compasses and heading distribution systems.",
    image: "products/heading-devices.png",
    ctaLabel: "Ask about heading devices",
    enquirySubject: "heading devices",
  },
  {
    name: "Gyrocompasses",
    detail: "Marine gyro heading reference and control equipment.",
    image: "products/gyrocompass.png",
    ctaLabel: "Ask about gyrocompasses",
    enquirySubject: "gyrocompasses",
  },
  {
    name: "ECDIS",
    detail: "Electronic chart display and navigation workstations.",
    image: "products/ecdis.png",
    ctaLabel: "Ask about ECDIS",
    enquirySubject: "ECDIS equipment",
  },
  {
    name: "GPS / AIS",
    detail: "Positioning, vessel identification and navigation sensors.",
    image: "products/gps-ais.png",
    ctaLabel: "Ask about GPS / AIS",
    enquirySubject: "GPS / AIS equipment",
  },
  {
    name: "VDR",
    detail: "Voyage data recording and protected data storage.",
    image: "products/vdr.png",
    ctaLabel: "Ask about VDR",
    enquirySubject: "VDR equipment",
  },
  {
    name: "Other navigation equipment",
    detail: "Displays, sensors, autopilots and bridge accessories.",
    image: "products/other-navigation.png",
    ctaLabel: "Ask about other equipment",
    enquirySubject: "other navigation equipment",
  },
];

export const brands = [
  "JRC",
  "Yokogawa",
  "Tokyo Keiki",
  "SAAB",
  "Sailor",
  "YDK Technologies",
  "NAVIS Engineering",
  "Wärtsilä",
  "Danelec",
  "Motorola",
  "Thrane",
  "Jotron",
  "Intellian",
  "Inmarsat",
  "Iridium",
  "Alphatron Marine",
  "IWCS",
  "Furuno",
  "Raymarine",
];

export const serviceCapabilities = [
  {
    id: "gmdss-vdr-annuals",
    title: "GMDSS & VDR annual surveys",
    shortLabel: "GMDSS & VDR annual surveys",
    description:
      "Annual radio and voyage data recorder inspections, functional testing and documentation supporting applicable class and flag requirements.",
  },
  {
    id: "bridge-retrofit",
    title: "Full navigation bridge retrofit",
    shortLabel: "Full navigation bridge retrofit",
    description:
      "Survey, engineering, equipment supply, installation and commissioning of integrated bridge systems, planned to reduce vessel downtime.",
  },
  {
    id: "gyro",
    title: "Gyro overhaul & installation",
    shortLabel: "Gyro overhaul & installation",
    description:
      "Diagnosis, overhaul, replacement and commissioning of gyrocompasses and heading distribution systems, including alignment and interface checks.",
  },
  {
    id: "radar",
    title: "Radar service & installation",
    shortLabel: "Radar service & installation",
    description:
      "Troubleshooting, repair, replacement and commissioning of marine radar systems, including performance checks and sensor integration.",
  },
  {
    id: "ecdis",
    title: "ECDIS service & installation",
    shortLabel: "ECDIS service & installation",
    description:
      "Installation, hardware and software support, interface verification and commissioning for ECDIS workstations and connected navigation sensors.",
  },
  {
    id: "gps-compass",
    title: "GPS & GPS compass",
    shortLabel: "GPS & GPS compass",
    description:
      "Service, replacement and installation of positioning and heading equipment, including antennas, cabling and bridge-system integration.",
  },
  {
    id: "anti-jamming",
    title: "Anti-jamming / spoofing systems",
    shortLabel: "Anti-jamming / spoofing",
    description:
      "Assessment and installation of resilient positioning solutions that help crews detect and manage GNSS interference.",
  },
  {
    id: "echo-sounder-speed-log",
    title: "Echo sounder & speed log",
    shortLabel: "Echo sounder & speed log",
    description:
      "Installation, repair and calibration of depth and speed measurement systems, transducers, cabling and bridge displays.",
  },
  {
    id: "magnetic-compass",
    title: "Magnetic compass adjustment & service",
    shortLabel: "Magnetic compass adjustment",
    description:
      "Onboard compass adjustment, deviation checks and service, with supporting documentation prepared where applicable.",
  },
  {
    id: "remote-onsite-support",
    title: "Remote and on-site support",
    shortLabel: "Remote and on-site support",
    description:
      "Fast remote diagnosis and coordinated attendance through NAVTEAM offices and service partners in major ports worldwide.",
  },
];

export const services = serviceCapabilities.map((service) => service.shortLabel);

export const offices = [
  { city: "Svendborg", country: "Denmark", region: "Europe" },
  { city: "Gdansk", country: "Poland", region: "Europe" },
  { city: "Port of Tanjung Pelepas", country: "Malaysia", region: "Asia" },
];

export const stories = [
  {
    category: "Technology",
    title: "Preparing bridge systems for resilient positioning",
    summary:
      "Anti-jamming and spoofing protection is becoming a practical bridge requirement.",
  },
  {
    category: "Service",
    title: "What to prepare before a GMDSS or VDR annual survey",
    summary:
      "A concise checklist for operators, superintendents and vessel crews.",
  },
  {
    category: "Projects",
    title: "From ageing equipment to an integrated navigation bridge",
    summary:
      "How a staged retrofit reduces downtime and supports long-term serviceability.",
  },
  {
    category: "Product lifecycle",
    title: "Planning replacements before equipment becomes obsolete",
    summary:
      "A structured product-lifecycle view helps operators avoid urgent, costly replacements.",
  },
  {
    category: "Operations",
    title: "One service request, coordinated across multiple ports",
    summary:
      "How central coordination creates a consistent service experience worldwide.",
  },
  {
    category: "Navigation",
    title: "The practical case for a complete bridge health check",
    summary:
      "Assessing interfaces and dependencies before a retrofit reduces integration risk.",
  },
];

export function assetPath(fileName: string) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${basePath}/assets/${fileName}`;
}
