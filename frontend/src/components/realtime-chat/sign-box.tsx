import SignForm from "@/forms/sign.form";
import DemoBtn from "./demo-btn";
import GoogleBtn from "./google-btn";

function SignBox({
  isLoading,
  setIsLoading,
}: {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="bg-muted rounded-lg p-4">
        <h3 className="mb-2 font-medium">Sign in with</h3>
        <div className="flex items-start justify-center gap-2 max-sm:flex-col">
          <SignForm isLoading={isLoading} setIsLoading={setIsLoading} />
          <div className="flex h-full w-full flex-col items-center gap-2">
            <DemoBtn isLoading={isLoading} />
            <GoogleBtn isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignBox;
