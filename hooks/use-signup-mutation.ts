import { useMutation } from 'react-query';

import queryClient from '../lib/query-client';

interface newUser {
  email: string;
  username: string;
  password: string;
}

export default function useCreateUserMutation() {
  return useMutation(
    (user: newUser) =>
      fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      }).then((res) => res.json()),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users');
      },
    }
  );
}
