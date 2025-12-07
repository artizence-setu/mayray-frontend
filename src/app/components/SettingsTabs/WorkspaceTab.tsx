"use client";

import Image from "next/image";
import { BsPersonWorkspace } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Line, RiInboxArchiveLine } from "react-icons/ri";
import { useWorkspaces } from "@/features/workspace/useWorkspaces";
import { useUpdateWorkspace } from "@/features/workspace/useUpdateWorkspace";
import { useArchiveWorkspace } from "@/features/workspace/useArchiveWorkspace";
import { useDeleteWorkspace } from "@/features/workspace/useDeleteWorkspace";
import { useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";

function WorkspaceTab() {
  const { data: workspaces, isLoading } = useWorkspaces();
  const updateWorkspace = useUpdateWorkspace();
  const archiveWorkspace = useArchiveWorkspace();
  const deleteWorkspace = useDeleteWorkspace();
  const queryClient = useQueryClient();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ name: "", description: "" });

  if (isLoading) return <p className="text-white">Loading workspaces...</p>;

  const startEdit = (item: any) => {
    setEditingId(item.id);
    setEditForm({
      name: item.name,
      description: item.description || "",
    });
  };

  const handleUpdate = (id: number) => {
    updateWorkspace.mutate(
      { id, payload: editForm },
      {
        onSuccess: () => {
          toast.success("Workspace updated");
          setEditingId(null);
          queryClient.invalidateQueries({ queryKey: ["workspaces"] });
        },
        onError: (err) => toast.error(err.message),
      }
    );
  };

  const handleDelete = (id: number) => {
    deleteWorkspace.mutate(id, {
      onSuccess: () => {
        toast.success("Workspace deleted!");
        queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      },
      onError: (err) => toast.error(err.message),
    });
  };

  const handleArchive = (id: number) => {
    archiveWorkspace.mutate(id, {
      onSuccess: () => {
        toast.success("Workspace archived!");
        queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      },
      onError: (err) => toast.error(err.message),
    });
  };

  return (
    <div className="h-full">
      <h6 className="text-xl text-[#333333] font-semibold pb-4">Workspace</h6>
      <div className="border border-[#FFFFFF32]"></div>

      <div className="grid grid-cols-1 gap-y-4 py-4">
        {workspaces?.length > 0 ? (
          workspaces.map((item: any) => (
            <div key={item.id} className="bg-[#FFFFFF40] rounded-2xl p-6">
              <div className="flex items-center gap-4">

                <Image
                  src="/images/avatar.png"
                  width={70}
                  height={70}
                  alt="workspace"
                  className="rounded-full"
                />

                <div className="flex-1">
                  {editingId === item.id ? (
                    <>
                      {/* Editing Mode */}
                      <Input
                        className="bg-white/30 text-black mb-2"
                        value={editForm.name}
                        onChange={(e) =>
                          setEditForm({ ...editForm, name: e.target.value })
                        }
                      />

                      <Input
                        className="bg-white/30 text-black mb-4"
                        value={editForm.description}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            description: e.target.value,
                          })
                        }
                      />

                      <div className="flex gap-3 mt-2">
                        <Button
                          className="bg-green-500 hover:bg-green-600 text-white rounded-full"
                          onClick={() => handleUpdate(item.id)}
                        >
                          Update
                        </Button>

                        <Button
                          className="bg-gray-500 hover:bg-gray-600 text-white rounded-full"
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* View Mode */}
                      <h6 className="text-white text-lg font-normal">{item.name}</h6>
                      <p className="text-white/80 text-sm">{item.description}</p>

                      <div className="border-b border-white/40 my-3"></div>

                      <div className="flex flex-row gap-1 mt-4">
                        {/* Edit Button */}
                        <button
                          onClick={() => startEdit(item)}
                          className="flex  text-[12px] items-center gap-2 bg-[#4F4F4F] text-white px-4 py-2 text-sm rounded-full hover:bg-[#5a5a5a]"
                        >
                          <MdEdit size={16} /> Edit
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="flex  text-[12px] items-center gap-2 bg-[#4F4F4F] text-white px-4 py-2 text-sm rounded-full hover:bg-red-500"
                        >
                          <RiDeleteBin5Line size={16} /> Delete
                        </button>

                        {/* Archive Button */}
                        <button
                          onClick={() => handleArchive(item.id)}
                          className="flex text-[12px] items-center gap-2 bg-[#4F4F4F] text-white px-4 py-2 text-sm rounded-full hover:bg-yellow-500"
                        >
                          <RiInboxArchiveLine size={16} /> Archive
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center flex-col items-center mx-auto">
            <div className="bg-[#4F4F4F] w-20 h-20 rounded-full flex items-center justify-center">
              <BsPersonWorkspace color="white" size={36} />
            </div>
            <h6 className="md:text-[32px] font-semibold text-white text-center">
              You currently have no workspace
            </h6>
          </div>
        )}
      </div>
    </div>
  );
}

export default WorkspaceTab;
