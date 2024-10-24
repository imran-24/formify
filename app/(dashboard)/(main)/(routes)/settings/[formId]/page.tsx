"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { Loader2, Trash2 } from "lucide-react";
import Navbar from "@/app/(dashboard)/forms/[formId]/edit/_components/navbar";
import ConfirmModal from "@/app/(dashboard)/_components/confirm-modal";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface FormSettingsPageProps {
  params: {
    formId: Id<"forms">;
  };
}

const FormSettingsPage = ({ params }: FormSettingsPageProps) => {
  // const [isPublished, setIsPublished] = useState(false);
  const form = useQuery(api.form.getById, {
    formId: params.formId,
  });

  const { user } = useUser();
  const router = useRouter();

  const isEditor = form?.authorId === user?.id;
  let isPublish = form?.isPublished || false;
  let isEditable = (isEditor && !isPublish) || false;

  if (form === null) return <div>Not Found</div>;

  const { mutate, pending } = useApiMutation(api.form.remove);

  const onDelete = () => {
    mutate({
      id: params.formId,
    })
      .then(() => {
        toast.success("Form deleted");
        router.push("/");
      })
      .catch(() => toast.error("Failed to delete form"));
  };
  if (form === undefined) {
    return (
      <main className='h-full max-w-full'>
        <div className='h-full flex flex-col '>
          <Navbar.Skeleton />
          <main className='bg-purple-50 w-full h-full px-6 lg:px-0'>
            <div className='mt-10 flex justify-center'>
              <Loader2 className=' size-8 text-neutral-500 animate-spin' />
            </div>
            {/* <QuestionField.Skeleton /> */}
          </main>
        </div>
      </main>
    );
  }

  if (user?.id !== form?.authorId) {
    throw new Error("You are not allowed", { cause: 403 });
  }

  return (
    <div className='h-full max-w-full'>
      <div className='h-full flex flex-col '>
        <Navbar published={isPublish} initialData={form} />
        <div className='bg-purple-50 w-full h-full px-6 lg:px-0'>
          <div className='max-w-lg w-full  mx-auto flex flex-col py-4 space-y-3'>
            <ConfirmModal
              disabled={pending}
              onConfirm={onDelete}
              header='Delete form?'
              description='This will delete the form and all of its content.'
            >
              <Button
                onClick={(e) => e.stopPropagation()}
                className='px-3 py-2 rounded-md cursor-pointer bg-rose-600 hover:bg-rose-700  w-full flex '
              >
                <Trash2 className='size-4 mr-2' />
                Delete
              </Button>
            </ConfirmModal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSettingsPage;
