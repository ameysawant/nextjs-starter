import { H5, P, Span } from "@/shared/components/custom-ui/Typography";
import { Col, Row } from "@/shared/components/flexbox-grid/Index";
import { SiShadcnui } from "react-icons/si";

const LibraryPage = () => {
  return (
    <>
      <Row className="mt-4">
        <Col>
          <div className="flex items-center gap-2">
            <SiShadcnui className="text-2xl" /> <Span className="text-2xl font-bold">Shadcn/UI Library Page</Span>
          </div>
        </Col>
        <Col className="my-4">
          <H5>Customized Shadcn/UI Components</H5>
          <P>
            These are the custom components built on top of the shadcn/ui library. You can use these components in your
            projects. You can also add new custom components from Shadcn/UI as per your needs.
          </P>
        </Col>
      </Row>
    </>
  );
};

export default LibraryPage;
