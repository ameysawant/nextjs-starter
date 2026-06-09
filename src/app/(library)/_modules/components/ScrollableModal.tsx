import Modal from "@/shared/components/custom-ui/Modal";
import CodeSnippet from "@/shared/components/custom-ui/CodeSnippet";
import { Button } from "@/shared/components/shadcn-ui/button";
import { H2, H5, P } from "@/shared/components/custom-ui/Typography";

const usageCode = `<Modal
  modalButton={<Button>Scrollable Modal</Button>}
  modalTitle="Modal Title"
  modalDescription="This is Modal Description and it's optional"
  scrollable={true}
>
  <div>
    <P>Your long content here</P>
  </div>
</Modal>`;

const lorem =
  "This is a library modal content. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.";

const ScrollableModal = () => {
  return (
    <>
      <H2 className="mb-4">Scrollable Modal</H2>
      <H5 className="mb-4">How to use the Scrollable Modal component</H5>

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
        modalButton={<Button>Scrollable Modal</Button>}
        modalTitle="Modal Title"
        modalDescription="This is Modal Description and it's optional"
        scrollable={true}
      >
        <div>
          {Array.from({ length: 30 }, (_, i) => (
            <P key={i} className="mb-4">
              {lorem}
            </P>
          ))}
        </div>
      </Modal>

      <h2 className="mt-6">Usage: </h2>
      <CodeSnippet code={usageCode} />
    </>
  );
};

export default ScrollableModal;
