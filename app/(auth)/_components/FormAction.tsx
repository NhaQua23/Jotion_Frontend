import { Button } from "@/components/ui/button";

interface FormActionProps {
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void,
  type?: string,
  action?: "submit" | "reset" | "button",
  text: string,
}

export default function FormAction({
  handleSubmit,
  type = "Button",
  action = "button",
  text
} : FormActionProps) {
  return(
    <>
      {
        type==="Button" ?
        <Button
          type={action}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 mt-10"
          onClick={handleSubmit}
        >
          {text}
        </Button>
        :
        <>
        
        </>
      }
    </>
  )
}