import Header from "@/components/header";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to Our Platform
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Experience the future of digital solutions with our innovative
                  platform.
                </p>
              </div>
              <div className="space-x-4">
                <button className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                  Get Started
                </button>
                <button className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Features
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our platform offers a comprehensive set of features to help
                  you succeed.
                </p>
              </div>
              <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Easy Integration</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Seamlessly integrate with your existing tools and workflows.
                  </p>
                </div>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Powerful Analytics</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Gain insights with our comprehensive analytics dashboard.
                  </p>
                </div>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Secure & Reliable</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Your data is safe with our enterprise-grade security.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            © 2023 Company Name. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:gap-6">
            <a className="text-sm font-medium hover:underline" href="#">
              Terms of Service
            </a>
            <a className="text-sm font-medium hover:underline" href="#">
              Privacy
            </a>
            <a className="text-sm font-medium hover:underline" href="#">
              Contact
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Index;
