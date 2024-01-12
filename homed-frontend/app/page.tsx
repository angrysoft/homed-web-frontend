import { redirect } from "next/navigation";

async function fetchState() {
  const res = await fetch("http://localhost:8080/oauth2/authorization/google", { cache: "no-store" });
  return res.ok;
}

export default async function Index() {
  const state = await fetchState();
  if (state) {
    redirect("/home");
  }
  redirect("/login");
  return <main className="grid content-baseline h-[100dvh]">Łubudubu</main>;
}
