import { CheckCircle2Icon } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

interface Props {
  title: string;
  description: string;
}

export function CreateAlert({ title, description }: Props) {
  return (
    <Alert className="max-w-md">
      <CheckCircle2Icon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
