// // components/FormBuilder.tsx

// import React, { FormEventHandler } from "react";
// import { Button } from "@/components/ui/button";
// import { useApiMutation } from "@/hooks/use-api-mutation";
// import { api } from "@/convex/_generated/api";
// import { useMutation, useQuery } from "convex/react";
// import { Id } from "@/convex/_generated/dataModel";
// import { cn } from "@/lib/utils";
// import { saveAnswer } from "@/convex/responseAnswer";
// import { toast } from "sonner";
// import { useParams } from "next/navigation";
// import FormField from "../form-field";

// interface FormBuilderProps {
//   questions: unknown[];
//   editable: boolean;
//   submitted?: "draft";
//   //   setQuestions: React.Dispatch<React.SetStateAction<unknown[]>>;
//   responseId?: Id<"responses">;
// }

// const FormBuilder: React.FC<FormBuilderProps> = ({
//   questions,
//   editable,
//   responseId,
//   submitted,
// }) => {
//   // const responseAnswers = useQuery(api.responseAnswers.getAnswersByResponseId, {
//   //     responseId: responseId!
//   // });

//   // console.log(responseAnswers, responseId)
//   const params = useParams();
//   const { formId } = params;

//   console.log(params);

//   const { mutate, pending } = useApiMutation(api.formField.create);
//   const remove = useMutation(api.formField.remove);
//   const update = useMutation(api.formField.update);
//   const saveAnswer = useMutation(api.responseAnswer.saveAnswer);
//   const submitAnswers = useMutation(api.response.update);

//   const addQuestion = () => {
//     // setQuestions([
//     //   ...questions,
//     //   {
//     //     // fieldType: "TEXT",
//     //     placeholder: "Questions",
//     //     required: false,
//     //     order: questions.length,
//     //     options: [],
//     //   },
//     // ]);

//     mutate({
//       formId,
//       order: questions.length,
//     });
//   };

//   const getAnswerToQuestion = (formFieldId: Id<"formFields">) => {
//     const response = useQuery(
//       api.responseAnswer.getAnswerByResponseId,
//       responseId && formFieldId
//         ? {
//             responseId,
//             formFieldId,
//           }
//         : "skip"
//     );
//     // if(response === undefined) return <div>Loading</div>
//     return response;
//   };
//   const updateQuestion = (id: Id<"formFields">, label: string) => {
//     update({
//       id,
//       label,
//     });
//     // const updatedQuestions = questions.map((q, i) => (i === index ? field : q));
//     // setQuestions(updatedQuestions);
//   };

//   const updateAnswer = (formFieldId: Id<"formFields">, answer: string) => {
//     console.log(responseId);
//     if (!responseId) throw Error("Response id is required");
//     saveAnswer({
//       responseId,
//       formFieldId,
//       answer,
//     });
//     // const updatedQuestions = questions.map((q, i) => (i === index ? field : q));
//     // setQuestions(updatedQuestions);
//   };

//   const removeQuestion = (formId: Id<"formFields">) => {
//     // const updatedQuestions = questions.filter((_, i) => i !== index);
//     // setQuestions(updatedQuestions);
//     remove({
//       id: formId,
//     });
//   };

//   const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
//     e.preventDefault();
//     if (!responseId) return;
//     submitAnswers({
//       responseId,
//     })
//       .then(() => toast.success("Form submitted"))
//       .catch(() => toast.error("Failed to submit the form"));
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div className='flex flex-col-reverse gap-y-2'>
//           {questions.map((question: any, index) => {
//             // const response = useQuery(
//             //   api.responseAnswer.getAnswerByResponseId,
//             //   // responseId && question._id
//             //   //   ? 
//             //   {
//             //         responseId: responseId!,
//             //         formFieldId: question._id,
//             //       }
//             //   //   : "skip"
//             // );
//             // console.log(response);
//             // if (response === undefined && responseId) return <div>Loading</div>;

//             return (
//               <FormField
//                 key={index}
//                 index={index}
//                 editable={editable}
//                 answer={"response"} // Pass the fetched answer.
//                 responseId={responseId}
//                 updateAnswer={updateAnswer}
//                 question={question}
//                 updateQuestion={updateQuestion}
//                 removeQuestion={removeQuestion}
//               />
//             );
//           })}
//           <Button
//             type='button'
//             onClick={addQuestion}
//             size={"lg"}
//             disabled={editable}
//             className={cn(editable && "hidden", "mb-2")}
//           >
//             Add Question
//           </Button>
//         </div>
//         {!editable && (
//           <Button
//             type='submit'
//             variant={"submit"}
//             size={"lg"}
//             disabled={!editable}
//             className={cn(!editable && "hidden", "my-2")}
//           >
//             Submit
//           </Button>
//         )}
//       </form>
//     </div>
//   );
// };

// export default FormBuilder;
