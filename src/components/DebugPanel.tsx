'use client'

import { useState, useEffect } from 'react'
import { getDebugInfo, testApiEndpoint } from '@/lib/debug'

interface DebugPanelProps {
  show?: boolean
}

export default function DebugPanel({ show = false }: DebugPanelProps) {
  const [debugInfo, setDebugInfo] = useState<any>(null)
  const [isVisible, setIsVisible] = useState(show)
  const [testResults, setTestResults] = useState<any>({})

  useEffect(() => {
    if (isVisible) {
      const debug = getDebugInfo()
      setDebugInfo(debug)
    }
  }, [isVisible])

  const runTests = async () => {
    const results: any = {}
    
    // Test database connection
    results.db = await testApiEndpoint('/api/test-db')
    
    // Test auth endpoints (without credentials)
    results.login = await testApiEndpoint('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: 'test@test.com', password: 'test' })
    })
    
    setTestResults(results)
  }

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-red-500 text-white p-2 rounded-full text-xs z-50"
        title="Show Debug Panel"
      >
        🔍
      </button>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-w-md text-xs z-50">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold">🔍 Debug Panel</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
      
      {debugInfo && (
        <div className="space-y-2 mb-4">
          <div><strong>Env:</strong> {debugInfo.environment.nodeEnv || 'undefined'}</div>
          <div><strong>Vercel:</strong> {debugInfo.environment.vercelEnv || 'undefined'}</div>
          <div><strong>Region:</strong> {debugInfo.environment.vercelRegion || 'undefined'}</div>
          <div><strong>Host:</strong> {debugInfo.environment.hostname || 'undefined'}</div>
          <div><strong>API:</strong> {debugInfo.api.baseUrl}</div>
        </div>
      )}
      
      <div className="space-y-2">
        <button
          onClick={runTests}
          className="w-full bg-blue-500 text-white px-2 py-1 rounded text-xs"
        >
          Run API Tests
        </button>
        
        {Object.keys(testResults).length > 0 && (
          <div className="space-y-1">
            <div className="font-semibold">Test Results:</div>
            {Object.entries(testResults).map(([key, result]: [string, any]) => (
              <div key={key} className="text-xs">
                <strong>{key}:</strong> {result.success ? '✅' : '❌'} 
                {result.status && ` (${result.status})`}
                {result.duration && ` ${result.duration}ms`}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
