export function OverviewPanel() {
  const deploymentStatus = [
    { title: "Services Live", value: "4", color: "text-green-600" },
    { title: "Pending Deployments", value: "1", color: "text-amber-500" },
    { title: "Success Rate", value: "99.8%", color: "text-green-600" },
    { title: "Last Deployment", value: "12 min ago", color: "text-slate-600 dark:text-slate-300" },
  ];

  const infrastructure = [
    "CloudFront",
    "Application Load Balancer",
    "AWS ECS",
    "AWS RDS",
  ];

  const pipeline = [
    "GitHub",
    "Actions",
    "Docker",
    "ECR",
    "ECS",
    "Prod",
  ];

  const owners = [
    { team: "Frontend", role: "UI Deploy", owner: "Sadia" },
    { team: "Backend", role: "API Services", owner: "Waqas" },
    { team: "Database", role: "RDS", owner: "Ahmed" },
    { team: "Monitoring", role: "CloudWatch", owner: "Ali" },
  ];

  return (
    <div className="space-y-4">

      {/* STATUS + INFRA */}
      <div className="grid md:grid-cols-2 gap-4">

        {/* Deployment Status */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Deployment Status
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Production summary
              </p>
            </div>

            <span className="text-xs px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600">
              Healthy
            </span>
          </div>

          <div className="space-y-2">
            {deploymentStatus.map((item) => (
              <div
                key={item.title}
                className="flex items-center justify-between rounded-xl bg-slate-50 dark:bg-slate-800 px-3 py-2"
              >
                <span className="text-xs text-slate-600 dark:text-slate-300">
                  {item.title}
                </span>
                <span className={`text-xs font-semibold ${item.color}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Infrastructure */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            Infrastructure
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
            AWS services health
          </p>

          <div className="space-y-2">
            {infrastructure.map((service) => (
              <div
                key={service}
                className="flex items-center justify-between rounded-xl border border-slate-100 dark:border-slate-700 px-3 py-2"
              >
                <span className="text-xs text-slate-700 dark:text-slate-200">
                  {service}
                </span>

                <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600">
                  OK
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PIPELINE + OWNERSHIP */}
      <div className="grid lg:grid-cols-2 gap-4">

        {/* Pipeline */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            CI/CD Flow
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            GitHub → Production
          </p>

          <div className="flex flex-col items-center space-y-2">
            {pipeline.map((step) => (
              <div key={step} className="w-full flex flex-col items-center">
                <div className="w-full rounded-xl border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20 py-2 text-center">
                  <p className="text-xs font-medium text-slate-700 dark:text-white">
                    {step}
                  </p>
                </div>
                <div className="h-3 w-px bg-green-400 dark:bg-green-700" />
              </div>
            ))}
          </div>
        </div>

        {/* Ownership */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            Ownership
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Team responsibilities
          </p>

          <div className="space-y-3">
            {owners.map((m) => (
              <div
                key={m.team}
                className="rounded-xl border border-slate-100 dark:border-slate-700 p-3 flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {m.team}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {m.role}
                  </p>
                </div>

                <div className="text-right">
                  <div className="h-7 w-7 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-semibold ml-auto">
                    {m.owner.charAt(0)}
                  </div>
                  <p className="text-xs mt-1 text-slate-600 dark:text-slate-300">
                    {m.owner}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
