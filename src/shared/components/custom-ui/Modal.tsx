import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/shadcn-ui/dialog";
import { cn } from "@/shared/utils/utils";
import { Button } from "../shadcn-ui/button";

interface ModalProps {
  children: React.ReactNode;
  modalButton: React.ReactNode;
  modalTitle: string;
  modalDescription: string;
  scrollable: boolean;
}

const Modal = ({ children, modalButton, modalTitle, modalDescription, scrollable }: ModalProps) => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>{modalButton}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{modalTitle}</DialogTitle>
            <DialogDescription>{modalDescription}</DialogDescription>
            <div className={cn(scrollable ? "thin-scrollbar max-h-[60vh] overflow-y-auto" : "")}>{children}</div>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Modal;
