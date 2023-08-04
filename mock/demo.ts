export default [
  {
    url: '/api/demo',
    method: 'get',
    response: ({ query }) => {
      return {
        code: 0,
        data: query,
      }
    },
  },
]
