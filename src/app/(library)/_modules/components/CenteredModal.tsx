import Modal from "@/shared/components/custom-ui/Modal";
import CodeSnippet from "@/shared/components/custom-ui/CodeSnippet";
import { Button } from "@/shared/components/shadcn-ui/button";
import { H2, H5, P } from "@/shared/components/custom-ui/Typography";

const usageCode = `<Modal
  modalButton={<Button>Centered Modal</Button>}
  modalTitle="Modal Title"
  modalDescription="This is Modal Description and it's optional"
  scrollable={false}
>
  <div>
    <P>Your content here</P>
  </div>
</Modal>`;

const CenteredModal = () => {
  return (
    <>
      <H2 className="mb-4">Centered Modal</H2>
      <H5 className="mb-4">How to use the Centered Modal component</H5>

      <H5 className="mb-2">Props: </H5>
      <ul className="list-disc list-inside mb-4 text-gray-400">
        <li>modalButton: React.ReactNode</li>
        <li>children: React.ReactNode</li>
        <li>scrollable: boolean</li>
        <li>modalTitle: string</li>
        <li>modalDescription: string</li>
      </ul>

      <h2 className="mt-6 mb-4">Demo: </h2>
      <Modal
        modalButton={<Button>Centered Modal</Button>}
        modalTitle="Modal Title"
        modalDescription="This is Modal Description and it's optional"
        scrollable={false}
      >
        <div>
          <P>
            This is a library modal content. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
          </P>
        </div>
      </Modal>

      <h2 className="mt-6">Usage: </h2>
      <CodeSnippet code={usageCode} />
    </>
  );
};

export default CenteredModal;
