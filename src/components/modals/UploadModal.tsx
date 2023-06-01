"use client";

import { Dialog, Transition } from "@headlessui/react";
import { FormEvent, Fragment, useContext, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import Link from "next/link";

import { ModalContext } from "@/contexts/ModalContext";
import type { ModalContextType, StorageBucketResponse } from "@/types";

export default function UploadModal() {
  const { getModalState, changeModalVisibility } = useContext(
    ModalContext
  ) as ModalContextType;
  const [file, setFile] = useState<File | null>(null);
  const [bucketId, setBucketId] = useState("");
  const { data: session } = useSession();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file || file.type !== "text/plain") {
      toast.error("Invalid File!");
      setFile(null);
      changeModalVisibility("upload");
      return;
    }

    changeModalVisibility("upload");

    const { error, message } = await fetch(
      `/api/storage/bucket?userEmail=${session?.user?.email}`
    ).then(res => res.json() as StorageBucketResponse);
    console.log(error);
    console.log(message);

    if (message) setBucketId(message);

    if (error) {
      await fetch("/api/storage/bucket", {
        method: "POST",
        body: JSON.stringify({
          userEmail: session?.user?.email as string,
        }),
      })
        .then(res => res.json() as StorageBucketResponse)
        .then(data => setBucketId(data.bucket?.$id as string));
    }
  };

  return (
    <>
      <Transition appear show={getModalState("upload")} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            changeModalVisibility("upload");
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Upload Batch of Tasks
                  </Dialog.Title>

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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
