import { NextApiRequest, NextApiResponse } from 'next';
import connect, { ErrorHandler } from 'next-connect';

import { APP_NAME } from '$/lib/constants';

import { ApiError } from './error';

export const handleInternalFailure: ErrorHandler<NextApiRequest, NextApiResponse> = (
  error,
  req,
  res,
) => {
  console.error('internal error', error);
  console.error('query', req.query);
  console.error('body', req.body);

  if (error instanceof ApiError) {
    return res.status(error.httpStatus).send(error.message);
  }

  res.status(500).end(`${APP_NAME} error: ${error.toString()}`);
};

export const getApiHandler = () =>
  connect<NextApiRequest, NextApiResponse>({
    onError: handleInternalFailure,
  });
