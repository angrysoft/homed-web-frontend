
import { GoogleSignIn } from "./GoogleSignIn";

export default function SignIn() {
  return (
    <main className="grid place-content-center h-[100vh]">
      <section className="p-2 bg-surface text-onSurface rounded-lg">
        <GoogleSignIn />
      </section>
    </main>
  );
}
