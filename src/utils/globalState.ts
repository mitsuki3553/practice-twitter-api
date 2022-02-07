import useSWR from "swr";

export const useSharedState = (key: string, init?: any) => {
  const { data, mutate } = useSWR(key, { fallbackData: init });
  return [data, mutate];
};
