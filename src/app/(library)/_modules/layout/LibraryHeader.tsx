import { Row, Col } from "@/shared/components/flexbox-grid/Index";
import { H2, P } from "@/shared/components/custom-ui/Typography";
import { LIBRARY_ROUTES } from "@/shared/constants/routes";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

const LibraryHeader = () => {
  const componentLinks = [
    {
      label: "Centered Modal",
      to: LIBRARY_ROUTES.centeredModal,
    },
    {
      label: "Scrollable Modal",
      to: LIBRARY_ROUTES.scrollableModal,
    },
    {
      label: "Nested Dropdown",
      to: LIBRARY_ROUTES.dropdown,
    },
    {
      label: "Nested Accordion",
      to: LIBRARY_ROUTES.nestedAccordion,
    },
    {
      label: "Select Menu",
      to: LIBRARY_ROUTES.selectMenu,
    },
  ];
  return (
    <>
      <Row>
        <Col>
          <Row>
            <Col>
              <Link href={LIBRARY_ROUTES.base}>
                <H2>Custom Shadcn/UI </H2>
              </Link>
              <P className="mb-4">These are the custom components built on top of the shadcn/ui library.</P>
            </Col>
            {componentLinks.map((link) => (
              <Col key={link.label}>
                <Link
                  href={link.to}
                  className="flex items-center justify-between border-b border-t border-gray-600 py-2 text-gray-300"
                >
                  {link.label} <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default LibraryHeader;
