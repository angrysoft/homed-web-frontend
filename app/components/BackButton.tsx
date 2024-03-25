import { ArrowBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";

export function BackButton({ href }: Readonly<{ href: string }>) {
  const router = useRouter();
  return (
    <IconButton onClick={() => router.push(href)}>
      <ArrowBack />
    </IconButton>
  );
}
