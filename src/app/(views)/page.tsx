"use client";

import Container from "@/components/globals/container";
import { AnimatedTooltip } from "@/components/magic-ui/animated-tooltip";
import DotPattern from "@/components/magic-ui/dot-patter";
import ShimmerButton from "@/components/magic-ui/shimmer-button";
import { GROUP_ICONS } from "@/constants";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <div className="relative flex h-screen w-full flex-col px-40 py-40 overflow-hidden bg-background">
        <p className="z-10 whitespace-pre-wrap text-7xl font-bold font-mono tracking-tight text-black dark:text-white">
          Streamline Your Supply Chain with Our <br />
          Comprehensive SCM Solution
        </p>
        <p className="mt-3 text-2xl text-muted-foreground">
          Efficient, Transparent, and Scalable Supply Chain Management by{" "}
          <span className="text-orange-600 font-semibold underline">
            SupplyX
          </span>
        </p>
        <div className="flex items-center mt-5 gap-5">
          <ShimmerButton>
            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
              Browse &rarr;
            </span>
          </ShimmerButton>
          <button onClick={() => router.push("/auth")} className="px-8 py-3.5 rounded-[10px] bg-gradient-to-b from-orange-600 to-orange-800 text-white focus:ring-2 focus:ring-orange-600 hover:shadow-xl transition duration-200">
            Get Started For Free
          </button>
        </div>
        <p className="mt-10 font-semibold mb-3 text-muted-foreground">DEVELOPED BY THE BEST IN THE BSIS405</p>
        <div className="flex flex-row items-center w-full">
          <AnimatedTooltip items={GROUP_ICONS} />
        </div>
        <DotPattern
          width={18}
          height={18}
          cx={1}
          cy={1}
          cr={1}
          className={cn(
            "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] "
          )}
        />
      </div>
      <Container>
        <p></p>
      </Container>
    </>
  );
}
