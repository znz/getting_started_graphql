'use strict'

const express = require('express')
const graphqlHTTP = require('express-graphql')
const { graphql, buildSchema } = require('graphql')

const PORT = process.env.PORT || 3000
const server = express()

const schema = buildSchema(`
type Video {
  id: ID,
  title: String,
  watched: Boolean,
}

type Query {
  video: Video,
  videos: [Video],
}

type Schema {
  query: Query
}
`)

const videoA = {
  id: 1,
  title: 'title1',
  watched: true
}
const videoB = {
  id: 2,
  title: 'title2',
  watched: false
}
const videos = [videoA, videoB]

const resolvers = {
  video: () => ({
    id: 1,
    title: 'bar',
    watched: true,
  }),
  videos: () => videos,
}

const query = `
query myQuery {
  videos {
    id,
    title,
    watched,
  }
}
`

server.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
  rootValue: resolvers,
}))

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})
