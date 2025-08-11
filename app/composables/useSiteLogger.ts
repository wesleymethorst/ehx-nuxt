import { useSupabaseClient, useSupabaseUser } from '#imports'

export type SiteLogPayload = {
  action: string
  details?: unknown
}

export function useSiteLogger() {
  const client = useSupabaseClient()
  const user = useSupabaseUser()
  const route = useRoute()

  async function logAction(payload: SiteLogPayload): Promise<void> {
    try {
      const userId = user.value?.id ?? null
      const userName = (user.value?.user_metadata as any)?.name || user.value?.email || null

      const insertPayload = {
        action: payload.action,
        details: payload.details ? JSON.stringify(payload.details) : null,
        path: route.fullPath,
        user_id: userId,
        user_name: userName,
      }

      const { error } = await client.from('site_logs').insert([insertPayload])
      if (error) throw error
    } catch (error) {
      // Fail silently to avoid breaking UX if logging fails
      console.warn('[site-logger] Failed to log action', error)
    }
  }

  return { logAction }
}


