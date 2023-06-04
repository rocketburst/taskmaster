"use client";

import { type FormEvent, useContext, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import Link from "next/link";

import { ModalContext } from "@/contexts/ModalContext";
import { extractTasks, getTaskSections, isTaskStringValid } from "@/lib/utils";
import type { ModalContextType, StorageBucketResponse } from "@/types";
import BaseModal from "./BaseModal";

export default function UploadModal() {
  const { changeModalVisibility } = useContext(
    ModalContext
  ) as ModalContextType;
  const [file, setFile] = useState<File | null>(null);
  const [isError, setIsError] = useState(false);
  const { data: session } = useSession();

  const getBucketId = async () => {
    const { message } = await fetch(
      `/api/storage/bucket?userEmail=${session?.user?.email}`
    ).then(res => res.json() as StorageBucketResponse);

    if (message) return message;
    else {
      const { bucket } = await fetch("/api/storage/bucket", {
        method: "POST",
        body: JSON.stringify({
          userEmail: session?.user?.email as string,
        }),
      }).then(res => res.json() as StorageBucketResponse);

      return bucket?.$id as string;
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = toast.loading("Uploading Tasks...");

    if (!file || file.type !== "text/plain") {
      toast.error("Invalid File!", { id });
      setFile(null);
      changeModalVisibility("upload");
      return;
    }

    changeModalVisibility("upload");
    const bucketId = await getBucketId();

    const fileReader = new FileReader();
    fileReader.readAsText(file);

    fileReader.onload = async e => {
      const fileContents = e.target?.result as string;

      await fetch("/api/storage/file", {
        method: "POST",
        body: JSON.stringify({
          bucketId,
          fileContents,
        }),
      })
        .then(res => res.json())
        .then(() => uploadTasks(fileContents, id))
        .catch(() => toast.error("Something Went wrong!", { id }));
    };
  };

  const uploadTasks = async (content: string, id: string) => {
    const { highPriority, mediumPriority, lowPriority } =
      getTaskSections(content);
    const taskStrings = [highPriority, mediumPriority, lowPriority];

    taskStrings.forEach(str => {
      if (!isTaskStringValid(str)) setIsError(true);
    });

    if (isError) {
      toast.error("Invalid File Format!", { id });
      console.log("io");
      return;
    }

    const highTasks = extractTasks(highPriority);
    const mediumTasks = extractTasks(mediumPriority);
    const lowTasks = extractTasks(lowPriority);

    await fetch(`/api/upload?userEmail=${session?.user?.email}`, {
      method: "POST",
      body: JSON.stringify({ highTasks, mediumTasks, lowTasks }),
    })
      .then(res => res.json())
      .then(() => toast.success("Uploaded Tasks Successfully!", { id }));
  };

  return (
    <BaseModal type="upload" title="Upload Batch of Tasks">
      <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="file_input"
          >
            Upload file*
          </label>

          <input
            className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none"
            id="file_input"
            type="file"
            onChange={e => setFile(e.target.files![0])}
          />
        </div>

        <div>
          <p className="text-xs">
            *File must follow{" "}
            <span className="cursor-pointer underline">
              <Link href="/assets/example.txt" target="_blank">
                this
              </Link>
            </span>{" "}
            format
          </p>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
          >
            Upload Tasks
          </button>
        </div>
      </form>
    </BaseModal>
  );
}
