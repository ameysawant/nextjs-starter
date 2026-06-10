import Accordions, { type AccordionIconType, type AccordionNode } from "@/shared/components/custom-ui/Accordions";
import CodeSnippet from "@/shared/components/code/CodeSnippet";
import { H2, H5 } from "@/shared/components/custom-ui/Typography";

const accordionItems: AccordionNode[] = [
  {
    label: "Getting Started",
    content: "Introduction and setup guide.",
    children: [
      {
        label: "Installation",
        content: "Run npm install to get started.",
        children: [
          { label: "Prerequisites", content: "Node.js 18+ and npm." },
          { label: "Create project", content: "npx create-next-app@latest" },
        ],
      },
      { label: "Project structure", content: "Overview of folders and modules." },
    ],
  },
  {
    label: "Components",
    content: "Custom UI built on shadcn.",
    children: [
      {
        label: "Modal",
        content: "Centered and scrollable modal examples.",
        children: [{ label: "Centered Modal", content: "Fixed height, centered dialog." }],
      },
      { label: "Dropdown", content: "Unlimited nested dropdown menus." },
    ],
  },
  { label: "FAQ", content: "Common questions and answers." },
];

const usageCode = `const items: AccordionNode[] = [
  {
    label: "Settings",
    content: "Main settings section.",
    children: [
      {
        label: "Account",
        content: "Account preferences.",
        children: [{ label: "Email", content: "Update your email." }],
      },
    ],
  },
];

<Accordions items={items} icon="chevron" />
<Accordions items={items} icon="plus-minus" />
<Accordions items={items} icon="number" />`;

const iconDemos: { label: string; icon: AccordionIconType }[] = [
  { label: "Chevron (up / down)", icon: "chevron" },
  { label: "Plus / minus", icon: "plus-minus" },
  { label: "Numbers (1, 2, 3...)", icon: "number" },
];

const NestedAccordion = () => {
  return (
    <>
      <H2 className="mb-4">Nested Accordion</H2>
      <H5 className="mb-4">Unlimited nested levels with icon support</H5>

      <H5 className="mb-2">Props:</H5>
      <ul className="mb-4 list-inside list-disc text-gray-400">
        <li>items: array (label, content?, children?)</li>
        <li>icon: &quot;chevron&quot; | &quot;plus-minus&quot; | &quot;number&quot;</li>
        <li>type: &quot;single&quot; | &quot;multiple&quot; (default single)</li>
        <li>collapsible: boolean (default true)</li>
      </ul>

      {iconDemos.map((demo) => (
        <div key={demo.icon} className="mb-8">
          <h2 className="mb-4 mt-6 text-lg font-semibold">{demo.label}</h2>
          <Accordions items={accordionItems} icon={demo.icon} className="max-w-lg" />
        </div>
      ))}

      <h2 className="mt-6 mb-4">Usage:</h2>
      <CodeSnippet code={usageCode} />
    </>
  );
};

export default NestedAccordion;
