import { H2, H5 } from "@/shared/components/custom-ui/Typography";
import SelectMenu from "@/shared/components/custom-ui/SelectMenu";
import CodeSnippet from "@/shared/components/code/CodeSnippet";

const items = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
];

const usageCode = `const items = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
];

<SelectMenu items={items} placeholder="Select an option" className="w-full max-w-48" label="Select an option" />
`;

const SelectMenus = () => {
  return (
    <>
      <H2 className="mb-4">Select Menu</H2>
      <H5 className="mb-4">
        Select Menu is a component that allows the user to select a value from a list of options.
      </H5>
      <H5 className="mb-2">Props:</H5>
      <ul className="mb-4 list-inside list-disc text-gray-400">
        <li>items: array (label, value)</li>
        <li>placeholder: string</li>
        <li>className: string</li>
        <li>label: string</li>
      </ul>
      <h2 className="mt-6 mb-4">Demo: </h2>
      <SelectMenu items={items} placeholder="Select an option" className="w-full max-w-48" label="Select an option" />

      <h2 className="mt-6 mb-4">Usage: </h2>
      <CodeSnippet code={usageCode} />
    </>
  );
};

export default SelectMenus;
