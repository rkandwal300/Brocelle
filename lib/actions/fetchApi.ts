"use server";
export async function FetchApiAction<T>(
  url: string,
  message: string,
  options: RequestInit = {}
): Promise<T> {
  const { headers = {}, ...otherOptions } = options;

  const mergedHeaders = {
    // 'Content-Type': 'application/json',
    ...headers,
  };

  try {
    const response = await fetch(url, {
      ...otherOptions,

      headers: mergedHeaders,
    });

    if (!response.ok) {
      throw new Error(`${message} ${response.status}`);
    }
    return response.json();
  } catch (error) {
    throw error;
  }
}
