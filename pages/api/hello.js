// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Cors from 'cors';

const cors = Cors({
  methods: ['GET', 'HEAD', 'POST'],
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await runMiddleware(req, res, cors);
      const response = await fetch('https://api.nano-frames.com/pixl-page-service/pages', {
        headers: {
          'Content-Type': 'application/json',
        },
        body: req.body,
      });
      const data = response.json();

      res.status(200).json({
        data: data,
      });
    } catch (e) {
      console.log(e);
    }
  }
}
