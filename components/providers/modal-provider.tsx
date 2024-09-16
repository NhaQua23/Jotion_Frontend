'use client'

import { useEffect, useState } from "react"

import { SettingsModal } from "@/components/modals/SettingModal"
import { CoverImageModal } from "@/components/modals/CoverImageModal"
import { CreateWorkspaceModal } from "../modals/CreateWorkspaceModal"
import { CreatePageModal } from "../modals/CreatePageModal"
import { DeleteModal } from "../modals/DeleteModal"
import { UpdateWorkspaceModal } from "../modals/UpdateWorkspaceModal"
import { UpdatePageModal } from "../modals/UpdatePageModal"
import { SharePageModal } from "../modals/SharePageModal"
import { UpdateUserModal } from "../modals/UpdateUserModal"
import { UnSharePageModal } from "../modals/UnSharePageModal"
import { TemplateModal } from "../modals/TemplateModal"

export function ModalProvider() {

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <SettingsModal />
      <CreateWorkspaceModal />
      <CreatePageModal />
      <UpdateWorkspaceModal />
      <UpdatePageModal />
      <DeleteModal />
      <CoverImageModal />
      <SharePageModal />
      <UnSharePageModal />
      <UpdateUserModal />
      <TemplateModal />
    </>
  )
}