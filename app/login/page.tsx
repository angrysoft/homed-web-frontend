import Link from "next/link";

export default function Login() {
  return (
    <div className="grid p-4 place-content-center">
      <Link
        href="/oauth2/authorization/google"
        className="text-onSurface bg-surface p-1 rounded-lg border border-secondary"
      >
        Login With Google
      </Link>
    </div>
  );
}
