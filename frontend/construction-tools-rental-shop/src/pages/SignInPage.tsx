import {SignIn} from "@clerk/clerk-react";

export function SignInPage() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen">
            <SignIn/>
        </main>
    );
}
