import LibraryHeader from "@/app/(library)/_modules/layout/LibraryHeader";
import LibraryFooter from "@/app/(library)/_modules/layout/LibraryFooter";
import { Col, Container } from "@/shared/components/flexbox-grid/Index";
import { Row } from "@/shared/components/flexbox-grid/Index";

export default function LibraryLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Container xxxl className="py-4">
        <Row>
          <Col lg={4} xl={3} xxl={2}>
            <LibraryHeader />
          </Col>
          <Col lg={8} xl={9} xxl={10}>
            <main>{children}</main>
          </Col>
        </Row>
      </Container>
      <LibraryFooter />
    </>
  );
}
