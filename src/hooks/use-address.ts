import {useCurrentStxAddress} from '@micro-stacks/react';

const useAddress = (): string | null => {
  return useCurrentStxAddress() ?? null
}

export default useAddress;
