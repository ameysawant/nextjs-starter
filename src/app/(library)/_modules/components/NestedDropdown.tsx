import Dropdown, { type DropdownItem } from "@/shared/components/custom-ui/Dropdown";
import CodeSnippet from "@/shared/components/custom-ui/CodeSnippet";
import { Button } from "@/shared/components/shadcn-ui/button";
import { H2, H5 } from "@/shared/components/custom-ui/Typography";

const menuItems: DropdownItem[] = [
  { label: "Profile" },
  { label: "Billing" },
  {
    label: "Settings",
    children: [
      {
        label: "Account",
        children: [
          { label: "Email" },
          { label: "Password" },
          { label: "Two-factor", children: [{ label: "Authenticator app" }, { label: "SMS" }] },
        ],
      },
      { label: "Notifications" },
      { label: "Privacy" },
    ],
  },
  { label: "Logout", variant: "destructive" },
];

const usageCode = `const items = [
  { label: "Profile" },
  {
    label: "Settings",
    children: [
      {
        label: "Account",
        children: [{ label: "Email" }, { label: "Password" }],
      },
    ],
  },
  { label: "Logout", variant: "destructive" },
];

<Dropdown
  trigger={<Button variant="outline">Open menu</Button>}
  items={items}
  align="end"
/>

// hover to open (root + nested submenus)
<Dropdown
  trigger={<Button variant="outline">Open menu</Button>}
  items={items}
  openOnHover={true}
/>`;

const NestedDropdown = () => {
  return (
    <>
      <H2 className="mb-4">Nested Dropdown</H2>
      <H5 className="mb-4">How to use the Dropdown component</H5>

      <H5 className="mb-2">Props: </H5>
      <ul className="list-disc list-inside mb-4 text-gray-400">
        <li>trigger: React.ReactNode</li>
        <li>items: array (label, onSelect?, disabled?, variant?, children?)</li>
        <li>align: "end" aligns menu to the right; nested submenus open to the left</li>
        <li>openOnHover: boolean (optional, default false = click)</li>
      </ul>

      <h2 className="mt-6 mb-4">Demo (click): </h2>
      <Dropdown trigger={<Button variant="outline">Click menu</Button>} items={menuItems} />

      <h2 className="mt-6 mb-4">Demo (hover): </h2>
      <Dropdown
        trigger={<Button variant="outline">Hover menu</Button>}
        items={menuItems}
        openOnHover={true}
        align="end"
      />

      <h2 className="mt-6">Usage: </h2>
      <CodeSnippet code={usageCode} />
    </>
  );
};

export default NestedDropdown;
