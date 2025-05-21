import LinkButton from "@/components/shared/atoms/LinkButton";

export default function Home() {
  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-4">
        <h1>Go To Login</h1>
        <LinkButton href="/login">Login</LinkButton>
      </div>
    </div>
  );
}
