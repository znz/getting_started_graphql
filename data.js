'use strict'

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

const getVideoById = (id) => new Promise(resolve => {
  const [video] = videos.filter(v => (v.id + '') === id)
  resolve(video)
})

exports.getVideoById = getVideoById
