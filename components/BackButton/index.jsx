import { useRouter } from "next/router";

export default function BackButton() {
  const router = useRouter();

  const goBack = () => {
    router.push("/");
  };
  return (
    <button onClick={goBack} className="backButton">
      Back
    </button>
  );

}
