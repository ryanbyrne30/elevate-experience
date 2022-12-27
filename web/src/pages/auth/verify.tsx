import PageHead from "@/components/PageHead";

export default function VerifyEmailPage() {
  return (
    <>
      <PageHead
        title="Verify Email"
        description="Verify your email for Elevate Experience."
      />
      <div className="buffer-y px-4">
        <h1 className="group text-center">
          A magic link was sent to your email!
        </h1>
      </div>
    </>
  );
}
