import Image from "next/image";
import Link from "next/link";

interface HeadingProps {
  heading: string,
  paragraph: string,
  linkName: string,
  linkUrl: string,
}

export default function Heading ({
  heading,
  paragraph,
  linkName,
  linkUrl,
} : HeadingProps) {
  return(
    <div className="mb-10">
      <div className="flex justify-center">
        <Image
          src="/logo.svg"
          height="40"
          width="40"
          alt="Logo"
          className="dark:hidden"
        />
        <Image
          src="/logo-dark.svg"
          height="40"
          width="40"
          alt="Logo"
          className="hidden dark:block"
        />
      </div>
      <h2 className="mt-6 text-center text-3xl font-extrabold">
        {heading}
      </h2>
      <p className="text-center text-sm text-gray-600 mt-3">
        {paragraph} {' '}
        <Link href={linkUrl} className="font-medium underline">
          {linkName}
        </Link>
      </p>
    </div>
  )
}