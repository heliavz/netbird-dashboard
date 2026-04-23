import { cn } from "@/lib/utils";
import {
  IconArrowRight,
  IconCheck,
  IconLayoutDashboard,
  IconNetwork,
  IconServer,
  IconShield,
  IconUsers,
} from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Step {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
  to: string;
  done: boolean;
}

const initialSteps: Step[] = [
  {
    id: "peer",
    icon: <IconServer size={18} />,
    title: "Add your first peer",
    description:
      "Install the NetBird agent on a machine to connect it to your private network.",
    action: "Go to Peers",
    to: "/peers",
    done: false,
  },
  {
    id: "group",
    icon: <IconNetwork size={18} />,
    title: "Create a group",
    description:
      "Groups let you organize peers and use them as sources or destinations in access policies.",
    action: "Go to Groups",
    to: "/access-control/groups",
    done: false,
  },
  {
    id: "policy",
    icon: <IconShield size={18} />,
    title: "Set an access policy",
    description:
      "Define which peers can talk to each other. Without a policy, peers are isolated.",
    action: "Go to Policies",
    to: "/access-control/policies",
    done: false,
  },
  {
    id: "team",
    icon: <IconUsers size={18} />,
    title: "Invite a team member",
    description:
      "Add colleagues so they can connect their own devices to the network.",
    action: "Go to Team",
    to: "/team/users",
    done: false,
  },
];

export default function GettingStartedChecklist() {
  const [steps, setSteps] = useState<Step[]>(initialSteps);
  const navigate = useNavigate();

  const completedCount = steps.filter((s) => s.done).length;

  function toggleDone(id: string) {
    setSteps((prev) =>
      prev.map((s) => (s.id === id ? { ...s, done: !s.done } : s)),
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-16 px-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 rounded-lg bg-nb-gray-920 flex items-center justify-center">
          <IconLayoutDashboard size={17} className="text-netbird" />
        </div>
        <h1 className="text-nb-gray-100 text-xl font-semibold">
          Get started with NetBird
        </h1>
      </div>

      <p className="text-nb-gray-400 text-sm mb-8 ml-11">
        Complete these steps to set up your first private network.
      </p>

      {/* Progress bar */}
      <div className="ml-11 mb-8">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-nb-gray-500">
            {completedCount} of {steps.length} completed
          </span>
          {completedCount === steps.length && (
            <span className="text-xs text-green-400 font-medium">
              All done 🎉
            </span>
          )}
        </div>
        <div className="h-1 rounded-full bg-nb-gray-900 overflow-hidden">
          <div
            className="h-full rounded-full bg-netbird transition-all duration-500"
            style={{
              width: `${(completedCount / steps.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Steps */}
      <div className="flex flex-col gap-2 ml-11">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={cn(
              "flex items-start gap-4 p-4 rounded-lg border transition-all duration-200",
              step.done
                ? "border-nb-gray-900 bg-nb-gray-950 opacity-60"
                : "border-nb-gray-900 bg-nb-gray-920 hover:border-nb-gray-800",
            )}
          >
            {/* Step number / check */}
            <button
              onClick={() => toggleDone(step.id)}
              className={cn(
                "mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors",
                step.done
                  ? "border-green-400 bg-green-400"
                  : "border-nb-gray-700 hover:border-netbird",
              )}
            >
              {step.done ? (
                <IconCheck size={11} className="text-nb-gray-950" />
              ) : (
                <span className="text-[10px] text-nb-gray-500 font-medium">
                  {index + 1}
                </span>
              )}
            </button>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-nb-gray-500">{step.icon}</span>
                <span
                  className={cn(
                    "text-sm font-medium",
                    step.done
                      ? "text-nb-gray-500 line-through"
                      : "text-nb-gray-100",
                  )}
                >
                  {step.title}
                </span>
              </div>
              <p className="text-xs text-nb-gray-500 leading-relaxed">
                {step.description}
              </p>
            </div>

            {/* Action */}
            {!step.done && (
              <button
                onClick={() => navigate(step.to)}
                className="flex items-center gap-1.5 text-xs text-netbird hover:text-netbird-300 transition-colors flex-shrink-0 mt-0.5"
              >
                {step.action}
                <IconArrowRight size={13} />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Ghost network map preview */}
      <div className="ml-11 mt-10 rounded-lg border border-nb-gray-900 bg-nb-gray-960 p-6 opacity-40 select-none">
        <p className="text-xs text-nb-gray-500 mb-4 text-center">
          Your network map will appear here once peers are connected
        </p>
        <div className="flex items-center justify-center gap-6">
          {["peer-1", "peer-2", "peer-3"].map((p) => (
            <div key={p} className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-nb-gray-900 border border-nb-gray-800" />
              <div className="h-2 w-16 rounded bg-nb-gray-900" />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-1 mt-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-nb-gray-900" />
          ))}
        </div>
      </div>
    </div>
  );
}
