"use client";
import { usePathname, useRouter } from "next/navigation";

interface HeadingProps {
  title: string | undefined;
}

export const Heading = ({ title }: HeadingProps) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <>
      <div className="flex flex-col mt-5 mb-8 text-left md:items-center md:justify-between md:flex-row gap-x-3">
        <div>
          <h2 className="text-3xl font-bold text-primary">{title}</h2>
        </div>
        {/* <Button
          className="mt-5 capitalize w-fit md:mt-0"
          variant="ghost"
          onClick={() => router.push(`${pathname}/history`)}
        >
          {buttonTitle}
        </Button> */}
      </div>
    </>
  );
};
