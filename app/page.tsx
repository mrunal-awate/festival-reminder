"use client";

import festivals from "@/data/festivals.json";

type OneSignalInstance = {
  Notifications: {
    requestPermission: () => Promise<void>;
  };
};

declare global {
  interface Window {
    OneSignalDeferred?: Array<(OneSignal: OneSignalInstance) => void>;
  }
}

function getUpcomingFestivals(count: number) {
  const today = new Date();
  return festivals
    .filter((f) => new Date(f.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, count);
}

export default function Home() {
  const upcoming = getUpcomingFestivals(4);

  const handleEnableNotifications = async () => {
    window.OneSignalDeferred = window.OneSignalDeferred || [];
    window.OneSignalDeferred.push(async (OneSignal) => {
      await OneSignal.Notifications.requestPermission();
    });
  };

  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center px-6 py-16">
        <h1 className="text-3xl font-bold text-center text-black dark:text-zinc-50">
          Never Miss a Festival
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-center mt-2 max-w-md">
          Get timely reminders for Diwali, Holi, Navratri, and more.
        </p>

        <a
          href="/calendar"
          className="text-orange-600 font-medium mt-4 hover:underline"
        >
          View full calendar →
        </a>

        <section className="w-full mt-10">
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-zinc-50">
            Upcoming Festivals
          </h2>
          <div className="space-y-3">
            {upcoming.map((festival) => (
              <div
                key={festival.id}
                className="border border-black/8 dark:border-white/[.145] rounded-lg p-4"
              >
                <p className="font-medium text-black dark:text-zinc-50">
                  {festival.name}
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {new Date(festival.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            ))}
          </div>
        </section>

        <button
          onClick={handleEnableNotifications}
          className="mt-10 bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors"
        >
          Enable Festival Reminders
        </button>
      </main>
    </div>
  );
}
