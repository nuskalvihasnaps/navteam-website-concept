export const productGroups = [
  { name: "Radar", detail: "Navigation and collision avoidance", code: "RAD" },
  { name: "GMDSS", detail: "Safety and communications", code: "SOS" },
  { name: "Gyro & heading", detail: "Heading reference systems", code: "GYR" },
  { name: "ECDIS", detail: "Electronic chart systems", code: "ECD" },
  { name: "AIS & GPS", detail: "Positioning and identification", code: "GPS" },
  { name: "Sensors", detail: "Speed, depth and environmental", code: "SNS" },
  { name: "VDR", detail: "Voyage data recording", code: "VDR" },
  { name: "Communication", detail: "Satellite and radio systems", code: "COM" },
  { name: "Autopilot", detail: "Steering and track control", code: "AUT" },
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

export const services = [
  "GMDSS & VDR annual surveys",
  "Full navigation bridge retrofit",
  "Gyro overhaul & installation",
  "Radar service & installation",
  "ECDIS service & installation",
  "GPS & GPS compass",
  "Anti-jamming / spoofing",
  "Echo sounder & speed log",
  "Magnetic compass adjustment",
  "Remote and on-site support",
];

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
