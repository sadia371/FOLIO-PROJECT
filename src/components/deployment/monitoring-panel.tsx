export function MonitoringPanel() {
  const services = [
    { name: "Frontend", status: "Healthy", uptime: "99.9%", healthy: true },
    { name: "Backend API", status: "Healthy", uptime: "99.7%", healthy: true },
    { name: "Database", status: "Healthy", uptime: "99.8%", healthy: true },
    { name: "Auth", status: "Warning", uptime: "97.5%", healthy: false },
  ];

  const resources = [
    { name: "CPU", value: 28 },
    { name: "Memory", value: 61 },
    { name: "Network", value: 42 },
  ];

  const health = [
    { service: "ECS", latency: "19 ms" },
    { service: "RDS", latency: "27 ms" },
    { service: "ECR", latency: "12 ms" },
    { service: "CloudFront", latency: "15 ms" },
  ];

  const logs = [
    "Connected to ECS Cluster",
    "Docker image built",
    "Pushed to ECR",
    "Service updated",
    "Health checks passed",
    "Cache invalidated",
    "Deployment successful",
  ];

  return (
    <div className="space-y-4">

      {/* SERVICES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">

        {services.map((s) => (
          <div
            key={s.name}
            className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4"
          >

            <p className="text-xs text-slate-500 dark:text-slate-400">
              {s.name}
            </p>

            <div className="mt-3 flex items-center justify-between">

              <span
                className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                  s.healthy
                    ? "bg-green-100 text-green-600 dark:bg-green-900/30"
                    : "bg-amber-100 text-amber-600 dark:bg-amber-900/30"
                }`}
              >
                {s.status}
              </span>

              <span className="text-lg font-semibold text-slate-900 dark:text-white">
                {s.uptime}
              </span>

            </div>
          </div>
        ))}

      </div>

      {/* HEALTH + RESOURCES */}
      <div className="grid lg:grid-cols-2 gap-4">

        {/* SERVICE HEALTH */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4">

          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            Service Health
          </h3>

          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
            Production services status
          </p>

          <div className="space-y-2">

            {health.map((h) => (
              <div
                key={h.service}
                className="flex items-center justify-between rounded-xl border border-slate-100 dark:border-slate-700 p-3"
              >

                <div>
                  <p className="text-xs font-medium text-slate-900 dark:text-white">
                    {h.service}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Running
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs font-semibold text-green-600">
                    Healthy
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {h.latency}
                  </p>
                </div>

              </div>
            ))}

          </div>
        </div>

        {/* RESOURCES */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4">

          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            Resource Usage
          </h3>

          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
            AWS infrastructure load
          </p>

          <div className="space-y-4">

            {resources.map((r) => (
              <div key={r.name}>

                <div className="flex justify-between mb-1">
                  <span className="text-xs text-slate-700 dark:text-slate-200">
                    {r.name}
                  </span>
                  <span className="text-xs font-semibold text-slate-900 dark:text-white">
                    {r.value}%
                  </span>
                </div>

                <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">

                  <div
                    className={`h-full ${
                      r.value > 70
                        ? "bg-red-500"
                        : r.value > 50
                        ? "bg-amber-500"
                        : "bg-green-500"
                    }`}
                    style={{ width: `${r.value}%` }}
                  />

                </div>

              </div>
            ))}

          </div>
        </div>

      </div>

      {/* LOGS */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4">

        <div className="flex items-center justify-between mb-3">

          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Cloud Logs
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Live deployment stream
            </p>
          </div>

          <span className="text-[11px] px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600">
            Live
          </span>

        </div>

        <div className="rounded-xl bg-slate-950 p-3 overflow-auto">

          <div className="space-y-1 font-mono text-[11px] text-green-400">

            {logs.map((log) => (
              <p key={log}>✓ {log}</p>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
}
