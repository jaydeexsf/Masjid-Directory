// Frontend debugging utilities
export interface DebugInfo {
  timestamp: string;
  environment: {
    isClient: boolean;
    isServer: boolean;
    nodeEnv: string | undefined;
    vercelEnv: string | undefined;
    vercelRegion: string | undefined;
    userAgent: string | undefined;
    url: string | undefined;
    hostname: string | undefined;
  };
  api: {
    baseUrl: string;
    endpoints: {
      login: string;
      register: string;
      testDb: string;
    };
  };
  localStorage: {
    hasAuthUser: boolean;
    hasAuthToken: boolean;
    hasAuthRole: boolean;
    hasUserId: boolean;
    hasMasjidId: boolean;
  };
}

export function getDebugInfo(): DebugInfo {
  const isClient = typeof window !== 'undefined';
  const isServer = typeof window === 'undefined';
  
  return {
    timestamp: new Date().toISOString(),
    environment: {
      isClient,
      isServer,
      nodeEnv: process.env.NODE_ENV,
      vercelEnv: process.env.VERCEL_ENV,
      vercelRegion: process.env.VERCEL_REGION,
      userAgent: isClient ? navigator.userAgent : undefined,
      url: isClient ? window.location.href : undefined,
      hostname: isClient ? window.location.hostname : undefined,
    },
    api: {
      baseUrl: isClient ? window.location.origin : 'server',
      endpoints: {
        login: '/api/auth/login',
        register: '/api/auth/register',
        testDb: '/api/test-db',
      },
    },
    localStorage: {
      hasAuthUser: isClient ? !!localStorage.getItem('authUser') : false,
      hasAuthToken: isClient ? !!localStorage.getItem('authToken') : false,
      hasAuthRole: isClient ? !!localStorage.getItem('authRole') : false,
      hasUserId: isClient ? !!localStorage.getItem('userId') : false,
      hasMasjidId: isClient ? !!localStorage.getItem('masjidId') : false,
    },
  };
}

export function logDebugInfo(context: string, additionalData?: any) {
  const debugInfo = getDebugInfo();
  console.group(`🔍 [DEBUG] ${context}`);
  console.log('Environment:', debugInfo.environment);
  console.log('API Endpoints:', debugInfo.api);
  console.log('LocalStorage:', debugInfo.localStorage);
  if (additionalData) {
    console.log('Additional Data:', additionalData);
  }
  console.groupEnd();
  return debugInfo;
}

export async function testApiEndpoint(endpoint: string, options?: RequestInit) {
  const start = performance.now();
  try {
    console.log(`🧪 [API TEST] Testing ${endpoint}...`);
    const response = await fetch(endpoint, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });
    
    const duration = Math.round(performance.now() - start);
    const responseData = await response.json().catch(() => null);
    
    console.log(`🧪 [API TEST] ${endpoint} result:`, {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      duration: `${duration}ms`,
      hasData: !!responseData,
      data: responseData,
      headers: Object.fromEntries(response.headers.entries()),
    });
    
    return {
      success: response.ok,
      status: response.status,
      data: responseData,
      duration,
    };
  } catch (error) {
    const duration = Math.round(performance.now() - start);
    console.error(`🧪 [API TEST] ${endpoint} failed:`, {
      error: error instanceof Error ? error.message : String(error),
      duration: `${duration}ms`,
    });
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
      duration,
    };
  }
}
