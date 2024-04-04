'use client'

import { useState } from 'react'

import {
  QueryClientProvider,
  QueryClient,
  HydrationBoundary,
  dehydrate
} from '@tanstack/react-query'

function Providers({ children }: React.PropsWithChildren) {
  const [client] = useState(new QueryClient())

  return (
    <QueryClientProvider client={client}>
      <HydrationBoundary state={dehydrate(client)}>
        {children}
      </HydrationBoundary>
    </QueryClientProvider>
  )
}

export default Providers
